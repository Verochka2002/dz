const express = require('express');
const cors = require('cors');
const { addItems } = require('./comonFunction');
const { FILTERED_GOODS_PATH } = require('./constants')


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('./static'));

app.patch('/api', (res, req) => {
    addItems(FILTERED_GOODS_PATH, request.body).then((goods) => {
        resolve.setHeader('Content-type', 'application/json');
        resolve.send(goods);
    })

})

app.delete('/basket', (request, resolve) => {
    removeFromBasket(request.body.id).then((goods) => {
        resolve.setHeader('Content-type', 'application/json');
        resolve.send(goods);
    });
});

app.use(express.json());

app.get('/', (res, req) => {
    req.send('test');
});

app.listen('8000', () => {
    console.log('server is run')
})