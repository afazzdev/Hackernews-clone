import jwt from "jsonwebtoken";
import { IContext } from ".";

const APP_SECRET = "THIS_IS_A_VERY_HARD_TO_DECRYPT_SECRET";

function getUserId(context: IContext) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    //   @ts-ignore
    const { userId } = jwt.verify(token, APP_SECRET);

    return userId;
  }

  throw new Error("Not authenticated");
}

export { APP_SECRET, getUserId };
