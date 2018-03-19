<template>
    <div>
        <leftBar></leftBar>
        <div class="activity-right"  style="padding-top:20px;">
            <el-button type="primary" class="addBtn fr" style="width:100px; height:40px;"><router-link :to="'/goodsAdd'" style="color:#fff;">添加商品</router-link></el-button>
            <h3 style="padding-left:10px;">商品列表</h3>
            <div class="clearfix"  style="width:900px;" >
                <div class="select_type fl clearfix lableCase" style="margin-bottom:8px;">
                    <span class="fl" style="height:40px; line-height:40px;">添加时间</span>
                    <el-date-picker
                    style="width:150px;"
                    class="fl piker-width"
                    v-model="nowStartTime"
                    type="date"
                    placeholder="开始日期">
                    </el-date-picker>
                    <el-date-picker
                    style="width:150px; margin-left:10px;"
                    class="fl piker-width"
                    v-model="nowEndTime"
                    type="date"
                    placeholder="结束日期">
                    </el-date-picker>
                </div>           
                <div class="select_type fl clearfix lableCase" style="margin-bottom:8px;">
                    <span class="fl"  style="height:40px; line-height:40px;">折扣区间</span>
                    <el-input class="fl" v-model="nowMiniRate" placeholder="最低折扣">
                    </el-input>
                    <el-input class="fl" style="margin-left:10px;" v-model="nowMaxRate" placeholder="最高折扣">
                    </el-input>
                </div>
            </div>
            <div class="clearfix"  style="width:900px;" >
                <div class="select_type fl clearfix lableCase" style="margin-bottom:8px;">
                    <span class="fl" style="height:40px; line-height:40px;">价格区间</span>
                    <el-input class="fl" v-model="nowMiniPrice" placeholder="最低价格">
                    </el-input>
                    <el-input class="fl" style="margin-left:10px;" v-model="nowMaxPrice" placeholder="最高价格">
                    </el-input>
                </div>
                <div class="select_type fl clearfix lableCase" style="margin-bottom:8px;">
                    <span class="fl"  style="height:40px; line-height:40px;">分类</span>
                    <!-- <el-input class="fl" v-model="nowMiniPrice" placeholder="一级分类">
                    </el-input>
                    <el-input class="fl" style="margin-left:10px;" v-model="nowMaxPrice" placeholder="二级分类">
                    </el-input> -->
                    <el-select class="fl" v-model="ValType" placeholder="一级分类"  style="width:100px; margin-left:10px;">
                        <el-option
                        v-for="item in optionsType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select class="fl" v-model="ValSubType" placeholder="二级分类"  style="width:100px; margin-left:10px;">
                        <el-option
                        v-for="item in optionsSubType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="clearfix">
                <div class="select_type fl clearfix lableCase2" style="margin-bottom:8px;">
                    <el-input class="fl" v-model="nowGoodsName" placeholder="商品名称"></el-input>
                    <el-select v-model="GBsoldout" placeholder="全部状态"  style="width:150px; margin-left:10px;">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button @click='serchProduct' style="margin-left:10px;" type="primary">查询</el-button>
                    
                    <el-button @click='emptyProduct' style="margin-left:10px;" type="primary">重置</el-button>
                </div>
            </div>
            <div class="clearfix lableCase2"  style="margin-bottom:8px;">
                <el-button class="fl prevPage" @click="prevTap" type="primary">上一页</el-button>
                <el-button class="fl nextPage" @click="nextTap" type="primary">下一页</el-button>
                <!--<el-button class="fl allSoldOn"  @click="allChangeON" type="primary">全选</el-button>
                <el-button class="fl allSoldOut"  @click="allChangeOUT" type="primary">取消</el-button>-->
                <el-button class="fl allSoldOn"  @click="allChangeON" type="primary">批量上架</el-button>
                <el-button class="fl allSoldOut"  @click="allChangeOUT" type="primary">批量下架</el-button>
                <div class="fl" style="height:40px; line-height:40px; padding-left:20px;" >第<span>{{nowPage?nowPage:'0'}}</span>共<span>{{Math.ceil(nowTotal/nowSize)?Math.ceil(nowTotal/nowSize):'0'}}</span>页</div>
            </div>
             <el-table
                :data="tableData"
                style="width:100%">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                    prop="goodsName"
                    label="商品名称"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="goodsPic"
                    label="图片"
                    width="180" align="center">
                    <template slot-scope="scope">                        
                        <img :src="scope.row.goodsPic" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                    prop="goodsPrice"
                    label="原价" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.goodsPrice?scope.row.goodsPrice+'元': '0元' }}
                    </template>
                </el-table-column>  
                <el-table-column
                    props="discountRate"
                    label="折扣"
                    width="180" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.discountRate }}
                    </template>
                </el-table-column>
                <el-table-column
                    props="discountPrice"
                    label="折扣价"
                    width="180" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.discountPrice?scope.row.discountPrice+'元':'0元' }}
                    </template>
                </el-table-column>
                <el-table-column
                    props="soldonTime"
                    label="上架时间"
                    width="100" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.soldonTime + ''}}
                    </template>
                </el-table-column>
                 <el-table-column
                    props="commendStatus"
                    label="是否推荐"
                    width="100" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.commendStatus==0?'是':'否'}}
                    </template>
                </el-table-column>
                 <el-table-column
                    props="soldout"
                    label="是否上架"
                    width="100" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.soldout==0?'是':'否'}}
                    </template>
                </el-table-column>                
                <el-table-column
                    props="soldout"
                    label="操作"
                    width="200" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button @click="editTap(scope.row)" type="text" size="small">编辑</el-button> -->
                        <!-- <router-link :to="'/addeditGoods/'+scope.row.goodsId"> 编辑</router-link> -->
                        <!-- <el-button @click="checkDetail(scope.row)" type="text" size="small">查看</el-button> -->
                        <!-- <el-button type="text" size="small">编辑</el-button> -->
                        <el-button @click="getGoodsDetail(scope.row)" type="text" size="small">详情</el-button>
                        <router-link style="color:#409EFF;" :to="'/goodsEdit/'+scope.row.goodsId"> 编辑</router-link>
                        <el-button @click="offLine(scope.row)" type="text" size="small">{{ scope.row.soldout==0?'下架':'上架'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>        
            <div class="marsk marsk2" v-if="marskModle">
                <template>
                <el-form label-width="100px" class="">
                    <i class="el-icon-close closeBtn"></i>
                    <h3>商品详情</h3>
                    <!-- 店铺名称 -->
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input disabled style="width:250px;" v-model="ruleForm.goodsName"></el-input>
                    </el-form-item>
                    <el-form-item label="原价" required>
                        <el-input disabled style="width:200px;margin-right:50px;" v-model="ruleForm.goodsPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="是否打折" required>
                        <div class="block">                       
                        <el-switch disabled v-model="discountStatusFlag"></el-switch>
                    </div>
                    </el-form-item>
                    <!--折扣-->
                    <el-form-item label="折扣" required>
                        <el-input disabled style="width:50px;margin-right:50px;" v-model="ruleForm.discountRate"></el-input>
                    </el-form-item>
                    <el-form-item label="现价" required>
                        <el-input disabled style="width:200px;margin-right:50px;" v-model="ruleForm.discountPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片" prop="name" v-loading="uploadLoading">
                        <div class="prevImg clearfix"  style="width:600px;" v-if="goodsListDesc.length">
                            <div :key="item.key"  v-for="item in goodsListDesc" style="position:relative;">
                                <img  class="fl" style="width:150px; height:150px;" :src="item" alt="">
                                <i  class="el-icon-error fl"  style="position:absolute; width:40px; height:40px; top:0; right:0;" ></i>
                            </div>
                        </div>
                        <div class="upload">
                            <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" multiple/>
                            <i class="el-icon-plus"></i>
                        </div>
                    </el-form-item>
                    <el-form-item label="轮播图片" prop="name" v-loading="uploadLoading">
                        <div class="prevImg clearfix"  style="width:600px;" v-if="goodsListUrl.length">
                            <div :key="item.key" v-for="item in goodsListUrl" style="position:relative;">
                                <img  class="fl" style="width:150px; height:150px;" :src="item" alt="">
                                <i  class="el-icon-error fl" style="position:absolute; width:40px; height:40px; top:0; right:0;" ></i>
                            </div>
                        </div>
                        <div class="upload">
                            <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" multiple/>
                            <i class="el-icon-plus"></i>
                        </div>
                    </el-form-item>
                    <el-form-item label="是否上架" required>
                        <div class="block">                        
                        <el-switch disabled v-model="soldoutFlag"></el-switch>
                    </div>
                    </el-form-item>
                    <el-form-item label="是否推荐" required>
                        <div class="block">                       
                        <el-switch disabled v-model="commendStatusFlag"></el-switch>
                    </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="closeMd" type="primary">关闭</el-button>
                    </el-form-item>
                </el-form>
            </template>
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
                marskModle:false,
                getGoodsDetail:false,
                user:JSON.parse(window.localStorage.getItem('user')),
                nowPage:1,
                nowSize:5,
                nowTotal:100,
                nowStartTime:'',
                nowEndTime:'',
                nowMiniPrice:'',
                nowMaxPrice:'',
                nowMiniRate:'0',
                nowMaxRate:'9',
                nowGoodsName:'',
                //mobile:this.user.mobile,
                //password:this.user.password,
                //wxUid:this.user.wxUid,
                //wxSid:this.user.wxSid,
                GBsoldout:"",//状态
                GBcondition:"1",
                GBorderby:"1",//倒序
                //storeNo:this.user.storeNo||'B02S0002',
                marskAdd:false,
                GgoodsUrl:[],
                GgoodsUrlDesc:'',
                dialogVisible:false,
                files:'',
                files2:'',
                uploadLoading:false,
                bflag:'ADD',
                type:'',
                category: '',
                options: [{
                    value: '',
                    label: '全部状态'
                }, {
                    value: '0',
                    label: '上架'
                }, {
                    value: '1',
                    label: '下架'
                }],
                //optionsType:'',
                ValType:0,
                optionsType:[{
                    value: 0,
                    label: '一级分类'
                }, {
                    value: 1,
                    label: '男装'
                }, {
                    value: 2,
                    label: '女装'
                }],
                ValSubType:0,
                optionsSubType:[{
                    value: 0,
                    label: '二级分类'
                }, {
                    value: 1,
                    label: '衣服'
                }, {
                    value: 2,
                    label: '帽子'
                }],
                //selectVal:'全部状态',
                tableData: [{
                    commendStatus:"0",
                    condition:"1",
                    discountPrice:"0.43",
                    discountRate:"1",
                    endTime:'',
                    nullgoodsColor:'',
                    goodsDesc:"http://dingdian.parllay.cn/resource/B02S0002/1/1.jpg",
                    goodsId:"1685",
                    goodsName:"棉质条纹印花半身中裙黑白1",
                    goodsPic:"http://dingdian.parllay.cn/resource/B02S0002/1/1.jpg",
                    goodsPics:null,
                    goodsPrice:"43.90",
                    goodsSize:null,
                    goodsSku:null,
                    goodsUrl:"",
                    goodsUrlmd5:null,
                    isBook:"0",
                    isFavorite:"2",
                    isLike:"0",
                    maxPrice:"1000000",
                    maxRate:"10",
                    miniPrice:"0",
                    miniRate:"0",
                    orderby:"1",
                    soldonTime:"2018-01-26",
                    soldout:"1",
                    soldoutTime:null,
                    startTime:null,
                    storeId:"1",
                    storeNo:"B02S0002",
                    wxUid:null
                }],
                photoList:[],
                goodsListDesc:[],
                goodsListUrl:[],



                //id: this.$route.params.id,
                checkboxGroup1:["周一"],
            	resetDom: true,
        		value1:'',
        		value2:'',
                sign:"",
                token:"",
                album:"",
                retryNum:0,
                httpResponse:null,
                sign:null,




                marskServer:false,
                myGoodsId:'',

                //弹框
                ruleForm:{
                    goodsName: '衣服',//店铺名称
                    album:'',//店铺相册
                    description:"",
                    goodsPrice:"100",
                    discountPrice:"10",
                    discountRate:"1",
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
                    goodsDesc:"http://p1az9gcpw.bkt.clouddn.com/FnKS-16BP_bAgS7sWyA_XIC-VtyV",
                    goodsPic:"http://p1az9gcpw.bkt.clouddn.com/FnhGMNi85ksPpkOjZw46OIRI7oeH",
                    photoList:["http://p1az9gcpw.bkt.clouddn.com/FnhGMNi85ksPpkOjZw46OIRI7oeH"],
                    discountStatusFlag:false,
                    soldoutFlag:false,
                    commendStatusFlag:false
                },
                file:null,
                // rules:{
                //     name: [{
                //             required: true,
                //             message: '请输入店铺名称',
                //             trigger: 'blur'
                //         }
                //     ],
                //     region: [{
                //         required: true,
                //         message: '请选择活动区域',
                //         trigger: 'change'
                //     }],
                //     date1: [{
                //         type: 'date',
                //         required: true,
                //         message: '请选择日期',
                //         trigger: 'change'
                //     }],
                //     date2: [{
                //         type: 'date',
                //         required: true,
                //         message: '请选择时间',
                //         trigger: 'change'
                //     }],
                //     type: [{
                //         type: 'array',
                //         required: true,
                //         message: '请至少选择一个活动性质',
                //         trigger: 'change'
                //     }],
                //     resource: [{
                //         required: true,
                //         message: '请选择活动资源',
                //         trigger: 'change'
                //     }],
                //     desc: [{
                //         required: true,
                //         message: '请输入商家简介',
                //         trigger: 'blur'
                //     }],
                //     phone: [{
                //         required: true,
                //         message: '请输入客服电话',
                //         trigger: 'blur'
                //     }],
                //     shop_info: [{
                //         required: true,
                //         message: '请输入商家简介',
                //         trigger: 'blur'
                //     }]
                //},
                photoList:['http://p1az9gcpw.bkt.clouddn.com/Fon8ebnbFsjs7H5597cFooYHV19j'],
                files:''
            }
        },
        mounted(){
            
            // this.$bus.$on("closeStyle",function(data){
            //     _this.marskStyle=false;
            // })
            //this.$on("closeMask",function(data){
                //if(data=='close'){
                    //_this.marskSerphotoLister=false;
                //}               
            //})
            // console.log('---user---',ephotoListal(localStorage.getItem('user')));
            //请求列表
            var _this=this;
            _this.getCategory();
            _this.getGoodsList();
        },
        methods:{
            closeMd(){
                marskModle=false;
            },
            checkDetail(data){
                console.log(data)
            },
            getGoodsDetail(data){
                var _this=this;
                var marskModle=true;
                var id=Number(data.goodsId);
                var params={
                    data:{
                        goodsId:id
                    }
                }
                console.log('-_this.tableData param-',param);
                this.$http.post(getGoodsDetailsNew,params).then(res=>{
                    let status=res.data.status;
                    var _this=this;
                    if(status){
                        var data=res.data.data;
                        for(var name in data){
                            ruleForm[name]=data[name]
                        }
                        _this.getGoodsDetail=true;
                        console.log('-获取商品详情-',res);                        
                        console.log('-_ruleForm-',_this.ruleForm);
                    }else{
                        console.log(res.data.message);
                    }                
                }).catch(err=>{
                    //console.log(res.data.message);

                }); 
                
            },
            getGoodsList(){
                var _this=this;
                var param = {
                    "data":{
                        "mobile":this.user.mobile,
                        "password":this.user.password,
                        "wxUid":this.user.wxUid,
                        "wxSid":this.user.wxSid,
                        "page":this.nowPage,
                        "size":this.nowSize,//
                        "condition":this.GBcondition,
                        "orderby":this.GBorderby,//倒序
                        "startTime":this.nowStartTime,
                        "endTime":this.nowEndTime,
                        "miniPrice":this.nowMiniPrice,
                        "maxPrice":this.nowMaxPrice,
                        "miniRate":this.nowMiniRate,//必填
                        "maxRate":this.nowMaxRate,//必填
                        "goodsName":this.nowGoodsName,
                        "soldout":this.GBsoldout,
                        "storeNo":this.user.storeNo,
                        //"storeNo":'B02S0002',
                        "wxSid":this.user.wxSid,
                        "wxUid":this.user.wxUid
                    }
                }
                console.log('-_this.tableData param-',param);
                this.$http.post(getProducts,param).then(res=>{
                    let status=res.data.status;
                    var _this=this;
                    if(status){
                        var data=res.data.data;
                        console.log('-获取商品列表-',res);
                        // this.$message({
                        //     message: '获取商品列表成功',
                        //     type:'success'
                        // });
                        _this.nowTotal=res.data.total;
                        _this.tableData=[];
                        for(var i=0; i<data.length; i++){
                            var json={};
                            for(var name in data[i]){
                                json[name]=data[i][name]
                            }
                            _this.tableData.push(json);
                        }
                        console.log('-_this.tableData-',_this.tableData);
                    }else{
                        console.log(res.data.message);
                        // this.$message({
                        //     message: '获取商品列表失败',
                        //     type: 'error'
                        // });
                    }                
                }).catch(err=>{
                    //console.log(res.data.message);
                    this.$message({
                        message: '服务器错误',
                        type: 'warning'
                    });
                });                            
            },
            //查询
            serchProduct(){
                var _this=this;
                //var param = {
                _this.getGoodsList();
            },
            //重置
            emptyProduct(){
                var _this=this;
                this.nowPage='1';
                this.nowSize='5';//
                this.nowStartTime='';
                this.nowEndTime='';
                this.nowMiniPrice='';
                this.nowMaxPrice='';
                this.nowMiniRate='0';//必填
                this.nowMaxRate='9';//必填
                this.nowGoodsName='';
                this.GBsoldout='';
                _this.getGoodsList();
            },
            //上一页
            prevTap(){
                var _this=this;
                this.nowPage--;
                if(this.nowPage<=1){
                    this.nowPage=1;
                }

                _this.getGoodsList();
            },
            //下一页
            nextTap(){
                var _this=this;
                this.nowPage++;
                if(this.nowPage>parseInt(this.nowTotal/this.nowSize)){
                    if(this.nowTotal%this.nowSize==0){
                        this.nowPage=parseInt(this.nowTotal/this.nowSize);
                    }else{
                        this.nowPage=parseInt(this.nowTotal/this.nowSize)+1;
                    }
                }
                _this.getGoodsList();
            },
            //单个上架下架
            offLine(data){
                //"ids":"1900,1901,1902,1903,1904",
                var _this=this;
                var actionType='SOLD_OUT';
                if(data.soldout==0){
                    actionType='SOLD_OUT';
                }else{
                    actionType='SOLD_ON';
                }
                var params={
                    data:{
                        "ids":data.goodsId,
                        "actionType":actionType
                    }
                }
                console.log('上下架 params',params)
                this.$http.post(updateGoodsStatus,params).then(res=>{
                    _this.getGoodsList();
                })
            },
            //批量上架
            allChangeON(){
                var idsItem=[];
                for(var i=0; i<this.tableData.length; i++){
                    idsItem.push(this.tableData[i].goodsId);
                }
                var strIds=idsItem.join(',');
                //"ids":"1900,1901,1902,1903,1904",
                var _this=this;
                var actionType='SOLD_ON';
                var params={
                    data:{
                        "ids":strIds,
                        "actionType":actionType
                    }
                }
                console.log('上下架 params',params)
                this.$http.post(updateGoodsStatus,params).then(res=>{
                    _this.getGoodsList();
                })    
            },
            //批量下架
            allChangeOUT(){
                var idsItem=[];
                for(var i=0; i<this.tableData.length; i++){
                    /*if(){
                        //如果是选中状态
                    }*/
                    idsItem.push(this.tableData[i].goodsId);
                }
                var strIds=idsItem.join(',');
                //"ids":"1900,1901,1902,1903,1904",
                var _this=this;
                var actionType='SOLD_OUT';
                var params={
                    data:{
                        "ids":strIds,
                        "actionType":actionType
                    }
                }
                console.log('上下架 params',params)
                this.$http.post(updateGoodsStatus,params).then(res=>{

                    _this.getGoodsList();
                })    
            },

            //点击编辑
            editTap(data){
                var _this=this;
                this.bflag='EDIT';
                _this.marskServer=true;
                
                console.log('--BBk--',data)
                //console.log(data.id)
                var params = {
                    data:{
                        goodsId: Number(data.goodsId)
                    }
                }
                console.log('获取详情信息 params',params)
                this.$http.post(getGoodsDetailsNew,params).then(res=>{
                    var _this=this;
                    let data = res.data.data
                    let status = res.data.status;
                    console.log('获取详情信息 res',res)
                    if(status){
                        console.log('获取详情信息 res',res)
                        _this.marskServer=true;
                        _this.ruleForm={};
                    for(var name in data){
                        _this.ruleForm[name]=data[name]
                    }
                    //推荐
                    if(_this.ruleForm.commendStatus==0){
                        _this.ruleForm.commendStatusFlag=true;                       
                    }else{
                        _this.ruleForm.commendStatusFlag=false;
                    }
                    //上架
                    if(_this.ruleForm.soldout==0){
                        _this.ruleForm.soldoutFlag=true;
                    }else{
                        _this.ruleForm.soldoutFlag=false;
                    }
                    //打折
                    if(_this.ruleForm.discountStatus==1){
                        _this.ruleForm.discountStatusFlag=true;
                    }else{
                        _this.ruleForm.discountStatusFlag=false;
                    }
                    //图片处理
                    _this.photoList=_this.ruleForm.goodsDesc.split(',');
                    _this.ruleForm.goodsPic=_this.photoList[0]||_this.ruleForm.goodsDesc.split(',')[0];
                    }else{
                        //_this.marskServer=false;
                    }
                })
            },
            //点击添加
            addBtn(){
                //this.$emit('closeMask','close');
                var _this=this;
                _this.marskServer=true;
                _this.bflag='ADD';
                _this.ruleForm.goodsName='';//店铺名称
                _this.ruleForm.album='';//店铺相册
                _this.ruleForm.description='';
                _this.ruleForm.goodsPrice='';
                _this.ruleForm.discountPrice='';
                _this.ruleForm.discountRate='';
                _this.ruleForm.originalprice='';
                _this.ruleForm.minbuycount='';
                _this.ruleForm.servicetimes='';
                _this.ruleForm.platformkind='';
                _this.ruleForm.shopkind='';
                _this.ruleForm.city='';
                _this.ruleForm.sortNo='';
                _this.ruleForm.discountStatus=false;
                _this.ruleForm.soldoutStatus=false;
                _this.ruleForm.commendStatus=false;
                _this.ruleForm.goodsDesc="";
                _this.ruleForm.goodsPic="";
                _this.photoList=[];
        	},

            //sureRequest
            editRequestTap(){
                //如果是添加
                if(this.bflag=='ADD'){
                    var _this=this;
                    // _this.ruleForm.commendStatusFlag=false;
                    // _this.ruleForm.soldoutFlag=false;
                    // _this.ruleForm.discountStatusFlag=false;
                    //推荐
                    if(_this.ruleForm.commendStatusFlag==true){
                        _this.ruleForm.commendStatus=0;
                    }else{
                        _this.ruleForm.commendStatus=1;
                    }
                    //上架
                    if(_this.ruleForm.soldoutFlag==true){
                        _this.ruleForm.soldout=0;
                    }else{
                        _this.ruleForm.soldout=1;
                    }
                    //打折
                    if(_this.ruleForm.discountStatusFlag==true){
                        _this.ruleForm.discountStatus=1;
                    }else{
                        _this.ruleForm.discountStatus=0;
                    }
                    //图片处理
                    _this.ruleForm.goodsDesc=_this.photoList.join(',');
                    _this.ruleForm.goodsPic=_this.photoList[0]||_this.goodsDesc.split(',')[0];

                    // var params = {
                    //     data:_this.ruleForm
                    // }
                    var params={
                        data:{
                            // originalprice:"",
                            // minbuycount:"",
                            // servicetimes:"",
                            // platformkind:"",
                            // shopkind:"",
                            // city:"",
                            // sortNo:"",
                            goodsId:_this.ruleForm.goodsId,
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
                            goodsPic:_this.ruleForm.goodsPic
                        }
                    }
                    console.log('^^添加详情信息 params',params)
                    this.$http.post(addGoods,params).then(res=>{
                        var _this=this;
                        let data = res.data.data
                        let status = res.data.status;
                        console.log('^^添加详情信息 res',res)
                        if(status){
                            console.log('添加详情信息 res',res)
                            //_this.marskServer=true;
                            this.$message({
                                message: "添加成功！",
                                type: "success"
                            });
                        }else{
                            //_this.marskServer=false;
                            this.$message({
                                message: "添加失败！",
                                type: "error"
                            });
                        }
                    })


                //如果是编辑
                }else if(this.bflag=='EDIT'){
                    var _this=this;
                    //console.log('--editRequestTap--',data)
                    //console.log(data.id)
                    //推荐
                    if(_this.ruleForm.commendStatusFlag==true){
                        _this.ruleForm.commendStatus=0;
                    }else{
                        _this.ruleForm.commendStatus=1;
                    }
                    //上架
                    if(_this.ruleForm.soldoutFlag==true){
                        _this.ruleForm.soldout=0;
                    }else{
                        _this.ruleForm.soldout=1;
                    }
                    //打折
                    if(_this.ruleForm.discountStatusFlag==true){
                        _this.ruleForm.discountStatus=1;
                    }else{
                        _this.ruleForm.discountStatus=0;
                    }
                    //图片处理
                    _this.ruleForm.goodsDesc=_this.photoList.join(',');
                    _this.ruleForm.goodsPic=_this.photoList[0]||_this.ruleForm.goodsDesc.split(',')[0];

                    var params = {
                        data:{
                            // originalprice:"",
                            // minbuycount:"",
                            // servicetimes:"",
                            // platformkind:"",
                            // shopkind:"",
                            // city:"",
                            // sortNo:"",
                            goodsId:_this.ruleForm.goodsId,
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
                            goodsPic:_this.ruleForm.goodsPic
                        }
                    }
                    
                    console.log('^^获取详情信息 params',params)
                    this.$http.post(updateGoods,params).then(res=>{
                        var _this=this;
                        let data = res.data.data
                        let status = res.data.status;
                        console.log('^^修改详情信息 res',res)
                        if(status){
                            console.log('修改详情信息 res',res)
                            //_this.marskServer=true;
                            this.$message({
                                message: "修改成功！",
                                type: "success"
                            });
                        }else{
                            //_this.marskServer=false;
                            this.$message({
                                message: "修改失败！",
                                type: "error"
                            });
                        }
                    })
                }
            },
            //获取分类
            getCategory(){
                var _this=this;
                var params={
                    data:{
                        categoryId:'',
                        //categoryId:0
                    }
                }
                
                this.$http.post(getCategory,params).then(res=>{
                    let _this=this;
                    let status=this.data.status;
                    let data=res.data.data;
                    if(status){
                        // categoryId	分类id	否	-	int
                        // categoryPid	父分类id	否	-	int
                        // categoryName	分类名称	否	-	String
                        // categoryStatus
                    }
                    console.log('==获取分类==',res);
                    
                }).catch(err=>{
                    console.log('==获取分类失败==',res);
                });
            },
            /*****关闭弹框*******/
            closeBtn(){
                //this.$emit('closeMask','close');
                var _this=this;
                _this.marskServer=false;
            },
            
		    //相册部分
		    
            upload(e){
                 var files = e.target.files
                this.$http.get(getQiniuToken,{
                    params: {
                        "wxUid":"",
                        "wxSid":""
                    }
                }).then(res1=>{
                    let _this=this;
                    let config = {
                        headers:{'Content-Type':'multipart/form-data'}
                    };
                    let formdata = new FormData(); //创建form对象
                    formdata.append('file',files,files.name)
                    formdata.append('chunk','0'); //断点传输
                    formdata.append('chunks','1');
                    formdata.append('token',res1.data.uptoken);
                    this.$http.post('http://up-z1.qiniup.com',formdata,config).then(res2=>{
                        //this.files = qiniuBaseUrl+res2.data.key
                        _this.goodsListDesc.push(qiniuBaseUrl+res2.data.key);
                        console.log('--相册图片url--',_this.goodsListDesc);
                    })  
                })
            },
            deleteImgList(data){
                this.photoList.forEach((val,i)=>{
                    if (val == data){
                        this.goodsListDesc.splice(i,1)
                    }
                })
            },

            upload(e){
                 var files = e.target.files
                this.$http.get(getQiniuToken,{
                    params: {
                        "wxUid":"",
                        "wxSid":""
                    }
                }).then(res1=>{
                    let _this=this;
                    let config = {
                        headers:{'Content-Type':'multipart/form-data'}
                    };
                    let formdata = new FormData(); //创建form对象
                    formdata.append('file',files,files.name)
                    formdata.append('chunk','0'); //断点传输
                    formdata.append('chunks','1');
                    formdata.append('token',res1.data.uptoken);
                    this.$http.post('http://up-z1.qiniup.com',formdata,config).then(res2=>{
                        //this.files = qiniuBaseUrl+res2.data.key
                        _this.goodsListUrl.push(qiniuBaseUrl+res2.data.key);
                        console.log('--相册图片url--',_this.goodsListUrl);
                    })  
                })
            },
            deleteImgList2(data){
                this.photoList.forEach((val,i)=>{
                    if (val == data) {
                        this.goodsListUrl.splice(i,1)
                    }
                })
            }
            
		    
        }//method
    }
</script>

<style scoped lang="less">
    .activity-right{
        width: calc(~"100% - 250px");
        margin-top: 66px;
        margin-left: 230px;;
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
        width:50%;
        height:93%;
        overflow-y:scroll;
        position:fixed;
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

    .marsk2{ overflow-y:scroll; z-index:10; width:60%; height:80%; position:fixed; margin-left:0; margin-top:0; left:0; top:0;}
    
</style>