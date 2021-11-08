let app = new Vue({
    el: '#app',
    data: {
        tabs: [
            {
                id: 1,
                nav: 'Tab 1',
                content: ['Content 1', 'Content 1...2', 'Content 1...3', 'Content 1...4'],
                isActive: true
            },
            {
                id: 2,
                nav: 'Tab 2',
                content: ['Content 2', 'Content 2...2', 'Content 2...3', 'Content 2...4', 'Content 2...5'],
                isActive: false
            },
            {
                id: 3,
                nav: 'Tab 3',
                content: ['Content 3', 'Content 3...2', 'Content 3...3'],
                isActive: false
            },
        ],
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
            }
        ]
    },
    methods: {
        setActive(item, arr) {
            arr.forEach(el => el.isActive = el === item);
        }
    },
    computed: {
        currentTab: function () {
            return this.tabs.reduce((accum, curr) => curr.isActive ? curr : accum, {});
        },
        currentColor: function () {
            return this.colors.reduce((accum, curr) => curr.isActive ? curr : accum, {});
        }
    }
})