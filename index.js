const express= require('express');
const app= express();
const fetch= require('node-fetch')


app.get('/',(req,res)=>{
    res.send('this is working')
})

app.get('/api/rates', (req,res,next)=>{
    let baseRate= req.query.base;
    let currency= req.query.currency;
    fetch(`https://api.exchangeratesapi.io/latest?base=${baseRate}&symbols${currency}`)
    .then(response=>{
        return response.json
    })
    .then(data=>{
        let finalResponse= {
            results: {
                base:data.base,
                date:data.date,
                rates:data.rates,
            }

        }
        res.send(finalResponse);
    })
    .catch(error=>{
        res.status(404);
        res.send(error);
    })
})


app.use((req,res,next)=>{
    res.status(404)
    res.send({
        error: 'Not Found'
    })
})


PORT =process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Now running on port ${PORT}`)
})