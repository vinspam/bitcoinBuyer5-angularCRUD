'use strict' 
const AWS = require('aws-sdk');
 
exports.handler = async (event, context) => { 
    const documentClient = new AWS.DynamoDB.DocumentClient(); // { region: "us-east-1" }

    let responseBody = "";
    let statusCode = 0;

    const { id   } =   event.pathParameters ; 
    const params = {
        TableName: "armchairusers_table3",
        Key: {
            id: id 
        }
    };

    try { 
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
        console.log(data);
    } catch (err) {
        responseBody  = `oops, Unable to delete user: ${err}`;
        statusCode = 403
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
}