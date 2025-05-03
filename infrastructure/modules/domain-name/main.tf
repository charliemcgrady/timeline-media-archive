resource "aws_acm_certificate" "ssl_certificate" {
  domain_name               = "${var.domain_name}"
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

data "aws_route53_zone" "domain_name_zone" {
  name         = "${var.domain_name}"
  private_zone = false
}

resource "aws_route53_record" "ssl_certificate_validation" {
  name    = "${aws_acm_certificate.ssl_certificate.domain_validation_options.0.resource_record_name}"
  type    = "${aws_acm_certificate.ssl_certificate.domain_validation_options.0.resource_record_type}"
  zone_id = "${data.aws_route53_zone.domain_name_zone.id}"
  records = ["${aws_acm_certificate.ssl_certificate.domain_validation_options.0.resource_record_value}"]
  ttl     = 60
}

resource "aws_route53_record" "www" {
  zone_id = "${data.aws_route53_zone.domain_name_zone.id}"
  name    = "${var.domain_name}"
  type    = "A"

  alias {
    name                   = "${var.elb_dns_name}"
    zone_id                = "${var.elb_zone_id}"
    evaluate_target_health = true
  }
}

resource "aws_acm_certificate_validation" "ssl_certificate" {
  certificate_arn         = "${aws_acm_certificate.ssl_certificate.arn}"
  validation_record_fqdns = ["${aws_route53_record.ssl_certificate_validation.fqdn}"]
}

