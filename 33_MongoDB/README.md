# Section 33: MongoDB

## Downloading and installing MongoDB on Windows

Helpful links:

https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514

Changes to be made in above article:

- Read comments on above article to make changes in bash_profile for MongoDB 6.0.

- Download mongosh from https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/. Use the command "mongosh" instead of "mongo".
The legacy Mongo shell that ran with the mongo command was deprecated in MongoDB 5.0 and removed in MongoDB 6.0.

## CRUD Operations

Follow the videos. Start `mongod` in terminal and then `mongosh` in another terminal window.

## Working with native MongoDB Driver: Fruits project

Create a database named `myFruitsDB` and collection named `fruits`. Insert 3 fruit objects(called documents or records in MongoDB) and then use find all to display all these fruits.

Helpful links:

1. https://www.mongodb.com/docs/drivers/node/current/quick-start/download-and-install/

Use this section up till Download and Install only. And do 
`npm install mongodb@4.7` since there might be NodeJS might hang when connecting to Mongo when using versions 5 and beyond. See https://stackoverflow.com/questions/41302972/node-js-hangs-when-trying-to-connect-to-mongo


2. https://www.w3schools.com/nodejs/nodejs_mongodb.asp

Use this section to find out how to create database, insert many fruits, find all fruits.




