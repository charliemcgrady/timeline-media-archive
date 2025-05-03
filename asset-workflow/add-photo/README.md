### Add Photo Workflow
This is the source code for a lambda function which processes photos.

### Sharp
Images are processed with the Sharp node library. This library uses platform-targeted C++ files under the hood. The linux-targeted source files are added as a lambda layer, following the process outlined at https://github.com/lovell/sharp/issues/1702. That link is a good overview of how to shim node_modules into lambda functions.

### Authentication
1. Create a Service Account via the GCP Console
2. Add the credentials as a Lambda Layer via the zip file in `../../infrustrature/assets/credentials`. Then, when the lambda function is deployed, the credentials will live at `/opt`
3. Set the `GOOGLE_APPLICATION_CREDENTIALS` env variable so the GCP clients know how to authenticate

### Testing locally
1. Navigate to the base directory
2. `npm run build:dev` - wait for webpack to compile the test assets
3. modify `./src/main.test.js`
4. `npm run test`
5. Make sure all of the env variables in `shh.rtf` are set