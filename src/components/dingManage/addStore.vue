<template>
  <div>
      <leftBar></leftBar>
      <div class='addstore'>
            <h3>新增店铺</h3>
            <h3>门店信息（带*的是必填项）</h3>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="选择公司" prop="companyId">
                    <el-select @click='getCompany' v-model="ruleForm.companyId" placeholder="请选择公司">
                    </el-select>
                </el-form-item>
                <el-form-item label="选择品牌" prop="brandId">
                    <el-select @click='getBrand' v-model="ruleForm.brandId" placeholder="请选择品牌">
                    </el-select>
                </el-form-item>
                <el-form-item  label="叮店名称" prop="storeName">
                    <el-input class='input' v-model="ruleForm.storeName"></el-input>
                </el-form-item>
                <el-form-item label="叮店地址" prop="location">
                    <el-input class='input' v-model="ruleForm.location"></el-input>
                </el-form-item>
                 <el-form-item label="叮店电话" prop="storePhone">
                    <el-input class='input' v-model="ruleForm.storePhone"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="contactPhone">
                    <el-input class='input' v-model="ruleForm.contactPhone"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contactPerson">
                    <el-input class='input' v-model="ruleForm.contactPerson"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" prop="logoImage">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                         <i v-else class="el-icon-plus avatar-uploader-icon"></i> 
                        <!-- <img v-else :src="ruleForm.logoImage" class="avatar"> -->
                    </el-upload>
                    <p> <small style='color:red'>点击图片上传门店logo 建议上传300kb以下（jpg／jpeg/png）</small></p> 
                </el-form-item>
                <el-form-item label="品牌介绍" prop="storeIntro">
                    <el-input disabled class='input' rows='5' type="textarea" v-model="ruleForm.storeIntro"></el-input>
                </el-form-item>
                <el-form-item label="门店头图" prop="headImage">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleHeadAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageheadUrl" :src="imageheadUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>     
                    </el-upload>
                    <p> <small style='color:red;'>点击图片上传门店头图 建议上传300kb以下（jpg／jpeg/png）</small></p>
                </el-form-item>
                <el-form-item label="叮店模版" prop="templateId">
                    <el-select v-model="ruleForm.templateId" placeholder="请选择模版">
                    <el-option label="简约主题" value="theme_simple"></el-option>
                    <el-option label="默认主题" value="theme_default"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="店长姓名:" prop="employeName">
                        <el-input class='input user-input' v-model="ruleForm.employeName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码:" prop="mobile">
                        <el-input class='input user-input' v-model="ruleForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码:" prop="password">
                        <el-input class='input user-input' v-model="ruleForm.password" disabled></el-input>
                    </el-form-item>
                <el-form-item>
                    <el-button class= 'right-btn' type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
  </div>
</template>
<script>
import leftBar from '../commonComponents/leftBar.vue'
import {addStore} from '../../data/postData'
 export default {
    components:{
        leftBar
    },

    data() {
      return {
        ruleForm: {
          companyId: '',
          brandId: '',
          storeName: '',
          location: '',
          delivery: false,
          contactPhone: '',
          contactPerson: '',
          logoImage:'',
          templateId: '',
          storeIntro:'133444',
          phonenumber:'',
          disabled:false,
          password:'123456',
          storePhone:''
        },
        imageUrl:'',
        imageheadUrl:'',
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
          employeName: [
            { required: true, message: '店长姓名', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机号码', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码', trigger: 'blur' }
          ],
          storePhone: [
            { required: true, message: '店铺联系电话', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
        let params = {
            data:{
              "storeName":this.ruleForm.storeName,
              "location":this.ruleForm.location,
              "storePhone":this.ruleForm.storePhone,
              "companyId":this.ruleForm.companyId,
              "brandId":this.ruleForm.brandId,
              "contactPerson":this.ruleForm.contactPerson,
              "contactPhone":this.ruleForm.contactPhone,
              "logoImage":this.imageUrl,
              "headImage":this.imageheadUrl,
              "storeIntro":this.ruleForm.storeIntro,
              "templateId":this.ruleForm.templateId,
              "storePhone":this.ruleForm.storePhone,
              "employeName":this.ruleForm.employeName,
              "mobile":this.ruleForm.mobile,
              "password":this.$md5(123456)

            }
          }
        this.$http.post(addStore,params).then(res=>{
          if(res.data.code == '0' && res.data.status == true){
             this.$message({
                message:res.data.message,
                type: "success"
              });
              this.$router.push({
                path:'/shopList'
              })

          }else{
             this.$message({
                message:res.data.message,
                type: "error"
              });
          }
        })
        
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(1111111111)
        console.log(this.imageUrl)
      },
      handleHeadAvatarSuccess(res, file) {
        this.imageheadUrl = URL.createObjectURL(file.raw);
          console.log(11111111112222)
        console.log(this.imageheadUrl)
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
      },

      getCompany(){

      },
      getBrand(){

      }
    }
  }
</script>
<style scoped lang="less">
    .addstore{
        width: calc(~"100% - 250px");
        margin-top: 66px;
        margin-left: 230px;;
        float: left;
        h3{
            margin: 20px 20px
        }
        .input{
          width:300px;
        }
    }
    .avatar-uploader{
            height:200px;
            width:200px;
            border: 1px dashed #333;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
    }
    .el-upload{
      width:200px;height:200px;text-align: center;border:1px solid green;
    }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 200px;
            height: 200px;
            line-height: 200px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
        .right-btn{
          position: absolute;
          right:10%;
        }
        .user-input{
          margin:5px;
        }
</style>
