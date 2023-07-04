source .awsenv

### Delete ephemeral Cognito user for testing ###
USER_POOL_ID=$(jq -r '.UserPoolId' slsoutput.json)
USER_POOL_CLIENT_ID=$(jq -r '.UserPoolClientId' slsoutput.json)

aws cognito-idp admin-delete-user \
  --region $region \
  --user-pool-id $USER_POOL_ID \
  --username $congitoUsername

echo "Deleted user $congitoUsername"

### Delete Cognito user (player) from DynamoDB Table ###
PLAYER_PK=" \"PK\": {\"S\": \"P#$congitoUserSub\"} "
PLAYER_SK=" \"SK\": {\"S\": \"P#$congitoUserSub\"} "
aws dynamodb delete-item --table-name $futBookingTableName \
  --key "{ $PLAYER_PK, $PLAYER_SK }" \
  --region $region