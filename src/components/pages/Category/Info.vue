<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/category'}">商品分类列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品名称" prop="title">
        <el-input v-model="form.title" size="small"></el-input>
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
  data() {
    return {
      form: {
        title: "",
        status: false
      },
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }]
      },
      tip: "添加"
    };
  },
  methods: {
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let url = this.$route.params.id
            ? this.$apis.cateedit
            : this.$apis.cateadd;
          this.axios.post(url, this.form).then(res => {
            if (res.data.status === 1) {
              this.$router.push("/category");
            } else {
              this.$message(res.data.info);
            }
          });
        }
      });
    },
    reset(form){
      this.$refs[form].resetFields();
    },
  },
  mounted() {
    // console.log(this.$route);
    if (this.$route.params.id) {
      this.tip = "修改";
      this.axios
        .get(this.$apis.cateinfo, { params: { id: this.$route.params.id } })
        .then(res => {
          this.form = res.data.data;
          this.form.id = this.form._id;
          delete this.form.__v;
          delete this.form._id;
        });
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 45%;
}
</style>