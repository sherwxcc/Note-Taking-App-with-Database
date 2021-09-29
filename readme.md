# Noted With Thanks (ver. Database) :notebook_with_decorative_cover:

A note taking app with a knex with PostgreSQL database storage.

This app uses basic authentication, each user can create, update and delete notes that they input.

Responsive UI design allows dynamic changes of the app to best fit your differently sized viewports.

## Installation

To start, please clone the application and install the node modules dependencies before use.

Install via [npm](https://www.npmjs.com/)

```
$ npm install
```

Next, set up your own database and knex, please make sure your PostgreSQL is running and create your own `.env` file inside the root directory to store your knex connection details.

.env file example:

```
DB_NAME=<your database name>
DB_USERNAME=<your username>
DB_PASSWORD=<your password>
```

Afterthat, run below command in terminal to get your database ready. Please feel free to remove the dummy notes inside the database after set up.

```
$ knex migrate:latest;
$ knex seed:run;
```

The app is ready! You may run the server through node.

```
$ node app.js
```

## How To Use

#### LOG IN

- This app make use of express basic authetication.

- A sign in request will show up when you first visit the app, simply enter the correct username and password and hit `Sign in`.

- Within the same browser, you do not need to log in again.

#### CREATE NOTE

- To create a new note, you can type it in the textarea on the left hand side.

- If you want to clear the text, simply click on the `Clear` button at the top of the textarea to reset.

- When you are ready with your new note, click on the `Add` button at the top to post your note to the server.

- All your created notes should appear on the right hand side.

#### EDIT NOTE

- To edit a note, first click on the target note to enter the editor mode, a pair of `Tick button` and `Cross button` should appear at the bottom-left corner.

- Then, you can change any text inside the note.

- If you change your mind and want to discard changes made to the note, you can click on the `Cross button` to return and restore.

- Else if you are ready to save your changes, you can click on the `Tick button` to update your note.

#### DELETE NOTE

- If you wish to delete any uploaded note from the server, you can click on the `Bin button` at the bottom-right corner of the targeted note.
