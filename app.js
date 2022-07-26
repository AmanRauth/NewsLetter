const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");
const response  = require("express");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){

    var fName=req.body.fName;
    var lName=req.body.lName;
    var mail=req.body.mail;

    var data={
        members:[
            {
                email_address: mail,
                status :"subscribed",
                merge_fields :{
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    var jsonData=JSON.stringify(data);

    const url="https://us14.api.mailchimp.com/3.0/lists/ec260b618e" ;

    const options={
        method: "POST",
        auth: "bonger1:50e51363ae03a7e0b376d9d7134d0401-us14"
    }

    const request=https.request(url,options,function(response){
        if(response.statusCode===200)
            res.sendFile(__dirname+"/success.html")
        else
            res.sendFile(__dirname+"/failure.html")
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    
    request.write(jsonData);

    request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("server running on port 3000")
});









//API KEY : 50e51363ae03a7e0b376d9d7134d0401-us14
//list id : ec260b618e