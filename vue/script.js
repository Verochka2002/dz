const GOODS = [{ title: 'Shirt', price: 150 },
{ title: 'Socks', price: 50 },
{ title: 'Jacket', price: 350 },
{ title: 'Shoes', price: 250 },
]

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
Vue.component(' basket-goods-item', {
    props: ['item'],
    template: ` 
    <div class=" basket-goods-item">
    <div>{{ item.title }}</div>
    <div>{{ item.price }}</div>
    <div></div>
    </div>
    `
})

Vue.component('basket-card', {
    template: `
        <div class="basket-card">

        </div>
    `
})

const app = new Vue({
    el: '#app',
    data: {
        goods: GOODS,
        goodsFiltered: GOODS,
        vision: false,
        searchString: '',
        price: 10000,
        basketCardVision: false,
        cart: [],
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
    },
    computed: {
        shop: function () {
            return 'Shop'
        }
    }

});