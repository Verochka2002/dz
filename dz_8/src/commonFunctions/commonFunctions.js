export const transformGoods = function (goods) {
    return goods.map((_good) => {
        return {
            id: _good.id_product,
            title: _good.product_name,
            price: _good.price,
        };
    });
};