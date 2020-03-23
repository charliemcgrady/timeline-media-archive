import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { createPhoto } from "./initiatePhotoWorkflow";
import { POST_PHOTOS_PATH } from "../../paths";

const router = new Router();

router.post(POST_PHOTOS_PATH, bodyParser(), async context => {
  const response = await createPhoto(context.request.body);
  context.body = response;
});

export default router;
