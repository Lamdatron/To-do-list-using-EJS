const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine' ,'ejs');
app.use(bodyParser.urlencoded({extended : true}) );
app.use(express.static("public"));
var items =[];
var workItems = [];
app.get("/",function(req,res){

  var today = new Date();
  var day ="";
  var options = {
    weekday : "long",
    day : "numeric",
    month : "long"
  };
  var day = today.toLocaleString("en-US" , options);
 res.render("list" , {listTitle : day,
             newListItem : items}
                );
});

app.post("/" , function(req,res){
  console.log(req.body);
  var item = req.body.newItem;
  items.push(item);
  res.redirect("/");
})

app.get("/work" , function(req,res){
  res.render("list" , {listTitle : "workList" , newListItem : workItems});
});

app.post("/work",function(req,res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});
app.listen(3000,function(){
  console.log("Server is running at port 3000");
});
