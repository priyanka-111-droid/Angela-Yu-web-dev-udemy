import express from 'express';
import axios from 'axios';
import bodyParser from "body-parser";

const app=express();
const port=3000;
const AGIFY_URL = "https://api.agify.io/";
const GENDERIZE_URL = "https://api.genderize.io/";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Waiting for data..." });
});
  
app.post("/get-age",async(req,res)=>{
    try{
    const response = await axios.get(AGIFY_URL,{
        params:{
           name: req.body.name
        }
    });
    res.render('index.ejs',{agecontent:response.data});
    }
    catch(error){
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
   
})

app.post("/get-gender",async(req,res)=>{
    try{
    const response = await axios.get(GENDERIZE_URL,{
        params:{
           name: req.body.name
        }
    });
    res.render('index.ejs',{gendercontent:response.data});
    }
    catch(error){
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
    
})


app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
});