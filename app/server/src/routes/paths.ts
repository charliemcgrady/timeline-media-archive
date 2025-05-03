const base = "/api";
const mediaBase = "media";

export const PING_PATH = `${base}/ping`;
export const DEEP_PING_PATH = `${base}/deepPing`;

export const GET_MEDIA_PATH = `${base}/${mediaBase}`;
export const SIGN_MEDIA_PATH = `${base}/${mediaBase}/signedS3Url`;
export const PUT_MEDIA_PATH = `${base}/${mediaBase}/:id`;

export const POST_PHOTOS_PATH = `${base}/${mediaBase}/photos`;
export const POST_PHOTOSHERE_PATH = `${base}/${mediaBase}/photosphere`;
export const POST_GIGAPIXEL_PHOTO_PATH = `${base}/${mediaBase}/gigapixel-photo`;

export const POST_STORIES_PATH = `${base}/stories`;
export const PUT_STORY_PATH = `${base}/stories/:id`;
export const GET_STORY_PATH = `${base}/stories/:id`;
export const GET_STORIES_PATH = `${base}/stories`;

export const SYNC_TAGS_PATH = `${base}/tags`;
export const GET_TAGS_PATH = `${base}/tags`;
