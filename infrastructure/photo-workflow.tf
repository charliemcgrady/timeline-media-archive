// Photos are stored in GCP storage so we can leverage their AI APIs
resource "google_storage_bucket" "gcp_photos" {
  name    = "${var.gcp_gcs_photos_bucket}"
  project = "${var.gcp_project_name}"
}

resource "aws_s3_bucket" "lambda_build_artifacts" {
  bucket = "${var.add_photo_workflow_artifacts_bucket}"
  acl    = "private"
}

resource "aws_dynamodb_table" "workflow_status" {
  name         = "charliemcgrady_workflow_status"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "asset_id"

  attribute {
    name = "asset_id"
    type = "S"
  }
}

resource "aws_lambda_layer_version" "credentials" {
  filename   = "${var.lambda_layer_credentials_zip}"
  layer_name = "gcp_application_credentials"
}

resource "aws_lambda_layer_version" "nodejs_shim" {
  filename   = "${var.lambda_layer_nodejs_shim_zip}"
  layer_name = "lambda_targeted_nodejs_shim"
}

module "photo_workflow_lambda" {
  source = "./modules/lambda"

  name      = "${var.add_photo_lambda_name}"
  s3_bucket = "${var.add_photo_workflow_artifacts_bucket}"
  s3_key    = "${var.lambda_add_photo_workflow_s3_key}"
  accessible_s3_buckets = [
    "${aws_s3_bucket.lambda_build_artifacts.id}",
    "${aws_s3_bucket.temp_media.id}",
    "${aws_s3_bucket.media_archive.id}",
    "${aws_s3_bucket.media.id}"
  ]
  accessible_dynamo_arns = [aws_dynamodb_table.workflow_status.arn]

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
