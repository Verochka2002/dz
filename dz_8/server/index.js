const express = require('express');
const cors = require('cors');
const { addItems } = require('./comonFunction');
const { BASKET_GOODS_PATH } = require('./constants')
const { deleteItems } = require('./comonFunction')


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./static'));

app.patch('/api', (res, req) => {
    addItems(BASKET_GOODS_PATH, res.body).then((items) => {
        req.setHeader('Content-type', 'application/json');
        req.send(items);
    })

})

app.delete('/delete', (req, res) => {
    deleteItems(BASKET_GOODS_PATH, req.body.id).then((items) => {
        console.log(items);
        res.setHeader("Content-type", "application/json");
        res.send(items);
    });
});



app.use(express.json());

app.get('/', (res, req) => {
    req.send('test');
});

app.listen('8000', () => {
    console.log('server is run')
})