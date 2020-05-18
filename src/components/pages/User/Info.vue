<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/user'}">管理员列表</el-breadcrumb-item>
      <el-breadcrumb-item>管理员{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" size="small"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" size="small"></el-input>
        <br />
        <span v-if="tip==='修改'" style="color:red">*不修改则不操作</span>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit('form')" type="primary">提交</el-button>
        <el-button @click="reset('form')" type="info">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$route.params.id) {
      this.tip = "修改";
      this.axios({
        url: this.$apis.userinfo,
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        this.form = res.data.data;
        this.form.password = "";
        this.form.id = this.form._id;
        delete this.form.__v;
        delete this.form._id;
      });
    }
  },
  data() {
    return {
      tip: "添加",
      form: {
        username: "",
        password: "",
        status: true
      },
      rules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [
          { required: false, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "密码长度在 6 到 20 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let url = this.$route.params.id?this.$apis.useredit:this.$apis.useradd;
          this.axios.post(url, this.form).then(res => {
            if (res.data.status === 1) {
              this.$router.push("/user");
            } else {
              this.$message(res.data.info);
            }
          });
        } 
      });
    },
    reset(form){
      this.$refs[form].resetFields();
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 45%;
}
</style>