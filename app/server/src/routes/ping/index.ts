import Router from 'koa-router';
import { deepPing } from './pingDao';
import { DEEP_PING_PATH, PING_PATH } from "../paths";

const router = new Router();

router.get(PING_PATH, async (ctx) => {
  ctx.body = "Healthy";
});

router.get(DEEP_PING_PATH, async (ctx) => {
  ctx.body = await deepPing();
});

export default router;
