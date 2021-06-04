<template>
  <div id="app">
    pacakge
  </div>
</template>
<script>
  import {
    addDetainNew
  } from '@/utils';
  import mixins from '@/mixins';
  export default {
    components: {},
    mixins: [mixins],
    data() {
      return {}
    },
    created() {
      if (this.isDetainNew) {
        this.addDetainNew();
      }

    },
    methods: {
      addDetainNew() {
        addDetainNew().then(res => {
          alert('后退啦')
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  #app {
    overflow: hidden;

    .sidebar,
    .main {
      height: 100%;
    }

    .text {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
  }

</style>
