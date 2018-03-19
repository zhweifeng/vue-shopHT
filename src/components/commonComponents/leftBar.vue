<template>
    <div class="bar">
        <div class="bar">
            <div class="logo">
                <img src="../../assets/logo.png" alt="">
                <span>叮店管理</span>
            </div>
            <ul>
                <li>
                    <h3 @click="toggleSlide($event)">叮店管理<i class="el-icon-caret-bottom "></i></h3>
                    <section :class="{active: $route.path == '/shopList' || $route.path == '/shopManage'}">
                        <router-link to="/shopList">店铺列表</router-link>
                        <router-link to="/shopManage">店铺管理</router-link>
                    </section>
                </li>
                <li>
                    <h3 @click="toggleSlide($event)">商品管理<i class="el-icon-caret-bottom "></i></h3>
                    <section :class="{active: $route.path == '/goodsList'}">
                        <router-link to="/goodsList">商品列表</router-link>
                    </section>
                </li>
                <li>
                    <h3 @click="toggleSlide($event)">活动管理<i class="el-icon-caret-bottom "></i></h3>
                    <section :class="{active: $route.path == '/activityList'}">
                        <router-link to="/activityList">活动列表</router-link>
                    </section>
                </li>
                <li>
                    <h3 @click="toggleSlide($event)">用户管理<i class="el-icon-caret-bottom "></i></h3>
                    <section :class="{active: $route.path == '/userList'}">
                        <router-link to="/userList">用户列表</router-link>
                    </section>
                </li>
                <!-- <li>
                    <h3 @click="toggleSlide($event)">设置</h3>
                    <section class="active">
                        <router-link to="/changPass">修改密码</router-link>
                    </section>
                </li> -->
            </ul>
        </div>
        <div class="topBar">
            <div class="user">
                <div>
                    <p>门店：{{user.storeName}}</p>
                    <p>用户名：{{user.employeName}}</p>
                </div>
                <img src="../../assets/logo.png" alt="">
                <section class="show">
                    <a href="javascript:;" @click="isShow = true;form.old = '';form.new1 = '';form.new2 = ''">修改密码</a>                    
                    <a href="javascript:;" @click="signout">登出</a>
                </section>
                <i class="el-icon-caret-bottom "></i>
            </div>
        </div>
        <div class="popup-detail" v-if="form && isShow">
            <h1>修改密码</h1>
            <el-form  ref="form" :rules="rules" v-if="form" :model="form" label-width="100px">
                <el-form-item label="旧密码" prop="old">
                    <el-input style="width:300px" prop="old" v-model="form.old" type="password" placeholder="请输入旧密码" clearable></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="new1">
                    <el-input style="width:300px" prop="new1" v-model="form.new1" type="password" placeholder="请输入新密码" clearable></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="new2">
                    <el-input style="width:300px" prop="new2" v-model="form.new2" type="password" placeholder="请输入新密码" clearable></el-input>
                </el-form-item>
                <section class="submit"> 
                    <el-button type="primary" @click="changepass">确定修改</el-button>
                </section> 
            </el-form> 
            <i class="el-icon-circle-close-outline close" title="关闭" @click="isShow = false"></i>     
        </div>
        <div class="mask" v-if="isShow"></div>
        
    </div>
</template>

<script>
    import {updateEmploye} from '../../data/postData'
    export default {
        name: 'leftBar',
        mounted(){
            console.log(this.$route.path)
        },
        data(){
            return {
                path:this.$route.path,
                user: JSON.parse(localStorage.getItem('user')),
                form:{
                    old:'',
                    new1:'',
                    new2:'',
                },
                rules: {
                    old: [
                        { required: true, message: '请输入旧密码', trigger: 'blur' },
                    ],
                    new1: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                    ],
                    new2: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                    ],
                },
                isShow: false
            }
        },
        methods:{
            toggleSlide(e){
                console.log(e.currentTarget.parentNode)
                var parent = e.currentTarget.parentNode
                var section = parent.querySelector('section')
                var i = parent.querySelector('i')
                console.log(section.className )
                if (section.className == '') {
                    section.className = 'active'
                    i.className += ' active'
                }else{
                    section.className = ''
                    i.className = 'el-icon-caret-bottom'   
                }
            },
            signout(){
                console.log('success')
                this.$message({
                    message: '登出成功',
                    type: 'success'
                });
                localStorage.setItem('user',null)
                setTimeout(() => {
                    this.$router.push({path:'/login'})
                }, 1000);
            },
            changepass(){
                if (this.$md5(this.form.old) != this.user.password) {
                    this.$message({
                        message:'旧密码输入错误',
                        type:'error'
                    })
                }else if((this.form.new1).trim() == '' || (this.form.new2).trim() == ''){
                    this.$message({
                        message:'新密码不能为空',
                        type:'error'
                    })
                }else if(this.form.new1.length < 6){
                    this.$message({
                        message:'请输入6位数及以上',
                        type:'error'
                    })
                }else if(this.$md5(this.form.new1) != this.$md5(this.form.new2)){
                    this.$message({
                        message:'两次输入的新密码不一致',
                        type:'error'
                    })
                }else{
                    let params = {
                        data:{
                            employeId: this.user.employeId,
                            password: this.$md5(this.form.new1)
                        }
                    }
                    console.log(params,this.form.new1)
                    this.$http.post(updateEmploye,params).then(res=>{
                        var res = res.data
                        if (res.status) {
                            if (res.code == 0) {
                                this.$message({
                                    message:'修改成功',
                                    type:'success'
                                })
                                this.user.password = this.$md5(this.form.new1)
                                localStorage.setItem('user',JSON.stringify(this.user))
                                this.isShow = false
                            }else{
                                this.$message({
                                    message:res.message,
                                    type:'error'
                                })
                            }
                        }else{
                            this.$message({
                                message:res.message,
                                type:'error'
                            })
                        }
                    })
                    
                }
            }
        }

    }
</script>

<style scoped lang="less">
    .bar{
        background: #424755;
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        z-index: 99;
    }
    .logo{
        text-align: center;
        margin-top: 20px;
        img{
            width: 60px;
            display: inline-block;
        }
        span{
            display: inline-block;
            font-size: 26px;
            color: #fff;
            position: relative;
            top: -18px;
        }
    }
    ul{
        padding:15px 15px 15px 20px; 
        height: 100%;
        width: 216px;
        li{
            margin: 10px 20px;
            h3{
                margin-bottom: 15px;
                color: #fff;
                position: relative;
                cursor: pointer;
                i{
                    position: absolute;
                    right: 12px;
                    top: 3px;
                    transition: all 0.5s;
                    transform: rotate(-90deg)
                    
                }
                i.active{
                    transform: rotate(0)
                }
            }
            section{
                max-height: 0;
                transition: all 0.5s;
                overflow: hidden;
            }
            section.active{
                max-height: 200px;
            }
            a{
                color: #fff;
                display: block;
                margin-left: 20px;
                text-align: center;
                line-height: 30px;
                width: 110px;
                height: 30px;
                border-radius: 5px;  
                &+a{
                    margin-top: 10px;
                }
                
               &:hover{
                    color: #fff;
                    background: #409EFF;;
                }
            }
        }
    }
    .topBar{
        position: fixed;
        top: 0;
        right: 0;;
        height: 66px;
        background: #424755;
        width: 100%;
        z-index: 9;
        &:hover .show{
            height: 84px;            
        }
        img{
            width: 50px;
            display: inline-block;
            margin-right: 20px;
            cursor: pointer;
        }
        .user{
            position: absolute;
            right: 20px;
            top: 8px;
            color: #fff;
            >div{
                display: inline-block;
                position: relative;
                top: -5px;
                left: -10px
            }
            p{
                text-align: right ;
            }
          
        }
        i{
            position: absolute;
            top: 50%;
            right: -10px;
            transform: translateY(-50%);
            font-size: 20px;
        }
        .show{
            position: absolute!important;
            right: -10px;
            top: 60px;
            background: #424755;
            width: 100px;
            text-align: center;
            border-radius: 5px;
            box-shadow: 0 10px 20px #ccc;
            overflow: hidden;
            transition: all 0.3s;
            height: 0;
            a{
                display: block;
                color: #fff;
                padding: 10px 0;
                &:hover{
                    background: #409EFF;
                    color: #fff;
                }
                &+a{
                    border-top: 1px solid #333
                }
            }
        }
    }
    .router-link-active{
        color: #fff;
        background: #409EFF;;
    }
    .popup-detail {
        h1{
            text-align: center;
            font-size: 24px;
            color: #666;
            margin-bottom: 30px;
        }
        .submit{
            display: block;
            margin-left: 100px;
        }
    }
</style>