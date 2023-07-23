// HINTS:
// 1. Import express and axios
import express from 'express';
import axios from 'axios';

// 2. Create an express app and set the port number.
const app = express();
const port=3000;

// 3. Use the public folder for static files.
app.use(express.static("public")); //use static files
// app.use(bodyParser.urlencoded({extended:true})); //access body of req

// 4. When the user goes to the home page it should render the index.ejs file.
// app.get("/",(req,res)=>{
//     res.render("index.ejs");
// })

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.get('/',async(req,res)=>{
    try{
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const content = (response.data);
    res.render('index.ejs',{secret:JSON.stringify(content.secret),user:JSON.stringify(content.username)});
    }
    catch(error){
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});

// 6. Listen on your predefined port and start the server.
app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
});
