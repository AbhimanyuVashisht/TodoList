/**
 * Created by av on 12/7/17.
 */



 const express = require('express');
 const path = require('path')
 const app = express();
 const Todos = require('./db').Todos;
 const bp = require('body-parser');
 app.use('/', express.static(__dirname+'/public_static'));

 app.use(bp.urlencoded({extended: true}));
 app.use(bp.json());


 app.get('/todos',(req,res) =>{
     Todos.findAll().then(function (todos) {
         res.send(todos);
     }).catch(function (err) {
         res.send({error: "Could not retrieve todos"});
     })
 });


 app.post('/todos', (req, res) => {
     Todos.create({
         task: req.body.task,
         done: req.body.done
     }).then(function () {
         res.send({success: true});
     }).catch(function (err) {
         res.send({error: "Could not post"});
     })
 });

 app.listen(8000, function(){
     console.log("ServerRunning on http://localhost:8000/");
 });