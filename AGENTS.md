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

## Workflow

- Development happens on feature branches with PRs against `main` **of this fork**.
- `main` of this fork tracks upstream `main` loosely and is occasionally updated with
  upstream changes. Keep fork-specific changes small and self-contained so rebasing onto
  upstream stays manageable.
- Upstream contribution guidelines in `CONTRIBUTING.md` and the PR template in `.github/`
  come from upstream. They do not imply that work here should be sent upstream.
