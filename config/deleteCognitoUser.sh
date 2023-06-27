source .awsenv

USER_POOL_ID=$(jq -r '.UserPoolId' slsoutput.json)
USER_POOL_CLIENT_ID=$(jq -r '.UserPoolClientId' slsoutput.json)

aws cognito-idp admin-delete-user \
  --region $region \
  --user-pool-id $USER_POOL_ID \
  --username $congitoUsername

echo "Deleted user $congitoUsername"
