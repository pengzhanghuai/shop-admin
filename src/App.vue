<template>
    <router-view/>

</template>

<script>
export default {
  name: 'App',

}
</script>

<style>
  *{
    margin:0;
    padding:0;
  }
  html,body{
    width:100%;
    height:100%;
  }
  .el-breadcrumb{
    margin-bottom: 10px;
  }
  .el-form{
    margin-top: 30px;
  }
  .el-pagination{
    float: right;
  }
</style>
