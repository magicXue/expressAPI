const express = require('express');

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("starting listen on port 3000");
});
const tasks = new Array();
app.post('/tasks', function(req, res){
    const { description } = req.body;
    var newId = 0;
    if(tasks.length > 0){
        newId = tasks[tasks.length-1].id+1;
    }
    tasks.push({
        id: newId,
        description: description,
        done: 'false',
    });
    res.json({message: "New task created."});
    console.log(tasks);
});
app.get('/tasks', function(req, res){
    res.json(tasks);
});
app.get('/tasks/:id', function(req, res){
    var curr = tasks.filter(function(task){
        if(task.id == req.params.id){
           return true;
        }
     });
     if(curr.length == 1){
        res.json(curr[0])
     } else {
        res.status(404);//Set status to 404 as task was not found
        res.json({message: "Not Found"});
     }
});
app.put('/tasks/:id', function(req, res){
    var updateIndex = tasks.map(function(task){
        return task.id;
     }).indexOf(parseInt(req.params.id));
     if(updateIndex != -1){
        const { description } = req.body;
        tasks[updateIndex]['description'] = description;
        res.json(tasks[updateIndex]);
     } else {
        res.status(404);//Set status to 404 as task was not found
        res.json({message: "Not Found"});
     }
});
app.delete('/tasks/:id', function(req, res){
    var removeIndex = tasks.map(function(task){
        return task.id;
    }).indexOf(parseInt(req.params.id));
    if(removeIndex != -1){
        tasks.splice(removeIndex, 1);
        res.json({message: "Deleted it"});
    } else {
        res.status(404);//Set status to 404 as task was not found
        res.json({message: "Not Found"});
    }
});