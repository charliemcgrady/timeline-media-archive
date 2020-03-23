output "add_photosphere_workflow_artifacts_bucket" {
  value = "${aws_s3_bucket.photosphere_lambda_build_artifacts.id}"
}

output "lambda_add_photosphere_workflow_s3_key" {
  value = "${var.lambda_add_photosphere_workflow_s3_key}"
}
