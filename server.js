const express = require('express');
const mongoose = require('mongoose');
const ShortUrl= require('./modals/ShortUrl');
mongoose.connect('mongodb://localhost/urlshortner',{
    useNewUrlParser:true , useUnifiedTopology:true
});
let app = express();
app.set('view engine','ejs');

app.get('/',async (req,res)=>{
   const shortUrls =await  ShortUrl.find()
    res.render('index',{shortUrls:shortUrls});
});

app.use(express.urlencoded({extended:true}))

app.post('/shortUrls',async (req,res)=>{
  await ShortUrl.create({TEXT:req.body.formurl})
  res.redirect('/')
})
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ID:req.params.shortUrl})
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.TEXT)
  })

app.listen(8080)
console.log('Running at 5000');
