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
    </template>
  </AdminLayout>
</template>
<script>
import AdminTable from '@/components/AdminTable';
import AdminLayout from '@/components/AdminLayout';

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
      extendBtns:[],
      menuUrl:layoutMeta.menu
    };
  },
  methods:{
    handleExtendOne(params){
      
    },
    handleExtendTwo(params){
      
    },
    handleAddSuccess(params){
      console.log("dddddddddddddddddddddd")
      this.$Message.info('新增记录成功')
    }
  }
};
</script>