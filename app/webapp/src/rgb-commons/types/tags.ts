export type Tag = {
  id: string;
  label: string;
  ownerId?: string;
};
export type TagMap = {
  [tagId: string]: Tag & { mediaIds: Array<string> };
};

export type TagEdge = {
  id: string;
  mediaId: string;
  tagId: string;
};
