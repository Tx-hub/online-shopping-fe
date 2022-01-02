<template>
  <el-container>
    <el-header>
      <div>
        <span>管理系统</span>
      </div>
      <el-button type="info">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#0086b3"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>

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
