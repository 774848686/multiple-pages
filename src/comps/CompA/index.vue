<!-- comp D -->
<template>
  <div class="comp">
    <div class="message message-service">
      <ul>
        <p class="time" v-if="serviceMessages.length">
          <span>{{ curDate | formatTime }}</span>
        </p>
        <li v-for="(item,index) in serviceMessages" :key="index">
          <div class="main fadeInUp">
            <img class="avatar" :src="item.headUrl" />
            <div class="text" v-if="item.msgType==1">{{ item.msg }}</div>
            <div :class="`wx-hb ${isObtained || item.selected?'selected':''}`" @click="obtainPackage(item)" v-else>
              <span>恭喜发财 大吉大利</span>
              <span v-if="isObtained || item.selected">已领取</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="message message-custom" v-if="false">
      <ul>
        <p class="time">
          <span>{{ curDate | formatTime }}</span>
        </p>
        <li v-for="(item,index) in customMessages" :key="index">
          <div class="main self fadeInUp">
            <div class="text">{{ item.content }}</div>
            <img class="avatar" :src="user.img" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    messageData
  } from '@/api/lucky';
   import {
    format
  } from '@/utils';
  export default {
    props: {
      isObtained: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    filters: {
      formatTime(val) {
        return val;
      }
    },
    data() {
      return {
        messages: [{
          id: 1,
          date: '6月03日 11:25',
          avatar: '',
          content: '618快到啦',
          avatar: require('./images/1.jpg'),
          isPackage: false,
          selected: false
        }, {
          id: 2,
          date: '6月03日 11:25',
          content: '端午节也快到啦',
          avatar: require('./images/2.png'),
          isPackage: false,
          selected: false
        }, {
          id: 3,
          date: '6月03日 11:25',
          content: '为了庆祝双节，我们发个红包庆祝一下吧',
          avatar: require('./images/3.jpg'),
          isPackage: false,
          selected: false
        }, {
          id: 4,
          date: '6月03日 11:25',
          content: '赶紧来吧，坐等福利',
          avatar: require('./images/2.png'),
          isPackage: false,
          selected: false
        }, {
          id: 5,
          date: '6月03日 11:25',
          avatar: '',
          content: '+1',
          avatar: require('./images/1.jpg'),
          isPackage: false,
          selected: false
        }, {
          id: 6,
          date: '6月03日 11:25',
          content: '红包来了',
          avatar: require('./images/3.jpg'),
          isPackage: true,
          selected: false
        }],
        serviceMessages: [],
        curDate: format(new Date(),'MM月dd日 hh:mm'),
        customMessages: [{
          date: '6月03日 11:25',
          content: '这是一个测试对话'
        }]
      };
    },

    created() {
      this.messageData();
    },

    mounted() {

    },

    methods: {
      stackTask() {
        let count = 0;
        this.serviceMessages.push(this.messages[count]);
        let timer = setInterval(() => {
          count++;
          if (count < this.messages.length) {
            this.serviceMessages.push(this.messages[count]);
          } else {
            clearInterval(timer);
          }
        }, 1000)
      },
      obtainPackage(item) {
        if (this.isObtained) return;
        item.selected = true;
        this.serviceMessages.forEach(s => {
          if (item.id == s.id) {
            s = item;
          }
        });
        this.$emit('obtain', item);
      },
      messageData() {
        let params = {
          tid: this.$route.query.tid
        }
        messageData(params).then(res => {
          this.messages = res.returnValue;
          this.stackTask();
          this.$emit('request');
        })
      }
    }
  }

</script>
<style lang='scss' scoped>
  .comp {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #eee;

    .message {
      padding: 10px 40px;
      overflow-y: scroll;

      li {
        margin-bottom: 30px;
      }

      .main {
        display: flex;
        align-items: flex-start;

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0)
          }

          to {
            opacity: 1;
            -webkit-transform: none;
            transform: none
          }
        }

        &.fadeInUp {
          animation-name: fadeInUp;
          animation-duration: .75s
        }
      }

      .time {
        padding: 14px 0;
        text-align: center;

        >span {
          display: inline-block;
          font-size: 26px;
          color: #888888;
          border-radius: 2px;
        }
      }

      .avatar {
        margin: 0 10px 0 0;
        border-radius: 3px;
        width: 80px;
        height: 80px;
      }

      .text {
        display: inline-block;
        max-width: 550px;
        position: relative;
        padding: 18px 20px;
        min-height: 60px;
        line-height: 1.8;
        display: flex;
        align-items: center;
        font-size: 28px;
        text-align: left;
        word-break: break-all;
        background-color: #fafafa;
        border-radius: 8px;
        margin-left: 5px;

        &:before {
          content: " ";
          position: absolute;
          top: 9px;
          right: 100%;
          border: 6px solid transparent;
          border-right-color: #fafafa;
        }
      }

      .wx-hb {
        position: relative;
        width: 496px;
        height: 172px;
        background: url(./images/wx_hb_img.png) no-repeat center;
        background-size: 100% 100%;

        span:nth-child(1) {
          display: inline-block;
          color: #ffffff;
          font-size: 32px;
          text-align: center;
          margin-left: 120px;
          font-weight: bolder;
          margin-top: 40px;
        }

        &.selected {
          opacity: 0.45;

          span:nth-child(1) {
            display: inline-block;
            color: #ffffff;
            font-size: 32px;
            text-align: center;
            margin-left: 120px;
            font-weight: bolder;
            margin-top: 20px;
          }

          span:nth-child(2) {
            position: relative;
            display: inline-block;
            color: #ffffff;
            font-size: 24px;
            text-align: center;
            margin-left: 120px;
            font-weight: bolder;
            top: -10px;
          }
        }

        &:before {
          content: " ";
          position: absolute;
          top: 16px;
          right: 99%;
          border: 6px solid transparent;
          border-right-color: #fb9d3f;
        }
      }

      .self {
        text-align: right;
        display: flex;
        justify-content: flex-end;

        .avatar {
          float: right;
          margin: 0 0 0 10px;
        }

        .text {
          background-color: #b2e281;

          &:before {
            right: inherit;
            left: 100%;
            border-right-color: transparent;
            border-left-color: #b2e281;
          }
        }
      }
    }
  }

</style>
