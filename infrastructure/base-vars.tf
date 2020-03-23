# ---------------------------------------------------------------------------------------------------------------------
# REQUIRED MODULE PARAMETERS
# These variables must be passed in by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "aws_access_key_id" {
  description = "The AWS access key, probably set as an environment variable"
}

variable "aws_secret_access_key" {
  description = "The aws secret, probably set as an environment variable"
}

# ---------------------------------------------------------------------------------------------------------------------
# OPTIONAL MODULE PARAMETERS
# These variables have defaults, but may be overridden by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "ip_address_for_ssh" {
  description = "Your IP address - used to enable SSH access from your computer into public hosts"
  default     = "10.0.32.0/20"
}

variable "aws_profile" {
  description = "The profile associated with the aws account you want to create resources for."
  default     = "personal-website-mcgradyc"
}

variable "aws_region" {
  description = "The region you want to create resources for."
  default     = "us-west-2"
}


