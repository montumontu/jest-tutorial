// user.controller.ts
import User from './user.entity';
interface UserD {
  id: string,
  type: string
}

export default class UserManager {
  public user: User;

  constructor() {
    this.user = new User();
  }

  async insertUserData(name: string, email: string, pincode: string): Promise<UserD> {
    if (!name || !email) {
      throw new Error("Name and Email should be a valid String");
    }
    const userDetails = await this.user.insertUser(name, email, pincode);
    return userDetails;
  }
}

