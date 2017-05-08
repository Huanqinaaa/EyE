var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

function getInfo(callback){ 
    fs.readFile('./eye.json','utf8',function (err,data){
        var eyes = [];
        if(err){
            callback(eyes);
        }else{
            if(data.startsWith('[')){
                eyes = JSON.parse(data);
            }
            callback(eyes);
        }
    });
}

function setInfo(data,callback){
    fs.writeFile('./eye.json',JSON.stringify(data),callback);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/')));
app.get('/',function (req,res){ // get a list
    fs.createReadStream('./index.html').pipe(res); 
    console.log("I am server");
});  

/*app.get('/eye',function (req,res){ 
    getInfo(function (data){
        res.send(data);
    });
});*/

app.get('/eye/:id',function (req,res){ // get one 
    var id= req.params.id;
    getInfo(function (data){
        var eye = data.find(function (item){
            return item.id == id;
        });
        setInfo(data,function (){
            res.send(eye);
        })
    })
});

app.post('/add',function (req,res){ // save the data what you input
    var eye = req.body;
    getInfo(function (data){
        eye.id = data.length ? data[data.length - 1].id + 1 : 1;
        data.push(eye);
        setInfo(data,function (){
            res.send(eye);
        })
    })
});

app.listen(8004,function(){
    console.log("http://localhost:8004");
})