let app = new Vue({
    el: '#app',
    data: {
        tabs: [
            {
                id: 1,
                nav: 'Tab 1',
                content: ['Content 1', 'Content 1...2', 'Content 1...3', 'Content 1...4'],
            },
            {
                id: 2,
                nav: 'Tab 2',
                content: ['Content 2', 'Content 2...2', 'Content 2...3', 'Content 2...4', 'Content 2...5'],
            },
            {
                id: 3,
                nav: 'Tab 3',
                content: ['Content 3', 'Content 3...2', 'Content 3...3'],
            },
        ],
        colors: ['red', 'green', 'blue'],
        currentTab: 1,
        currentColor: ''
    }
})