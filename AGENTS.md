# Agent instructions for this repository

This is a **personal fork** of Immich (`wojas/immich`), forked from `immich-app/immich`.
It exists to add features that are useful to the fork owner and are **not intended to be
merged upstream**. The upstream project does not accept AI-written pull requests.

## Hard rules: never touch the upstream repository

1. **All pull requests target this fork.** The only valid PR base is `wojas/immich`.
   Never open, edit, or comment on a PR in `immich-app/immich`.
2. **Always pass the repo explicitly** when creating a PR, even though `gh repo set-default`
   is configured to point at this fork:

   ```sh
   gh pr create --repo wojas/immich --base main ...
   ```

   `gh` knows this repo is a fork, and without `--repo` it may pick the parent
   `immich-app/immich` as the base. Treat a PR opened against `immich-app/*` as a
   serious error: close it immediately and tell the user.
3. **Before creating a PR, verify the target.** Run `gh repo set-default --view` and confirm
   it prints `wojas/immich`. After creating a PR, confirm the URL starts with
   `https://github.com/wojas/immich/`. If it does not, close the PR at once.
4. **Only push to `origin`** (`git@github.com:wojas/immich.git`). Never push to any remote
   that points at `immich-app/immich`.
5. **Do not add a remote for the upstream repository** unless the user explicitly asks to sync
   with upstream. If one is added for syncing, disable pushing to it right away:

   ```sh
   git remote add upstream https://github.com/immich-app/immich.git
   git remote set-url --push upstream no_push
   ```

6. Never file issues, discussions, or comments on `immich-app/immich`, and never run
   `gh repo fork`, `gh repo sync`, or similar commands against the upstream project.

## Hard rule: never disclose local deployment information

The fork owner runs this software on private infrastructure. Details about that
deployment (host names, IP addresses, ports, paths, volume layouts, container names,
credentials, versions in use, network topology, deploy scripts) must **never** appear in
any commit, commit message, pull request, issue, code comment, test fixture, or
documentation in this repository, even though the repository is a personal fork.

- Those details live only in `CLAUDE.local.md` at the repo root (excluded from git via
  `.git/info/exclude`) and in files outside this repository. Read them when working on
  deployment; never copy them into tracked files.
- Never commit `CLAUDE.local.md`, `.env` files, or anything else that describes the
  deployment. If it is unclear whether something counts, treat it as private.
- If a tracked file needs a placeholder, use generic values such as `nas.example`,
  `/path/to/library`, or `192.0.2.1`.

## Database schema: avoid migrations

Keeping the database schema identical to upstream is what makes merging upstream
releases into this fork cheap. Treat schema changes as a last resort.

1. **Prefer designs that need no migration.** Before proposing a schema change, look for
   an alternative: existing columns (including JSON/metadata columns), existing tables,
   config, files on disk, derived data computed at runtime, or an external service.
2. **Never add a migration silently.** If a feature genuinely requires a schema change,
   stop and tell the user before writing it. Explain why no migration-free design works,
   what the change is, and its impact: it is applied one-way to the production database,
   it can conflict with upstream migrations on every future upstream merge, and it must
   be maintained on this fork forever. Only proceed after the user explicitly opts in.
3. **When a change is approved, add rather than modify.** New tables (with a
   fork-specific prefix or suffix in the name) are safer than altering upstream tables.
   Do not add, rename, or drop columns on upstream tables, change constraints, or change
   indexes on them unless the user has explicitly agreed to that specific change.
4. **Keep fork migrations separable.** Put them in clearly named files so they can be
   identified, reordered, or removed when merging upstream. Never edit or renumber an
   upstream migration.
5. Schema-affecting code lives under `server/src/schema/` (tables, migrations). Changes
   there should be rare, deliberate, and called out in the PR description.

## Workflow

- Development happens on feature branches with PRs against `main` **of this fork**.
- `main` of this fork tracks upstream `main` loosely and is occasionally updated with
  upstream changes. Keep fork-specific changes small and self-contained so rebasing onto
  upstream stays manageable.
- Upstream contribution guidelines in `CONTRIBUTING.md` and the PR template in `.github/`
  come from upstream. They do not imply that work here should be sent upstream.
