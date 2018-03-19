<template>
    <div  class="login">
        <div>
          <div class="login-logo">
            <img src="../assets/logo.png" alt="">
            <p>叮店系统管理平台</p>
          </div>
          <div class="form">
            <el-input v-model="username" placeholder="请输入用户名" clearable></el-input>
            <el-input v-model="password" type="password" placeholder="请输入密码" clearable></el-input>
            <el-button size="medium" type="primary" @click="onSubmit">登录</el-button>
          </div>         
        </div>
    </div>
</template>

<script>
  import { login } from '../data/postData'
  export default {
    mounted(){
      
    }, 
    data(){
        return {
          username:'123456',
          password:'123456'
        }
    },
    methods:{
      onSubmit(){
        if (this.username.trim() === '' ) {
          this.$message({
            message: '请输入账号',
            type: 'warning'
          });
        }else if(this.password.trim() === ''){
          this.$message({
            message: '请输入密码',
            type: 'warning'
          });
        }else{
          let params = {
            "data": {
              "mobile": this.username,
              "password": this.$md5(this.password) 
            }
          }
          this.$http.post(login,params).then(res=>{
            console.log(res.data)
            if (res.data.status){
              if (res.data.code == '0') {
                localStorage.setItem('user',JSON.stringify(res.data.data))
                this.$router.push({path:'/activityList'})
                console.log('---user---',localStorage.getItem('user'));
              }else{
                this.$message({
                  message: res.data.message,
                  type: 'warning'
                });
              }
            }else{
              this.$message({
                message: '服务器错误',
                type: 'warning'
              });
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .login{
    width: 100%;
    height: 100%;
    background: url(../assets/login.jpg);
    >div{
      position: absolute;
      left: 50%;
      top: 20%;
      transform: translate(-50%,0)
    }
    .login-logo{
      text-align:center;
      img{
        width: 90px;
      }
      p{
        font-size: 45px;
        color: #fff;
        margin-top: 20px;
      }
    }
    .form{
      width:100%;
      margin: 0 auto;
      .el-input{
        margin-top: 10px;
      }
      button{
        margin-top: 15px;
        width: 100%;
      }
    }

  }

</style>