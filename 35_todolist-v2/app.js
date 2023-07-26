//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");
const itemSchema = new mongoose.Schema({
  name:String
})

const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({
  name: "Welcome to your todoList"
})

const item2 = new Item({
  name: "Hit the + button to add a new item."
})

const item3 = new Item({
  name: "<-- Hit this to delete an item."
})

const defaultItems = [item1,item2,item3];


const listSchema = new mongoose.Schema({
  name:String,
  items:[itemSchema]
});

const List = mongoose.model("List",listSchema);


app.get("/", function(req, res) {
  Item.find({

  })
  .then((foundItems)=>{
    if(foundItems.length==0){
      Item.insertMany(
        defaultItems
      )
      .catch((err)=>console.log(err));

      res.redirect("/");//redirect back but into else block
    }else{
      //don't run insertMany,just render existing list of items
    res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  })
  .catch((err)=>console.log(err));
});


app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name:itemName
  });

  if(listName=="Today"){
    item.save();
    res.redirect("/"); //go back to GET route
  } else {
    List.findOne({
      name:listName
    })
    .then((foundList)=>{
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName); //show updated UI to user
    })
    .catch((err)=>console.log(err));
  }
});

app.post("/delete",async (req,res)=>{
  const checkedItemId = (req.body.checkbox);
  const listName = req.body.listName;

  if(listName=="Today"){
    Item.deleteOne({
      _id:checkedItemId
    })
    .then(()=>{
      console.log("Successfully deleted");
      res.redirect("/");//so that we can see on UI
    })
    .catch((err)=>console.log(err));
  } else {

    //delete from custom list
    await List.findOneAndUpdate({ //used async and await 
      name:listName
    },
    {
      $pull:{items:{_id:checkedItemId}},
    }
    );
    res.redirect("/"+listName);
  }
})


app.get("/:customListName",(req,res)=>{
  const customListName = _.capitalize(req.params.customListName);

  List.findOne(
    {name:customListName}
  )
  .then((foundList)=>{
    if(!foundList){
      //create new list
      const newList = new List({
        name:customListName,
        items:defaultItems
      });
      newList.save();

      res.redirect("/"+customListName);

    } else {
      //show existing list
      res.render("list",{listTitle: foundList.name, newListItems: foundList.items});
    }
  })
  .catch((err)=>console.log(err));
  
})

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
