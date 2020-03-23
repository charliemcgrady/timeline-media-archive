# ---------------------------------------------------------------------------------------------------------------------
# OPTIONAL MODULE PARAMETERS
# These variables must be passed in by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "s3_bucket_webapp_assets_name" {
  description = "The name of the S3 bucket where webapp assets are stored"
  default     = "charliemcgrady-webapp-assets"
}

variable "s3_bucket_manually_managed_assets_name" {
  description = "The name of the S3 bucket where managed assets like logo images are placed"
  default     = "charliemcgrady-webapp-manually-managed-assets"
}
