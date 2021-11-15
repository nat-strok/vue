const GuestBtnActual = {
    name: 'GuestBtnActual',
    props: {
        value: String,
        listDemoNumber: String
    },
    data() {
        return {
            guestCondition: [
                {
                    title: 'Прибывшие',
                    event: 'show-present'
                },
                {
                    title: 'Oтсутствуют',
                    event: 'show-absent'
                }
            ]
        }
    },
    template: `
    <div class="guest-btn">
        <button 
            v-for="item in guestCondition" 
            v-on:click="$emit(item.event)">{{item.title}}</button>
    </div>
  `
}