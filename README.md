### document-manager-app

[![Coverage Status](https://coveralls.io/repos/github/andela-iakande/document-manager-application/badge.svg?branch=development)](https://coveralls.io/github/andela-iakande/document-manager-application?branch=development)

Document management system is an application that is employed by users to manage their documents in a well structured manner. A User can be able to upload a document, edit it and share it with other users. Aside from enabling users to properly document their work with regard to category, the application permits users to work collaboratively on documents.

Document Management System provides a restful API and friend users interface for users to create and manage documents giving different privileges based on user roles and managing authentication using Json Web Token (JWT). The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.


Development
-----------
This application has been created using Nodejs environment and implementing [**Express**](http://expressjs.com/) as the routing framework and [**Sequelize**](), an object modeling package, to interact with Relation Database. Authentication has been implemented. For this version, only local strategy has been used. [**JWT tokens**](https://jwt.io/) have also been used to authenticate routes.

Features
-----------
- Sign up/Login
- create document
- Delete a document
- View other peoples public documents
- Search for documents (real time)
- Check own documents
- With admin access you manage users and change user roles

## API Documentation Link
[API Documentation](https://github.com/andela-iakande/document-manager-application.)