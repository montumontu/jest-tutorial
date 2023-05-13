import AWS from 'aws-sdk';

interface User {
  id: string;
  type: string;
}

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function insertUser(name: string, email: string, pincode: string): Promise<User> {
  const params = {
    TableName: 'your_table_name',
    Item: { name, email, pincode },
  };

  try {
    const response = await dynamoDB.put(params).promise();
    console.log('User inserted successfully.');
    return response as unknown as User;
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
}
