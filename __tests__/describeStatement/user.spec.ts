import {
  createUser,
  updateUser,
  deleteUser,
  findUserRelation,
  getUserManagerAndAdmin,
  getUserRole,
} from "../../src/describeStatement/user";

describe("Contains all the operation related to the user, the role of the user can be employee,  manager or Admin. And the user can have relationship with other users", () => {
  describe("createUser function creates a new user, if the user does not exist", () => {
    test("returns the new user object when given valid inputs", () => {
      const users = [
        { id: 1, name: "Alice", role: "employee" },
        { id: 2, name: "Bob", role: "employee" },
      ];
      const newUser = { name: "Charlie", role: "manager" };
      const result = createUser(users, newUser);
      expect(result).toEqual({ id: 3, name: "Charlie", role: "manager" });
    });

    test("throws an error when given invalid inputs", () => {
      const users = [
        { id: 1, name: "Alice", role: "employee" },
        { id: 2, name: "Bob", role: "employee" },
      ];
      const newUser = { name: "", role: "manager" };
      expect(() => createUser(users, newUser)).toThrow();
    });

    test("throws an error when the user already exists", () => {
      const users = [
        { id: 1, name: "Alice", role: "employee" },
        { id: 2, name: "Bob", role: "employee" },
      ];
      const newUser = { id: 2, name: "Charlie", role: "manager" };
      expect(() => createUser(users, newUser)).toThrow();
    });
  });
  describe("deleteUser functions soft deletes the user and mark the user as deleted in the database", () => {
    test("returns the updated users array when given a valid user id", () => {
      const users = [
        { id: 1, name: "Alice", role: "employee" },
        { id: 2, name: "Bob", role: "employee" },
      ];
      const userIdToDelete = 2;
      const result = deleteUser(userIdToDelete);
      expect(result).toEqual([{ id: 1, name: "Alice", role: "employee" }]);
    });

    test("throws an error when the user details does not exist in the records", () => {
      const users = [
        { id: 1, name: "Alice", role: "employee" },
        { id: 2, name: "Bob", role: "employee" },
      ];
      const userIdToDelete = 3;
      expect(() => deleteUser(userIdToDelete)).toThrow();
    });

    test("throws an error when given a non-numeric user id", () => {
      const users = [
        { id: "abc", name: "Alice", role: "employee" },
        { id: "xyz", name: "Bob", role: "employee" },
      ];
      const userIdToDelete = "2";
      expect(() => deleteUser(userIdToDelete)).toThrow();
    });
  });

  describe("updateUser function can update the name and role of the user, id can't be updated", () => {
    test("returns the updated user object when given valid inputs", () => {
      const users = [
        { id: 1, name: "Alice", role: "employee" },
        { id: 2, name: "Bob", role: "employee" },
      ];
      const userIdToUpdate = 2;
      const updatedUserData = { name: "Bobby", role: "manager" };
      const result = updateUser(userIdToUpdate, updatedUserData);
      expect(result).toEqual({
        id: 2,
        name: "Bobby",
        role: "manager",
      });
    });

    test("throws an error when given an invalid user id", () => {
      const users = [
        { id: 45, name: "Alice", role: "employee" },
        { id: 434, name: "Bob", role: "employee" },
      ];
      const userIdToUpdate = 3;
      const updatedUserData = { name: "Bobby", role: "manager" };
      expect(() => updateUser(userIdToUpdate, updatedUserData)).toThrow();
    });

    test("throws an error when given invalid role", () => {
      const users = [
        { id: 1, name: "Alice", role: "Astronaut" },
        { id: 2, name: "Bob", role: "" },
      ];
      const userIdToUpdate = 2;
      const updatedUserData = { name: "", role: "manager" };
      expect(() => updateUser(userIdToUpdate, updatedUserData)).toThrow();
    });

    test("throws an error when given a non-numeric user id", () => {
      const users = [
        { id: "avc", name: "Alice", role: "employee" },
        { id: "aws", name: "Bob", role: "employee" },
      ];
      const userIdToUpdate = "2";
      const updatedUserData = { name: "Bobby", role: "manager" };
      expect(() => updateUser(userIdToUpdate, updatedUserData)).toThrow();
    });
  });

  describe("findUserRelation function returns the all the users he is connected with", () => {
    test("returns 'No relation found' when there are no mutual connections", () => {
      const userA = { connections: [1, 2, 3] };
      const userB = { connections: [4, 5, 6] };
      const result = findUserRelation(userA, userB);
      expect(result).toBe("No relation found");
    });

    test("returns '1st-degree connection' when there is one mutual connection", () => {
      const userA = { connections: [1, 2, 3, 4] };
      const userB = { connections: [4, 5, 6] };
      const result = findUserRelation(userA, userB);
      expect(result).toBe("1st-degree connection");
    });

    test("returns '2nd-degree connection' when there are two mutual connections", () => {
      const userA = { connections: [1, 2, 3, 4] };
      const userB = { connections: [4, 5, 6, 7] };
      const result = findUserRelation(userA, userB);
      expect(result).toBe("2nd-degree connection");
    });

    test("returns '3rd-degree connection or beyond' when there are three or more mutual connections", () => {
      const userA = { connections: [1, 2, 3, 4] };
      const userB = { connections: [4, 5, 6, 7, 8, 9] };
      const result = findUserRelation(userA, userB);
      expect(result).toBe("3rd-degree connection or beyond");
    });

    test("throws an error when either user is missing", () => {
      const userA = { connections: [1, 2, 3] };
      expect(() => findUserRelation(userA, null)).toThrow();
    });

    test("throws an error when either user has a missing or invalid connections array", () => {
      const userA = { connections: [1, 2, 3] };
      const userB = { connections: null };
      expect(() => findUserRelation(userA, userB)).toThrow();
    });
  });
});
