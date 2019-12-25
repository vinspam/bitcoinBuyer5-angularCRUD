// exports.handler = async (event) => {
//     // TODO implement
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
// };

// DONT forget to make environment var: USERS_TABLE -> users
'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const uuid = require('uuid/v4');

const usersTable = process.env.USERS_TABLE;

//  response
function response(statusCode, body) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body)
  };
}
function sortByName(a, b) {
  if (a.name > b.name) {
    return -1;
  } else return 1;
}
 
module.exports.createUser = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  // if (
  //   !reqBody.email ||
  //   reqBody.email.trim() === '' ||
  //   !reqBody.name ||
  //   reqBody.name.trim() === ''
  // ) {
  //   return callback(
  //     null,
  //     response(400, {
  //       error: 'email and name required fields'
  //     })
  //   );
  // }

  const user = {
    id:   uuid(), //id,
    // createdAt: new Date().toISOString(),
    name: reqBody.name, 
    email: reqBody.email,
    phone: reqBody.phone,
    contactType: reqBody.contactType,
    userGroup: reqBody.userGroup,
    dateOfBirth: reqBody.dateOfBirth, 
    isActive: reqBody.isActive,
    photoPath: reqBody.photoPath
  };

  return db
    .put({
      TableName: usersTable,
      Item: user
    })
    .promise()
    .then(() => {
      callback(null, response(201, user));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};
// Get all users
module.exports.getAllUsers = (event, context, callback) => {
  return db
    .scan({
      TableName: usersTable
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items.sort(sortByName)));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Get # of users
module.exports.getUsers = (event, context, callback) => {
  const numberOfUsers = event.pathParameters.number;
  const params = {
    TableName: usersTable,
    Limit: numberOfUsers
  };
  return db
    .scan(params)
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items.sort(sortByName)));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Get one user
module.exports.getUser = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id
    },
    TableName: usersTable
  };

  return db
    .get(params)
    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else callback(null, response(404, { error: 'User not found' }));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Update user
module.exports.updateUser = (event, context, callback) => {
  const id = event.pathParameters.id;
  const reqBody = JSON.parse(event.body);
  const { name, email, phone, contactType, userGroup, dateOfBirth, isActive, photoPath } = reqBody;

  const params = {
    Key: {
      id: id
    },
    TableName: usersTable,
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: 'SET name = :name, email = :email, phone = :phone, contactType = :contactType, userGroup = :userGroup, dateOfBirth = :dateOfBirth, isActive = :isActive',
    ExpressionAttributeValues: {  
    ':name':  name,
    ':email':  email,
    ':phone':  phone,
    ':contactType':  contactType,
    ':userGroup':  userGroup, 
    ':isActive':  isActive,
    ':photoPath': photoPath
    },
    ReturnValues: 'ALL_NEW'
  };
  console.log('user updated');

  return db
    .update(params)
    .promise()
    .then((res) => {
      console.log(res);
      callback(null, response(200, res.Attributes));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};
// Delete a user
module.exports.deleteUser = (event, context, callback) => {
  const id = event.pathParameters.id;
  const params = {
    Key: {
      id: id
    },
    TableName: usersTable
  };
  return db
    .delete(params)
    .promise()
    .then(() =>
      callback(null, response(200, { body: 'User deleted successfully' }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};
 