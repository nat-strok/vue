const app = new Vue({
    el: '#app',
    components: {
        NewsList
    },
    data: {
        newsList: [],
        loaded: true
    },
    methods: {
        getData(){
            const res = fetch('https://jsonplaceholder.typicode.com/posts')
            .then(async (res) => {
                const data = await res.json();
                this.newsList = data;
                this.loaded = false;
            })
            .catch((error) => console.log(error.message));
        }
    },
    watch: {
        '$route'() {
            this.getData()
        }
    },
    created: function () {
        setTimeout(this.getData, 1000);
    }
})
