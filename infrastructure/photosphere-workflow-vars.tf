# ---------------------------------------------------------------------------------------------------------------------
# REQUIRED MODULE PARAMETERS
# These variables must be passed in by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "lambda_add_photosphere_workflow_s3_key" {
  description = "The version for the active lambda. This will be used as the S3 key for artifact upload"
}

# ---------------------------------------------------------------------------------------------------------------------
# OPTIONAL MODULE PARAMETERS
# These variables must be passed in by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "add_photosphere_lambda_name" {
  description = "The name of the lambda function for processing photospheres"
  default     = "charliemcgrady-add-photosphere-workflow-prod"
}

variable "add_photosphere_workflow_artifacts_bucket" {
  description = "The S3 bucket used to store artifacts from Lambda"
  default     = "charliemcgrady-add-photosphere-workflow-lambdas"
}
