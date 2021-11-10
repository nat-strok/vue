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
        colors: ['red', 'green', 'blue', 'white'],
        currentColor: ''
    }
});