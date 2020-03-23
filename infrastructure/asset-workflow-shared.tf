resource "aws_s3_bucket" "temp_media" {
  bucket = "${var.s3_temp_media_bucket}"
  acl    = "private"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket" "media" {
  bucket = "${var.s3_media_bucket}"

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
            "Resource": "arn:aws:s3:::${var.s3_media_bucket}/*"
        }
    ]
}
EOF
}

module "prod_media_distribution" {
  source                       = "./modules/cloudfront"
  s3_origin_bucket_domain_name = "${aws_s3_bucket.media.bucket_regional_domain_name}"
  s3_origin_bucket_id          = "${var.s3_media_bucket}"
}

resource "aws_s3_bucket" "media_archive" {
  bucket = "${var.s3_media_archive_bucket}"
  acl    = "private"
}
