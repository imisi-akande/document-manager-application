
### document-manager-app

[![Coverage Status](https://coveralls.io/repos/github/andela-iakande/document-manager-application/badge.svg?branch=development)](https://coveralls.io/github/andela-iakande/document-manager-application?branch=development)
[![Build Status](https://travis-ci.org/andela-iakande/document-manager-application.svg?branch=development)](https://travis-ci.org/andela-iakande/document-manager-application)

Document management system is an application that is employed by users to manage their documents in a well structured manner. A User will able to upload a document, edit it and share it with other users. Aside from enabling users to properly document their work with regard to category, the application permits users to work collaboratively on documents.
To access the application [!click here](https://smartdocx.herokuapp.com/)

Document Management System provides a restful API and friend users interface for users to create and manage documents giving different privileges based on user roles and managing authentication using Json Web Token (JWT). The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.


Development
-----------
This application has been created using Nodejs environment and implemented using [**Express**](http://expressjs.com/) as the routing framework and [**Sequelize**](), an object modeling package, to interact with Relation Database. Authentication has been implemented. For this version, only local strategy has been used. [**JWT tokens**](https://jwt.io/) have also been used to authenticate routes.

Features
-----------
- Sign up/Login
- create document
- Delete a document
- View other peoples public documents
- Search for documents 
- Search for users
- Check own documents
- With admin access you manage users and change user roles

## Technologies Used
- JavaScript (ES6)
- Node.js
- Express
- Postgresql
- Sequelize ORM  

### **Installation Steps**
* Clone the project repository from your terminal `git clone https://github.com/andela-moseni/document-mgt-system.git`
* Change directory into the `document-mgt-system` directory
* Run `npm install` to install the dependencies in the `package.json` file
* Run `npm run start` to start the project
* Run `npm test` to run the server-side(api) tests
* Run `npm run e2e` to run the e2e tests
* Run `npm run frontend-test` to run the client-side(React) tests
* Use *Postman* or any API testing tool of your choice to access the endpoints

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



## API Documentation Link
[API Documentation](https://github.com/andela-iakande/document-manager-application.)
