# ---------------------------------------------------------------------------------------------------------------------
# REQUIRED MODULE PARAMETERS
# These variables must be passed in by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "name" {
  description = "The name used to identify the Lambda function"
}

variable "s3_bucket" {
  description = "The S3 bucket used to hand-off artifacts between the lambda build and deploy process"
}

variable "s3_key" {
  description = "The S3 key for the zip file containing the Lambda contents"
}

# ---------------------------------------------------------------------------------------------------------------------
# OPTIONAL MODULE PARAMETERS
# These variables have defaults, but may be overridden by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "runtime" {
  description = "The Lambda language runtime used to execute functions"
  default     = "nodejs10.x"
}

variable "main_function_name" {
  description = "The filename and exported property within the zip file contain the execution starting point"
  default     = "main.handler"
}

variable "accessible_s3_buckets" {
  description = "The S3 buckets which this Lambda function is able to access"
  type        = "list"
  default     = []
}

variable "accessible_dynamo_arns" {
  description = "The arn of the Dynamo table that the lambda function needs to access"
  type        = "list"
  default     = []
}

variable "layers" {
  description = "The layers which should be added to the lambda function"
  type        = "list"
  default     = []
}

variable "env_vars" {
  description = "The environment variables to make available to the lambda function. Any time you update this variable, make sure to update var.num_env_vars too!"
  type        = "map"
  default     = {}
}
