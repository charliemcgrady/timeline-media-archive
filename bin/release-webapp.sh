#!/bin/sh

# -------------------------------------------------------------
# This file releases a new version of the web application.
# -------------------------------------------------------------

# Determine the url for the S3 bucket to upload assets to
cd ./infrastructure
WEBAPP_ASSETS_S3=$(terraform output s3_bucket_webapp_assets)
CLOUDFRONT_URL=$(terraform output cloudfront_webapp_assets_url)
cd ../

# Build and upload the latest assets
cd ./app/webapp
npm run build
cd ./build
aws s3 cp ./ "s3://${WEBAPP_ASSETS_S3}/" --recursive --exclude "*" --include "*"
cd ../../../

# Determine the relative filepaths webpack outputed for the assets. Allows the
# server to load the assets via cloudfront
cd ./bin/util
ASSET_URL_JS=$(node print-webapp-js-root.js)
ASSET_URL_CSS=$(node print-webapp-css-root.js)
cd ../../

# Change the root of the webapp assets on the node-server
cd ./infrastructure
terraform apply -var="node_server_webapp_assets_url_js=http://${CLOUDFRONT_URL}/${ASSET_URL_JS}" -var="node_server_webapp_assets_url_css=http://${CLOUDFRONT_URL}/${ASSET_URL_CSS}"
export TF_VAR_node_server_webapp_assets_url_js=http://${CLOUDFRONT_URL}/${ASSET_URL_JS}
export TF_VAR_node_server_webapp_assets_url_css=http://${CLOUDFRONT_URL}/${ASSET_URL_CSS}

