# ---------------------------------------------------------------------------------------------------------------------
# REQUIRED MODULE PARAMETERS
# These variables must be passed in by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "db_password" {
  description = "The password used to log in to the DB"
}

variable "node_server_webapp_assets_url_js" {
  description = "The url where js web app assets can be found"
}

variable "node_server_webapp_assets_url_css" {
  description = "The url where css web app assets can be found"
}



# ---------------------------------------------------------------------------------------------------------------------
# OPTIONAL MODULE PARAMETERS
# These variables have defaults, but may be overridden by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "key_pair_name" {
  description = "The name of the Key Pair that can be used to SSH to each EC2 instance in the ECS cluster. Leave blank to not include a Key Pair."
  default     = "charliemcgrady-ssh-key-pair"
}

variable "node_server_image" {
  description = "The name of the Docker image to deploy for server"
  default     = "168870951978.dkr.ecr.us-west-2.amazonaws.com/node-server"
}

variable "node_server_image_version" {
  description = "The version (i.e. tag) of the Docker container to deploy for the server. Generally, use ../bin/release-node-server.sh to manage this value"
  default     = "F48B5C07-CDFA-4A03-9711-4F765A7EAB96"
}

variable "node_server_port" {
  description = "The port the node server listens on for HTTP requests (e.g. 4000)"
  default     = 4000
}

variable "ecs_cluster_name" {
  description = "The name used for the ECS cluster"
  default     = "charliemcgrady-production-cluster"
}
