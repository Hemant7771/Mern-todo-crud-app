const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const Task = require("./models/Task");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://admininterior:Hemant%402001@interiordesigner.cit4heo.mongodb.net/todoDB?retryWrites=true&w=majority&appName=InteriorDesigner")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));


// CREATE TASK
app.post("/add", async (req,res)=>{
  const {text} = req.body;
  const task = new Task({text});
  await task.save();
  res.send(task);
});


// READ TASK
app.get("/tasks", async(req,res)=>{
  const tasks = await Task.find();
  res.send(tasks);
});


// UPDATE TASK
app.put("/update/:id", async (req,res)=>{
  const {id} = req.params;
  const {text} = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {text},
    {new:true}
  );

  res.send(updatedTask);
});


// DELETE TASK
app.delete("/delete/:id", async (req,res)=>{
  const {id} = req.params;

  await Task.findByIdAndDelete(id);

  res.send({message:"Task deleted"});
});


app.listen(5000,()=>{
  console.log("Server running on port 5000");
});