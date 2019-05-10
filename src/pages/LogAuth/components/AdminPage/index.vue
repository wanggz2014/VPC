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
        @on-extend-two="handleExtendTwo">
      </AdminTable>  
    </template>
    <template #extend>
      <Modal
          title=""
          v-model="formModal">
          <Form ref="modelForm" :model="modelForm" :label-width="120">
            <FormItem>
              <Button type="primary" @click="handleAdd()">提交</Button>
              <Button @click="handleReset()" style="margin-left: 8px">重置</Button>
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

function url(meta,type){
  //console.log(type +":"+ meta.url.baseUrl+meta.url[type])
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
      // extendBtns:[{
      //   name:'extend-one',
      //   icon:'logo-xbox',
      //   title:'重置',
      //   message:'确定要重置吗？'
      // },{
      //   name:'extend-two',
      //   icon:"logo-wordpress",
      //   title:'license',
      //   message:'确定要获取license吗？'
      // }],
      extendBtns:[],
      menuUrl:layoutMeta.menu,
      modelForm:{},
      formModal:false
    };
  },
  methods:{
    handleExtendOne(params){
      
    },
    handleExtendTwo(params){
      
    },
    handleAdd(){

    },
    handleReset(){
      this.$refs.modelForm.resetFields();
    }
  }
};
</script>