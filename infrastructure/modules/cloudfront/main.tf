resource "aws_cloudfront_distribution" "s3_backed_distribution" {
  origin {
    domain_name = "${var.s3_origin_bucket_domain_name}"
    origin_id   = "${var.s3_origin_bucket_id}"
  }

  enabled = true

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.s3_origin_bucket_id}"

    forwarded_values {
      query_string = true
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
