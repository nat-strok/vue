const GuestSearch = {
    name: 'GuestSearch',
    props: {
        value: String
    },
    methods: {

        // обнуление для инпута по событию submit
        resetInput(event) {
            event.target.reset();
        }
    },
    template: `
    <form v-on:submit.prevent="resetInput" class="guest-search">
        <label>
            <input type="text"
                    v-bind:value="value"
                    v-on:input="$emit('input', $event.target.value.toLowerCase())" 
                    placeholder="Введите данные">
        </label>
       
    </form>
  `
}