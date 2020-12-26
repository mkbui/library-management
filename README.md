# Library Management System using MySQL Database Server
This project serves as an application of Database System knowledge into real-life softwares. The code aims to implement a web application using a Client-Server structure, where the Server stores and handles transactions with a MySQL database management system. The database employs a relational model with supported normalization, stored procedures / triggers, views, indexing, and security measures. The server is implemented using Node and Express, along with imported packages from *mysql, axios,...* to handle operations. The client is implemented with React.js front-end framework.

The structure of the application, mostly regarding the client-server packages and initiation, were applied from an online tutorial at [https://hocwebchuan.com](https://hocwebchuan.com/tutorial/reactjs/reactjs_express_api.php)

## Table of Contents
- [Available Scripts](#available-scripts)
  - [Install Express.js](#install-expressjs)
  - [Install Node.js modules](#install-node-modules)
  - [Install Concurrently](#install-concurrently)
  - [Install Axios](#install-axios)
  - [Run the app](#run-the-app)
- [Folder Structure](#folder-structure)
- [Something Missing?](#something-missing)

## Installation and Execution
In the project directory, follow these steps:

### Install Express.js
Express is a module framework for Node that you can use for applications that are based on server that will listen for any input/connection requests from clients.<br>
This project used Express to create App.

You can install Express.js by run:
```sh
npm install –save express
```

### Install Node.js modules
You need install node.js modules for this project:
```sh
cd client
npm install
```

Runs the app in the development mode:
```sh
npm start
```
Then you can see in the browser with the Welcome screen of React app.

### Install Concurrently
Concurrently: support running multiple processes at the same time, this project we will run Port 3000 (client) and 4000 (server) at the same time.
```sh
npm install –save concurrently
```

### Install Axios
Axios is a Javascript library used to make HTTP requests from node.js or XMLHttpRequests from the browser. We need to use Axios to get the data from server.
```sh
npm install –save axios
```

### Manually Install Other Packages
If your package.json cannot load, you have to manually install these packages.
```sh
npm install -save mdbreact
```
```sh
npm install react-datepicker --save
```

### Run the app
After install necessary libraries, now we can run the app by run this script at the root of project `/React-server-and-client-master/`:
```sh
npm run dev
```

You can see the message `I am a message from Server!` sent from server to client.<br>
Done!<br>

## Folder Structure

After creation, your project should look like this:

```
React-server-and-client-master/
  client/
    node_modules/
    public/
    src/
    .gitignore
    package.json
    package-lock.json
    README.md
  node_modules/
  app.js
  package.json
  package-lock.json
  README.md
```

## Basic use-case
It is important to note that this is only a simple implementation of a web app, solely to present how we can interact with database system in softwares. Therefore, as of December, the current user interface for the app is very simple. It has a single page with project information, a list of books fetched from the database, as well as an option to add books into the database. The book list can be searched and sorted pretty efficiently, while the book insertion popup handles exception and expectation quite satisfactorily. Obviously, more is needed to render a full library management application, such as user login and profiling, book borrowing and returning, as well as more sophisticated query and update options.
