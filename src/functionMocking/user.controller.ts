// user.controller.ts
import { insertUser } from "./user.entity";
interface UserD {
  id: string;
  type: string;
}

export async function insertUserData(
  name: string,
  email: string,
  pincode: string
): Promise<UserD> {
  if (!name || !email) {
    throw new Error("Name and Email should be a valid String");
  }
  const userDetails = await insertUser(name, email, pincode);
  return userDetails;
}
