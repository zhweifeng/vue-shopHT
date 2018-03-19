<template>
    <div>
        <leftBar></leftBar>
        <div class="activity-right" style="padding-top:20px;">
        <div class="marsk">
            <!--<addeditGoods></addeditGoods>-->
            <!--弹框 开始-->
            <!-- <template> :model="ruleForm" :rules="rules"-->
                <el-form label-width="100px" class="">
                    <i class="el-icon-close closeBtn"></i>
                    <h3>添加商品</h3>
                    <!--店铺名称-->
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input  style="width:250px;" v-model="ruleForm.goodsName"></el-input>
                    </el-form-item>
                    <el-form-item label="原价" required>
                        <el-input  style="width:200px;margin-right:50px;" v-model="ruleForm.goodsPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="是否打折" required>
                        <div class="block">
                        <el-switch v-model="discountStatusFlag"></el-switch>
                    </div>
                    </el-form-item>
                    <!--折扣-->
                    <el-form-item label="折扣" required>
                        <el-input  style="width:50px;margin-right:50px;" v-model="ruleForm.discountRate"></el-input>
                    </el-form-item>
                    <el-form-item label="现价" required>
                        <el-input  style="width:200px;margin-right:50px;" v-model="ruleForm.discountPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片" prop="name" v-loading="uploadLoading">
                        <!--<img width="200" :src="form.imgUrl" alt="">-->
                        <div class="prevImg clearfix"  style="width:600px;" v-if="goodsListDesc.length">
                            <div :key="item.key"  v-for="item in goodsListDesc" style="position:relative;">
                                <img  class="fl" style="width:150px; height:150px;" :src="item" alt="">
                                <i  class="el-icon-error fl"  style="position:absolute; width:40px; height:40px; top:0; right:0;" @click="deleteImgList()"></i>
                            </div>
                        </div>
                        <div class="upload">
                            <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" multiple @change="upload($event)"/>
                            <i class="el-icon-plus"></i>
                        </div>
                    </el-form-item>
                    <el-form-item label="轮播图片" prop="name" v-loading="uploadLoading">
                        <div class="prevImg clearfix"  style="width:600px;" v-if="goodsListUrl.length">
                            <div :key="item.key" v-for="item in goodsListUrl" style="position:relative;">
                                <img  class="fl" style="width:150px; height:150px;" :src="item" alt="">
                                <i  class="el-icon-error fl" style="position:absolute; width:40px; height:40px; top:0; right:0;" @click="deleteImgList2()"></i>
                            </div>
                        </div>
                        <div class="upload">
                            <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" multiple @change="upload2($event)"/>
                            <i class="el-icon-plus"></i>
                        </div>
                    </el-form-item>
                    <el-form-item label="是否上架" required>
                        <div class="block">                        
                        <el-switch v-model="soldoutFlag"></el-switch>
                    </div>
                    </el-form-item>
                    <el-form-item label="是否推荐" required>
                        <div class="block">                       
                        <el-switch v-model="commendStatusFlag"></el-switch>
                    </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitSure">保存</el-button>
                        <el-button type="primary"><router-link style="color:#fff;" :to="'/goodsList'">关闭</router-link></el-button>
                    </el-form-item>
                </el-form>
            <!--</template>-->
            <!--弹框 结束-->
        </div> 
        </div> 
    </div>
</template>
<script>
    import leftBar from '../commonComponents/leftBar.vue';
    import {getProducts,addGoods,getGoodsDetailsNew,updateGoods,updateGoodsStatus,getQiniuToken,qiniuBaseUrl,getCategory} from '../../data/postData';
    export default {
        components:{
            leftBar
        },       
        data(){
            return{
                user: JSON.parse(localStorage.getItem('user')),
                //id: this.$route.params.id,
                discountStatusFlag:false,
                soldoutFlag:false,
                commendStatusFlag:false,
                //弹框
                ruleForm:{
                    goodsName:'',//店铺名称
                    album:'',//店铺相册
                    description:"",
                    goodsPrice:"",
                    discountPrice:"",
                    discountRate:"",
                    originalprice:"",
                    minbuycount:"",
                    servicetimes:"",
                    platformkind:"",
                    shopkind:"",
                    city:"",
                    sortNo:"",
                    discountStatus:0,
                    soldout:0,
                    commendStatus:0,
                    id:this.$route.params.id,
                    goodsDesc:"",
                    goodsPic:"",
                    goodsUrl:""
                    //photoList:["http://p1az9gcpw.bkt.clouddn.com/FnhGMNi85ksPpkOjZw46OIRI7oeH"],
                },
                //file:null,
                dialogVisible:false,
                files:'',
                files2:'',
                uploadLoading:false,
                goodsListDesc:[],
                goodsListUrl:[],
                goodsListPic:''
            }
        },
        mounted(){
            var _this=this;
            _this.ruleForm.discountStatus=0;
            _this.ruleForm.commendStatus=1;
            _this.ruleForm.soldout=1;
            _this.discountStatusFlag=false;
            _this.discountStatusFlag=false;
            _this.commendStatusFlag=false;
            
            _this.goodsListDesc=[];
            _this.goodsListPic='';
            _this.goodsListUrl=[];
            _this.ruleForm.findStatus=0,

            _this.ruleForm.goodsUrl=0,
            _this.ruleForm.goodsName=0,//店铺名称
            _this.ruleForm.goodsPrice=0,
            _this.ruleForm.discountPrice=0,
            _this.ruleForm.discountRate=0,
            _this.ruleForm.goodsListUrl=goodsUrl.join(',');
            _this.ruleForm.goodsListDesc=goodsListDesc.join(',');
            //console.log('---res,ruleForm-商品信息---',res);
        },
        methods:{
            //关闭弹窗            
            close(){
                this.dialogVisible=true
            },
            submitSure(){
                var _this=this;
                var ruleForm={};
                if(_this.discountStatusFlag==true){
                    _this.ruleForm.discountStatus=0;
                }else{
                    _this.ruleForm.discountStatus=1;
                }
                if(_this.soldoutFlag==true){
                    _this.ruleForm.soldout=0;
                }else{
                    _this.ruleForm.soldout=1;
                }
                if(_this.commendStatusFlag==true){
                    _this.ruleForm.commendStatus=0;
                }else{
                    _this.ruleForm.commendStatus=1;
                }
                _this.ruleForm.goodsDesc=_this.goodsListDesc.join(',');
                _this.ruleForm.goodsUrl=_this.goodsListUrl.join(',');

                var params={
                    data:{
                        // originalprice:"",
                        // minbuycount:"",
                        // servicetimes:"",
                        // platformkind:"",
                        // shopkind:"",
                        // city:"",
                        //sortNo:1,
                        //goodsId:_this.ruleForm.goodsId,
                        findStatus:_this.ruleForm.findStatus,
                        storeNo:_this.user.storeNo,
                        wxUid:_this.user.wxUid,
                        wxSid:_this.user.wxSid,
                        goodsUrl: _this.ruleForm.goodsUrl,
                        goodsName: _this.ruleForm.goodsName,//店铺名称
                        goodsPrice:_this.ruleForm.goodsPrice,
                        discountPrice:_this.ruleForm.discountPrice,
                        discountRate:_this.ruleForm.discountRate,
                        discountStatus:_this.ruleForm.discountStatus,//状态
                        soldout:_this.ruleForm.soldout,
                        commendStatus:_this.ruleForm.commendStatus,
                        goodsDesc:_this.ruleForm.goodsDesc,
                        goodsPic:_this.ruleForm.goodsPic,
                        goodsUrl:_this.ruleForm.goodsUrl
                    }
                }
                console.log('^^添加商品信息 params',params)
                //alert();updateGoods
                this.$http.post(addGoods,params).then(res=>{
                    console.log('---res,ruleForm-商品信息---',res);
                    //var _this=this;
                    var status=res.data.status;
                    if(status){
                        var data=res.data.data;
                        console.log('--添加成功返回结果--',data);
                    }else{

                    }
                })
            },
            upload(e){
                const that=this;
                var _this=this;
                var files = e.target.files[0];
                // for (let i = 0; i < files.length; i++){
                this.uploadLoading = true;
                this.$http.get(getQiniuToken,{
                    params:{
                        "wxUid":"",
                        "wxSid":""
                    }
                }).then(res1=>{
                    let config={
                        headers:{'Content-Type':'multipart/form-data'}
                    };
                    let formdata = new FormData();//创建form对象
                    formdata.append('file',files,files.name)
                    formdata.append('chunk','0');//断点传输
                    formdata.append('chunks','1');
                    formdata.append('token',res1.data.uptoken);
                    this.$http.post('http://up-z1.qiniup.com',formdata,config).then(res2=>{
                        if(res2.data.key!=''){
                            _this.files=qiniuBaseUrl+res2.data.key;
                            _this.uploadLoading = false;
                            _this.goodsListDesc.push(_this.files);
                            //console.log('====fileList====',_this.goodsListDesc);
                        }
                    })  
                })
                // }  
                // console.log('fileList',this.fileList)
            },
            upload2(e){
                const that=this;
                var _this=this;
                var files = e.target.files[0];
                // for (let i = 0; i < files.length; i++){
                this.uploadLoading = true;
                this.$http.get(getQiniuToken,{
                    params:{
                        "wxUid":"",
                        "wxSid":""
                    }
                }).then(res1=>{
                    let config={
                        headers:{'Content-Type':'multipart/form-data'}
                    };
                    let formdata = new FormData();//创建form对象
                    formdata.append('file',files,files.name)
                    formdata.append('chunk','0');//断点传输
                    formdata.append('chunks','1');
                    formdata.append('token',res1.data.uptoken);
                    this.$http.post('http://up-z1.qiniup.com',formdata,config).then(res2=>{
                        if(res2.data.key!=''){
                            _this.files=qiniuBaseUrl+res2.data.key;
                            _this.uploadLoading = false;
                            _this.goodsListUrl.push(_this.files);
                            //console.log('====fileList====',_this.goodsListUrl);
                        }
                    })  
                })
                // }  
                // console.log('fileList',this.fileList)
            },
            deleteImgList(data){
                // this.fileList.forEach((val,i)=>{
                //      if (val == data) {
                //          this.fileList.splice(i,1)
                //      }
                // })
                this.files='';
                this.goodsListDesc=[];
                //this.goodsListUrl=[];
            },
            deleteImgList2(data){
                // this.fileList.forEach((val,i)=>{
                //     if (val == data) {
                //         this.fileList.splice(i,1)
                //     }
                //  })
                this.files2='';
                this.goodsListUrl=[];
            }
        }//method
    }
</script>

<style scoped lang="less">
    .activity-right{
        width: calc(~"100% - 250px");
        margin-top: 66px;
        margin-left: 230px;
        float: left;
        h3{
            margin: 10px 0 20px
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
    .el-date-editor.piker-width{ width:250px;}
    .lableCase0{ width:700px; padding-right: 20px; padding-left:10px; padding-top:5px; padding-bottom:5px; margin-top: 0px; margin-bottom:0px;}
    .lableCase2{ width:780px; padding-right: 20px; padding-left:10px; padding-top:5px; padding-bottom:5px; margin-top: 0px; margin-bottom:0px;}
    .lableCase{ width:450px; padding-right: 20px; padding-left:10px; padding-top:5px; padding-bottom:5px; margin-top: 0px; margin-bottom:0px;}
    .el-form-item{ margin-bottom:8px; padding-bottom:0;}


    //弹框
	.demo-ruleForm{
		padding-top:20px;
	}
    .day_box {
        margin-top: 50px;
    }
    .active_day {
        background: #21BA5C;
        color: #fff;
        margin-right: 12px;
        line-height: 30px;
        border-radius: 5px;
        display: inline-block;
        padding: 0 12px;
    }

    .active_day.no_active_day {
        background: #ccc;
        color: #fff;
    }

    .area_box {
        display: flex;
        flex-wrap: wrap;
    }

    .area_item {
        background: #115F88;
        color: #fff;
        margin-right: 12px;
        line-height: 30px;
        border-radius: 5px;
        display: inline-block;
        padding: 0 12px;
        margin-bottom: 12px;
    }
    
    .refresh {
        background: #21BA5C;
    }
    
    .area_item{
    	cursor: pointer;
    }
    
    .prompt{
    	color: #999;
    }
    
    .inpwidth{
    	width: 500px;
    }
    .el-button--primary{
    	width:100px;
    }
    .day_box span{
    	cursor: pointer;
    }
    .el-icon-plus{
    	width: 100%;
    	height: 100%;
    }
    #storephoto{
    	width:100px;
    	height:100px;
    	border:1px solid #C2CCD1;
    	border-radius: 5px;
    }
    #storephoto input{
    	width: 100%;
    	height:100%;
    	opacity: 0;
    }

    .imgUpload{
    display:inline-block;
    width: 100px;
    height: 100px;
    object-fit: contain;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    }
    .photou{
        display:inline-block;
    }
    .photou,.photou img{
        display:inline-block;
        width: 200px;
        height: 200px;
    }
    .imgUpload:hover {
    border-color: #8391a5;
    }
    .imgUpload:active {
    outline: 0;
    border-color: #20a0ff;
    }
    .el-date-editor.el-input {
    width: 100%;
    }
    .hide {
    display: none;
    }
    .txtC {
    text-align: center;
    }
    .el-col .el-col-8 span{
        width:90px;
        height:90px;
    }
    .el-col .el-col-8 span img{
        width:100%;
        height:100%;
    }
    .demo-ruleForm{
        top:5%;
        left:25%;
        border-radius:10px;
        border:1px solid #ccc;
        background:#fff;
        box-sizing:border-box;
        padding-right:100px;
    }
    .closeBtn{
        position:absolute;
        top:20px;
        right:20px;
        cursor:pointer;
    }

    .prevImg img{
        width:200px; hieght:200px;
    }
    .upload{
        display: block;
        width: 100px;
        height: 100px;
        border:1px dotted #ccc;
        position: relative;
        input{
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 999;
            cursor: pointer;
        }
        i{
            font-size: 80px;
            color: #ccc;
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: -1;
        }
    }
    .prevImg{
        position: relative;
        display: inline-block;
        &+.prevImg{
            margin-left: 10px;
        }
        i{
            position: absolute;
            right: -8px;
            top: -8px;
            font-size: 20px;
            color: #ec5051;
            cursor: pointer;
        }
    }
    .activity-right{
        width: calc(~"100% - 250px");
        margin-top: 66px;
        margin-left: 230px;;
        float: left;
        h1{
            font-size: 26px;
            margin: 10px 30px;
        }
        h3{
            margin: 10px 0 20px;            
        }
        .select_type{
            margin-bottom: 20px;
            position: relative;
            span{
                margin-right: 10px;
            }
            button{
                margin-left: 100px;
            }
        }
    }
    .el-table__body-wrapper{
        margin-top: 15px;
        img{
            width: 80px;
        }
    }
    .selGoods{
        margin-bottom: 20px;
        border-bottom: 1px solid #eee;
        padding-bottom: 20px;
        section{
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            ul>li{
                display: inline-block;
                border: 1px solid #eee;
                padding: 3px;
                border-radius: 5px;
                margin: 5px;
                cursor: pointer;
                &:hover{
                    background: #f2f2f2;
                }
                i{
                    cursor: pointer;
                    border-radius: 50%;
                    &:hover{
                        color: #fff;
                        background: #409EFF;
                    }
                }
              
            }
        }
    }
    #search{
        position: relative;
        margin-bottom: 46px;
        h3{
            width: 80px;
            display: inline-block;
        }
        .searchBtn{
            position: absolute;
            bottom: 10px;
            right: 120px;
        }
        .addBtn{
            position: absolute;
            bottom: -40px;
            right: 120px;
        }
    }
    .pagination{
        margin-top: 20px;
        display: flex;
        justify-content: center
    }
    .searchList{
        position: relative;
        margin-bottom: 20px;
          .bottomAdd{
            position: absolute;
            right: 0;
            bottom: 0px;
        }
    }
    .upload{
        display: block;
        width: 100px;
        height: 100px;
        border:1px dotted #ccc;
        position: relative;
        input{
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 999;
            cursor: pointer;
        }
        i{
            font-size: 80px;
            color: #ccc;
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: -1;
        }
    }
    .prevImg{
        position: relative;
        display: inline-block;
        &+.prevImg{
            margin-left: 10px;
        }
        i{
            position: absolute;
            right: -8px;
            top: -8px;
            font-size: 20px;
            color: #ec5051;
            cursor: pointer;
        }
    }
</style>