resource "aws_s3_bucket" "photosphere_lambda_build_artifacts" {
  bucket = "${var.add_photosphere_workflow_artifacts_bucket}"
  acl    = "private"
}

module "photosphere_workflow_lambda" {
  source = "./modules/lambda"

  name      = "${var.add_photosphere_lambda_name}"
  s3_bucket = "${var.add_photosphere_workflow_artifacts_bucket}"
  s3_key    = "${var.lambda_add_photosphere_workflow_s3_key}"
  accessible_s3_buckets = [
    "${aws_s3_bucket.lambda_build_artifacts.id}",
    "${aws_s3_bucket.temp_media.id}",
    "${aws_s3_bucket.media.id}",
    "${aws_s3_bucket.media_archive.id}"
  ]
  accessible_dynamo_arns = [aws_dynamodb_table.workflow_status.arn]

  # include the shims from add-photo; both workflows resize images with sharp and call GCP
  layers = ["${aws_lambda_layer_version.credentials.arn}", "${aws_lambda_layer_version.nodejs_shim.arn}"]

  env_vars = "${map(
    "MEDIA_BUCKET", "${aws_s3_bucket.media.id}",
    "GCP_PHOTOS_BUCKET", "${google_storage_bucket.gcp_photos.name}",
    "TEMP_MEDIA_BUCKET", "${aws_s3_bucket.temp_media.id}",
    "WORKFLOW_DYNAMO_TABLE", "${aws_dynamodb_table.workflow_status.id}",
    "MEDIA_ARCHIVE_BUCKET", "${aws_s3_bucket.media_archive.id}",
    "NODE_SERVER_URL", "http://${module.node_server_alb.elb_dns_name}",
    "GOOGLE_APPLICATION_CREDENTIALS", "/opt/charlie-mcgrady-photography-12b557e4225e.json"
  )}"
}
