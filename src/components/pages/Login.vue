<template>
  <div class="wrapper">
    <div class="mask">
      <div class="content">
        <h1>登录页面</h1>
        <div class="user">
          <span>用户名：</span>
          <input type="text" v-model="userlogin.username" placeholder="请输入用户名" />
        </div>
        <div class="pwd">
          <span>密&nbsp;&nbsp;&nbsp;码：</span>
          <input type="password" v-model="userlogin.password" placeholder="请输入密码" />
        </div>
        <div class="btn">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userlogin: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {},
  methods: {
    login() {
      this.axios.post(this.$apis.login, this.userlogin).then(res => {
        if (res.data.status === 1) {
          let obj = {
            name: this.userlogin.username,
            id: res.data.data._id
          };
          sessionStorage.setItem("users", JSON.stringify(obj));
          this.$router.push("/");
        } else {
          this.$message(res.data.info);
        }
      });
    }
  }
};
</script>

<style  scoped>
.mask {
  width: 100vw;
  height: 100vh;
  background: -webkit-linear-gradient(left, #43c6ac, #f8ffae);
}
.content {
  width: 400px;
  height: 300px;
  background: #ffffff;
  border-radius: 25px;
  padding: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -150px;
  margin-left: -200px;
  font-size: 20px;
  text-align: center;
}
.content h1 {
  text-align: center;
  margin: 15px 0px;
}
.content .user,
.content .pwd {
  margin: 10px 0px;
  padding: 10px;
}
.content input {
  height: 25px;
  text-indent: 5px;
}
.el-button{
  width: 100px;
  margin-top: 20px;
  font-size: 18px;
}
</style>