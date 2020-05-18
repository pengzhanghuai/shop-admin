<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/banner'}">轮播图列表</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="轮播图名称" prop="title">
        <el-input v-model="form.title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="轮播图图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-change="filechange"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
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
      this.axios
        .get(this.$apis.bannerinfo, { params: { id: this.$route.params.id } })
        .then(res => {
          this.fileList=[{name:'',url:res.data.data.img}]
          this.form = res.data.data;
          this.form.id = this.form._id;
          delete this.form.__v;
          delete this.form._id;
        });
    }
    this.axios.get(this.$apis.catelist).then(res => {
      this.bannerArr = res.data.data;
    });
  },
  data() {
    return {
      fileList:[],
      dialogImageUrl: "",
      dialogVisible: false,
      tip:"添加",
      bannerArr: [],
      form: {
        title: "",
        img: "",
        status: true
      },
      rules: {
        title: [{ required: true, message: "请输入轮播图名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let formdata = new FormData();
          for(let i in this.form){
            formdata.append(i,this.form[i]);
          }
          let url = this.$route.params.id?this.$apis.banneredit:this.$apis.banneradd;
          this.axios.post(url, formdata).then(res => {
            if(res.data.status===1){
              this.$router.push('/banner')
            }else{
              this.$message(res.data.info)
            }
          });
        }
      });
    },
    reset(form){
      this.$refs[form].resetFields();
    },
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    filechange(file,fileList){
      this.form.img = file.raw;
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 45%;
}
.el-upload .el-upload__input {
  display: none;
}
</style>