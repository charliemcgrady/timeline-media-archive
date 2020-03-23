import combineRouters from "koa-combine-routers";
import pingRouter from "./ping";
import mediaRouter from "./media";
import photoRouter from "./media/photo";
import photosphereRouter from "./media/photosphere";
import webappRouter from "./webapp";
import storiesRouter from "./story";

const router = combineRouters(
  pingRouter,
  photoRouter,
  photosphereRouter,
  mediaRouter,
  storiesRouter,
  // The webapp route is a catch-all wildcard so make sure it stays last
  webappRouter
);

export default router;
