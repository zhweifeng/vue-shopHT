<template>
    <div>
        <leftBar></leftBar>
        <div class="activity-right">
            <h1>新增活动</h1>
            <div class="select_type">
                <el-form  ref="form" :rules="rules" v-if="form" :model="form" label-width="100px">
                    <el-form-item v-if="user" label="适用门店">
                        {{user.storeName}}
                    </el-form-item>
                    <el-form-item label="活动名称" prop="name">
                        <el-input style="width:300px" prop="name" v-model="form.name" type="text" placeholder="请输入活动名称" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="活动图片" prop="name" v-loading="uploadLoading">
                        <!-- <img width="200" :src="form.imgUrl" alt=""> -->
                        <div  class="prevImg" v-if="files">
                            <img  width="200" :src="files" alt="">
                            <i class="el-icon-error" @click="deleteImgList()"></i>
                        </div>
                        <div class="upload" v-if="files == ''">
                            <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg"  @change="upload($event)"/>
                            <i class="el-icon-plus"></i>
                        </div>
                    </el-form-item>
                    <template v-if="id != 11  || id !== 22">
                        <el-form-item label="显示位置" prop="sort">
                            <el-input style="width:100px" prop="sort" v-model="form.sort" type="text" placeholder="" clearable></el-input> 
                            <span>位置 1 ~ 10，值越大越靠前</span>                    
                        </el-form-item>
                    </template>
                    <template v-if="id == 11">
                        <el-form-item label="显示时间">
                            <el-input style="width:100px" v-model="form.time" type="text" placeholder="" clearable></el-input> S                       
                        </el-form-item>
                        <el-form-item label="是否可跳过">
                            <el-switch v-model="skip"></el-switch>
                        </el-form-item>
                    </template>
                     <el-form-item label="是否开启">
                        <el-switch v-model="status"></el-switch>
                    </el-form-item>
                    <el-form-item label="活动去向">
                        <el-select v-model="selVal" @change="selChange" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button type="primary" style="margin-left:0px" v-if="selVal == 1 || selVal == 3" @click="isShow = true">选择商品</el-button>                        
                        <div class="selGoods" v-if="addGoodsVal.length > 0" style="width:70%;margin-top:20px">
                            <section>
                                <ul>
                                    <li :key="item.id" v-for="item in addGoodsVal">
                                        <span>{{item.goodsName}}</span>
                                        <i title="删除" @click="deleteGoods(item.goodsId,$event)" class="el-icon-close"></i>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </el-form-item>
                    <el-form-item label="链接" v-if="selVal == 2">
                        <el-input style="width:300px" v-model="link" type="text" placeholder="请输入链接" clearable></el-input>                      
                    </el-form-item>
                     <section class="submit"> 
                        <el-button type="primary" @click="submit">确定</el-button>
                    </section> 
                </el-form> 
            </div>
            <!-- <transition name="fade"> -->
                <div class="popup-detail" v-loading="tableLoading" v-if="isShow">
                    <div class="selGoods">
                        <h3>选择商品</h3>
                        <section>
                            <ul>
                                <li :key="item.id" v-for="item in addGoodsVal">
                                    <span>{{item.goodsName}}</span>
                                    <i title="删除" @click="deleteGoods(item.goodsId,$event)" class="el-icon-close"></i>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <section id="search">
                        <div class="wrap">
                            <h3>上架时间</h3>
                            <el-date-picker style="z-index:99999999"
                                v-model="start_end"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <div class="wrap">
                            <h3>折扣</h3>
                            <el-select v-model="selDiscountVal" placeholder="请选择">
                                <el-option
                                v-for="item in selDiscount"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            
                        </div>
                        <div class="wrap">
                            <h3>商品名称</h3>
                            <el-input style="width:300px" v-model="goodsName" type="text" placeholder="请输入商品名称" clearable></el-input>                      
                            
                        </div>
                        <section class="searchBtn"> 
                            <el-button type="primary"  @click="search">搜索</el-button>
                            <el-button type="info" @click="reset">重置</el-button>
                        </section>
                        <section class="addBtn"  v-if="total > 0"> 
                            <el-button type="primary"  @click="addGoods">增加</el-button>
                            <el-button type="info" @click="selDone">选择完毕</el-button>
                        </section>
                    </section>
                    <div class="searchList">
                        <el-table
                            
                            ref="multipleTable"
                            :data="searchList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column
                                label="商品名称"
                                width="120">
                                <template slot-scope="scope">{{ scope.row.goodsName }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="goodsPic"
                                label="商品图片"
                                width="120">
                                <template slot-scope="scope">
                                    <img :src="scope.row.goodsPic" alt="">
                                </template>
                                
                            </el-table-column>
                            <el-table-column
                                prop="goodsPrice"
                                label="原价"
                                show-overflow-tooltip>
                                <template slot-scope="scope">{{ scope.row.goodsPrice }}</template>
                                
                            </el-table-column>
                            <el-table-column
                                prop="discountRate"
                                label="折扣"
                                show-overflow-tooltip>
                                <template slot-scope="scope">{{ scope.row.discountRate + '折' || '无折扣' }}</template>
                                
                            </el-table-column>
                            <el-table-column
                                prop="discountPrice"
                                label="折扣价"
                                show-overflow-tooltip>
                                <template slot-scope="scope">{{ scope.row.discountPrice }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="soldon_time"
                                label="上架时间"
                                show-overflow-tooltip>
                                <template slot-scope="scope">{{ $formate(scope.row.soldon_time,'yyyy-MM-dd') }}</template>
                            </el-table-column>
                        </el-table>
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
                        <section class="bottomAdd" v-if="total > 0"> 
                            <el-button type="primary"  @click="addGoods">增加</el-button>
                            <el-button type="info" @click="selDone">选择完毕</el-button>
                        </section>
                    </div>
                    <i class="el-icon-circle-close-outline close" title="关闭" @click="close"></i>
                    
                </div>
            <!-- </transition> -->
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <span>您确认关闭吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false" >取 消</el-button>
                    <el-button type="primary" @click="clickConfirm">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="mask" v-if="isShow"></div>
    </div>
</template>

<script>
    import leftBar from '../commonComponents/leftBar.vue'
    import { getActivityById,searchGoods,getQiniuToken,qiniuBaseUrl,addActivity } from '../../data/postData';
    export default {
        components:{
            leftBar
        },
        mounted(){
            console.log(this.id[0])
        },
        data(){
            return{
                user: JSON.parse(localStorage.getItem('user')),
                id: (this.$route.params.id).toString(),
                options:[{
                    value: '0',
                    label:'无'
                },{
                    value: '1',
                    label: '商品'
                }, {
                    value: '2',
                    label: '网站链接'
                }, {
                    value: '3',
                    label: '单品'
                }],
                selVal: '0',
                // 表单数据
                form: {
                    "name": "",
                    "type": '',
                    "category": '',
                    "imgUrl": '',
                    "linkDetail": "",
                    "link": '0',
                    "status": "0",
                    "time": '',
                    "skip": false,
                    "storeNo": JSON.parse(localStorage.getItem('user')).storeNo,
                    "remark":'',
                    "sort":'',
                    'goodsList': []
                },
                // 
                status: false,
                // 是否跳过
                skip: false,
                // 输入的链接
                link:'',
                start_end:'',
                selDiscount:[{
                    value:0,
                    label:'全部折扣'
                },{
                    value:'1',
                    label:'1折'
                },{
                    value:'2',
                    label:'2折'
                },{
                    value:'3',
                    label:'3折'
                },{
                    value:'4',
                    label:'4折'
                },{
                    value:'5',
                    label:'5折'
                }],
                selDiscountVal:'',
                goodsName:'',
                searchList: null,
                // 弹窗
                isShow: false,
                // 当前选中表格的列表
                nowSelList:null,
                // 需要添加的商品列表
                addGoodsVal: [],
                total:0,
                page:1,
                dialogVisible: false,
                // 上传的图片地址
                files: '',
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    sort: [
                        { required: true, message: '请输入显示位置', trigger: 'blur' },
                    ],
                },
                uploadLoading: false,
                tableLoading: false
            }
        },
        
        methods:{
            message(msg){
                this.$message({
                    message: msg,
                    type: 'warning'
                });
            },
            submit(){
                if (this.form.name == '') {
                    this.message('请输入活动名称')
                }else if(this.files == ''){
                    this.message('请上传图片')
                }else if(!/^[1-9][0]?$/.test(this.form.sort)){
                    this.form.sort = ''
                    this.message('显示位置请输入 1 ~ 10 的数字')
                }else if(this.selVal == 3 && this.addGoodsVal.length > 1){
                    this.message('只能够选择一个单品,请删除之后再操作');                    
                }else{
                    this.form.type = this.id[0]
                    this.form.category = this.id[1]
                    // form.link -> 活动去向值
                    this.form.link = this.selVal
                    // if (this.selVal == 3) {
                    //     this.form.linkDetail = this.addGoodsVal[0].goodsId                        
                    // }else{
                    //     this.form.linkDetail = this.link
                    // }
                    this.form.linkDetail = this.link
                    
                    this.form.imgUrl = this.files
                    if (this.addGoodsVal.length > 0) {
                        this.addGoodsVal.forEach((val,i)=>{
                            this.form.goodsList.push(val.goodsId)
                        })
                    }
                    var params = {
                        data: this.form
                    }
                    if (this.status == true) {
                        params.data.status = 0
                    }else{
                        params.data.status = 1
                    }
                    if (this.skip == true) {
                        params.data.skip = 1
                    }else{
                        params.data.skip = 0
                    }
                    console.log(params)
                    const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                    this.$http.post(addActivity,params).then(res=>{
                        var data = res.data
                        if (data.status) {
                            if (data.code == 0) {
                                setTimeout(() => {
                                    loading.close();
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    
                                    setTimeout(() => {
                                        this.$router.go(-1)
                                    }, 1500);
                                }, 1000);
                            }
                        }else{
                            this.message(data.message)
                        }
                    })
                }
            },
            // 活动去向选择
            selChange(){
                console.log(this.selVal)
                this.searchList = null
                this.nowSelList = null;
                this.addGoodsVal = [];
                this.searchList = null
                this.total = 0
                this.start_end = ''
            },
            // 点击搜索
            search(){
                console.log(new Date(this.start_end[0]).getMonth(),this.selDiscountVal,this.goodsName)
                this.requset(1)
            },
            // 重置选项
            reset(){
                this.addGoodsVal = [];
                this.$refs.multipleTable.clearSelection();
                this.start_end = ''                
                this.selDiscountVal = ''                
                this.goodsName = ''                

            },
            handleSelectionChange(val){
                console.log(this.addGoodsVal)
                // if ((val.length > 1 && this.selVal == 3 || this.addGoodsVal.length > 0)) {
                //     this.message('只能够选择一个单品');
                //     this.$refs.multipleTable.clearSelection();
                //     this.addGoodsVal = []
                // }else{
                    this.nowSelList = val
                // }
                
            },
            // 添加商品
            addGoods(){
                console.log('添加',this.addGoodsVal,this.nowSelList)
                let need = []
                let that = this
                let arr1 = []
                let now = []
                console.log('selval',this.selVal)
                if ((this.nowSelList.length > 1 && this.selVal == 3)) {
                    this.message('只能够选择一个单品');
                }else if(this.nowSelList.length > 0){
                    
                    if (this.addGoodsVal.length > 0 ) {
                        
                        now = this.addGoodsVal.concat(this.nowSelList)
                        var unique = {};
                        now.forEach(function(gpa){ unique[ JSON.stringify(gpa) ] = gpa });
                        now = Object.keys(unique).map(function(u){return JSON.parse(u) });
                        
                        console.log('now',now)
                        this.addGoodsVal = now
                        
                    }else{
                        this.addGoodsVal = this.addGoodsVal.concat(this.nowSelList)
                    }
                    
                   
                }
                console.log('addGoodsVal',this.addGoodsVal)
                this.$refs.multipleTable.clearSelection();
                this.nowSelList = '';
            },
            deleteGoods(id,e){
                console.log(id,e.currentTarget.parentNode)
                // var ul = document.querySelector('.')
                this.addGoodsVal.forEach((val,i)=>{
                    if (val.goodsId == id) {
                        this.addGoodsVal.splice(i,1)
                    }
                })
            },
            pagePrev(){
                this.page--
                this.requset(this.page)
            },
            pageNext(){
                this.page++
                this.requset(this.page)
                
            },
            // 请求封装
            requset(page){
                var condition = localStorage.getItem('condition')
                 // 3 折扣 4 店长推荐                
                var conditionVal = condition == 3 ? 1 : (condition == 4 ? 2 : '')
                var params = {
                    data:{
                        "storeNo": this.user.storeNo,
                        "goodsName": this.goodsName,
                        // "startTime": this.$formate(this.start_end[0],'yyyy-MM-dd'),
                        // "endTime": this.$formate(this.start_end[1],'yyyy-MM-dd'),
                        "startTime":'2017-04-27',
                        "endTime":'2018-04-27',
                        "condition": 1,
                        "discountRate": this.selDiscountVal,
                        "page": page || 1
                    }
                }
                this.tableLoading = true
                this.$http.post(searchGoods,params).then(res=>{
                    console.log(res)
                    var res = res.data
                    if (res.status) {
                        if (res.code) {
                            this.searchList = res.data
                            this.total = res.total
                            this.tableLoading = false
                        }
                    }else{
                        this.tableLoading = false                        
                        this.$message({
                            message: '服务器错误',
                            type: 'warning'
                        });
                    }
                })
            },
            // 选择完毕
            selDone(){
                this.dialogVisible = true
            },
            clickConfirm(){
                this.dialogVisible = false;
                this.isShow = false

            },
            handleClose(){

            },
            // 关闭弹窗            
            close(){
                this.dialogVisible = true
            },
            upload(e){
                const that = this
                var files = e.target.files[0]
                // for (let i = 0; i < files.length; i++) {
                    this.uploadLoading = true
                    this.$http.get(getQiniuToken,{
                        params: {
                            "wxUid":"",
                            "wxSid":""
                        }
                    }).then(res1=>{
                        let config = {
                            headers:{'Content-Type':'multipart/form-data'}
                        };
                        let formdata = new FormData(); //创建form对象
                        formdata.append('file',files,files.name)
                        formdata.append('chunk','0'); //断点传输
                        formdata.append('chunks','1');
                        formdata.append('token',res1.data.uptoken);
                        this.$http.post('http://up-z1.qiniup.com',formdata,config).then(res2=>{
                            if (res2.data.key != '') {
                                this.files = qiniuBaseUrl+res2.data.key
                                this.uploadLoading = false
                            }
                        })  
                    })
                // }  
                // console.log('fileList',this.fileList)
              
            },
            deleteImgList(data){
                // this.fileList.forEach((val,i)=>{
                //     if (val == data) {
                //         this.fileList.splice(i,1)
                //     }
                // })
                this.files = ''
            }
        }
    }
</script>

<style scoped lang="less">
    @import url('../../style/activity.less');
</style>