<template>
    <div>
        <leftBar></leftBar>
        <div class="storelist-right">
            <h3>店铺列表</h3>
            <el-button class='right' type="primary" @click="addStore">新增店铺</el-button> 
            <el-table
                ref="multipleTable"
                :data="data"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                prop="storeName"
                label="门店名称"
                width="120">
                </el-table-column>
                <el-table-column
                prop="logoImage"
                label="LOGO"
                width="200">
                    <template slot-scope="scope">
                        <img  :src="scope.row.logoImage" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                prop="contactPerson"
                label="联系人"
                width="120">
                </el-table-column>
                <el-table-column
                prop="contactPhone"
                label="联系方式"
                width="120">
                </el-table-column>
                <el-table-column
                prop="templateId"
                label="模版"
                show-overflow-tooltip>
                     <template slot-scope="scope">
                         {{scope.row.templateId == 'theme_default' ? '默认主题' : '简约'}}
                    </template>
                </el-table-column>
                <el-table-column
                prop="activeStatus"
                label="状态"
                show-overflow-tooltip>
                   <template slot-scope="scope">
                         {{scope.row.activeStatus == '0' ? '激活' : '未激活'}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="checkDetail(scope.row)" size="small">详情</el-button>
                        <el-button type="text" @click="checkCode(scope.row)" size="small">查看二维码</el-button>
                        <el-button type="text" @click="checkPassword(scope.row)"  size="small">重置密码</el-button>
                    </template>
                </el-table-column>
               
            </el-table>
            <div class='popup-detail storeCode' v-if='form && isShow' >
                <el-form ref="form" :model="form" >
                    <el-form-item label="" >
                      <div class='code-img'>  <img width="100" :src="form.imgUrl" alt=""> </div>
                    </el-form-item>
                    <i class="el-icon-circle-close-outline close" title="关闭" @click="close"></i>
                </el-form> 
            </div>
            <div class='resetpassWord popup-detail1' v-if='ruleForm2 && isShow1'>

                 <!-- <p>门店名称:<el-input v-model="storeName" placeholder="请输入内容"></el-input></p>
                <p>门店名称:<el-input v-model="contactPhone" placeholder="请输入内容"></el-input></p>
                <p>门店名称:<el-input v-model="passWord" placeholder="请输入内容">{{ruleForm2.passWord}}</el-input></p>
                <button @click="resetForm('ruleForm2')">重置</button>  -->
                <el-form :model="ruleForm2" status-icon  ref="ruleForm2"  class="demo-ruleForm">
                    <el-form-item label="门店名称" prop="storeName">
                        <el-input type="text" v-model="ruleForm2.storeName" auto-complete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="contactPhone">
                        <el-input type="text" v-model="ruleForm2.contactPhone" auto-complete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码"  auto-complete="off">
                        <el-input v-model="this.passWord" disabled   > {{ruleForm2.passWord}}</el-input>
                       
                    </el-form-item>
                    <el-form-item class='btn'>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                     <i class="el-icon-circle-close-outline close" title="关闭" @click="handleClose"></i> 
                </el-form>
            </div>
            <section class="pagination" v-if="total > 5"> 
                <template v-if="page == 1"> 
                    <el-button type="primary" disabled>上一页</el-button>
                </template>
                <template v-else> 
                    <el-button type="primary" @click="pagePrev">上一页</el-button>
                </template>
                <template v-if="Math.ceil(total/5) <= page"> 
                    <el-button type="primary" disabled>下一页</el-button>
                </template>
                <template v-else> 
                    <el-button type="primary" @click="pageNext">下一页</el-button>
                </template>
            </section>

        </div>
    </div>
</template>
<script>
    import leftBar from '../commonComponents/leftBar.vue'
    import {getStoreList, getCode, updateEmploye, getStoreInfo} from '../../data/postData';
    export default {
        components:{
            leftBar
        },
        mounted(){
            var params = {
                "data":{
                    'employeId': this.user.employeId,
                    'page':1||page,
                    'size':5
                }
            }
            this.$http.post(getStoreList,params).then(res=>{
                this.data = res.data.data
                   // console.log(this.tableData )
            })
        },
        data(){
            return{
                user: JSON.parse(localStorage.getItem('user')),
                page:1,
                size:10,
                total:1000,
                type: '',
                category: '',
                data:null,
                isShow:false,
                form:null,
                isShow1:false,
                ruleForm2:{},
                passWord:'',
                disabled:false,
                storeName: ''
                
            }
        },
        
        methods:{
           checkDetail(data){
               this.$router.push({ path: 'storeDetail/' + data.storeNo})
           },
           handleSelectionChange() {
               console.log(111111111)
           },
           addStore(){
               this.$router.push({
                   path:'addStore'
               })
           },

           //查看二维码
           checkCode(data){
               data.isShow = true
               console.log(this.user.employeId)
                var params = {
                    data:{
                        page:'pages/home/home',
                        scene:data.storeNo + ',' + this.user.employeNo
                    }
                }
                console.log(params)
                this.$http.post(getCode,params).then(res=>{
                    let data = res.data.data
                    this.form = data
                    console.log(this.form.imgUrl)
                    this.isShow = true
                })
           },
           submit(){
            // this.$router.push({path:'/shopList'})
           },
           checkPassword(data){
               data.isShow1 = true
               console.log(data.isShow1)
               this.passWord = ''
            var params = {
                data:{
                     "storeNo":data.storeNo
                }
            }
            console.log(params)
            this.$http.post(getStoreInfo,params).then(res=>{
                this.ruleForm2 = res.data.data
                this.isShow1 = true
            })
           },
           // 重置密码
           resetForm(ruleForm2){
               console.log(this.ruleForm2)
             //  this.ruleForm2.passWord = this.$md5(Math.random())
              this.passWord = '123456'
            //    this.ruleForm2.passWord = '123456'
               console.log(this.ruleForm2.passWord)
           },
           submitForm(ruleForm2){
               console.log(this.ruleForm2.passWord)
               var params={
                   data:{
                       "employeId":this.user.employeId,
                       "password" :this.$md5(this.passWord)
                   }
               }
               this.$http.post(updateEmploye,params).then(res=>{
                    console.log(res.data)
                    if(res.data.status==true && res.data.code === '0' ){
                        this.isShow1 = false
                   }
               })
              // this.isShow1=false
           },
           pagePrev(){
               this.page--;
               this.goPage(this.page)
           },
           pageNext(){
                this.page++;
                this.goPage(this.page)
           },
           goPage(page){
               console.log(page)
               var params = {
                   data:{
                       "page":page,
                       'employeId': this.user.employeId,
                       'size':5
                   }
               }
               this.$http.post(getStoreList,params).then(res=>{
                   this.data = res.data.data
               })
           },
           close(){
               this.isShow=false
           },
           handleClose(){
               this.isShow1=false
           }
        }
    }
</script>

<style scoped lang="less">
    .storelist-right{
        width: calc(~"100% - 250px");
        margin-top: 66px;
        margin-left: 230px;;
        float: left;
        h3{
            margin: 10px 0 20px
        }
        .right{
            float:right;
            margin: 10px;
        }
        .select_type{
            margin-bottom: 20px;
            span{
                margin-right: 10px;

            }         
        }
    }
    .el-table__body-wrapper{
        margin-top: 15px;
        img{
            width: 80px;
        }   
    }
    .clearfix:after{content:"";display:block;clear:both;}
    .clearfix{zoom:1;}
    .fl{float:left;}
    .fr{float:right;}
    .el-input,.el-date-editor{width:150px;}
    .check-sure{ margin-left:300px; position:relative; top:-8px; left:0;}
    .lable{ height:30px; line-height:30px; text-align: center; padding-left:5px; padding-right: 5px; min-width:75px; text-align: left;}
    .toget{ height:30px; line-height:30px; text-align: center; padding-left:5px; padding-right: 5px;}
    .time-input{ width:100px;}
    .lableCase0{ width:420px; padding-right: 20px; padding-left:10px; padding-top:5px; padding-bottom:5px; margin-top: 0px; margin-bottom:0px;}
    .lableCase{ width:420px; padding-right: 20px; padding-left:10px; padding-top:5px; padding-bottom:5px; margin-top: 0px; margin-bottom:0px;}
    .storeCode{
        width:300px;height:300px;text-align: center;
        .code-img{
            margin-top:40px;
            img{width:200px;}
        }
    }
    .resetpassWord{
        width:300px;
        height:300px;
        margin-top:20px;
        .btn{
            text-align:center;
        }
    }
    .pagination{
        width:100%;
        margin:40px auto;
        text-align:center;
    }
</style>