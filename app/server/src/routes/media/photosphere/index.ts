import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { createPhotosphere } from "./initiatePhotosphereWorkflow";
import { POST_PHOTOSHERE_PATH } from "../../paths";

const router = new Router();

router.post(POST_PHOTOSHERE_PATH, bodyParser(), async context => {
  const response = await createPhotosphere(context.request.body);
  context.body = response;
});

export default router;
