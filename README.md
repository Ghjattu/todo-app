# todo-app
A simple todo application using Fiber, React.js and Material UI.

## Features
Now, the todo application only implements four functions:
1. create a new task
2. mark a task as finished
3. mark a task as unfinished
4. delete a task

## Start
### server
The server uses SQLite as database and bounds on port 8080. In the `server` folder, run:
```shell
go run main.go
```
### client
In the `client` folder, install the dependencies:
```shell
npm install
```
Start the app in the development mode:
```shell
npm start
```
Then open [http://localhost:3000](http://localhost:3000) in the browser.
