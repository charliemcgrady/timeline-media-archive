## Releasing a new version

- `./bin/release-webapp.sh` or `./bin/release-node-server.sh`
- After releasing, make sure to update dynamic_override.tf.json with the latest values.
- If you are just updating Terraform and not source code, you can run `terraform apply`.
