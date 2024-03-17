import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  TransactWriteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { S3 } from "@aws-sdk/client-s3";

const client = new DynamoDBClient({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_IAM_USER_ACCESSKEY ?? "",
    secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY ?? "",
  },
});
const docClient = DynamoDBDocumentClient.from(client);

const s3Client = new S3({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_IAM_USER_ACCESSKEY ?? "",
    secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY ?? "",
  },
});

export const getAllItemsFromDynamoDB = async () => {
  const command = new ScanCommand({
    TableName: "turing-bias-count",
    ProjectionExpression: "#n, #c",
    ExpressionAttributeNames: {
      "#c": "count",
      "#n": "name",
    },
  });

  const response = await docClient.send(command);
  return response.Items;
};

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

export const getImagesFromDynamoDBV2 = async (
  experiment: string,
  filter: string | undefined = undefined
) => {
  let command;
  if (filter) {
    command = new QueryCommand({
      TableName: "turing-bias-tester",
      IndexName: "value-index",
      KeyConditionExpression:
        "#experiment = :experiment and begins_with(#value, :value)",
      ExpressionAttributeValues: {
        ":experiment": experiment,
        ":value": filter,
      },
      ExpressionAttributeNames: {
        "#experiment": "experiment",
        "#key": "key",
        "#value": "value",
      },
      ProjectionExpression: "#key, prompt, revisedPrompt, #value",
      ScanIndexForward: false,
    });
  } else {
    command = new QueryCommand({
      TableName: "turing-bias-tester",
      KeyConditionExpression:
        "#experiment = :experiment and begins_with(#key, :key)",
      ExpressionAttributeValues: {
        ":experiment": experiment,
        ":key": "i_",
      },
      ExpressionAttributeNames: {
        "#experiment": "experiment",
        "#key": "key",
        "#value": "value",
      },
      ProjectionExpression: "#key, prompt, revisedPrompt, #value",
      ScanIndexForward: false,
    });
  }
  const response = await docClient.send(command);
  return response.Items;
};

export const updateRessourcesOnDynamoDB = async (
  hash: string,
  ressourceName: string
) => {
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

export const getImageFromOldDynamoDB = async (hash: string) => {
  const command = new UpdateCommand({
    TableName: "turing-bias-count",
    Key: {
      name: hash,
    },
    UpdateExpression: "REMOVE #a[0]",
    ExpressionAttributeNames: {
      "#a": "allObjects",
    },
    ReturnValues: "UPDATED_OLD",
  });
  const response = await docClient.send(command);
  return response;
};

export const createImageInDynamoDB = async (
  hash: string,
  ressourceName: string,
  legacyDate?: string,
  prompt?: string,
  revisedPrompt?: string
) => {
  const command = new PutCommand({
    TableName: "turing-bias-tester",
    Item: {
      experiment: hash,
      key: "i_" + ressourceName,
      value: "0_" + ressourceName,
      legacyDate: legacyDate,
      prompt: prompt,
      revisedPrompt: revisedPrompt,
    },
    ReturnValues: "NONE",
  });
  await docClient.send(command);
};

export const getUnclassifiedImageFromDynamoDB = async (experiment: String) => {
  const command = new QueryCommand({
    TableName: "turing-bias-tester",
    IndexName: "value-index",
    KeyConditionExpression:
      "#experiment = :experiment and begins_with(#value, :value)",
    ExpressionAttributeValues: {
      ":experiment": experiment,
      ":value": "0",
    },
    ExpressionAttributeNames: {
      "#experiment": "experiment",
      "#key": "key",
      "#value": "value",
    },
    ProjectionExpression: "#key, prompt, revisedPrompt, #value",
    ScanIndexForward: false,
  });
  const response = await docClient.send(command);
  return response.Items;
};

export const classifyImageInDynamoDB = async (
  experiment: string,
  key: string,
  value: string
) => {
  const transaction = new TransactWriteCommand({
    ReturnConsumedCapacity: "TOTAL",
    TransactItems: [
      {
        Update: {
          TableName: "turing-bias-tester",
          Key: {
            experiment: experiment,
            key: "i_" + key,
          },
          UpdateExpression: "SET #value = :val",
          ExpressionAttributeNames: {
            "#value": "value",
          },
          ExpressionAttributeValues: {
            ":val": value + "_" + key,
          },
        },
      },
      {
        Update: {
          TableName: "turing-bias-tester",
          Key: {
            experiment: experiment,
            key: "count_" + value,
          },
          UpdateExpression: "SET #c = if_not_exists(#c, :initial) + :amount",
          ExpressionAttributeNames: {
            "#c": "count",
          },
          ExpressionAttributeValues: {
            ":amount": 1,
            ":initial": 0,
          },
        },
      },
    ],
  });
  await docClient.send(transaction, {});
};

export const reclassifyImageInDynamoDB = async (
  experiment: string,
  key: string,
  value: string
) => {
  const command = new UpdateCommand({
    TableName: "turing-bias-tester",
    Key: {
      experiment: experiment,
      key: "i_" + key,
    },
    UpdateExpression: "SET #value = :val",
    ExpressionAttributeNames: {
      "#value": "value",
    },
    ExpressionAttributeValues: {
      ":val": value + "_" + key,
    },
  });
  const response = await docClient.send(command);
  return response;
};
