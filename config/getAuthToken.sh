source .awsenv
USERNAME=$(node config/credsGenerator.js GENERATE_EMAIL)
PASSWORD=$(node config/credsGenerator.js GENERATE_PASS)

COGNITO_USER_SUB=$(aws cognito-idp admin-create-user \
  --region $region \
  --username $USERNAME \
  --user-pool-id $USER_POOL_ID \
  --user-attributes Name=email,Value=$USERNAME Name=name,Value="Jhon Doe" Name=gender,Value=M Name=birthdate,Value="10/10/2010" \
  --message-action SUPPRESS \
  --output text \
  --query User.Username)

aws cognito-idp admin-set-user-password \
  --region $region \
  --user-pool-id $USER_POOL_ID \
  --username $USERNAME \
  --password $PASSWORD \
  --permanent

ID_TOKEN=$(aws cognito-idp initiate-auth \
  --region $region \
  --client-id $USER_POOL_CLIENT_ID \
  --auth-flow USER_PASSWORD_AUTH \
  --auth-parameters USERNAME=$USERNAME,PASSWORD=$PASSWORD \
  --query AuthenticationResult.IdToken \
  --output text)

echo "" >> .awsenv
echo "cognitoUserIdToken=$ID_TOKEN" >> .awsenv