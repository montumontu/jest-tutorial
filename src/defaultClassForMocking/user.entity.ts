// user.entity.ts

import AWS from "aws-sdk";

interface User {
  id: string,
  type: string
}
export default class DynamoDBManager {
  private dynamoDB: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDB = new AWS.DynamoDB.DocumentClient();
  }

  async insertUser(name: string, email: string, pincode: string): Promise<User> {
    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: "your_table_name",
      Item: {
        name,
        email,
        pincode
      },
    };

    try {
      const response = await this.dynamoDB.put(params).promise();
      console.log("User inserted successfully.");
      return response as unknown as User;
    } catch (error) {
      console.error("Error inserting user:", error);
      throw error;
    }
  }
}
