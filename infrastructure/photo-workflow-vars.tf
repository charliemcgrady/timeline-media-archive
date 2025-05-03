# ---------------------------------------------------------------------------------------------------------------------
# REQUIRED MODULE PARAMETERS
# These variables must be passed in by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "lambda_add_photo_workflow_s3_key" {
  description = "The version for the active lambda. This will be used as the S3 key for artifact upload"
}

# ---------------------------------------------------------------------------------------------------------------------
# OPTIONAL MODULE PARAMETERS
# These variables must be passed in by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "add_photo_lambda_name" {
  description = "The name of the lambda function for processing photos"
  default     = "charliemcgrady-add-photo-workflow-prod"
}

variable "add_photo_workflow_artifacts_bucket" {
  description = "The S3 bucket used to store artifacts from Lambda"
  default     = "charliemcgrady-add-photo-workflow-lambdas"
}

variable "gcp_project_name" {
  description = "The GCP project used to create resources under"
  default     = "charlie-mcgrady-photography"
}

variable "gcp_gcs_photos_bucket" {
  description = "The Google Cloud Storage location used to store photos for processing with GVision APIs"
  default     = "charliemcgrady-photos-prod"
}

variable "lambda_layer_nodejs_shim_zip" {
  description = "The path to any node_modules we want to shim into the lambda runtime (e.g. doing a linux target build of sharp)"
  default     = "./assets/nodejs_shim_v1.zip"
}

variable "lambda_layer_credentials_zip" {
  description = "The path to the zip of the GCP credentials. These are added as lambda layers so they are available to GCP clients."
  default     = "./assets/credentials_v1.zip"
}

variable "credentials_filename" {
  description = "The name of the credentials JSON file within lambda_layer_credentials_zip"
  default     = "charlie-mcgrady-photography-12b557e4225e.json"
}
