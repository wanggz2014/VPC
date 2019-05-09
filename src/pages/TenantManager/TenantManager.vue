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
        @on-extend-two="handleExtendTwo"
        >
      </AdminTable>  
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
import {reset,responseHandle,initParam} from './data'

console.log(Meta)
export default {
  name: 'about',
  components: {
    AdminTable,
    AdminLayout,
  },
  methods:{
    handleExtendOne(params){
      //重置
      console.log(params)
      reset({
        requestParams:initParam(params.row,this),
        requestUrl:"/tenant/reset"
      }).then(res=>{
        responseHandle(res,this.$Message);
      }).catch(err=>{
        console.log(err)
        this.$Message.error('重置密钥异常,请核对');
      })
    },
    handleExtendTwo(params){
      //license
      console.log(params)
      reset({
        requestParams:initParam(params.row,this),
        requestUrl:"/tenant/reset"
      }).then(res=>{
        responseHandle(res,this.$Message);
      }).catch(err=>{
        console.log(err)
        this.$Message.error('获取license异常,请核对');
      })
    }
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
    };
  },
};
</script>