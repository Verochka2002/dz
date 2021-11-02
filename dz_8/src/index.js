import { GET_GOODS_URL, ADD_GOOD_URL, GET_BASKET_GOODS_URL, DELETE_GOOD_URL } from './constants';
import { service } from './service'
import * as components from './components'


const app = new Vue({
    el: "#app",
    data: {
        goods: [],
        goodsFiltered: [],
        basketGoods: [],
        vision: false,
        searchString: "",
        basketCardVision: false,
    },
    mounted: function () {
        service("GET", GET_GOODS_URL).then((goods) => {
            this.goods = goods;
            this.goodsFiltered = goods;
        });
        service("GET", GET_BASKET_GOODS_URL).then((basketGoods) => {
            this.basketGoods = basketGoods;
        });
    },
    methods: {
        setVision: function () {
            this.vision = !this.vision;
        },
        goodsFilter: function () {
            this.goodsFiltered = this.goods.filter(({ title }) => {
                return new RegExp(this.searchString, "i").test(title);
            });
        },
        openCard: function () {
            this.basketCardVision = true;
        },
        closeCard: function () {
            this.basketCardVision = false;
        },
        addGood: function ({ title, price, id }) {
            service("PATCH", ADD_GOOD_URL, JSON.stringify({ title, price, id })).then(
                (_basketGoods) => {
                    this.basketGoods = _basketGoods;
                }
            );
        },
        deleteItem: function (item) {
            service("DELETE", DELETE_GOOD_URL, JSON.stringify({ "id": item.id }))
                .then((_basketGoods) => {
                    this.basketGoods = _basketGoods;
                });
        },
    },

    computed: {
        shop: function () {
            return "Shop";
        },
        classes: function () {
            return {
                container: true,
                body: true,
            };
        },
    },
});