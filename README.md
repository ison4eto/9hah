# 9hah project
A React front-end &amp; Express back-end project that hosts images of memes, users can add coments, search categories and rate the meme.

## How it works
It uses React for the front end, acting as the client, connecting to a REST API that uses ExpressJS and the JWT Authentication method.
For storage, it uses MongoDB for storing Users, Memes and Comments information and the actual files and images are stored on the file system in a folder called 'uploads/memes' inside the server.

## The Front End
We are using the ReactJS Framework that connects to the back-end through requests to the REST API.

## The Back End
ExpressJS deals with interfacing to the MongoDB database (using Mongoose) and also the file system. It provides end-points for creating, editing and deleting data.

## What purpose does it serve?
It's fun site where you can see many memes.

## How to run it?
Don't forget to install all dependencies on the server and client using 
```
npm install
```
Then start the React app
```
>some/where/9hah/client npm start
```
It starts on localhost:3000
Start mongoDB
```
"path to mongod.exe" mongod --dbpath "path to store data"
```
and run the server
```
>some/where/9hah/server npm start
```



 