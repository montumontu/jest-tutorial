// This code is written for giving sample describe statements, these test cases are not runnig
export function createUser(name, email, password) {
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required");
  }
  // Code to create new user
}

export function updateUser(userId, updatedInfo) {
  if (!userId) {
    throw new Error("User ID is required");
  }
  if (typeof updatedInfo !== "object" || Object.keys(updatedInfo).length === 0) {
    throw new Error("Updated information must be provided as an object");
  }
  // Code to update user information
}

export function deleteUser(userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }
  // Code to delete user
}

export function findUserRelation(userA, userB) {
  if (!userA || !userB) {
    throw new Error("Two valid users are required");
  }
  // Code to find user relation
  const userAConnections = getUserConnections(userA);
  const userBConnections = getUserConnections(userB);
  const mutualConnections = userAConnections.filter(id => userBConnections.includes(id));

  if (mutualConnections.length === 0) {
    return "No relation found";
  } else if (mutualConnections.length === 1) {
    return "1st-degree connection";
  } else if (mutualConnections.length === 2) {
    return "2nd-degree connection";
  } else {
    return "3rd-degree connection or beyond";
  }
}

export function getUserRole(user) {
  if (!user || !user.permissions || !Array.isArray(user.permissions)) {
    throw new Error("User object with valid permissions array is required");
  }

  if (user.permissions.includes("admin")) {
    return "admin";
  } else if (user.permissions.includes("manager")) {
    return "manager";
  } else if (user.permissions.includes("employee")) {
    return "employee";
  } else {
    return "guest";
  }
}

export function getUserManagerAndAdmin(user) {
  if (!user || !user.managerId || !user.organization) {
    throw new Error("User object with valid manager ID and organization is required");
  }
  const { organization, managerId } = user;
  let manager = null;
  let admin = null;
  // Find manager
  const organizationManagers = organization.managers || [];
  manager = organizationManagers.find(manager => manager.id === managerId);
  // Find admin
  const organizationAdmins = organization.admins || [];
  admin = organizationAdmins[0]; // Assuming there is only one admin in the organization
  return {
    manager,
    admin
  };
}
