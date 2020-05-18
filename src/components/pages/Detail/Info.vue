<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/detail'}">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="cate" label="所属分类">
        <el-select  v-model="form.cate">
          <el-option v-for="item in goodsArr" :value="item.title" :key="item._id">{{item.title}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="title">
        <el-input v-model="form.title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="form.price" size="small"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
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
      <el-form-item label="商品描述" >
          <div id="editor"></div>
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
import E from "wangeditor";
export default {
  mounted() {
      this.editor = new E('#editor');
      this.editor.customConfig.uploadImgShowBase64 = true ;
      this.editor.create();
    if (this.$route.params.id) {
      this.tip = "修改";
      this.axios
        .get(this.$apis.goodsinfo, { params: { id: this.$route.params.id } })
        .then(res => {
          console.log(res);
          this.fileList=[{name:'',url:res.data.data.img}]
          this.form = res.data.data;
          this.form.id = this.form._id;
          delete this.form.__v;
          delete this.form._id;
          this.editor.txt.html(this.form.desc)
        });
    }
    this.axios.get(this.$apis.catelist).then(res => {
      this.goodsArr = res.data.data;
    });
  },
  data() {
    return {
      editor:null,
      fileList:[],
      dialogImageUrl: "",
      dialogVisible: false,
      value: "",
      tip:"添加",
      goodsArr: [],
      form: {
        cate: "",
        title: "",
        price: "",
        img: "",
        desc: "",
        status: true
      },
      rules: {
        cate: [{ required: true, message: "请输入商品分类", trigger: "blur" }],
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit(form) {
      this.form.desc = this.editor.txt.html();
      this.$refs[form].validate(valid => {
        if (valid) {
          let formdata = new FormData();
          for(let i in this.form){
            formdata.append(i,this.form[i]);
          }
          let url = this.$route.params.id?this.$apis.goodsedit:this.$apis.goodsadd;
          this.axios.post(url, formdata).then(res => {
            if(res.data.status===1){
              this.$router.push('/detail')
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