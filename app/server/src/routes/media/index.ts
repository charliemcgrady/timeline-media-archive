import Router from "koa-router";
import { GET_MEDIA_PATH, SIGN_MEDIA_PATH, PUT_MEDIA_PATH } from "../paths";
import { get } from "./getMediaDao";
import { saveMedia } from "./saveMediaDao";
import { saveLocations } from "./saveLocationsDao";
import { signMedia } from "./signMediaHandler";
import bodyParser from "koa-bodyparser";
import { SaveMediaRequest } from "rgb-commons/types/api";

const router = new Router();

router.get(GET_MEDIA_PATH, async context => {
  context.body = await get();
});

router.post(SIGN_MEDIA_PATH, bodyParser(), async context => {
  context.body = signMedia(context.request.body);
});

router.put(PUT_MEDIA_PATH, bodyParser(), async context => {
  try {
    const request = context.request.body as SaveMediaRequest;

    await saveMedia(request.media);
    if (request.locations) {
      await saveLocations(request.locations);
    }

    context.response.status = 200;
  } catch (e) {
    console.log("Error saving media", e);
    context.response.status = 500;
  }
});

export default router;
