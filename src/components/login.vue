<template>
  <div class="login_container">
    <div class="login_box">
      <div class="pic_box">
        <img src="../assets/logo.png">
      </div>
      <el-form ref="login_form_ref" label-width="0px" class="login_form" :rules="loginFormRules" :model="loginForm">
        <el-form-item prop="uid">
          <el-input v-model="loginForm.uid" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="loginFormReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        uid: '',
        password: ''
      },
      logs: {
        username: ''
      },
      loginFormRules: {
        // 验证用户名是否合法
        uid: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginFormReset () {
      this.$refs.login_form_ref.resetFields()
    },
    login () {
      this.$refs.login_form_ref.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('/login', this.loginForm)
        if (res.status !== 200) {
          return this.$message.error('登录失败 帐号或密码错误!')
        }
        this.$message.success('登录成功!')
        await this.$http.post('/logs/add', {
          'username': res.data.user.username
        })
        console.log(res)
        window.sessionStorage.setItem('token', "bearer "+res.data.response.token)
        if(res.data.user.type == 1){
          this.$message.success('欢迎管理员登陆!')
          this.$router.push('/admin')
        }

      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container{
  background: #2b4b6b;
  height: 100%
}
.btn{
  display: flex;
  justify-content: flex-end;
}
.login_form{
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.login_box{
  width: 450px;
  height: 300px;
  background: white;
  border-radius: 3px;
  position: absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  .pic_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding:10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: white;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;

    }
  }
}
</style>
