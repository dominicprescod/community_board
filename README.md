#Community Board

An app that allows neighbors to communicate with each other via group forums and private messaging based on their location.

The app was created using three out of four of the MEAN stack;

- MongoDB
- Express
- NodeJS

The app consists of three models;

- Users
- Boards
	- Private and forum based
- Messages
	- Created as a reference for the Boards model.

The main challenge faced with creating this app was automatically adding new users to existing forums on sign up, and creating private messaging session with limited input from the user. I mostly combined queries on the server side checking for existing data before creating new sessions, and used IDs to mark the unique messaging sessions between particular users.

```Passport``` and ```Bcrypt-NodeJS``` was used for user authentication, and combining ```Express-Sessions``` with ```EJS``` on the client side. Users were able to distinguish their messages from other users in forums and in private messaging sessions. 

#Tech Used
- NodeJS
- MongoDB
- Mongoose
- Express
- Express-Session
- Passport
- Passport-Local
- Bcrypt-NodeJS
- EJS
- Body-Parser
