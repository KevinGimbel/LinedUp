# Installation guide

### 1. Clone the repository
To install LinedUp start by cloning this repository to your computer.

```bash
$ git clone https://github.com/kevingimbel/LinedUp
```

If you already have MongoDB, NodeJS and npm installed you can skip to [Step
3](#3-config).

### 2. Install dependencies

LinedUp depends on 3 essential programs: NodeJS, NPM and MongoDB. Without these
you'll not be able to run the app or do anything. Nowadays
[NodeJS](http://nodejs.org) comes with NPM installed so these two are fairly
easy to setup.

Since there are many ways to install Node (depending on your OS), go to
[http://nodejs.org](http://nodejs.org) and use their guide to insall it.

Once Node is installed you'll need to install MongoDB. They've a installation
and setup guide over at [https://mongodb.com](https://mongodb.com). Follow the
installation guide and then setup a database user. Remember the user and
password (if you choose to set one) because this'll be needed later!

### 3. Config
Once everything is installed we can start to install LinedUp.
Navigate to the directory you cloned LinedUp to and run `npm install`.
```bash
$ npm install
```
This will install all the Node dependencies the app needs to run.

Next go into the new directory `LinedUp` and copy the `config.sample.js` file
to `config.js` and open it in your favorite editor (I'll use vim).

```bash
$ cp config.sample.js config.js
$ vim config.js
// could also be `atom config.js`, `subl config.js`, `nano config.js`, etc..
```
Inside the config.js you'll find two fields: `port` and `mongodb`. The port can
be any port that's available (like, 1337). The mongodb value will be passed to
`mongoose.connect()` to create a connection to the MongoDB instance. Here
you'll need to enter the following:

```js
  mongodb://username:password@host/databaseName
// Example
mongodb:kevin:mypassword123@localhost/concerts
```

At the moment the Database is not generated automatically so you'll need to do
it yourself. According to the MongoDB Manual all you need to do is login to
MongoDB from your shell and then run `use concerts` to create a database named `concerts`.

```
$ mongo -u kevin -p
$ Enter password:
> use concerts;
Switched to database concerts
```
So now you can exit the mongo shell (type `exit`) and run `node server.js`.
This will make the apps Front-End available at localhost:1337 (or whatever port you specified in the `config.js`) file.

Currently there's no (elegant) way to create the datasets. I'm working on a backend to easily generate the data and update it when needed.
In the meantime you can use the
[linedup-cli](https://github.com/kevingimbel/linedup-cli) tool to create new entries. 

Install it with NPM globally.
```
$ npm install -g linedup-cli
```
Then move to your LinedUp installation and run the script. 
```
$ cd path/to/linedup 
$ linedup-cli
```
`linedup-cli` will prompt you for relevant concert data and write it to the database.

LinedUp is a API in the first place. The default Front-End is inside the `public` folder and consists only of an index.html with a "Renderer" and Ajax JavaScript I wrote. The Ajax.js is used to call the API (`localhost:1337/api/concerts`) and the Renderer (renderer.js) is used to render the received data.

LinedUp.js is used to handle the manipulation of the JSON data to reduce, sort or filter the data. The Filters are build from the API endpoint `api/concerts/filters` that returns a JSON Object containing all venues, artists and cities. The data is returned as follows.
```js
{ "venue":
    ["Jahrhunderthalle","Schlachthof","ZOOM",...],
  "city":
    ["Frankfurt","Wiesbaden","Mayence",...],
  "artists":
    ["Beatsteaks","Kraftklub","Bloody Beetroots",...]
}
```
