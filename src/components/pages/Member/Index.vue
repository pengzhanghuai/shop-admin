<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-button type="primary" @click="$router.push('/member/add')">添加</el-button> -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="280"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope)" type="info">编辑</el-button>
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
      this.$router.push("/member/" + scope.row._id);
    }
  },
  mounted() {
    this.axios.get("/api/memberlist").then(res => {
      this.tableData = res.data.data;
    });
  }
};
</script>

<style>
</style>