//FRUITS PROJECT

const mongoose = require('mongoose');
let url = 'mongodb://127.0.0.1:27017/fruitsDB';
mongoose.connect(url);

const fruitSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please check data entry,no name specified"]
  },
  rating:{
    type:Number,
    min:1,
    max:10
  },
  review:String
});

//use schema to make model
const Fruit = mongoose.model('Fruit',fruitSchema);//create a collection Fruit(actually a collection of many fruits,done behind the scenes using Lodash)

const fruit = new Fruit({
  name:"Peaches",
  rating:10,
  review:"Pretty solid as a fruit"
});
//validation failed as rating more than 10 

fruit.save();


// const apple = new Fruit({
//   name:"Apple",
//   rating:7,
//   review:"Pretty solid as a fruit"
// });

// const orange = new Fruit({
//   name:"Orange",
//   rating:4,
//   review:"Sour"
// });
// const banana = new Fruit({
//   name:"Banana",
//   rating:3,
//   review:"Weird texture"
// });



// Fruit.insertMany([
//   apple,orange,banana
// ],function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully saved all fruits to fruitsDB");
//   }
// });


//tap into fruits collection using Fruit model
Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  } else {

    mongoose.connection.close();
    fruits.forEach((eachfruit)=>{
      console.log(eachfruit.name);
    })
  }
});





//person collection
const personSchema = new mongoose.Schema({
  name:String,
  age:Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person",personSchema);

const pineapple = new Fruit({
  name:"Pineapple",
  score:9,
  review:"Great fruit"
});

pineapple.save();

const person = new Person({
  name:"Amy",
  age:37,
  favoriteFruit:pineapple
});

person.save();
