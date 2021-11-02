Vue.component("custom-button", {
    data: function () {
        return {
            style: {
                borderRadius: "15px",
                color: "whitesmoke",
                background: "yellowgreen",
                border: "none",
                boxShadow: "2px 2px grey",
                padding: "10px",
                hoverBackgroundColor: "red",
            },
        };
    },
    template: `
    <button :style="style" @click="$emit('click')">
    <slot></slot>
    </button>
    `,
});