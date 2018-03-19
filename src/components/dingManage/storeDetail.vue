<template>
  <div>
     
      <leftBar></leftBar>
    <div class='editdetail'>
         <h3>店铺详情</h3>
       <el-form  :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="叮店名称" prop="storeName">
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
                <el-form-item label="品牌介绍" prop="storeIntro">
                    <el-input class='input' disabled type="textarea" rows='5' v-model="ruleForm.storeIntro"></el-input>
                </el-form-item>
                <!-- <el-form-item label="叮店模版" prop="templateId">
                    <el-select @click='handleClick' v-model="ruleForm.templateName" placeholder="请选择模版">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="叮店模版" prop="templateId">
                    <el-select v-model="ruleForm.templateId" placeholder="请选择模版">
                    <el-option label="默认主题" value="theme_default"></el-option>
                    <el-option label="简约主题" value="theme_simple"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class='right-btn' type="primary" @click="submitForm('ruleForm')">修改并保存</el-button>
                </el-form-item>
            </el-form>
    </div>
  </div>
</template>
<script>
    import leftBar from '../commonComponents/leftBar.vue'
    import {getStoreInfo,editStore, getTemplateList} from '../../data/postData';
    export default {
        components:{
            leftBar
        },
        mounted(){
            var id = this.$route.params.id
            var params = {
                "data":{
                    "storeNo": id
                }
            }
            this.$http.post(getStoreInfo,params).then(res=>{
                this.ruleForm = res.data.data
                //this.imageUrl = this.ruleForm.logoImage
            })
            this.$http.get(getTemplateList).then(res=>{
                console.log(res.data.data)
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
            disabled:false,
            location: '',
            delivery: false,
            contactPhone: '',
            contactPerson: '',
            templateId: '',
            storeIntro:'',
            phonenumber:'',
            logoImage:''
            },
            imageUrl: '',
            tableData:null,
            rules: {
          companyId: [
            { required: true, message: '选择公司', trigger: 'blur' },
          ],
          brandId: [
            { required: true, message: '选择品牌', trigger: 'blur' }
          ],
          storeName: [
            { type: 'date', required: true, message: '叮店名称', trigger: 'blur' }
          ],
          location: [
            { type: 'date', required: true, message: '叮店地址', trigger: 'blur' }
          ],
          contactPhone: [
            { required: true, message: '联系人电话', trigger: 'blur' }
          ],
          contactPerson: [
            { required: true, message: '联系人', trigger: 'blur' }
          ],
          templateId: [
            { required: true, message: '请选择模版', trigger: 'blur' }
          ],
           logoImage: [
            { required: true, message: '选择LOGO', trigger: 'blur' }
          ],
          storePhone: [
            { required: true, message: '店铺联系电话', trigger: 'blur' }
          ]
        }

          }
        },
        methods:{
            submitForm(){
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
                        alert('保存成功')
                    }else{
                        alert('保存失败')
                    }
                })
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
            },
            // handleClick(){
            //     this.handleAvatarSuccess(res, file)
            //     this.beforeAvatarUpload()

            // }
            handleClick(){
                alert(11223)
                this.$http.get(getTemplateList).then(res=>{
                    console.log(res.data.data)
                })
            }

        }
    }
</script>
<style scoped lang='less'>
      .editdetail{
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
        .right-btn{
            position:absolute;
            right:10%;
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
        // .input-textarea{
        //     height:100px;
        // }
    }
</style>
