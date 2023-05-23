//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const dotenv=require("dotenv");

dotenv.config();
const homeStartingContent = "Welcome to Daily Journal, a virtual corner dedicated to sharing inspiration, knowledge, and personal experiences. Here, we strive to create a community that fosters creativity, growth, and connection.";
const aboutContent = "Hello, I'm Mohan, the creator behind Daily Journal. As a passionate Developer, I have always found solace and inspiration in creating new projects. Through this project, I aim to combine my love for developing with my desire to create something useful for others.";
const contactContent = "We would love to hear from you! Whether you have a question, a suggestion, or simply want to say hello, we're here to listen and connect.";
const uri=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.t4yeixy.mongodb.net/?retryWrites=true&w=majority/BlogDB`;
mongoose.connect(uri);

const blogschema={
  title: String,
  blog: String
};
const Blog=mongoose.model("Blog",blogschema);
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function (req, res) {
  Blog.find({}).then((blog) => {
    res.render('home',{HomeContent:homeStartingContent,posts:blog});
    
  })
  .catch((err) => {console.log(err);});
  
  });  
app.get('/about', function (req, res) {
  res.render('about',{AboutContent:aboutContent});
 });
 app.get('/contact', function (req, res) {
  res.render('contact',{ContactContent:contactContent});
 });
 app.get('/compose', function (req, res) {
  res.render('compose');
 });
app.get('/posts/:page',function (req, res) {
  var par=req.params.page;
  
  Blog.findOne({_id:par})
  .then((foundblog) => {
    res.render('post',{title:foundblog.title,post:foundblog.blog});
  })
  .catch((err) => {console.log(err);});
  
});
app.post('/compose', function (req, res) {
 
  const newblog=new Blog({
    title:req.body.titlee,
    blog:req.body.postt
  });
  newblog.save()
  .then(() => {
   console.log("saved");
})
.catch(e => {console.log(e)});
  
  res.redirect("/");
});












app.listen(3000, function() {
  console.log("Server started");
});