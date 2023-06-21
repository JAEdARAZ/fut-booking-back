import GamesService from "../../common/services/GamesService.js";

const POST_CONFIRMATION_SIGNUP_TRIGGER_TYPE = "PostConfirmation_ConfirmSignUp";

export const handler = async (event) => {
  if (event.triggerSource === POST_CONFIRMATION_SIGNUP_TRIGGER_TYPE) {
    const { sub: playerId, email, name, gender, birthdate } = event.request.userAttributes;
    const gamesService = new GamesService();
    try {
      const createdPlayer = await gamesService.createPlayer(playerId, email, name, gender, birthdate);
      console.log(`The player ${createdPlayer.name} has been added to the table`);
    } catch (error) {
      console.log(error);
    }
  }

  return event;
}