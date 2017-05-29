Document Management System API contains several API end points that allows users to create, edit, retrieve and delete documents. It also offers a way to ensure that only authorized users can perform certain operations.

Development
-----------
The application was developed with [NodeJs](http://nodejs.org) and [Express](http://expressjs.com) is used for routing. The [Postgres](http://postgresql.com) database was used with [sequelize](http://sequelizejs.com) as the ORM

Installation
------------
1.  Ensure you have NodeJs and postgres installed
2.  Clone the repository `https://github.com/andela-iakande/document-management-system`
3.  Change your directory `cd document-management-system`
4.  Install all dependencies `npm install`
5.  Run tests  `npm test`
6.  Run integration test `npm run e2e`
7.  Start the app `npm start` and use [postman](https://www.getpostman.com/) to consume the API


## API ENDPOINTS
**Users**

Request type | Endpoint | Action 
------------ | -------- | ------
POST | [/users](#create-users) | Create a new user
GET | [/users](#get-users) | Get all users
GET | [/users/:id](#get-a-user) | Get details of a specific user
PUT | [/users/:id](#update-user) | Edit user details
DELETE | [/users/:id](#delete-user) | Remove a user from storage
POST | [/users/login](#login) | To log a user in
GET| [/users/:id/documents](#get-usersdoc) | To get document of a specific user
GET| [/users/search/:email](#get-userbyemail) | To get a user by email
GET | [/search/users](#search-user) | Search for a user

**roles**

Request type | Endpoint | Action 
------------ | -------- | ------
POST | [/roles](#create-role) | Create a new role
GET | [/roles](#get-roles) | Get all created roles
PUT | [/role/:id](#update-role) | To edit a role
PATCH | [/role/:id](#update-role) | To edit a role
GET | [/role/:id](#get-a-role) | To get a role

**Documents**

Request type | Endpoint | Action 
------------ | -------- | ------ 
POST | [/documents](#create-document) | Create a new document
GET | [/documents](#get-documents) | Retrieve all documents 
GET | [/documents/:id](#get-a-document) | Retrieve a specific document
PUT | [/documents/:id](#update-document) | Update a specific document
DELETE | [/documents/:id](#delete-document) | Remove a specific document from storage
GET | [/documents?offset=1&limit=10](#get-documents) | Retrieve maximum of first 10 documents
GET | [/search/documents/](#search-document) | Search for a document

**Search**

Request type | Endpoint | Action 
------------ | -------- | ------

Users
-----

## Create Users
To create a new user, make a **POST** request to `/users`
#### Request
```
{
    "userName": "paul.smith",
    "firstName": "Paul",
    "lastName": "Smith",
    "email": "paul.smith@gmail.com",
    "password":"password"
}
```

#### Response
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjE1LCJFbWFpbCI6ImFkYUBnbWFpbC5jb20iLCJSb2xlSWQiOjEsImlhdCI6MTQ5MTIyMTk4NiwiZXhwIjoxNDkxMjU3OTg2fQ.MtqGTyA5q7zrs7pgbKwtsVUqiTyWYcH6KINgnQK8KJA",
  "expiresIn": "1day",
  "user": {
    "id": 3,
    "userName": "paul.smith",
    "firstname": "Paul",
    "lastname": "Smith",
    "email": "paul.smith@gmail.com",
    "password": "$2a$10$.jAF5xr2IGeZDyUOsivN2etYd8HaUPwvVc3bjPlI0quQEZy5yexN2",
    "roleId": 2,
    "updatedAt": "2017-04-03T12:19:45.740Z",
    "createdAt": "2017-04-03T12:19:45.740Z"
  }
}
```

## Get Users
Fetches all users' details,
#### Request
  - Endpoint: **GET**: `/users`
  - Requires `Authorization` header to be set
#### Response
```
  "result": [
  {
    "id": 1,
    "userName": "imizezek",
    "firstName": "Imisioluwa",
    "lastName": "Akande",
    "email": "imisioluwa.akande@andela.com",
    "roleId": 1,
    "createdAt": "2017-04-21T05:30:39.815Z",
    "updatedAt": "2017-04-21T05:43:44.880Z",
    "role": {
      "id": 1,
      "title": "admin",
      "createdAt": "2017-04-21T05:28:57.307Z",
      "updatedAt": "2017-04-21T05:28:57.307Z"
    }
  },
  {
    "id": 2,
    "userName": "tomiP",
    "firstName": "Tomi",
    "lastName": "Paul",
    "email": "tomipaul@gmail.com",
    "roleId": 1,
    "createdAt": "2017-04-21T05:28:57.732Z",
    "updatedAt": "2017-04-21T05:28:57.732Z",
    "role": {
      "id": 1,
      "title": "admin",
      "createdAt": "2017-04-21T05:28:57.307Z",
      "updatedAt": "2017-04-21T05:28:57.307Z"
    }
  },
  {
    "id": 5,
    "userName": "pfunky",
    "firstName": "Yinka",
    "lastName": "Alabi",
    "email": "pfunky@yahoo.com",
    "roleId": 2,
    "createdAt": "2017-04-21T06:45:03.572Z",
    "updatedAt": "2017-04-21T06:45:03.572Z",
    "role": {
      "id": 2,
      "title": "regular",
      "createdAt": "2017-04-28 14:55:19.689+01",
      "updatedAt": "2017-04-28 14:55:19.689+01"
    }
  },
  {
    "id": 2,
    "userName": "Herb",
    "firstName": "Macaulay",
    "lastName": "Herbert",
    "email": "herbert.macaulay@gmail.com",
    "roleId": 2,
    "createdAt": "2017-04-21T05:28:57.752Z",
    "updatedAt": "2017-04-21T05:28:57.752Z",
    "role": {
      "id": 2,
      "title": "regular",
      "createdAt": "2017-04-21T05:28:57.307Z",
      "updatedAt": "2017-04-21T05:28:57.307Z"
    }
  }
]
```


## Get A User
#### Request
  - Endpoint: **GET**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response
```
{
    "id": 5,
    "userName": "kings",
    "firstName": "Kingdom",
    "lastName": "Isaac",
    "email": "kingdomisaac@yahoo.com",
    "roleId": 1,
    "createdAt": "2017-04-21T05:30:39.815Z",
    "updatedAt": "2017-04-21T05:43:44.880Z"
}
```
## Update user
#### Request
  - Enpoint: **PUT**: `/users/:id`
  - Requires `Authorization` header to be set
```
{
  "roleId": 2
}
```
#### Response
```
{
  "id": 4,
  "userName": "kings",
  "firstName": "Kingdom",
  "lastName": "Orjewuru",
  "email": "kingdom@isaac.com",
  "roleId": 2,
  "createdAt": "2017-04-21T06:45:03.572Z",
  "updatedAt": "2017-04-21T06:45:03.572Z"
}
```

## Delete user
#### Request
  - Enpoint: **DELETE**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response

```
{
  "message": "User deleted successfully."
}
```

## User login
### Request 
 - Endpoint: **POST**: `/users/login`
```
{
    "userName": "imisioluwa.akande@andela.com",
    "password":"imisioluwa.akande@andela.com"
}
``` 

### Response 
``` 
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjMsIlJvbGVJZCI6MSwiaWF0IjoxNDkyNzczMzc4LCJleHAiOjE0OTI4NTk3Nzh9.6C9u-1ylQOUpTQDVPm0TmIuVmDaP2PdMMgMxLkP1sjI",
  "expiresIn": 86400
}
```

# Get user's Document 
### Request
  - Enpoint: **GET**: `/users/documents`
  - Requires `Authorization` header to be set
  
### Response 
```
    [
      {
        "id": 1,
        "title": "Andela Talent ",
        "content": "Technical leadership program",
        "access": "public",
        "authorId": 3,
        "roleId": 2,
        "createdAt": "2017-04-21T05:31:16.778Z",
        "updatedAt": "2017-04-21T05:31:16.778Z"
      },
      {
        "id": 2,
        "title": "Test smells",
        "content": "Practicing Test Driven Development",
        "access": "public",
        "authorId": 3,
        "roleId": 2,
        "createdAt": "2017-04-21T05:33:01.265Z",
        "updatedAt": "2017-04-21T05:33:01.265Z"
      },
      {
        "id": 3,
        "title": "Stakeholder Management",
        "content": "Agile development is an important practice in SD",
        "access": "public",
        "authorId": 3,
        "roleId": 2,
        "createdAt": "2017-04-21T05:34:15.168Z",
        "updatedAt": "2017-04-21T05:34:15.168Z"
      },
      {
        "id": 4,
        "title": "HTML and CSS",
        "content": "Web development with tags and styles",
        "access": "public",
        "authorId": 3,
        "roleId": 2,
        "createdAt": "2017-04-21T05:36:09.373Z",
        "updatedAt": "2017-04-21T05:49:32.626Z"
      }
    ]
```

ROLES
-----
## Create role
#### Request
  - Endpoint **POST** `/roles`
  - Requires `Authorization` header to be set
Body (application/json)
```
{
  "title": "author"
}
```
#### Response
Body (application/json)
```
{
  "id": 3,
  "title": "author",
  "updatedAt": "2017-04-21T11:24:44.344Z",
  "createdAt": "2017-04-21T11:24:44.344Z"
}
```

## Get roles
#### Request
  - Endpoint **GET** `/roles`
  - Requires `Authorization` header to be set

#### Response
Body (application/json)
```
[
  {
    "id": 1,
    "title": "admin",
    "createdAt": "2017-04-21T05:28:57.307Z",
    "updatedAt": "2017-04-21T05:28:57.307Z"
  },
  {
    "id": 2,
    "title": "regular",
    "createdAt": "2017-04-21T05:28:57.307Z",
    "updatedAt": "2017-04-21T05:28:57.307Z"
  },
  {
    "id": 3,
    "title": "author",
    "createdAt": "2017-04-21T11:24:44.344Z",
    "updatedAt": "2017-04-21T11:24:44.344Z"
  }
]
```

## Update role
#### Request
  - Endpoint **POST** `/roles/:id`
  - Requires `Authorization` header to be set
Body (application/json)
```
{
  "title": "Editor"
}
```
#### Response
Body (application/json)
```
{
  "id": 3,
  "title": "Editor",
  "createdAt": "2017-04-21T11:24:44.344Z",
  "updatedAt": "2017-04-21T11:24:52.344Z"
}
```

DOCUMENTS
---------
## Create Document
#### Request
  - Endpoint **POST** `/documents`
  - Requires `Authorization` header to be set
```
{
  "title": "Story",
  "content": "Tales of the moonlight",
  "access": "public"
}
```
#### Response
  - Body `(application/json)`
```
{
  "id": 5,
  "title": "Merlin",
  "content": "The Home of magic ",
  "access": "public",
  "authorId": 3,
  "roleId": 1,
  "updatedAt": "2017-04-21T11:29:49.031Z",
  "createdAt": "2017-04-21T11:29:49.031Z"
}
```
## Get Documents
#### Request
  - Endpoint **GET** `/documents`
  - Optional queries **page** (for the page number) && **limit** (number of documents per page)
  - Requires `Authorization` header to be set

#### Response
```
[
  {
    "id": 5,
    "title": "Merlin",
    "content": "The Home of magic",
    "access": "public",
    "authorId": 3,
    "roleId": 1,
    "createdAt": "2017-04-21T11:29:49.031Z",
    "updatedAt": "2017-04-21T11:29:49.031Z"
  },
  {
    "id": 4,
    "title": "Andela Talent",
    "content": "Technical leadership program",
    "access": "public",
    "authorId": 3,
    "roleId": 2,
    "createdAt": "2017-04-21T05:36:09.373Z",
    "updatedAt": "2017-04-21T05:49:32.626Z"
  },
  {
    "id": 3,
    "title": "Stakeholder Management",
    "content": "Agile development is an important practice in SD",
    "access": "public",
    "authorId": 3,
    "roleId": 2,
    "createdAt": "2017-04-21T05:34:15.168Z",
    "updatedAt": "2017-04-21T05:34:15.168Z"
  },
  {
    "id": 2,
    "title": "HTML and CSS",
    "content": "Web development with tags and styles",
    "access": "public",
    "authorId": 3,
    "roleId": 2,
    "createdAt": "2017-04-21T05:33:01.265Z",
    "updatedAt": "2017-04-21T05:33:01.265Z"
  },
  {
    "id": 1,
    "title": "My Adventure",
    "content": "sourvenier gives motivation",
    "access": "public",
    "authorId": 3,
    "roleId": 2,
    "createdAt": "2017-04-21T05:31:16.778Z",
    "updatedAt": "2017-04-21T05:31:16.778Z"
  }
]
```

## Get A Document
#### Request
  - Endpoint **GET** `/documents/:id` where id is the id of the document
  - Requires `Authorization` header to be set

##### Response
```
{
    "id": 1,
    "title": "consectetur",
    "content": "enim ex velit",
    "access": "public",
    "authorId": 3,
    "roleId": 2,
    "createdAt": "2017-04-21T05:31:16.778Z",
    "updatedAt": "2017-04-21T05:31:16.778Z"
}
```

## Update Document
#### Request
  - Endpoint **PUT** `/documents/:id` id is the id of the document
  - Requires `Authorization` header to be set
```
{
  "title": "The Editor",
}
```
##### Response
```
{
  "id": 1,
  "title": "The accountant",
  "content": "Trial balance in credit and debit",
  "access": "public",
  "authorId": 3,
  "roleId": 2,
  "createdAt": "2017-04-21T05:31:16.778Z",
  "updatedAt": "2017-04-21T11:33:18.850Z"
}
```

## Delete Document
#### Request
  - Endpoint **DELETE** `/documents/:id`id of the document
  - Requires `Authorization` header to be set
#### Response
```
{
  message: 'Document deleted successfully.'
}
```

Search
-----

## Search Users
#### Request
  - Endpoint **GET** `/search/users?q=simi`
  - Requires `Authorization` header to be set
#### Response
```
[
  {
    "id": 3,
    "userName": "Herb",
    "firstName": "Macaulay",
    "lastName": "Herbert",
    "email": "herbert.macaulay@gmail.com",
    "roleId": 1,
    "createdAt": "2017-04-21T05:30:39.815Z",
    "updatedAt": "2017-04-21T05:43:44.880Z"
  },
  {
    "id": 4,
    "userName": "paul.smith",
    "firstName": "Paul",
    "lastName": "Smith",
    "email": "paul.smith@gmail.com",
    "roleId": 2,
    "createdAt": "2017-04-21T06:45:03.572Z",
    "updatedAt": "2017-04-21T06:45:03.572Z"
  }
]
```

## Search Documents
#### Request
  - Endpoint **GET** `/search/documents?q=accountant`
  - Requires `Authorization` header to be set
#### Response
```
[
  {
    "id": 1,
    "title": "The Editor",
    "content": "Trial balance in credit and debit",
    "access": "public",
    "authorId": 3,
    "roleId": 2,
    "createdAt": "2017-04-21T05:31:16.778Z",
    "updatedAt": "2017-04-21T11:33:18.850Z"
  }
]
```