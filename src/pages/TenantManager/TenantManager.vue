<template>
  <AdminLayout :menuUrl="menuUrl">
    <template #default>
      <AdminTable 
        :searchUrl="searchUrl"
        :editUrl="editUrl"
        :addConfig="addConfig"
        :columnMeta="columnMeta"
        :extendBtns="extendBtns"
        @on-extend-one="handleExtendOne"
        @on-extend-two="handleExtendTwo">
      </AdminTable>  
    </template>
    <template #extend>
      <Modal
          title="获取license"
          v-model="licenseModal"
          @on-ok="handleLicense">
          <Form ref="formLicense" :model="formLicense" :label-width="120">
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

  <!-- 重要！！！ temp_placehold请不要移除-->
  <!-- temp_placehold -->
</template>

<script>
//重要！！！ import_placehold\comp_placehold 请不要移除
//import_placehold
import AdminTable from '@/components/AdminTable';
import AdminLayout from '@/components/AdminLayout';
import Meta from './meta.json';
import {reset,responseHandle,license} from './data'

console.log(Meta)
export default {
  name: 'about',
  components: {
    AdminTable,
    AdminLayout,
  },
  data: function() {
    const tableMeta=Meta.AdminTable;
    const tableBaseUrl=tableMeta.url.baseUrl
    const layoutMeta=Meta.AdminLayout
    return {
      searchUrl:tableBaseUrl+tableMeta.url.search,
      editUrl:tableBaseUrl+tableMeta.url.edit, 
      columnMeta:tableMeta.columns,
      addConfig:{
        submitUrl:tableBaseUrl+tableMeta.url.add,
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
        license:""
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
        responseHandle(res,this.$Message);
        this.$Message.info('重置密钥成功')
      }).catch(err=>{
        console.log(err)
        this.$Message.error('重置密钥异常,请核对');
      })
    },
    handleExtendTwo(params){
      //license
      this.licenseModal=true
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