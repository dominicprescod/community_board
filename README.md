#Community Board

An app that allows neighbors to talk to each other. On sign up the user enters their address information and the app automatically creates boards based on their address, if the board doesn't already exist. If the board already exists ie someone already signed up with a similar zip code state or city theyre automatically joined to that board and able to chat with the existing members.

In the profile page you can see the available boards and when you click you can see the ongoing messages, showing the most recent message first and you can scroll up to see the earlier messages from other users. You can click on the users message to go to their profile and it give you the ability to private message the user.

Private messages exist only between you and the user (they're essentially the same as boards but exclusive)..When you visit the user's page again it only shows the message thread between you and the user and allows you to add a new message.

When you go to your profile page it now shows the private messages between you and other users you've private messaged and also your available boards

#Technologies Used
MOSTLY Mongoose, I spent most of the time manipulating data and making certain the users were able to access the same boards and have the inbox messages match up with the users

#Future Implementations
- Better design with the user's story in mind (better user interface)
- Live update when another user sends a message
- Ability to notify of new messages when you log
- Ability to import into a new board that you are not a part of by default
- Ability to view chat logs (but not contribute) before log in
- Ability to upload (actual) pictures to profile
- Ability to create boards based on Google Maps map radius
