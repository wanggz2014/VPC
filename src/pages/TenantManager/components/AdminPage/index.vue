<template>
  <AdminLayout :menuUrl="menuUrl">
    <template #default>
      <AdminTable 
        :searchUrl="searchUrl"
        :editUrl="editUrl"
        :addConfig="addConfig"
        :deleteUrl="deleteUrl"
        :columnMeta="columnMeta"
        :extendBtns="extendBtns"
        @on-extend-one="handleExtendOne"
        @on-extend-two="handleExtendTwo"
        @on-modal-success="handleAddSuccess">
      </AdminTable>  
    </template>
    <template #extend>
      <!--扩展内容，比如扩展按钮弹窗-->
      <Modal
          title="获取license"
          v-model="licenseModal">
          <Form ref="formLicense" :model="formLicense" :label-width="120">
             <FormItem label="授权API" prop="apiKey">
              <Input v-model="formLicense.apiKey" />
            </FormItem>
            <FormItem label="MAC地址">
              <Input v-model="formLicense.macAddress" placeholder="请输入mac地址"/>
            </FormItem>
            <FormItem label="License" prop="license">
              <Input v-model="formLicense.license" type="textarea" :autosize="{minRows: 8,maxRows: 8}" placeholder="license信息" />
            </FormItem>
            <FormItem>
              <Button @click="handleLicense()" style="margin-left: 8px">提交</Button>
            </FormItem>
          </Form>
          <template #footer>
              <div></div>
          </template>
      </Modal>
    </template>
  </AdminLayout>
</template>
<script>
import AdminTable from '@/components/AdminTable';
import AdminLayout from '@/components/AdminLayout';
import {reset,responseHandle,license} from './data.js'

function url(meta,type){
  //console.log(type +":"+ meta.url.baseUrl+meta.url[type])
  if(meta.url[type]==undefined){
    return undefined
  }
  return meta.url.baseUrl+meta.url[type];
}


export default {
  name: 'about',
  components: {
    AdminTable,
    AdminLayout,
  },
  props:{
    Meta:Object
  },
  data: function() {
    const tableMeta=this.Meta.AdminTable;
    const layoutMeta=this.Meta.AdminLayout
    return {
      searchUrl:url(tableMeta,'search'),
      editUrl:url(tableMeta,'edit'),
      deleteUrl: url(tableMeta,'delete'),
      columnMeta:tableMeta.columns,
      addConfig:{
        submitUrl:url(tableMeta,'add'),
        formMeta:tableMeta.form,
        enable:tableMeta.url.add!=undefined
      },
      extendBtns:[{
        name:'extend-one',
        icon:'logo-xbox',
        title:'重置',
        message:'确定要重置吗？'
      },{
        name:'extend-two',
        icon:"logo-wordpress",
        title:'license',
        message:'确定要获取license吗？'
      }],
      menuUrl:layoutMeta.menu,
      formLicense:{
        license:"",
        apiKey:""
      },
      licenseModal:false
    };
  },
  methods:{
    handleExtendOne(params){
      //重置
      console.log(params)
      reset({
        requestParams:params.row,
        requestUrl:"/tenant/reset"
      }).then(res=>{
        const obj=this;
        responseHandle(res,this.$Message,function(response){
            obj.$Modal.success({
              title:'新密钥',
              content:response.securityKey
            })
        });
        
      }).catch(err=>{
        console.log(err)
        this.$Message.error('重置密钥异常,请核对');
      })
    },
    handleExtendTwo(params){
      //console.log("dfsfsdfsfsdf")
      //console.log(params)
      this.licenseModal=true
      this.formLicense.apiKey=params.row.apiKey
    },
    handleAddSuccess(params){
      this.$Modal.success({
        title:'用户密钥',
        content:params.securityKey
      })
    },
    handleLicense(){
      license({
        requestParams:this.formLicense,
        requestUrl:"/tenant/license"
      }).then(res=>{
        const obj=this;
        responseHandle(res,this.$Message,function(response){
          console.log(response);
          obj.formLicense.license=response.license;
        });
        //this.$Message.info('获取license成功')
      }).catch(err=>{
        console.log(err)
        this.$Message.error('获取license异常,请核对');
      })
    }
  }
};
</script>