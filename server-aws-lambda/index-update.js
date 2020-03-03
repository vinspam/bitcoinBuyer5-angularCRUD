'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region: "us-east-1"});


const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });


function response(statusCode, body) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body)
  };
}

exports.handler = async (event, context, callback) => {
  // let responseBody = "";
  // let statusCode = 0;

  // const id = event.pathParameters.id;  //   "1"
  const reqBody = JSON.parse(event.body);
  const {  id, name, uid, userName, username, password, firstname, lastname, email, phone, contactType, userGroup, dateOfBirth, isActive, photoPath } = reqBody; 
  // const { id, uid, username, firstname, lastname, email, phone, userGroup, dateOfBirth, isActive, photoPath } = JSON.stringify(event.body);

  const params = {
    TableName: "armchair_users2",
    Key: {
      id:  id
    }, 
    // ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: "SET  name = :n, uid = :u,  userName = :r, username = :s, password = :d, firstname = :f, lastname = :l, email = :e, phone = :p, contactType = :c, userGroup = :g, dateOfBirth = :b, isActive = :a, photoPath = :h",

    ExpressionAttributeValues: { 
      ":n":  name,  // ":u": { "S": uid },
      ":u":  uid,  // ":u": { "S": uid },
      ":r":  userName,  
      ":s":  username,  
      ":d":  password, 
      ":f":  firstname,
      ":l":  lastname,
      ":e":  email,
      ":p":  phone, // ":p": { "N": phone },
      ":c":  contactType,
      ":g":  userGroup,
      ":b":  dateOfBirth,
      ":a":  isActive,
      ":h":  photoPath  
    },
    ReturnValues: "UPDATED_NEW"
  };
  console.log('Update');

  return documentClient
    .update(params)
    .promise()
    .then((res) => {
      console.log(res);
      callback(null, response(200, res.Attributes));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
  // try {
  //   const data = await documentClient
  //     .update(params)
  //     .promise();
  //   responseBody = JSON.stringify(data);
  //   statusCode = 204;
  // } catch(err) {
  //   responseBody = `Unable to update user: ${err}`;
  //   statusCode = 403;
  // }

  // const response = {
  //   statusCode: statusCode,
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: responseBody
  // };

  // return response;
};
