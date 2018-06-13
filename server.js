const express=require('express');
const hbs=require('hbs');
const path=require('path');
const fs=require('fs');
const port=process.env.PORT||3000;


var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
//app.set('views', path.join(__dirname, '/views/'));
app.use(express.static(__dirname+'/views'));
app.use((req,res,next) =>
{
  var now=new Date().toString();
  var log=`${now} ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log+'\n',(error) =>
{
  if(error)
  {
  console.log('There was an error');
  }
});
next();
});

hbs.registerHelper('getCurrentYear',()=>
{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>
{
  return text.toUpperCase();
});

app.get('/',(req,res)=> {
  res.render('home.hbs',{
    pageTitle:'Ye tune thik nahi kiya'
  });
});
app.get('/about',(req,res)=> {
  res.render('about.hbs',{
    pageTitle:'Ye tune thik kiya'
  });
});
app.get('/project',(req,res)=> {
  res.render('project.hbs',{
    pageTitle:'Ye kya ho gaya'
  });
});
app.listen(port,()=>
{
  console.log(`The server is on at ${port} port`)
});
