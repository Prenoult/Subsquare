# Subsquare

## :gb: English version :us:

This projet is a school project, a web application based on the MERN technologies
([MongoDB](https://www.mongodb.com), [Express](http://expressjs.com), [React](https://reactjs.org), 
[Node.js](https://nodejs.org/en/)).

We want to thanks **Axel Marciano** for his 
[tutorial](https://medium.com/@axel.marciano/votre-première-application-en-react-node-express-mongodb-5ab0dc531091)
that we used as a base for our app.

In the project directory `/Subsquare`, you need to run: `npm install`, in order to install all the dependencies for the 
server side.

In the client directory `/Subsquare/client`, you also need to run: `npm install`, in order to install all the 
dependencies for the client side.

You can create a file named *config.js* in the config directory `Subsquare/config` and copy-paste the content of 
*config.model.js* to *config.js*.

Now, you can modify these variables to configure your projet : 

* The `secret` variable is used to generate JWT to ensure security in our tokens and our connection system
* The `mtusername` and `mtpassword` variables must be your mailtrap username and password of the inbox you want to use 
(we will see that right after)

To modify `mtusername` and `mtpassword`, you have go to [mailtrap](https://mailtrap.io) (Mailtrap is a fake SMTP server 
to test, view and share emails sent from the development and staging environments without spamming real cstomers.) and 
log in or create an account if you don't have one.

When you are connected, you can go to your **profile** and select **Demo inbox** in your inboxes, this is where you can 
find your **username** and **password** to put in your *config.js* file.

*You are almost ready !*

All you have to do is launch your servers. For that, you need to use your favorite **Terminal** and run different 
commands : 

1. `mongod` in your root in order to launch the **MongoDB** server (you can try `mongo` in another window terminal to 
be sure that your mongo server is currently working)
1. `npm start` in the project directory `/Subsquare` in order to launch the **Node.js** server
1. `npm start` in the client directory `/Subsquare/client` in order to launch the client server **React** 

*Now, your default web browser is opening on our app, and you're ready to use it !*