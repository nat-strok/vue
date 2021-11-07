let app = new Vue({
    el: '#app',
    data: {
        popupBtnStart: {
            text: 'Open popup',
            class: 'popup-open'
        },
        popup: {
            isActive: false
        },
        colors: [
            {
                name: 'red',
                isActive: false
            },
            {
                name: 'green',
                isActive: false
            },
            {
                name: 'blue',
                isActive: false
            },
            {
                name: 'white',
                isActive: false
            }
        ]
    },
    methods: {
        setActive() {
            this.popup.isActive = true;
        },
        setInactive() {
            this.popup.isActive = false;
        },
        changeColor(item) {
            this.colors.forEach(el => {
                el.isActive = el === item;
            })
        }
    },
    computed: {
        currentColor: function () {
            return this.colors.reduce((accum, curr) => curr.isActive ? curr : accum, {});
        }
    }
});