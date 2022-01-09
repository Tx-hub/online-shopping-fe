<template>
  <div>
    <div>
      <h2> 此页面为商家专属页面</h2>
    </div>
    <el-button type="button" @click="sendMessage">接收用户购买提醒</el-button>
  </div>
</template>
<script>
export default {
  sockets: {
    connecting() {
      console.log('正在连接')
    },
    disconnect() {
      console.log("Socket 断开");
    },
    connect_failed() {
      cosnole.log('连接失败')
    },
    connect() {
      console.log('socket connected')
    },
    TEAM_NOTICE (data) {
      this.websocketonmessage(data)
    }
  },
  data() {
    return {

    }
  },

  mounted () {
    this.$socket.open()
    this.sockets.subscribe('TEAM_NOTICE', (data) => {
      console.log(data)
    })
  },
  methods:{
    sendMessage() {
      // this.$socket.emit('login', '这里是客户端')
      this.$message.success("发送成功")
      const redis = require('redis')
      const rc = redis.createClient("49.235.114.73:6379");
      rc.del("tuxiao")
    },
    websocketonmessage(e){ //数据接收
      const redis = require('redis')
      const rc = redis.createClient("49.235.114.73:6379");
      rc.del("tuxiao")
      console.log("成功删除")
      this.$notify({
        title: '有用户下单啦',
        message: "用户名:"+e.text.username+"   时间"+e.text.time,
        type: 'success'
      });
    },
  },
}

</script>

