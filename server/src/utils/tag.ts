import { Tag } from 'src/database';
import { TagRepository } from 'src/repositories/tag.repository';

/**
 * Fork-specific: XMP color labels (xmp:Label) are imported as hierarchical tags under this parent,
 * e.g. `Color Label/Green`, so they can be filtered in the UI without any schema or UI changes.
 */
export const COLOR_LABEL_TAG_PREFIX = 'Color Label';

export const toColorLabelTag = (label: string) => `${COLOR_LABEL_TAG_PREFIX}/${label.trim().replaceAll('/', '|')}`;

export const isColorLabelTag = (tag: string) => tag.startsWith(`${COLOR_LABEL_TAG_PREFIX}/`);

type UpsertRequest = { userId: string; tags: string[] };
export const upsertTags = async (repository: TagRepository, { userId, tags }: UpsertRequest) => {
  tags = [...new Set(tags)];

  const results: Tag[] = [];

  for (const tag of tags) {
    const parts = tag.split('/').filter(Boolean);
    let parent: Tag | undefined;

    for (const part of parts) {
      const value = parent ? `${parent.value}/${part}` : part;
      parent = await repository.upsertValue({ userId, value, parentId: parent?.id });
    }

    if (parent) {
      results.push(parent);
    }
  }

  return results;
};
