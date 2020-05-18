<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/member'}">会员列表</el-breadcrumb-item>
      <el-breadcrumb-item>会员修改</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" size="small"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" size="small"></el-input>
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
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // submit(form) {
    //   this.$refs[form].validate(valid => {
    //     if (valid) {
    //       alert("提交成功!");
    //     } else {
    //       console.log("提交失败");
    //       return false;
    //     }
    //   });
    // }
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.axios.post("/api/memberedit", this.form).then(res => {
            if (res.data.status === 1) {
              this.$router.push("/member");
            } else {
              this.$message(res.data.info);
            }
          });
        }
      });
    },
    reset(form) {
      this.$refs[form].resetFields();
    }
  },
  mounted() {
    this.axios
      .get("/api/memberinfo", { params: { id: this.$route.params.id } })
      .then(res => {
        this.form = res.data.data;
        this.form.password = "";
        this.form.id = this.form._id;
        delete this.form.__v;
        delete this.form._id;
      });
  }
};
</script>

<style scoped>
.el-input {
  width: 45%;
}
</style>