const express = require('express')
const app = express()

app.use((req,res,next)=>{
    res.setHeader('x-server-date',new Date())
    return next();
});

app.get('/throw',(req,res,next)=>{
    //this works fine
    //throw new Error('Sample error')

    //this doesn't
    //throwing error inside callback function
    setTimeout(()=>{
        throw new Error('Sample error')
    },1000);
});

app.get('/error',(req,res,next)=>{
    const err = new Error('Sample error2')
    //this works
    //return next(err)

    //this also works
    setTimeout(()=>{
        return next(err)
    },1000);
});

app.get('/',(req,res,next)=>{
    return res.send('Hello, I am webserver')
});

app.get('/time',(req,res,next)=>{
    return res.send(new Date().toString())
});

app.get('/hello',(req,res,next)=>{
    if(!req.query.name){
        return res.status(400).end()
    }
    return res.send(`Hello ${req.query.name}`)
});

app.get('/user/:name',(req,res,next)=>{
    return res.send(`Userprofile of ${req.params.name}`)
});

app.listen(3000)