const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/api/rates', (req,res,next)=>{
        const base = req.query.base;
        const currency = req.query.currency;
        fetch(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`)
        .then(response=>{
            if(response.ok){
            response.json().then(data=>{
                const output = { 
                    results:{
                    base: data.base,
                    date: data.date,
                    rates: data.rates
                }
            }
            res.send(output);
            })
            }else{
                throw 'Something went wrong'
            }
        })
        .catch(error=>{
            res.json({
                status: 404,
                message: 'A problem Occured!'
            })
        })
        
});
app.use((req, res, next)=>{
    res.status(404);
    res.send({
        error: 'End Point Not Found'
    })
});

PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Now running on port ${PORT}!`);
})