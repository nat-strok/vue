const GuestBtnMore = {
    name: 'GuestBtnMore',
    data() {
        return {
            showMore: [
                {
                    title: 'Показать еще',
                    event: 'show-more',
                },
                {
                    title: 'Показать все',
                    event: 'show-all'
                }
            ]

        }
    },
    template: `
    <div class="guest-btn">
        <button v-for="item in showMore" v-on:click="$emit(item.event)">{{item.title}}</button>
    </div>
  `
}