const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = '/catalogData.json';
class GoodsItem {
    constructor(product_name = 'default title', price = 0, id_product) {
        this.product_name = product_name;
        this.price = price;
        this.id_product = id_product;
    }
    render() {
        return `
        <div class="goods-item">
        <h3 class="productTitle">${this.product_name}</h3>
        <p class="productPrice">${this.price}</p>
        <button class="addButton" id_product="${this.id_product}">Добавить</button>
        </div>`;
    }
}


//const goodsItem = new GoodsItem('coat', 300)

const service = function (method, postfix) {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, `${API}${postfix}`, true)
        xhr.onload = (event) => {
            resolve(JSON.parse(event.target.responseText));
        }
        xhr.send()
    })
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }
    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
            cb();
        })
    }
    fetchGoods() {
        service('GET', GOODS).then((goodsList) => {
            this.goods = goodsList;
            this.render();
        })
    }
    render() {
        const goodsItems = this.goods.map(({ product_name, price, id_product }) => {
            const goodsItem = new GoodsItem(product_name, price, id_product);
            return goodsItem.render()
        });
        document.querySelector('.goods-list').innerHTML = goodsItems.join('');
    }
    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }

}

let searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', (e) => {
    const value = searchInput.value; //выдает ошибку в этой строчке
    list.filterGoods(value);
});

let BasketEl = document.querySelector('.basket');
let basketTotalValueEl = document.querySelector('.cart-total__price');
const openBasketBtn = document.querySelector('.cart-button');
openBasketBtn.addEventListener('click', function () {
    BasketEl.classList.toggle('hidden');
})

class BasketItem extends GoodsItem { //класс продукт в корзине
    constructor(product_name = 'default title', price = 0, id_product) {
        super(product_name, price, id_product)  //у клсса-родителя берем базовые параметры
    }
    render() { //разметка товаров в корзине
        return `<div class="basket-item">
        <div class="basket-info">
        <h3>${this.product_name}</h3>
        <p>${this.price}</p>
        </div>
        <button class='deleteItem' onclick='deleteItem(${this.id_product})'>Удалить</button>
        </div>`;
    }
}

class Basket { //класс самой корзины
    constructor() {
        this.сartGoods = [];
    }
    fetchGoods() {
        service('GET', GOODS).then((basketList) => {
            this.cartGoods = basketList;
            this.render();
            this.CalcAllProducts();
        })
    }
    render() { //рендеринг страницы корзины со всеми экзеплярами товара.
        const basketItems = this.cartGoods.map(({ product_name, price, id_product }) => {
            const basketItems = new BasketItem(product_name, price, id_product);
            return basketItems.render()
        });
        document.querySelector('.cart-main').innerHTML = basketItems.join('');
    }
    CalcAllProducts() {
        let totalSum = 0;
        for (let id_product in this.сartGoods) {
            totalSum += this.сartGoods[id_product] * products[id_product].price;
        }
        basketTotalValueEl.textContent = totalSum.toFixed(2);
    }
}
onload = () => {
    const goodsList = new GoodsList();
    goodsList.fetchGoods();
    const basketList = new Basket();
    basketList.fetchGoods();
    basketList.CalcAllProducts();
}