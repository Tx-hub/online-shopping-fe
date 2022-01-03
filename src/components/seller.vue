<template>
  <div>
    <div>
      <h2> 此页面为商家专属页面</h2>
    </div>
    <el-button type="button" @click="server_register">接收用户购买提醒</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  created () {
    this.server_register()
    this.initWebSocket()
  },
  methods:{
    server_register(){
      this.$http.post("signup/server_register")
      this.$message.success("接收成功")
    },
    initWebSocket(){
      const wsuri = "ws://localhost:3000/";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonmessage(e){ //数据接收
      this.$notify({
        title: '有用户下单啦',
        message: e.data,
        type: 'success'
      });
    },
  },
}

</script>
<!--<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js">-->
<!--// var vue = new Vue()-->
<!--// vue.$message.success("成功")-->
<!--// var ws = new WebSocket('ws://localhost:3000/');-->
<!--// // 这里接受服务器端发过来的消息-->
<!--// ws.onmessage = function(e) {-->
<!--//   alert(e+"购买了您的商品")-->
<!--// }-->
<!--// </script>-->
