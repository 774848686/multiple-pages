import {
  reportLog
} from '@/utils';
const mixins = {
  computed: {
    isVersion1() {
      return process.env.VUE_APP_LUCKY_VERSION == 'v1'
    },
    isDetainNew() {
      return process.env.VUE_APP_PACKAGE_VERSION == 'v1'
    }
  },
  methods: {

  }
}
export default mixins;
