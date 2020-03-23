import Router from "koa-router";

const router = new Router();

// Redirect all routes that do not start with API to the web app
router.get("/*", async ctx => {
  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <title>Photos By Charlie</title>
        <link href="${process.env.ASSETS_URL_CSS}" rel="stylesheet">
      </head>
      <body>
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
