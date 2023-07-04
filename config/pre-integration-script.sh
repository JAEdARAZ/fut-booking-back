source .awsenv

### Create ephemeral Cognito user for testing ###
USER_POOL_ID=$(jq -r '.UserPoolId' slsoutput.json)
USER_POOL_CLIENT_ID=$(jq -r '.UserPoolClientId' slsoutput.json)

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

ID_TOKEN=$(aws cognito-idp admin-initiate-auth \
  --region $region \
  --user-pool-id $USER_POOL_ID \
  --client-id $USER_POOL_CLIENT_ID \
  --auth-flow ADMIN_USER_PASSWORD_AUTH \
  --auth-parameters USERNAME=$USERNAME,PASSWORD=$PASSWORD \
  --query AuthenticationResult.IdToken \
  --output text)

echo "" >> .awsenv
echo "cognitoUserIdToken=$ID_TOKEN" >> .awsenv
echo "congitoUsername=$USERNAME" >> .awsenv
echo "congitoUserSub=$COGNITO_USER_SUB" >> .awsenv

### Add Cognito user to DynamoDB Table as a player ###
PLAYER_PK=" \"PK\": {\"S\": \"P#$COGNITO_USER_SUB\"} "
PLAYER_SK=" \"SK\": {\"S\": \"P#$COGNITO_USER_SUB\"} "
PLAYER_ID=" \"id\": {\"S\": \"$COGNITO_USER_SUB\"} "
PLAYER_NAME=" \"name\": {\"S\": \"Jhon Doe\"} "
PLAYER_EMAIL=" \"email\": {\"S\": \"$sesFromEmail\"} "
PLAYER_GENDER=" \"gender\": {\"S\": \"M\"} "
PLAYER_BIRTHDATE=" \"birthdate\": {\"S\": \"10/10/2010\"} "

aws dynamodb put-item --table-name $futBookingTableName \
  --item "{ $PLAYER_PK, $PLAYER_SK, $PLAYER_ID, $PLAYER_NAME, $PLAYER_EMAIL, $PLAYER_GENDER, $PLAYER_BIRTHDATE }" \
  --region $region