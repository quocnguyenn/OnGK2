const express= require("express")
const aws= require("aws-sdk")
const body_parser=require("body-parser")
const app= express();
app.use(body_parser.urlencoded({extended:true}));
app.use(express.json({extended:false}));
app.set("view engine","ejs");
app.set("views","./views");
//config
const region= "us-east-2";
const accesskeyID="";
const secretAccesskey="";

app.listen(4000,(err)=>{
    if(err)
        console.log("loi",err);
    else
        console.log("server running port 4000")
});

const dynamoDB= new aws.DynamoDB.DocumentClient({
    region:region,
    accesskeyID:accesskeyID,
    secretAccesskey:secretAccesskey
});

app.get("/",(req,res)=>{
    const paramsDSLinhKien={
        TableName:"LinhKien"
    }
    dynamoDB.scan(paramsDSLinhKien,(err,data)=>{
        if(err){
            console.log(JSON.stringify(err,null,2));
        }
        else{
            res.render("index",{
                linhKien: data.Items
            });
        }
    });
});
