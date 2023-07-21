import bodyParser from 'body-parser';
import express from 'express';
import {dirname} from "path";
import {fileURLToPath} from "url";
import morgan from 'morgan';
const __dirname = dirname(fileURLToPath(import.meta.url));


const app=express();
const port=3000;
let finalname;

//middleware
app.use(bodyParser.urlencoded({extended:true}));

function namegenerator(req,res,next){
    finalname = req.body.firstname+" "+req.body.lastname;
    next();
}

app.use(namegenerator);

//GET request is used to get back stuff user wants
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
})
//POST request to submit form
app.post('/submit',(req,res)=>{
    res.send(`<h1>${finalname}</h1>`)
})


app.listen(port,()=>{
    console.log(`app running on http://localhost:${port}`);
})
