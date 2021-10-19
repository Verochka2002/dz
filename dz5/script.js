const GOODS = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const CORE_API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GET_GOODS_URL = "/catalogData.json";
const GET_BASKET_GOODS_URL = "/getBasket.json ";

const transformGoods = function (goods) {
    return goods.map((_good) => {
        return {
            id: _good.id_product,
            title: _good.product_name,
            price: _good.price
        }
    })
};

const service = (method, postfix) => (
    new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, `${CORE_API_URL}${postfix}`, true);
        xhr.send();
        xhr.onload = (event) => {
            resolve(JSON.parse(event.target.response));
        }
    })
);

Vue.component('custom-button', {
    data: function () {
        return {
            style: {
                borderRadius: '15px',
                color: 'whitesmoke',
                background: 'yellowgreen',
                border: 'none',
                boxShadow: '2px 2px grey',
                padding: '10px',
                hoverBackgroundColor: 'red'
            }
        }
    },
    template: `
    <button :style="style" @click="$emit('click')">
    <slot></slot>
    </button>
    `
});
Vue.component('basket-goods-item', {
    props: ['item'],
    data: function () {
        return {
            style: {
                padding: '10px',
                color: 'black',
                display: 'grid',
                gridTemplateColumns: 'min-content 1fr min-content',
            }
        }
    },
    template: `
    <div class="basket-goods-item" :style="style">
    <div>{{ item.title }}</div>
    <div>{{ item.price }}</div>
    <custom-button>удалить</custom-button>
  </div>
 `
});

Vue.component('basket-card-header', {
    template: `<custom-button>кнопка</custom-button>`,
}),

    Vue.component('basket-card', {
        props: ['textHeader'],
        data: function () {
            return {
                styles: {
                    root: {
                        display: 'grid',
                        gridTemplateRows: 'min-content 1fr min-content',
                    },
                    header: {
                        padding: '20px',
                        background: 'lightgrey',
                        color: 'black',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }
                }
            }
        },
        template: `
        <div class="basket-card" :style="styles.root">
        <div :style="styles.header">
            <slot name="header"></slot>
        </div>
        <div>
            <slot></slot>
        </div>
        <div :style="styles.header">
        <slot name="footer"></slot>
        </div>
        </div>
    `
    });

Vue.component('goods-item', {
    props: ['item'],
    template: `
        <div class="goods-item">
           <div>{{ item.title }}</div>
           <div></div>
           <button class="addBtn">добавить</button>
           <div>{{ item.price }}</div>
        </div>
    `,
});

const app = new Vue({
    el: '#app',
    data: {
        goods: GOODS,
        goodsFiltered: GOODS,
        vision: false,
        searchString: '',
        basketCardVision: false,
    },
    mounted: function () {
        service('GET', GET_GOODS_URL).then((goods) => {
            const resultGoods = transformGoods(goods);
            this.goods = resultGoods;
            this.goodsFiltered = resultGoods;
        })
    },
    methods: {
        setVision: function () {
            this.vision = !this.vision;
        },
        goodsFilter: function () {
            this.goodsFiltered = this.goods.filter(({ title }) => {
                return new RegExp(this.searchString, 'i').test(title);
            });
        },
        openCard: function () {
            this.basketCardVision = true;
        },
        closeCard: function () {
            this.basketCardVision = false;
        }
    },
    computed: {
        shop: function () {
            return 'Shop'
        },
        classes: function () {
            return {
                container: true,
                body: true,
            }
        }
    }

});