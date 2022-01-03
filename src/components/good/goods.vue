<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
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
            <el-button type="primary" @click="AddDialogVisible = true" class="el-butoon-add">添加商品</el-button>
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
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品金额" prop="price">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="describe">
          <el-input v-model="addForm.describe"></el-input>
        </el-form-item>
        <el-form-item label="剩余" prop="total">
          <el-input v-model="addForm.total"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="AddDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addGood">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="修改商品"
      :visible.sync="EditDialogVisible"
      width="30%">
      <span>修改商品</span>
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
      DeleteDialogVisible: false,
      addForm: {
        name:'',
        price:'',
        describe: '',
        total: ''
      },
      addFormRules:  {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ],
        total: [
          { required: true, message: '请输入余量', trigger: 'blur' }
        ]
      }
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
      if (res.code !== 0) {
        return this.$message.error(res.msg)
      }
      this.$message.success(res.msg)
      this.goodstotal = res.data.goods.meta.total
      this.goodlist = res.data.goods.data
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getallgoods()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getallgoods()
    },
    addGood() {
      this.AddDialogVisible = false,
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('/goods/add', this.addForm)
        console.log(res)
        if (res.code !== 0) {
          return this.$message.error('商品添加失败!')
        }
        this.$message.success(res.msg)

      })
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
.el-butoon-add{
  margin-top: 10px;
}
</style>
