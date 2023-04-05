const express = require('express');
const mongoose = require('mongoose');
const empModel = require('./model');

const app = express();

app.use(express.json())

//Route
app.get('/', (req, res)=>{
    res.send('<h1>Hello Siri...</h1>')
})



//create an entry
app.post('/employee', async(req, res)=>{
    try{
        const employee = await empModel.create(req.body);
        res.status(200).json(employee);
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
});

//Fetch all employees data
app.get('/employees', async(req, res)=>{
    try{
        const employees = await empModel.find();
        res.status(200).json(employees)
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
});

//fetch employee data by ID
app.get('/employee/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const employee = await empModel.findById(id);
        res.status(200).json(employee)
    }catch(error){
        console.log(error.message);
        res.send(500).json({message:error.message})
    }
});

//update or edit employee data
app.put('/employee/:id', async(req, res)=>{
    try{
        const{id} = req.params;
        const employee = await empModel.findByIdAndUpdate(id, req.body);
        if(!employee){
            res.status(404).json({message:'employee not found'})
        }
        const upDatedEmp = await empModel.findByIdAndUpdate(id, req.body);
        res.status(200).json(upDatedEmp);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

//delete employee details
app.delete('/employee/:id', async(req, res)=>{
    try{
        const {id} = req.params
        const employee = await empModel.findByIdAndDelte(id);
        if(!employee){
            res.status(404).json({message:'employee not found'})
        }
        res.status(200).json({message:'successfully deleted'});

    }catch(error){
        console.log(error.message);
        res.send(500).json({message:error.message})
    }
})



mongoose.connect('mongodb+srv://sireesha:sireesha@cluster0.5htup6m.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log("DB connected...."))
.catch(err => console.log(err));


app.listen(4000, ()=>console.log("server is running siri..."))