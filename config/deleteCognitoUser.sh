source .awsenv
source .slsoutput

echo "before admin-delete-user"
aws cognito-idp admin-delete-user \
  --region $region \
  --user-pool-id $USER_POOL_ID \
  --username $congitoUsername
echo "after admin-delete-user"