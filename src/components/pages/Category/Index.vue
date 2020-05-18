<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/category/add')">添加</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="分类名称" width="280"></el-table-column>
      <el-table-column prop="status" label="状态" width="280">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    edit(scope) {
      // this.axios.post(this.$apis.cateedit,{
      //     id:scope.row._id,
      //     title:scope.row.title,
      //     status:scope.row.status
      // }).then(res=>{
      //   console.log(res);
      // })
      this.$router.push("/category/" + scope.row._id);
    },
    del(scope) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post(this.$apis.catedel, { id: scope.row._id })
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
    }
  },
  mounted() {
    this.axios.get(this.$apis.catelist).then(res => {
      this.tableData = res.data.data;
    });
  }
};
</script>

<style>
</style>