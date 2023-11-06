// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const users = { 
   users_list : [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

const findUserByNameAndJob = (name, job) => {
   return users['users_list']
      .filter( (user) => user['name'] === name && user['job'] === job);
}

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);

const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}

const findUserIndex = (id) => {
    return users['users_list']
        .findIndex( (user) => user['id'] === id);
}

const generateId = () => {
    var id = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    while(findUserById(id) != undefined) {
        id = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    }

    return id
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined){
      if (job != undefined) {
         let result = findUserByNameAndJob(name, job);
         result = {users_list: result};
         res.send(result);
         res.status(201).send(result);
      } 
      else {
        let result = findUserByName(name);
        result = {users_list: result};
        res.status(201).send(result);
      }
    }
    else{
        res.send(users);
    }
});
    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    }
    else {
        res.send(result);
        res.status(201).send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = generateId();
    addUser(userToAdd);
    res.status(201).send(JSON.stringify(userToAdd));
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    var index = findUserIndex(id);
    if (index === -1) {
        res.status(404).send('Resource not found.');
    }
    else {
        users['users_list'].splice(index, 1);
        res.status(204).send('Successful Deletion');
    }
 });