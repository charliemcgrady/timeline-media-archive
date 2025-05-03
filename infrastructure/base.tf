provider "aws" {
  profile = "${var.aws_profile}"
  region  = "${var.aws_region}"
}

module "vpc" {
  source             = "./modules/vpc"
  name               = "charliemcgrady"
  ip_address_for_ssh = "${var.ip_address_for_ssh}"
}
