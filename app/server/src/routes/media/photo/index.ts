import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { createPhoto } from "./initiatePhotoWorkflow";
import { POST_PHOTOS_PATH } from "../../paths";
import { authenticated } from "../../../authenticated";

const router = new Router();

router.post(POST_PHOTOS_PATH, bodyParser(), async context => {
  if (!authenticated(context)) {
    context.status = 401;
    return;
  }

  const response = await createPhoto(context.request.body);
  context.body = response;
});

export default router;
