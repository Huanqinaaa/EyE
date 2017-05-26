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
/*app.get('/add',function (req,res){ // get a list
    fs.createReadStream('./index.html').pipe(res); 
}); */

app.get('/list',function (req,res){ 
    getInfo(function (data){
        res.send(data);
    });
});

app.get('/detail/:id',function (req,res){ // get one 
    var id= req.params.id;
    console.log(id);
    getInfo(function (data){
        var eye = data.find(function (item){
            return item.id == id;
        });
        setInfo(data,function (){
            res.send(eye);
        })
    })
});

app.post('/list',function (req,res){ // save the data that you input
    var eye = req.body;
    var total = 0;
    eye.spend = Number(eye.spend);
    getInfo(function (data){
        eye.id = data.length ? data[data.length - 1].id + 1 : 1;
        data.push(eye);
      /*  data.forEach(function(item, index){
            total = total + item.spend;
        });*/
        console.log(total);
        setInfo(data,function (){
            res.send(data);
        })
    });


   
});

app.listen(8004,function(){
    console.log("http://localhost:8004");
})