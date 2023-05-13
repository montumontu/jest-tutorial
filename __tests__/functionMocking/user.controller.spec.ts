import { insertUserData } from "../../src/functionMocking/user.controller";
import { insertUser } from "../../src/functionMocking/user.entity";

jest.mock("../../src/functionMocking/user.entity", () => ({
    insertUser: jest.fn()
  }));
describe("When a new User comes to our platform, we insert the data into our database.", () => {
  describe("When the data passed is not valid, it will not push the data into the database, it throws error.", () => {
    beforeAll(() => {
      const user = { id: "U121", type: "premium" };
      (insertUser as jest.MockedFunction<typeof insertUser>).mockResolvedValue( user );
    })
    it("When the Username is not provided, it throws a validation error -", async () => {
      try {
        // Usage example:
        await insertUserData("", "ram@india.com", "396403");
        fail("Insert user data test failed")
      } catch (error: any) {
        expect(error.message).toEqual(
          "Name and Email should be a valid String"
        );
      }
    });
    it("When the email is not provided, it throws a validation error.", async () => {
      try {
        // Usage example:
        await insertUserData("Ram", "", "396403");
        fail("Insert user data test failed")
      } catch (error: any) {
        expect(error.message).toEqual(
          "Name and Email should be a valid String"
        );
      }
    });
  });

  describe("Inserting valid user Information into the database.", () => {
    beforeAll(()=>{
      (insertUser as jest.MockedFunction<typeof insertUser>).mockResolvedValue({ id: "U121", type: "premium" });
    })
    it("Successfully inserts User's data.", async () => {
      // Usage example:
      const response = { id: "U121", type: "premium" };
      const userDatails = await insertUserData(
        "Ram",
        "Ram@ayodhya.com",
        "396403"
      );
      expect(userDatails).toEqual(response);
    });
  });
  describe("Inserting a different set of valid user Information into the database.", () => {
    beforeAll(()=>{
      (insertUser as jest.MockedFunction<typeof insertUser>).mockResolvedValue({ id: "U131", type: "premium" });
    })
    it("Successfully inserts User's data.", async () => {
      const response = { id: "U131", type: "premium" };

      // Usage example:
      const userDatails = await insertUserData(
        "Ram",
        "ram@ayodhya.com",
        "396403"
      );
      expect(userDatails).toEqual(response);
    });
  });
});
