<template>
  <div>
      <leftBar></leftBar>
    <div class='shopmanage'>
        <h3>店铺管理</h3>
       <el-form  :model="ruleForm" :rules='rules' ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item  label="叮店名称" prop="storeName">
                    <el-input class='input' v-model="ruleForm.storeName"  prop="storeName"></el-input>
                </el-form-item>
                <el-form-item label="叮店地址" prop="location">
                    <el-input class='input' v-model="ruleForm.location"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="contactPhone">
                    <el-input class='input' v-model="ruleForm.contactPhone"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contactPerson">
                    <el-input class='input' v-model="ruleForm.contactPerson"></el-input>
                </el-form-item>
                 <el-form-item label="品牌LOGO" prop="logoImage">
                    <!-- <img width='200' :src="ruleForm.logoImage" alt="" srcset="">
                    <el-button  @click="checkImg">点击更换</el-button>
                   <p> <small>点击添加按钮上传门店logo 建议上传300kb以下（jpg／jpeg/png）</small></p> -->
                   <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <img v-else :src="ruleForm.logoImage" class="avatar">
                        <p> <small>点击图片上传门店logo 建议上传300kb以下（jpg／jpeg/png）</small></p> 
                        <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                         <!-- <i  class="el-icon-plus avatar-uploader-icon"></i>  -->
                        <!-- <button @click='handleClick'>更换LOGO</button> -->
                    </el-upload>
                </el-form-item> 
                <el-form-item label="品牌介绍"  prop="storeIntro">
                    <el-input disabled class='input' rows='5' type="textarea" v-model="ruleForm.storeIntro"></el-input>
                </el-form-item>
                <el-form-item label="叮店模版" prop="templateId">
                    <el-select v-model="ruleForm.templateId" placeholder="请选择模版">
                    <el-option label="默认主题" value="theme_default"></el-option>
                    <el-option label="简约主题" value="theme_simple"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="用户登陆设置" prop="userlogin">
                    <el-form-item label="手机号码:" prop="phonenumber">
                        <el-input class='input userinput' v-model="ruleForm.phonenumber"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码:" prop="password">
                        <el-input class='input userinput' v-model="ruleForm.password" type="password"></el-input>
                    </el-form-item>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <!-- <el-button @click="resetForm('ruleForm')">返回</el-button> -->
                </el-form-item>
            </el-form>
    </div>
  </div>
</template>
<script>
    import leftBar from '../commonComponents/leftBar.vue'
    import {getStoreInfo,editStore} from '../../data/postData';
    export default {
        components:{
            leftBar
        },
        mounted(){
            var params = {
                "data":{
                    "storeNo": this.user.storeNo
                }
            }
            this.$http.post(getStoreInfo,params).then(res=>{
                this.ruleForm = res.data.data
            })
        },
        data() {
          return {
            user: JSON.parse(localStorage.getItem('user')),
            ruleForm: {
            companyId: '',
            companyIntro:'',
            brandId: '',
            storeName: '',
            headImage:'',
            storeNo:'',
            location: '',
            disabled: true,
            delivery: false,
            contactPhone: '',
            contactPerson: '',
            templateId: '',
            storeIntro:'',
            phonenumber:'',
            logoImage:''
            },
            tableData:null,
            imageUrl:'',
            rules: {
                companyId: [
                    { required: true, message: '选择公司', trigger: 'change' },
                ],
                brandId: [
                    { required: true, message: '选择品牌', trigger: 'change' }
                ],
                storeName: [
                    { type: 'date', required: true, message: '叮店名称', trigger: 'change' }
                ],
                location: [
                    { type: 'date', required: true, message: '叮店地址', trigger: 'change' }
                ],
                contactPhone: [
                    { required: true, message: '联系人电话', trigger: 'change' }
                ],
                contactPerson: [
                    { required: true, message: '联系人', trigger: 'blur' }
                ],
                templateId: [
                    { required: true, message: '请选择模版', trigger: 'blur' }
                ],
                phonenumber: [
                    { required: true, message: '手机号码', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码', trigger: 'blur' }
                ],
                storePhone: [
                    { required: true, message: '店铺联系电话', trigger: 'blur' }
                ]
             }

          }
        },
        methods:{
            submitForm(){
                let _this=this;
                console.log(this.ruleForm)
                let params = {
                    data:{
                            "storeNo":this.ruleForm.storeNo,
                            "storeName":this.ruleForm.storeName,
                            "location":this.ruleForm.location,
                            "storePhone":this.ruleForm.phonenumber,
                            "companyIntro":this.ruleForm.companyIntro,
                            "contactPerson":this.ruleForm.contactPerson,
                            "contactPhone":this.ruleForm.contactPhone,
                            "logoImage":this.ruleForm.logoImage,
                            "headImage":this.ruleForm.headImage,
                            "storeIntro":this.ruleForm.storeIntro,
                            "templateId":this.ruleForm.templateId,
                            "isOther":0
                    }
                }
                console.log(this.ruleForm)
                this.$http.post(editStore,params).then(res=>{
                    console.log(res)
                    if(res.data.code == '0'){
                          this.$message({
                                message:res.data.message,
                                type: "success"
                            });
                    }else{
                            this.$message({
                                message:res.data.message,
                                type: "error"
                            });
                    }
                }).catch(err=>{

                });
            },
            // resetForm(){
            //     this.$router.push({path:'/shopList'})
            // },
            checkImg(){
                console.log(11)
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>
<style scoped lang='less'>
      .shopmanage{
        width: calc(~"100% - 250px");
        margin-top: 5%;
        margin-left: 230px;;
        float: left;
        h3{
            margin: 20px 20px
        }
        .input{
            width:33%;
        }
        .userinput{
            margin:5px
        }
         .avatar-uploader .el-upload {
            height:200px;
            width:200px;
            border: 1px dashed #333;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>
