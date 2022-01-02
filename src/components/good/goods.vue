<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div style="margin-top: 15px;">
        <el-row :gutter="20">
          <el-col :span="9">
            <el-input placeholder="搜索商品" v-model="queryInfo.query" class="input-with-select" >
              <el-button slot="append" icon="el-icon-search" @click="getallgoods"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="AddDialogVisible = true">添加商品</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="goodlist" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="商品金额" prop="price"></el-table-column>
        <el-table-column label="商品描述" prop="describe"></el-table-column>
        <el-table-column label="剩余" prop="total"></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scoped">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="EditDialogVisible = true"></el-button>
            <el-button type="danger" icon="el-icon-delete"  size="mini" @click="DeleteDialogVisible = true"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="goodstotal">
      </el-pagination>
    </el-card>
    <el-dialog
      title="添加商品"
      :visible.sync="AddDialogVisible"
      width="30%">
      <span>添加商品</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="AddDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="AddDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="修改商品"
      :visible.sync="EditDialogVisible"
      width="30%">
      <span>添加商品</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="EditDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="EditDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="确认删除？"
      :visible.sync="DeleteDialogVisible"
      width="30%">
      <span slot="footer" class="dialog-footer">
    <el-button @click="DeleteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="DeleteDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      goodstotal: 0,
      goodlist: [],
      AddDialogVisible: false,
      EditDialogVisible: false,
      DeleteDialogVisible: false
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
      this.goodlist = res.goods.data
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getallgoods()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getallgoods()
    }
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb{
  margin-bottom: 15px;
}
.el-card{
  box-shadow: 0  0px;
}
.el-table{
  margin-top: 15px;
}
.el-pagination{
  margin-top: 15px;
}
</style>
