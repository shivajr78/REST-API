const express = require("express");
const { write } = require("fs");
const app = express();
const path = require("path");
const{v4: uuidv4} = require('uuid');
const methodOverride = require('method-override');


const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "i love coding"
    },
    {
        id: uuidv4(),
        username: "shiva",
        content: "I'm learning MERN Stack Development from Delta"
    },
    {
        id: uuidv4(),
        username: "Soniya",
        content: "I'm pursuing MBBS from Delhi AIIMS"
    }
]

//First API -- to show all the posts
app.get("/posts", (req, res) => { // show all post in home page
    
    res.render("index.ejs", { posts });  // accessing the data from array
})

//Second API -- to create new post  
app.get("/posts/new", (req, res) => { // Process the Form
    res.render("new.ejs");
})
app.post("/posts", (req, res) => { // it accept the data from Form
    let { username, content } = req.body; //In post req the data come in 'req.body'
    let id = uuidv4(); //random id generate for new post
    posts.push({id, username, content }); // add the data to post array
    res.redirect("/posts") //  it redirect the page from Form page to home page
})

//Third API -- it is used to 'show more post'
app.get("/posts/:id", (req, res) => {
    let { id } = req.params; // accessing the id from route
    let post = posts.find((p) => id === p.id); // using id find the data in array
    res.render("show.ejs",{post});
})

// forth API -- update the post
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content; //accessing new content and store to variable
    let post = posts.find((p) => id === p.id);  //finding the post using their id
    post.content = newContent;  //Changing old content to new Content
    res.redirect("/posts")
    
})

//fifth API --edit the router
app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
    
})

//sixth API -- delete/destroy the post

app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id); 
    // it filter out the array; means = finding id ko chod kr baaki ke ids new array m chala jaayega or ab wo humara new array hoga.. jisme finding id nhi hoga jo delete ho jaayega
    res.redirect("/posts")
    
})


app.listen(port, (req, res) => {
    console.log(`Listening to Port ${port} Successfully....`)
})