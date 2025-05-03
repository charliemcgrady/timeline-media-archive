import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { createPhotosphere } from "./initiatePhotosphereWorkflow";
import { POST_PHOTOSHERE_PATH } from "../../paths";
import { authenticated } from "../../../authenticated";

const router = new Router();

router.post(POST_PHOTOSHERE_PATH, bodyParser(), async context => {
  if (!authenticated(context)) {
    context.status = 401;
    return;
  }

  const response = await createPhotosphere(context.request.body);
  context.body = response;
});

export default router;
