import Koa from "koa";

export const authenticated = (ctx: Koa.BaseContext) => {
  if (
    process.env.WEBAPP_PASSWORD !== undefined &&
    ctx.toJSON().request.header.password === process.env.WEBAPP_PASSWORD
  ) {
    return true;
  } else {
    return false;
  }
};
