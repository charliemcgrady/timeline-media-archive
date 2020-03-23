resource "aws_s3_bucket" "webapp" {
  bucket = "${var.s3_bucket_webapp_assets_name}"
  acl    = "public-read"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${var.s3_bucket_webapp_assets_name}/*"
        }
    ]
}
EOF
}

resource "aws_s3_bucket" "static-assets" {
  bucket = "${var.s3_bucket_manually_managed_assets_name}"
  acl    = "public-read"
}

locals {
  s3_webapp_origin_id = "charliemcgrady-webapp"
  s3_manually_managed_assets_origin_id = "charliemcgrady-webapp-manually-managed-assets"
}

resource "aws_cloudfront_distribution" "prod_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.webapp.bucket_regional_domain_name}"
    origin_id   = "${local.s3_webapp_origin_id}"
  }

  enabled = true

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${local.s3_webapp_origin_id}"

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

resource "aws_cloudfront_distribution" "manually_managed_assets_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.webapp.bucket_regional_domain_name}"
    origin_id   = "${local.s3_manually_managed_assets_origin_id}"
  }

  enabled = true

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${local.s3_manually_managed_assets_origin_id}"

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

