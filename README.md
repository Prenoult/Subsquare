# Subsquare

## :gb: English version :us:

This projet is a school project, a web application based on the MERN technologies
([MongoDB](https://www.mongodb.com), [Express](http://expressjs.com), [React](https://reactjs.org), 
[Node.js](https://nodejs.org/en/)).

We want to thanks **Axel Marciano** for his 
[tutorial](https://medium.com/@axel.marciano/votre-première-application-en-react-node-express-mongodb-5ab0dc531091)
(in french) that we used as a base for our app.

In the project directory `/Subsquare`, you need to run: `npm install`, in order to install all the dependencies for the 
server side of the app.

In the client directory `/Subsquare/client`, you also need to run: `npm install`, in order to install all the 
dependencies for the client side of the app.

You can create a file named *config.js* in the config directory `Subsquare/config` and copy-paste the content of 
*config.model.js* in *config.js*.

Now, you can modify these variables to configure your projet : 

* The `secret` variable is used to generate a [JWT](https://jwt.io) (JSON Web Token) to ensure security in our tokens 
and our connection system
* The `mtusername` and `mtpassword` variables must be your mailtrap username and password of the inbox you want to use 
(we will see that right after)

To modify `mtusername` and `mtpassword`, you have go to [mailtrap](https://mailtrap.io) (Mailtrap is a fake SMTP server 
to test, view and share emails sent from the development and staging environments without spamming real customers) and 
log in or create an account if you don't have one.

When you are connected, you can go to your **profile** and select **Demo inbox** in your inboxes, this is where you can 
find your **username** and **password** to put in your *config.js* file.

*You are almost ready !*

All you have to do is launch your servers. For that, you need to use your favorite **Terminal** and run different 
commands : 

1. `mongod` in your root `~/` in order to launch the **MongoDB** server (you can try `mongo` in another window terminal to 
be sure that your mongo server is currently working)
1. `npm start` in the project directory `/Subsquare` in order to launch the **Node.js** server
1. `npm start` in the client directory `/Subsquare/client` in order to launch the client server **React** 

*Now, your default web browser is opening on our application and you're ready to use it !*

## :fr: Version française :fr:

Ce projet est un projet universitaire, une application web basée sur les technologies MERN
([MongoDB](https://www.mongodb.com), [Express](http://expressjs.com), [React](https://reactjs.org), 
[Node.js](https://nodejs.org/en/)).

Nous tenons à remercier **Axel Marciano** pour son 
[tutoriel](https://medium.com/@axel.marciano/votre-première-application-en-react-node-express-mongodb-5ab0dc531091)
que nous avons utilisé comme base pour notre app. 
 
Dans le dossier du projet `/Subsquare`, vous devez exécuter `npm install`, pour installer les dépendances du côté 
client de notre app.

Dans le dossier client `/Subsquare/client`, vous devez également exécuter `npm install`, pour installer les 
dépendances du côté client de notre app.

Vous pouvez créer un fichier nommé *config.js* dans le dossier config `Subsquare/config` et copier-coller le contenu 
de *config.model.js* dans *config.js*.

Maintenant, vous pouvez modifier ces variables pour configurer votre projet :

* La variable `secret` est utilisée pour générer un [JWT](https://jwt.io) (JSON Web Token) pour assurer la sécurité de 
nos tokens et de notre système de connexion
* Les variables `mtusername` et `mtpassword` doivent être votre nom d'utilisateur et mot de passe de la boîte de 
réception que vous souhaitez utiliser (nous verrons cela juste après)

Pour modifier `mtusername` et `mtpassword`, vous devez aller sur [mailtrap](https://mailtrap.io) (Mailtrap est un faux 
serveur SMTP pour tester, afficher et partager les e-mails envoyés depuis les environnements de développement et de 
transfert sans envoyer de spam à de vrais clients) et vous connecter ou créer un compte si vous n'en possédez pas un.

Une fois connecté, vous pouvez vous rendre sur votre **profile** et choisir **Demo inbox** dans vos boîtes de réception,
c'est ici que vous pouvez trouver votre **username** et **password** à mettre dans votre fichier *config.js*.

*Vous êtes bientôt prêt !*

Tout ce qu'il vous reste à faire c'est lancer vos serveurs. Pour cela, vous avez besoin de votre **Terminal** favori et 
de lancer différentes commandes : 

1. `mongod` dans votre racine `~/` dans le but de lancer le serveur **MongoDB** (vous pouvez essayer la commande `mongo`
dans une autre fenêtre du terminal pour être sur que votre serveur **MongoDB** fonctionne)
1. `npm start` dans le dossier du projet `/Subsquare` dans le but de lancer le serveur **Node.js**
1. `npm start` dans le dossier client `/Subsquare/client` dans le but de lancer le serveur client **React** 

*Maintenant, votre navigateur web par défaut est en train de démarrer sur votre application et vous être prêt à 
l'utiliser !*