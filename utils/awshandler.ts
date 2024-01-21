import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_IAM_USER_ACCESSKEY ?? "",
    secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY ?? "",
  },
});
const docClient = DynamoDBDocumentClient.from(client);

export const getCountFromDynamoDB = async (hash: string) => {
  const command = new GetCommand({
    TableName: "turing-bias-count",
    Key: {
      name: hash,
    },
    ProjectionExpression: "#c",
    ExpressionAttributeNames: {
      "#c": "count",
    },
  });

  const response = await docClient.send(command);
  return response.Item;
};

export const updateCountOnDynamoDB = async (hash: string, keys: string[]) => {
  const singleUpdateExpression = keys.map(
    (key, index) =>
      `#c.#${index} = if_not_exists(#c.#${index}, :initial) + :amount`
  );
  const updateExpression = `set ${singleUpdateExpression.join(", ")}`;
  const expressionAttributeNames = {
    "#c": "count",
  };
  keys.forEach((key, index) => {
    // @ts-ignore
    expressionAttributeNames[`#${index}`] = key;
  });

  const command = new UpdateCommand({
    TableName: "turing-bias-count",
    Key: {
      name: hash,
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: {
      ":amount": 1,
      ":initial": 0,
    },
    ReturnValues: "ALL_NEW",
  });
  const response = await docClient.send(command);
  return response.Attributes;
};

export const getImagesFromDynamoDB = async (hash: string) => {
  const command = new GetCommand({
    TableName: "turing-bias-count",
    Key: {
      name: hash,
    },
    ProjectionExpression: "#a",
    ExpressionAttributeNames: {
      "#a": "allObjects",
    },
  });

  const response = await docClient.send(command);
  // @ts-ignore
  return response.Item.allObjects;
};

export const updateRessourcesOnDynamoDB = async (
  hash: string,
  ressourceName: string
) => {
  console.log(hash, ressourceName);
  const command = new UpdateCommand({
    TableName: "turing-bias-count",
    Key: {
      name: hash,
    },
    UpdateExpression: "SET #a = list_append(#a, :val)",
    ExpressionAttributeNames: {
      "#a": "allObjects",
    },
    ExpressionAttributeValues: {
      ":val": [ressourceName],
    },
    ReturnValues: "NONE",
  });
  await docClient.send(command);
};
