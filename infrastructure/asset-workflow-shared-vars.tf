# ---------------------------------------------------------------------------------------------------------------------
# REQUIRED MODULE PARAMETERS
# These variables must be passed in by the operator.
# ---------------------------------------------------------------------------------------------------------------------

# ---------------------------------------------------------------------------------------------------------------------
# OPTIONAL MODULE PARAMETERS
# These variables must be passed in by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "s3_temp_media_bucket" {
  description = "The S3 bucket used to store media while they are processing"
  default     = "charliemcgrady-temp-media-prod"
}

variable "s3_media_bucket" {
  description = "The S3 bucket used to store media once they have been processed"
  default     = "charliemcgrady-media-prod"
}

variable "s3_media_archive_bucket" {
  description = "The S3 bucket used to perminantly store raw media uploaded in Glacier"
  default     = "charliemcgrady-media-prod-archive"
}
