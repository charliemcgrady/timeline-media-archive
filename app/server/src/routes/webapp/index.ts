import Router from "koa-router";
import { get as getTags } from "../tag/getTagsDao";
import { get as getMedia } from "../media/getMediaDao";
import { getAll as getStories } from "../story/storyDao";
import { StoryConfig } from "rgb-commons/types/story-config";
import { parseUrl } from "query-string";
import { buildImageUrl, Size } from "../../rgb-commons/util/mediaUrls";

const router = new Router();

// Redirect all routes that do not start with API to the web app
router.get("/*", async ctx => {
  console.log("Success");
  const media = await getMedia();

  const stories = await getStories();
  const storyMap: { [storyId: string]: StoryConfig } = {};
  stories.forEach(story => {
    storyMap[story.id] = story;
  });

  const tags = await getTags();

  const url = parseUrl(ctx.request.url);

  let titleTag = "Timeline Archives Image";
  let imageTag: string | undefined;

  const buildOpenGraphTags = (titleTag: string, imageTag: string) => {
    let tags = `
      <meta property="og:title" content="${titleTag}" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="${imageTag}" />
      <meta property="og:image" content="${imageTag}" />
    `;
    return tags;
  };

  if (url.url.includes("/stories/") && !url.url.includes("profile/stories/")) {
    const split = url.url.split("/");
    const storyId = split[split.length - 1];
    if (
      storyId &&
      storyMap[storyId] &&
      Object.keys(storyMap[storyId].media).length > 0
    ) {
      imageTag = buildImageUrl(
        Object.keys(storyMap[storyId].media)[0],
        Size.Medium
      );
      titleTag = storyMap[storyId].title;
    }
  } else if (
    url.query.activeMediaId &&
    typeof url.query.activeMediaId === "string" &&
    media.mediaMap[url.query.activeMediaId]
  ) {
    imageTag = buildImageUrl(url.query.activeMediaId, Size.Medium);
  }

  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="https://charliemcgrady-webapp-manually-managed-assets.s3-us-west-2.amazonaws.com/favicon-32x32.png" sizes="32x32">
        <meta charset="utf-8">
        ${imageTag ? buildOpenGraphTags(titleTag, imageTag) : ""}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <title>Timeline Archives</title>
        <link href="${process.env.ASSETS_URL_CSS}" rel="stylesheet">
      </head>
      <body>
        <script>
          window.media = ${JSON.stringify(media)};
          window.stories = ${JSON.stringify(storyMap)};
          window.tagMap = ${JSON.stringify(tags.tagMap)};
        </script>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root"></div>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUfIRQ6mjicdQHpyIkVgY-wxbagvViahM&libraries=places"></script>
        <script src='${process.env.ASSETS_URL_JS}'></script>
      </body>
    </html>
  `;
});

export default router;
