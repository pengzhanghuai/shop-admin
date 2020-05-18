<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/detail/add')">添加</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="cate" label="商品分类" width="180"></el-table-column>
      <el-table-column prop="title" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="180"></el-table-column>
      <el-table-column prop="img" label="商品图片" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.img" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope)">编辑</el-button>
          <el-button type="danger" @click="del(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev,pager,next"
      :total="totalNum"
      :page-size="pagesize"
      @current-change="e=>change(e)"
    >

    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      data:[],
      totalNum:0,
      page:1,
      pagesize:2
    };
  },
  mounted() {
    this.axios.get(this.$apis.goodslist).then(res => {
      this.data = res.data.data;
      this.totalNum = this.data.length;
      this.getPageData();
    });
  },
  methods: {
    del(scope) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post(this.$apis.goodsdel, { id: scope.row._id })
            .then(res => {
              if (res.data.status === 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.tableData.splice(scope.$index, 1);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edit(scope){
      this.$router.push('/detail/'+scope.row._id)
    },
    getPageData(){
      this.tableData = this.data.slice((this.page-1)*this.pagesize,this.page*this.pagesize)
    },
    change(e){
      this.page = e;
      this.getPageData();
    }
  }
};
</script>

<style scoped>
  img{
    width: 180px;
    height: 180px;
  }
</style>