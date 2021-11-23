export const BtnLog = btn => ({
    name: 'BtnLog',
    methods: {
        sendData(value) {
            localStorage.setItem('formResult', JSON.stringify(value));
            console.log(value.firstField + ', ' + value.secondField);
        }
    },
    render(h) {
        const vm = this;
        return h(
            btn,
            {
                props: {
                    ...vm.$attrs
                },
                nativeOn: {
                    click: () => {
                        vm.sendData(vm.$attrs.inputValue);
                        vm.$emit('resetForm', vm);
                    }
                }
            },
            vm.$slots.default
        );
    }
});