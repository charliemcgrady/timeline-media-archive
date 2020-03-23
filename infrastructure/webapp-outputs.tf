output "s3_bucket_webapp_assets" {
  value = "${aws_s3_bucket.webapp.id}"
}

output "cloudfront_webapp_assets_url" {
  value = "${aws_cloudfront_distribution.prod_distribution.domain_name}"
}
