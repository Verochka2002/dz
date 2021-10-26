

const GET_GOODS_URL = "http://localhost:8000/goods.json";
const ADD_GOOD_URL = "http://localhost:8000/api";
const GET_BASKET_GOODS_URL = "http://localhost:8000/goods-basket.json";
const DELETE_GOOD_URL = "http://localhost:8000/basket";

const transformGoods = function (goods) {
    return goods.map((_good) => {
        return {
            id: _good.id_product,
            title: _good.product_name,
            price: _good.price
        }
    })
};

const service = (method, path, body) => (
    new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, path, true);
        if (body) {
            xhr.setRequestHeader('Content-type', 'application/json');
        }
        xhr.send(body);
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
    <button :style="style" >
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
           <custom-button  class="addBtn"  @click="$emit('click', item)">добавить</custom-button>
           <div>{{ item.price }}</div>
        </div>
    `,
});

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        goodsFiltered: [],
        basketGoods: [],
        vision: false,
        searchString: '',
        basketCardVision: false,
    },
    mounted: function () {
        service('GET', GET_GOODS_URL).then((goods) => {
            const resultGoods = transformGoods(goods);
            this.goods = goods;
            this.goodsFiltered = goods;
        })
        service('GET', GET_BASKET_GOODS_URL).then((basketGoods) => {
            this.basketGoods = basketGoods;
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
        },
        addGood: function (title, price) {
            service('PATCH', ADD_GOOD_URL, JSON.stringify({ title, price })).then((_basketGoods) => {
                this.basketGoods = _basketGoods;
            })
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