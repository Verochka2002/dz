Vue.component("goods-item", {
    props: ["item"],
    template: `
        <div class="goods-item">
           <div>{{ item.title }}</div>
           <div></div>
           <custom-button  class="addBtn"  @click="$emit('click', item)">добавить</custom-button>
           <div>{{ item.price }}</div>
        </div>
    `,
});