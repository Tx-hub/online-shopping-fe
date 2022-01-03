<template>
  <div>
    <el-input placeholder="请输入内容" v-model="queryInfo.query" >
      <el-button slot="append" icon="el-icon-search" @click="getshoplist"></el-button>
    </el-input>


    <el-row>
      <ul class="infinite-list" v-infinite-scroll="getallgoods" infinite-scroll-disabled="disabled" style="overflow:auto" infinite-scroll-delay="2000">
        <li v-for="i in this.shoplist" class="infinite-list-item" :model="payment">
<!--          <el-col :span="8" v-for="(o, index) in 6" :key="o" :offset="index > 0 ? 2 : 0">-->
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://img.alicdn.com/imgextra/i2/504930169/O1CN01rG914I1D7ReYubN0F_!!0-saturn_solar.jpg_468x468q75.jpg_.webp" class="image">
              <div style="padding: 14px;">
                商品名:<span>{{i.name}}</span>
                描述:<span>{{i.name}}</span>
                库存:<span>{{i.total}}</span>
                <div class="bottom clearfix">
                  <el-button type="button" class="button" v-if="i.total>0" @click="buyshop(i)">购买</el-button>
                  <el-button type="text" class="button" v-else="i.total>0" disabled >没货了，买啥啊买</el-button>
                </div>
              </div>
              <el-dialog
                :visible.sync="shopformvisible">
                <el-form ref="cref" :model="shopform" label-width="80px" >
                  <template>
                    <el-input-number v-model="shopform.paynum"  :min="1" :max="10" label="购买数量"></el-input-number>
                    <el-button type="button" @click="pay" size="mini">确认付款</el-button>
                  </template>
                </el-form>
              </el-dialog>
            </el-card>
<!--          </el-col>-->
        </li>
        <p v-if="this.loading">加载中...</p>
        <p v-if="this.noMore">没有更多了</p>
      </ul>


    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shoplist: [],
      shopform:{
        paynum: 0,
        payid: 0
      },
      shopformvisible: false,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 1
      },
      payment: {
        uid:0,
        gid:0
      },
      shop: {
          name:'',
          price:'',
          describe: '',
          total: ''
      },
      goodstotal: '',
      count: 10,
      loading: true,
      noMore: false,
      disabled: false
    }


  },

  created () {
    this.getallgoods()
  },
  methods: {
    buyshop(i){
      this.shopformvisible=true
      this.shopform.payid = i.id
      this.shop = i
    },
    async getallgoods () {
      this.queryInfo.pagesize+=1
      this.loading = true
      const { data: res } = await this.$http.get('/goods', {
        params: this.queryInfo
      })
      if(this.queryInfo.pagesize >= res.data.goods.meta.total){
        this.noMore = true
        this.loading = false
        this.disabled = true
      }
      if (res.code !== 0) {
        return this.$message.error('获取商品列表失败')
      }
      this.$message.success('获取商品列表成功')
      this.goodstotal = res.data.goods.meta.total
      this.shoplist = res.data.goods.data

    },
    async getshoplist(){
      this.noMore = true
      this.loading = false
      this.disabled = true
      this.queryInfo.pagesize = 100
      if(this.queryInfo.query === ''){
        this.loading = true
        this.noMore = false
        this.disabled = false
        this.queryInfo.pagesize = 1
      }
      const { data: res } = await this.$http.get('/goods', {
        params: this.queryInfo
      })
      if (res.code !== 0) {
        return this.$message.error(res.msg)
      }
      this.$message.success(res.msg)
      console.log(res)
      this.goodstotal = res.data.goods.meta.total
      this.shoplist = res.data.goods.data
    },
    async pay() {
      this.shopformvisible = false
      const gid = this.shopform.payid
      const paynum = this.shopform.paynum
      const uid = Number(window.sessionStorage.getItem('uid'))
      const { data: res } = await this.$http.post('/payment/add',
        {
          "uid":uid,
          "gid":gid,
          "paynum":paynum
        })
      if (res.code !== 0) {
        return this.$message.error('购买失败')
      }
      this.$message.success(res.msg)
      this.order()
      this.shop.total -= this.shopform.paynum
      this.$set(this.shoplist)
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
