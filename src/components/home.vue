<template>
  <div>
    <el-container>
      <el-header>
        <el-menu  class="el-menu-demo" mode="horizontal" >
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>


      </el-header>
      <el-main>

        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>

</script>
<style>
.el-menu{
  background: #0086b3;
}
.input-with-select{
  margin-top: 10px;
}
</style>
