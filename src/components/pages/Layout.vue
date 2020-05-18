<template>
  <el-container>
    <el-header>
      <span>XXX后台管理系统</span>
      <span>
        欢迎管理员：
        <strong>{{obj.name}}</strong>
        <el-link class="out" @click="outlogin" type="danger" :underline="false">退出</el-link>
      </span>
    </el-header>
    <el-container>
      <Nav></Nav>
      <el-main>
        <router-view></router-view>
        <div id="main" v-show="$route.path=='/'"></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Nav from "../views/Nav";
import echarts from "echarts";
export default {
  components: {
    Nav
  },
  data() {
    return {
      obj: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem("users") === null) {
      next("/login");
    } else {
      next();
    }
  },
  mounted() {
    this.obj = JSON.parse(sessionStorage.getItem("users"));
    var myChart = echarts.init(document.getElementById("main"));
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "2019年销售总额"
      },
      tooltip: {},
      legend: {
        data: ["销售额"]
      },
      xAxis: {
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ]
      },
      yAxis: {},
      series: [
        {
          name: "销售额",
          type: "line",
          data: [
            1000,
            800,
            2000,
            1200,
            600,
            1500,
            1600,
            2200,
            950,
            755,
            1000,
            1100
          ]
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
  methods: {
    outlogin() {
      sessionStorage.removeItem("users");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  background: skyblue;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}
.el-header span {
  line-height: 60px;
}
.el-aside {
  background: #545c64;
}
.out {
  font-size: 16px;
}
#main {
  width: 800px;
  height: 500px;
}
</style>
