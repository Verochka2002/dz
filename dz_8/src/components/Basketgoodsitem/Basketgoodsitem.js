Vue.component("basket-goods-item", {
    props: ["item"],
    data: function () {
        return {
            style: {
                padding: "10px",
                color: "black",
                display: "grid",
                gridTemplateColumns: "min-content 1fr min-content",
            },
        };
    },
    template: `
    <div class="basket-goods-item" :style="style" >
    <div>{{ item.title }}</div>
    <div class="item_price">{{ item.price }}</div>
    <custom-button @click="$emit('delete')">удалить</custom-button>
  </div>
 `,
});