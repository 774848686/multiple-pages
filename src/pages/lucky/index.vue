<!-- lucky -->
<template>
  <div class="lucky">
    lucky
    <span class="version-test">
      {{version?'v1':''}}
    </span>
  </div>
</template>

<script>
  import mixins from '@/mixins';
  export default {
    components: {},
    mixins: [mixins],
    computed: {
      version() {
        return this.isVersion1
      }
    },
    data() {
      return {

      };
    },

    created() {
      console.log(this.isVersion1)
    },

    mounted() {

    },

    methods: {

    }
  }

</script>
<style lang='scss' scoped>
</style>
