<template>
  <el-container>
    <el-header>
      <div>
        <span>管理系统</span>
      </div>
      <el-button type="info" @click="layout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="/goods"
          :router="true"
          background-color="#0086b3"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品</span>
            </template>
            <el-menu-item index="/goods">商品管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods:{
    layout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
  }

}
}
</script>
<style lang="less" scoped>
.el-header{
  background: #55a532;
  display:flex;
  justify-content: space-between;
  font-size:30px
}
.el-aside{
  background: #0086b3;
}
.el-container{
  width: 100%;
  height: 100%;
}

</style>
