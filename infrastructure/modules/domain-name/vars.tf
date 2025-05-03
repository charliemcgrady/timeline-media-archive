# ---------------------------------------------------------------------------------------------------------------------
# REQUIRED MODULE PARAMETERS
# These variables must be passed in by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "domain_name" {
  description = "The domain name which should be registered to the node-server load balancer"
}

variable "elb_dns_name" {
  description = "The DNS of the ELB to route traffic to"
}

variable "elb_zone_id" {
  description = "The zone id of the ELB to route traffic to"
}

# ---------------------------------------------------------------------------------------------------------------------
# OPTIONAL MODULE PARAMETERS
# These variables have defaults, but may be overridden by the operator.
# ---------------------------------------------------------------------------------------------------------------------
