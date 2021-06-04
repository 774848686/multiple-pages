<template>
    <component :is="component" @close="close" @conform="conform" :compOptions="compOptions" v-if="component" />
</template>

<script>
export default {
    props: {
        compName: {
            type: String,
            default: "CompA",
        },
        compOptions: {
            type: Object,
            default () {
                return {};
            },
        },
    },
    computed: {
        loadComp() {
            if (!this.compName) {
                return null;
            }
            return () =>
                import (`../comps/${this.compName}`);
        },
    },
    data() {
        return {
            component: null,
        };
    },
    mounted() {
        if ("function" === typeof this.loadComp) {
            this.component = () => this.loadComp();
        }
    },
    methods: {
        conform(data) {
            this.$emit('conform',data);
        },
        close(){
            this.$emit('close');
        }
    },
    watch: {
        compName(val) {
            this.component = () => this.loadComp();
        },
    },
};
</script>

<style>

</style>