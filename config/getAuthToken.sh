USERNAME=$(node config/credsGenerator.js GENERATE_EMAIL)
PASSWORD=$(node config/credsGenerator.js GENERATE_PASS)

COGNITO_USER_SUB=$(aws cognito-idp admin-create-user \
  --region us-east-1 \
  --username $USERNAME \
  --user-pool-id $USER_POOL_ID \
  --user-attributes Name=email,Value=$USERNAME Name=name,Value="Jhon Doe" Name=gender,Value=M Name=birthdate,Value="10/10/2010" \
  --message-action SUPPRESS \
  --output text \
  --query User.Username)

echo "user sub"
echo $COGNITO_USER_SUB

aws cognito-idp admin-set-user-password \
  --region us-east-1 \
  --user-pool-id $USER_POOL_ID \
  --username $USERNAME \
  --password $PASSWORD \
  --permanent

ID_TOKEN=$(aws cognito-idp initiate-auth \
  --region us-east-1 \
  --client-id $USER_POOL_CLIENT_ID \
  --auth-flow USER_PASSWORD_AUTH \
  --auth-parameters USERNAME=$USERNAME,PASSWORD=$PASSWORD \
  --query AuthenticationResult.IdToken \
  --output text)

echo "id token"
echo $ID_TOKEN

echo "" >> .awsenv
echo "cognitoUserIdToken=$ID_TOKEN" >> .awsenv