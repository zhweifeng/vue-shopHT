<template>
    <div>
        <leftBar></leftBar>
        <div class="activity-right">
            <h3>活动列表</h3>
            <div class="select_type">
                <span>活动类型</span>
                <el-select v-model="selVal" @change="selChange" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <!-- <template v-if="addShow"> -->
                <template v-if="true">
                    <el-button type="primary" @click="addActivity">新增</el-button>                    
                </template>
                <template v-else>
                    <el-button disabled type="info">新增</el-button>
                </template>
            </div>
             <el-table
                :data="tableData"
                v-loading="tableLoading"
                element-loading-text="拼命加载中"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="活动名称"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="imgUrl"
                    label="图片"
                    width="180" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.imgUrl" alt="">
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    prop="linkDetail"
                    label="链接内容" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.linkDetail?scope.row.linkDetail : '无' }}
                    </template>
                </el-table-column>   -->
                <el-table-column
                    props="sort"
                    label="排序"
                    width="180" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.sort}}
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    props="open"
                    label="是否开启"
                    width="180" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.open? '是': '否' }}
                    </template>
                </el-table-column> -->
                <!-- <el-table-column
                    props="jump"
                    label="是否可跳转"
                    width="180" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.jump? '是': '否' }}
                    </template>
                </el-table-column>
                 <el-table-column
                    props="time"
                    label="显示时间"
                    width="100" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.time + 's'}}
                    </template>
                </el-table-column> -->
                <el-table-column
                    label="操作"
                    width="200" align="center">
                    <template slot-scope="scope">
                        <el-button @click="checkDetail(scope.row)" type="text" size="small">查看</el-button>
                        <!-- <el-button type="text" size="small">编辑</el-button> -->
                        <router-link :to="'/editActivity/'+scope.row.id"> 编辑</router-link>
                        <el-button type="text" v-if="type != 1" @click="deleteActivity(scope.row,scope.row.id)" size="small">删除</el-button>
                    </template>
                    </el-table-column>

            </el-table>
            <div class="popup-detail" v-if="form && isShow">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="适用门店">
                        {{form.name}}
                    </el-form-item>
                    <!-- <el-form-item label="活动类型">
                        {{form.type}}
                    </el-form-item> -->
                    <el-form-item label="活动名称">
                        <!-- <el-input style="width:300px" v-model="form.name" type="text" placeholder="请输入活动名称" disabled></el-input> -->
                        {{form.name}}
                    </el-form-item>
                    <el-form-item label="活动图片">
                        <img width="200" :src="form.imgUrl" alt="">
                    </el-form-item>
                    <el-form-item label="是否开启">
                        
                        <el-switch v-model="status" disabled></el-switch>
                    </el-form-item>
                    <el-form-item label="显示时间">
                        <!-- <el-input style="width:100px" v-model="form.time" type="text" placeholder="" clearable></el-input> S                        -->
                        {{form.time}}S
                    </el-form-item>
                    <el-form-item label="是否可跳过">
                        <el-switch v-model="skip" disabled></el-switch>
                    </el-form-item>
                    <el-form-item label="链接内容">
                        <!-- <el-input style="width:500px"  v-model="form.linkDetail" type="text" placeholder="请输入链接内容" disabled ></el-input>                         -->
                        {{form.linkDetail || '无'}}
                    </el-form-item>
                    <!-- <section class="submit"> 
                        <el-button type="primary" @click="submit">确定</el-button>
                    </section> -->
                    <i class="el-icon-circle-close-outline close" title="关闭" @click="close"></i>
                </el-form> 
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <span>您确认删除吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" >取 消</el-button>
                <el-button type="primary" @click="clickConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import leftBar from '../commonComponents/leftBar.vue'
    import { getActivity , getActivityById,updateActivity} from '../../data/postData';
    export default {
        components:{
            leftBar
        },
        mounted(){
            var params = {
                "data":{
                    "storeNo": this.user.storeNo,
                    "type": 1,
                    "category": 1,
                    "page": 1,
                    "sort": "1",
                    "size": 10
                }
            }
            this.$http.post(getActivity,params).then(res=>{
                this.tableData = res.data.data
            })
        },
        data(){
            return{
                user: JSON.parse(localStorage.getItem('user')),
                type: '1',
                category: '1',
                options: [{
                    value: '1',
                    label: '开屏海报'
                }, {
                    value: '2',
                    label: '头图活动'
                }, {
                    value: '3',
                    label: '折扣商品'
                }, {
                    value: '4',
                    label: '店长推荐'
                }, {
                    value: '5',
                    label: '新款上架'
                }],
                selVal: '开屏海报',
                tableData: null,
                addShow: false,
                form: null,
                status: false,
                skip: false,
                isShow: false,
                tableLoading: false,
                dialogVisible: false,
                deleteId: '',
                deleteIdForm: null
            }
        },
        
        methods:{
            checkDetail(data){
                console.log(data.id)
                var params = {
                    data:{
                        id: data.id
                    }
                }
                this.$http.post(getActivityById,params).then(res=>{
                    console.log(res)
                    let data = res.data.data
                    this.form = data
                    this.isShow = true
                    if (data.status == 0) {
                        this.status = true
                    }else{
                        this.status = false
                    }
                    if (data.skip == 0) {
                        this.skip = false
                    }else{
                        this.skip = true
                    }
                })
            },
            submit(){
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

            },
            close(){
                this.isShow = false
            },
            selChange(){
                this.addShow = false
                localStorage.setItem('condition',this.selVal)
                if (this.selVal == 1) {
                    this.type = 1
                    this.category = 1
                }else if(this.selVal == 2){
                    this.type = 2
                    this.category = 1
                }else if(this.selVal == 3){
                    this.type = 2
                    this.category = 2
                }else if(this.selVal == 4){
                    this.type = 2
                    this.category = 3
                }else if(this.selVal == 5){
                    this.type = 2
                    this.category = 4
                    
                }
                console.log(this.type,this.category)
                var params = {
                    "data":{
                        "storeNo": this.user.storeNo,
                        "type": this.type,
                        "category": this.category,
                        "page": 1,
                        "sort": "0",
                        "size": 10
                    }
                }
                this.tableLoading = true
                this.$http.post(getActivity,params).then(res=>{
                    if (res.data.status) {
                        if (res.data.code == 0) {
                            setTimeout(() => {
                                this.tableData = res.data.data;
                                this.tableLoading = false
                            }, 300);
                        }
                        if (this.selVal == 1) {
                            this.addShow = false
                        }else if((this.selVal == 2 && this.tableData.length < 5) || 
                         (this.selVal == 3 && this.tableData.length < 1) || 
                         (this.selVal == 4 && this.tableData.length < 2) ||
                         (this.selVal == 5 && this.tableData.length < 5) ){
                            this.addShow = true
                         }
                    }else{
                         this.$message({
                            message: '服务器错误',
                            type: 'warning'
                        });
                    }
                })
            },
            addActivity(){
                this.$router.push({path:'/addActivity/'+this.type+this.category})
            },
            deleteActivity(form,id){
                console.log('form',form)
                this.deleteId = id;
                this.dialogVisible = true
                this.deleteIdForm = form
            },
            clickConfirm(){
                this.deleteIdForm.status = 1
                let params = {
                    // data:this.deleteIdForm
                    data:{
                        id: this.deleteId,
                        status: 1,
                        flag: 'delete'
                    }
                }
                this.$http.post(updateActivity,params).then(res=>{
                    var res = res.data
                    this.dialogVisible = false
                    if (res.status) {
                        if (res.code == 0) {
                            this.$message({
                                message: '删除成功',
                            });
                            setTimeout(() => {
                                // location.reload()
                            }, 1000);
                        }
                    }else{
                        this.$message({
                            message: res.message,
                        });
                    }
                })
            }
        }
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
            position: relative;
            span{
                margin-right: 10px;
            }
            button{
                position: absolute;
                right: 0;
                top: 0;
            }
        }
    }
    .el-table__body-wrapper{
        margin-top: 15px;
        img{
            width: 80px;
        }
        a{
            color: #409EFF;            
        }
        button{
            font-size: 14px;
        }
    }

</style>