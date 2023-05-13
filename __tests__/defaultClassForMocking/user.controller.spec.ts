import UserManager from "../../src/defaultClassForMocking/user.controller";
import UserEntity from "../../src/defaultClassForMocking/user.entity";
let insertResponseMock = { id: "U121", type: "premium" };
jest.mock("../../src/defaultClassForMocking/user.entity", () => {
  return jest.fn().mockImplementation(function () {
    return {
      // fetchUser: jest.fn().mockReturnValue([{ sid: "RM123" }]),
      insertUser: jest.fn().mockReturnValue(insertResponseMock),
    };
  });
});
describe("When a new User comes to our platform, we insert the data into our database", () => {
  describe("When the data passed is not valid, it will not push the data into the database, it throws error", () => {
    it("When the Username is not provided, it throws a validation error", async () => {
      try {
        // Usage example:
        const userManager = new UserManager();
        await userManager.insertUserData("", "ram@india.com", "396403");
        fail("Insert user data test failed")
      } catch (error: any) {
        expect(error.message).toEqual(
          "Name and Email should be a valid String"
        );
      }
    });
    it("When the email is not provided, it throws a validation error", async () => {
      try {
        // Usage example:
        const userManager = new UserManager();
        await userManager.insertUserData("Ram", "", "396403");
        fail("Insert user data test failed")
      } catch (error: any) {
        expect(error.message).toEqual(
          "Name and Email should be a valid String"
        );
      }
    });
  });

  describe("Inserting valid user Information into the database", () => {
    beforeEach(()=>{
      const userManager = new UserManager();
      // (userManager.user.insertUser as jest.MockedFunction<typeof userManager.user.insertUser>).mockResolvedValue({ id: "U121", type: "premium" });
      insertResponseMock = { id: "U121", type: "premium" };
    })
    it("Successfully inserts User's data", async () => {
      insertResponseMock = { id: "U121", type: "premium" };
      // Usage example:
      const userManager = new UserManager();
      const userDatails = await userManager.insertUserData(
        "Ram",
        "Ram@ayodhya.com",
        "396403"
      );
      expect(userDatails).toEqual(insertResponseMock);
    });
  });
  describe("Inserting a different set of valid user Information into the database", () => {
    beforeEach(()=>{
      const userManager = new UserManager();
      insertResponseMock = { id: "U131", type: "premium" }
    })
    it("Successfully inserts User's data", async () => {
      // Usage example:
      const userManager = new UserManager();
      const userDatails = await userManager.insertUserData(
        "Ram",
        "ram@ayodhya.com",
        "396403"
      );
      expect(userDatails).toEqual(insertResponseMock);
    });
  });
});
