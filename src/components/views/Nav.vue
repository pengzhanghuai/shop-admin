<template>
  <el-aside style="width:150px">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="true"
    >
      <router-link to="/" exact-active-class="active">
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          首页
        </el-menu-item>
      </router-link>
      <el-submenu :index="menu.index" v-for="(menu,index) in menuArr" :key="index">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{menu.title}}</span>
        </template>
        <el-menu-item-group>
          <router-link
            :to="item.index"
            active-class="active"
            v-for="item in menu.children"
            :key="item.index"
          >
            <el-menu-item :index="item.index">{{item.title}}</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: "",
      menuArr: [
        {
          index: "/user",
          icon: "el-icon-setting",
          title: "系统设置",
          children: [
            { index: "/user", title: "管理员管理" },
            { index: "/member", title: "会员管理" }
          ]
        },
        {
          index: "/category",
          icon: "el-icon-s-shop",
          title: "商品管理",
          children: [
            { index: "/category", title: "商品分类" },
            { index: "/detail", title: "商品详情" }
          ]
        },
        {
          index: "/banner",
          icon: "el-icon-picture-outline-round",
          title: "其他管理",
          children: [
            { index: "/banner", title: "轮播图" },
            { index: "/cart", title: "购物车" }
          ]
        }
      ]
    };
  },
  mounted() {
    this.defaultActive = this.$route.meta.select;
  },
  watch: {
    $route() {
      this.defaultActive = this.$route.meta.select;
    }
  }
};
</script>

<style scoped>
.el-submenu .el-menu-item {
  min-width: 150px;
}
.el-menu {
  border: none;
}
.el-aside a {
  text-decoration: none;
  color: #fff;
}
.el-aside .active {
  color: #ffd04b;
}
</style>
