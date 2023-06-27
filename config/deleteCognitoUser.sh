source .awsenv
source .slsoutput

aws cognito-idp admin-delete-user \
  --region $region \
  --user-pool-id $USER_POOL_ID \
  --username $congitoUsername