### document-manager-app

[![Coverage Status](https://coveralls.io/repos/github/andela-iakande/document-manager-application/badge.svg?branch=development)](https://coveralls.io/github/andela-iakande/document-manager-application?branch=development)
[![Build Status](https://travis-ci.org/andela-iakande/document-manager-application.svg?branch=development)](https://travis-ci.org/andela-iakande/document-manager-application)

Document management system is an application that is employed by users to manage their documents in a well structured manner. A User will be able to upload a document, edit it and share it with other users. Aside from enabling users to properly document their work with regard to category, the application permits users to work collaboratively on documents.
To access the application [!click here](https://smartdocx.herokuapp.com/)

Document Management System provides a restful API and friend users interface for users to create and manage documents giving different privileges based on user roles and managing authentication using Json Web Token (JWT). The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.

## API Documentation
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.

#### API Features

The following features make up the Document Management System API:

###### Authentication

- It uses JSON Web Token (JWT) for authentication
- It generates a token on successful login or account creation and returns it to the user
- It verifies the token to ensure a user is authenticated to access every endpoints

###### Users

- It allows users to be created  
- It allows users to login and obtain a unique token which expires every 24hours
- It allows authenticated users to retrieve and update their information 
- It allows users to retrieve their documents based on userId
- It allows the admin to manage users

###### Roles

- It ensures roles can be created, retrieved, updated and deleted by an admin user
- A non-admin cannot access this endpoint
- A non-admin user cannot create, retrieve, modify, or delete roles  
- It allows assignment of roles to users

###### Documents

- It allows new documents to be created by authenticated users 
- It ensures all documents are accessible based on the permission/privileges 
- It allows admin users to create, retrieve, modify, and delete documents
- It ensures users can retrieve, edit and delete documents of their own  
- It allows users to retrieve all their documents as well as public documents
- It allows users to retrieve all public documents
- It allows users on the same role to retrieve role-based documents

###### Search

- It allows admin to retrieve all documents that matches search term
- It allows admin to search users based on a specified search term
- It allows users to search public documents for a specified search term
- It allows users to search for users through name or email address
- It allows users on the same role to search through role-based documents 

## Hosted App on Heroku
[smartDocx](https://smartdocx.herokuapp.com/)

## API Documentation
- View API endpoints and their functions [here](https://andela-iakande.github.io/API-documentation/)

#### Limitations:
The limitations to the **Document Management System API** are as follows:
* Users cannot upload documents
* Users cannot share documents with people, but can make document `public` to make it available to other users
* Users login and obtain a token which is verified on every request, but users cannot logout (nullify the token), however tokens become invalid when it expires (after 24 hours)

### How to Contribute
Contributors are welcome to further enhance the features of this API by contributing to its development. The following guidelines should guide you in contributing to this project:

## Technologies Used
- JavaScript (ES6)
- Node.js
- Express
- Postgresql
- Sequelize ORM  

### **Installation Steps**
* Ensure you have `node` installed or install [Node](https://nodejs.org/en/download/)
* Clone the project repository from your terminal `git clone https://github.com/andela-iakande/document-manager-application`
* Change directory into the `document-manager-application` directory
* Run `npm install` to install the dependencies in the `package.json` file
* Run `npm run start` to start the project
* Run `npm test` to run the server-side(api) tests
* Run `npm run test-e2e` to run the e2e tests
* Run `npm run test-fe` to run the client-side(React) tests
* Use [Postman](https://www.getpostman.com/) or any API testing tool of your choice to access the endpoints

### **Endpoints**
**N/B:** For all endpoints that require authentication, use \
`'x-access-token': <token>` or `authorization: <token>`

#### Limitations:
The limitations to the **Document Management System API** are as follows:
* Users cannot upload documents
* Users cannot share documents with people, but can make document `public` to make it available to other users
* Users login and obtain a token which is verified on every request, but users cannot logout (nullify the token), however tokens become invalid when it expires (after 24 hours)

### How to Contribute
Contributors are welcome to further enhance the features of this API by contributing to its development. The following guidelines should guide you in contributing to this project:

1. Fork the repository.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request describing the feature(s) you have added
6. Include a `feature.md` readme file with a detailed description of the feature(s) you have added, along with clear instructions of how to use the features(s) you have added. This readme file will be reviewed and included in the original readme if feature is approved.

Ensure your codes follow the [AirBnB Javascript Styles Guide](https://github.com/airbnb/javascript)
