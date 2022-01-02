<template>
  <div>
    <el-input placeholder="请输入内容" v-model="queryInfo.query" >
      <el-button slot="append" icon="el-icon-search" @click="getshoplist"></el-button>
    </el-input>


    <el-row>
      <ul class="infinite-list"  style="overflow:auto">
        <li v-for="i in this.shoplist" class="infinite-list-item" :model="payment">
<!--          <el-col :span="8" v-for="(o, index) in 6" :key="o" :offset="index > 0 ? 2 : 0">-->
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://img.alicdn.com/imgextra/i2/504930169/O1CN01rG914I1D7ReYubN0F_!!0-saturn_solar.jpg_468x468q75.jpg_.webp" class="image">
              <div style="padding: 14px;">
                商品名:<span>{{i.name}}</span>
                描述:<span>{{i.name}}</span>
                库存:<span>{{i.total}}</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" v-if="i.total>0" @click="pay(i.id)">购买</el-button>
                </div>
              </div>
            </el-card>
<!--          </el-col>-->
        </li>
      </ul>


    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shoplist: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 100
      },
      payment: {
        uid:'',
        gid:''
      },
      shop: {
          name:'',
          price:'',
          describe: '',
          total: ''
      },
      goodstotal: ''
    }


  },
  created () {
    this.getallgoods()
  },
  methods: {
    async getallgoods () {
      const { data: res } = await this.$http.get('/goods', {
        params: this.queryInfo
      })
      if (res.status !== 200) {
        return this.$message.error('获取商品列表失败')
      }
      this.$message.success('获取商品列表成功')
      this.goodstotal = res.goods.meta.total
      this.shoplist = res.goods.data
    },
    async getshoplist(){
      const { data: res } = await this.$http.get('/goods', {
        params: this.queryInfo
      })
      if (res.status !== 200) {
        return this.$message.error('获取商品列表失败')
      }
      this.$message.success('获取商品列表成功')
      this.goodstotal = res.goods.meta.total
      this.shoplist = res.goods.data
    },
    async pay(gid) {
      this.payment.uid = window.sessionStorage.getItem('uid')
      console.log(gid)
      this.payment.gid = gid
      const { data: res } = await this.$http.post('/payment/add', {
        params: this.payment
      })
      if (res.status !== 200) {
        return this.$message.error('购买失败')
      }
      this.$message.success('购买成功')
      this.order()
      this.sub(gid)

    },
    async sub(gid) {
      const { data: res } = await this.$http.post('/goods/sub', {
        "gid":gid
      })
    },
    async order() {
      const { data: res } = await this.$http.post('/signup/send', {
        'username': window.sessionStorage.getItem("username")
    })
    }

  }
}
</script>
<style lang="less" scoped>
.el-card {
  align-content: space-between;
  margin-top: 15px;
}
</style>
