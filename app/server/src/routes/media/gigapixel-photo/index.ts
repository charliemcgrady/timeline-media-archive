import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { createGigapixelPhoto } from "./initiateGigapixelPhotoWorkflow";
import { POST_GIGAPIXEL_PHOTO_PATH } from "../../paths";
import { authenticated } from "../../../authenticated";

const router = new Router();

router.post(POST_GIGAPIXEL_PHOTO_PATH, bodyParser(), async context => {
  if (!authenticated(context)) {
    context.status = 401;
    return;
  }

  const response = await createGigapixelPhoto(context.request.body);
  context.body = response;
});

export default router;
