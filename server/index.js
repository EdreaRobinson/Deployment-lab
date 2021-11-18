const express = require("express")
const path = require('path')
const app = express()
var Rollbar = require('rollbar')

var rollbar = new Rollbar({
  accessToken: '186da358d39746b8835854a479ca659f',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

rollbar.log('Hello world!')

let dogs = ["Tyson", "Axl", "Shiva", "Arya", "Issa"];

app.get("/users", (req, res) => {
    try {
        res.send(getDogs());
    } catch (error) {
        let ERROR = error;
        rollbar.error(ERROR);
        res.send("Error");
    }
});

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../index.html'));
})

app.get("/styles.css", (req, res) => {
    res.sendFile(path.join(__dirname, "../styles.css"));
  });

const port = process.env.PORT || 4005

app.listen(port, ()=>{
    console.log(`Running on port number ${port}`)
}) 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.get('/', function(req,res) {
    res.send('Request')
    if(!names.includes('Jerrell')){
        rollbar.warning('GET: Jerrell is not in array')
    }
})

server.post('/post', function(req,res) {
    res.send('Request')
    if(!names.includes('Jerrell')){
        rollbar.critical('POST: Student cannot post')
    }
})

server.put('/put', function(req,res) {
    res.send('Request')
    if(!names.includes('Jerrell')){
        rollbar.critical('PUT: Student name cannot be updated')
    }
})

server.delete('/delete', function(req,res) {
    res.send('Delete Request')
    .catch((err) => {
        Rollbar.error('DELETE: Student cannot be deleted')
    })
})

server.put('/put', function(req,res) {
    rollbar.info('Someone tried to update')
    res.send('Update data')
    .catch((err) => {
        const Error = err
        Rollbar.error(Error)
    })
})

server.post('/post', function(req,res) {
    let name = req.body
    rollbar.info('Someone tried to post')
    res.send('Post data')
    MrJamesArray.push(name)
    .catch((err) => {
        const Error = err
        Rollbar.error(Error)
    })
})

server.delete('/delete', function(req,res) {
    let name = req.body
    rollbar.info('Someone made an attempt to delete a user')
    res.send('Delete data')
    db("NAMES")
    .insert(name)
    .then((ids) => {
      res.status(201).json(ids);
    })
    .catch((err) => {
        const Error = err
        console.log('ERROR', Error)
        rollbar.error(Error)
    })
})

server.use(rollbar.errorHandler());