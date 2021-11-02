const fs = require('fs');
const { GOODS_PATH, BASKET_GOODS_PATH } = require('./constants');

const readItems = function (path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(data))
        })
    })
};

const writeItems = function (path, items) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(items), (err) => {
            if (err) {
                reject(err)
            }
            resolve(items)
        })
    })
}

const addItems = (path, item) => {
    return new Promise((resolve, reject) => {
        readItems(path).then((items) => {
            const resultItems = [...items];
            item.id = resultItems.length + 1;
            resultItems.push(item);
            writeItems(path, resultItems).then((_resultItems) => {
                resolve(_resultItems)
            }).catch((err) => {
                reject(err);
            })
        })
    })
}

const deleteItems = function (path, id) {
    return new Promise((resolve, reject) => {
        readItems(path).then((_cart) => {
            let cart = [..._cart];
            cart = cart.filter(item => item.id != id);
            writeItems(path, cart).then((items) => resolve(items));
        }).catch((err) => reject(err));
    })
};



module.exports = {
    addItems,
    deleteItems
}