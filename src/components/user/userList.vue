<template>
    <div>
        <leftBar></leftBar>
        <div class="storelist-right">
            <h3>用户列表</h3>
            <el-input class='search-input' v-model="input" placeholder="导购姓名／工号／手机号"></el-input>
            <el-button type="primary" @click="searchStore">搜索</el-button> 
            <el-button class='right' type="primary" @click="addStore">添加导购</el-button> 
            <el-table
                ref="multipleTable"
                :data="data"
                style="width: 100%"
                >
                <el-table-column
                prop="storeName"
                label="导购头像"
                width="120">
                    <template slot-scope="scope">
                        <img  :src="scope.row.logoImage" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                prop="logoImage"
                label="导购姓名"
                width="200">
                   
                </el-table-column>
                <el-table-column
                prop="contactPerson"
                label="导购工号"
                width="120">
                </el-table-column>
                <el-table-column
                prop="contactPhone"
                label="导购手机号"
                width="120">
                </el-table-column>
                 <el-table-column
                prop="contactPhone"
                label="职位"
                width="120">
                </el-table-column>
                <!-- <el-table-column
                prop="templateId"
                label="模版"
                show-overflow-tooltip>
                     <template slot-scope="scope">
                         {{scope.row.templateId == 'theme_default' ? '默认主题' : '简约'}}
                    </template>
                </el-table-column> -->
                <el-table-column
                prop="activeStatus"
                label="账号状态"
                show-overflow-tooltip>
                   <template slot-scope="scope">
                         {{scope.row.activeStatus == '0' ? '激活' : '未激活'}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="checkDetail(scope.row)" size="small">编辑</el-button>
                        <el-button type="text" @click="checkDetail(scope.row)" size="small">删除</el-button>
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
    export default {
        components:{
            leftBar
        },
        mounted:{

        },
        data(){
            return{

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
    .search-input{
        margin:5px;
        width:200px;
    }
    // .storeCode{
    //     width:300px;height:300px;text-align: center;
    //     .code-img{
    //         margin-top:40px;
    //         img{width:200px;}
    //     }
    // }
    // .resetpassWord{
    //     width:300px;
    //     height:300px;
    //     margin-top:20px;
    //     .btn{
    //         text-align:center;
    //     }
    // }
    // .pagination{
    //     width:100%;
    //     margin:40px auto;
    //     text-align:center;
    // }
</style>

 <!-- <p>门店名称:<el-input v-model="storeName" placeholder="请输入内容"></el-input></p>
                <p>门店名称:<el-input v-model="contactPhone" placeholder="请输入内容"></el-input></p>
                <p>门店名称:<el-input v-model="passWord" placeholder="请输入内容">{{ruleForm2.passWord}}</el-input></p>
                
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm()">重置</el-button> -->