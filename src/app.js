const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

// define paths for express config
const publicDirect=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials') 

//setup habndelbars engine and views location
app.use(express.static(publicDirect))
app.set('views',viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.get('/index', (req,res)=>{
    res.render('index',{
        title:'weather app',
        nam: 'sheroze rehman'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About me',
        nam: 'sheroze rehmna'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:'contact our team',
        nam: 'andrew  meads ',
        descrip:'hi how we may help you'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forcastdata) => {
            if(error){
                return res.send({error})
                    }
res.send({
    forecast: forcastdata,
    location ,
    address: req.query.search
})
                })
    })
    // res.send({
    //     forecast:'its raining',
    //     loction:'karachi',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
console.log(req.query.search)
red.send({
    products: []
})
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        nam:'sheroze rehman',
            errorMessage:'help article not found'
    })
})

app.get('*',(req,res)=>{
res.render('404',{
    title:'404',
    nam:'sheroze',
    errorMessage:'Page not found'
})
})

app.listen(3000,()=>{
    console.log('server is up 3000.')
})