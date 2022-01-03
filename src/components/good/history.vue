<template>
    <el-table
      :data="historylist"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="商品名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="paynum"
        label="购买件数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="付款时间">
      </el-table-column>
    </el-table>
</template>
<script>
export default {
  data(){
    return{
      historyparam:{
        name:'',
        username:'',
        paynum:'',
        created_at:''
      },
      queryInfo: {
        uid:16,
      },
      historylist:[]
    }
  },
  created () {
    this.getallhistory()
  },
  methods:{
    async getallhistory(){
      const uid = window.sessionStorage.getItem('uid')
      this.queryInfo.uid = Number(uid)
      const {data:res} =await this.$http.post("payment/all",{
        params: this.queryInfo
      })
      this.historylist = res.data.historylist
    }
  }
}
</script>
