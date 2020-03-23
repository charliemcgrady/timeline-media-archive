#!/bin/sh

# -------------------------------------------------------------
# This file releases a new version of the application.
# -------------------------------------------------------------

source ./bin/util/determine-release-version.sh

TERRAFORM_WORKFLOW_LAMBDA_S3_KEY=""
TERRAFORM_WORKFLOW_LAMBDA_ARTIFACTS_BUCKET=""

if [[ "$1" == "add-photo" ]]; then
  TERRAFORM_WORKFLOW_LAMBDA_S3_KEY="lambda_add_photo_workflow_s3_key"
  TERRAFORM_WORKFLOW_LAMBDA_ARTIFACTS_BUCKET="add_photo_workflow_artifacts_bucket"
elif [[ "$1" == "add-photosphere" ]]; then
  TERRAFORM_WORKFLOW_LAMBDA_S3_KEY="lambda_add_photosphere_workflow_s3_key"
  TERRAFORM_WORKFLOW_LAMBDA_ARTIFACTS_BUCKET="add_photosphere_workflow_artifacts_bucket"
else
  echo "usage: ./release-photo-workflow.sh workflow_type[add-photo/add-photosphere] version_number[major/minor/build]"
  exit -1
fi

# Increment the version of the lambda function
cd ./infrastructure
NEXT_VERSION="v$(determine_release_version $TERRAFORM_WORKFLOW_LAMBDA_S3_KEY $2)"
if [[ $NEXT_VERSION == "v-1" ]]; then
  echo "usage: ./release-photo-workflow.sh workflow_type[add-photo/add-photosphere] version_number[major/minor/build]"
  exit -1
fi

# Build the latest lambda assets
cd ../asset-workflow/$1
npm run build:prod
cd ../../infrastructure/

# Determine the info about s3 we need for updating the lambda function
S3_URL=$(terraform output $TERRAFORM_WORKFLOW_LAMBDA_ARTIFACTS_BUCKET)
echo "The lambda artifacts will be uploaded to s3://$S3_URL/$NEXT_VERSION.zip"

# Zip all the files to be uploaded to S3
ZIP_FILENAME="$NEXT_VERSION.zip"
cd ../asset-workflow/$1/dist
zip -r "../../../$ZIP_FILENAME" .
cd ../../../

# Upload the artifacts to S3
aws s3 cp "$ZIP_FILENAME" "s3://$S3_URL/$ZIP_FILENAME"

# Initiate terraform update with new version number
cd ./infrastructure
terraform apply -var "$TERRAFORM_WORKFLOW_LAMBDA_S3_KEY=$ZIP_FILENAME"
cd ../

# Set the version number as an environment variable so it sticks for the next release
APPLY_EXIT_CODE=$?
if test $APPLY_EXIT_CODE -eq 0
then
  $(export TF_VAR_$TERRAFORM_WORKFLOW_LAMBDA_S3_KEY="$ZIP_FILENAME")
fi

# Clean up zip artifacts from the release
rm $ZIP_FILENAME
