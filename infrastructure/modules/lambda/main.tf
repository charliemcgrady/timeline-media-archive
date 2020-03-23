resource "aws_lambda_function" "lambda_function" {
  function_name = "${var.name}"
  s3_bucket     = "${var.s3_bucket}"
  s3_key        = "${var.s3_key}"
  handler       = "${var.main_function_name}"
  runtime       = "${var.runtime}"
  layers        = "${var.layers}"
  timeout       = 120
  memory_size   = 2000

  environment {
    variables = "${var.env_vars}"
  }

  role = "${aws_iam_role.lambda_exec.arn}"
}

resource "aws_iam_role" "lambda_exec" {
  name               = "${var.name}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "allow_s3_dynamo_cloudwatch" {
  name   = "${var.name}"
  role   = "${aws_iam_role.lambda_exec.id}"
  policy = data.aws_iam_policy_document.allow_s3_dynamo_cloudwatch.json
}

data "aws_iam_policy_document" "allow_s3_dynamo_cloudwatch" {
  statement {
    effect = "Allow"
    actions = [
      "s3:DeleteObject",
      "s3:GetObject",
      "s3:PutObject"
    ]

    resources = concat(
      "${formatlist("arn:aws:s3:::%s", var.accessible_s3_buckets)}",
      "${formatlist("arn:aws:s3:::%s/*", var.accessible_s3_buckets)}"
    )
  }

  statement {
    effect = "Allow"
    actions = [
      "dynamodb:Query",
      "dynamodb:BatchGetItem",
      "dynamodb:BatchWriteItem",
      "dynamodb:DeleteItem",
      "dynamodb:GetItem",
      "dynamodb:GetRecords",
      "dynamodb:PutItem",
      "dynamodb:Scan",
      "dynamodb:UpdateItem"
    ]

    resources = var.accessible_dynamo_arns
  }

  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]

    resources = ["*"]
  }
}
