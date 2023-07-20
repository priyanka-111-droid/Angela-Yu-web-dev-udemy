import express from 'express';
import bodyParser from 'body-parser';


const app=express();
const port = 3000;
const allTasks=[];
let currentDate = new Date().toJSON().slice(0, 10);


//MIDDLEWARE
app.use(express.static("public")); //use static files
app.use(bodyParser.urlencoded({extended:true})); //access body of req

//ROUTES
app.get("/",(req,res)=>{
    res.render("index.ejs",{allTasks:allTasks});
})

app.post("/submit",(req,res)=>{
    let newTask = req.body.task;
    let taskDate = req.body.date;
    allTasks.push({newTask,taskDate});
    res.render("index.ejs",{allTasks:allTasks});
})

app.get("/today",(req,res)=>{
    res.render("today.ejs",{allTasks:allTasks,currentDate:currentDate});
})


app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`);
});