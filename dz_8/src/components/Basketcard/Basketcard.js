Vue.component("basket-card", {
    props: ["textHeader"],
    data: function () {
        return {
            styles: {
                root: {
                    display: "grid",
                    gridTemplateRows: "min-content 1fr min-content",
                },
                header: {
                    padding: "20px",
                    background: "lightgrey",
                    color: "black",
                    display: "flex",
                    justifyContent: "space-between",
                },
            },
        };
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
`,
});
