import knexProvider from "../../shared/knexProvider";
import { tagsSchema, tagEdgesSchema } from "../../db/schema";
import { TagEdge, TagMap } from "../../rgb-commons/types/tags";
import { GetTagsResponse } from "../../rgb-commons/types/api";

export const get = async (): Promise<GetTagsResponse> => {
  const tagResponse = await knexProvider.get().raw(`
    SELECT * FROM ${tagsSchema.getTable()};
  `);
  const tagMap: TagMap = {};
  tagResponse.rows.forEach((row: any) => {
    tagMap[row.id] = { id: row.id, label: row.label, mediaIds: [] };
  });

  const tagEdgesResponse = await knexProvider.get().raw(`
    SELECT * FROM ${tagEdgesSchema.getTable()};
  `);
  const tagEdges: Array<TagEdge> = tagEdgesResponse.rows.map((row: any) => ({
    id: row.id,
    tagId: row.tag_id,
    mediaId: row.media_id
  }));

  tagEdges.forEach(edge => {
    tagMap[edge.tagId].mediaIds.push(edge.mediaId);
  });

  return { tagMap, tagEdges };
};
