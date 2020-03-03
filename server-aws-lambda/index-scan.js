'use strict'
// Circumvents DynamoDB JSON service object...using DocumentClient constructor
// Uses Primary Key String id, and String name (sort key)

const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1" });


exports.handler = async (event, context) => {
    // const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-8" });
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" }); //

    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "armchairusers_table3"
    }

    try {
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
        console.log(data);
    } catch (err) {
        responseBody = `Unable to get users: ${err}`;
        statusCode = 403;
        console.log(err);
    }  
     const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
       "Access-Control-Allow-Origin": "*"
    },
    body: responseBody
  };

  return response;
}; 