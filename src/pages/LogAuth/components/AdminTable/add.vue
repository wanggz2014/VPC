<template>
  <Modal
        title="新增"
        :value="formAdd"
        :loading="loading"
        @on-ok="handleAdd"
        @on-visible-change="handleChange" >
      <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="120">
          <FormItem  v-for="item in formMeta" :label="item.label" :prop="item.prop">
            <Input v-if="item.type=='input'" v-model="addForm[item.prop]" :placeholder="item.placeholder"/>
            <DatePicker v-if="item.type=='date'" :placeholder="item.placeholder" v-model="addForm[item.prop]"></DatePicker>
          </FormItem>
      </Form>  
  </Modal>
</template>

<script>
import { addTableData,getFormMeta,initParam,responseHandle} from './libs/data'

function errorMessage(entry,message){
  entry.loading=false; 
  entry.error=true;
  entry.$Message.error(message);
}


export default {
  name: 'TablesAdd',
  props:{
    formAdd:{
      type:Boolean,
      default:false
    },
    submitUrl:String,
    metaUrl:String,
    token:String
  },
  data:function(){
    return {
      loading:true,
      error:false,
      addForm: {},
      formMeta:[],
      ruleValidate: {}
    }
  },
  methods: {
    handleAdd(){
      const form = this.$refs.addForm;
      const entry=this;
      console.log(this.loading);
      form.validate((valid) => {
        if (!valid) {
          errorMessage(entry,'新增参数异常,请核对')
          return
        }
        //提交数据
        addTableData({
          requestParams:initParam(this.addForm,this),
          requestUrl:this.submitUrl
        }).then(res => {
          responseHandle(res,entry.$Message,function(){
            entry.handleChange(false);
            entry.$emit('on-modal-success');
          })
        }).catch(err=>{
          console.log(err)
          errorMessage(entry,'新增存储异常,请核对')
        })
      })

    },
    handleChange(params){
      this.loading=true;
      if(!params){
        if(!this.error){
          this.$refs.addForm.resetFields();
        }
        this.$emit('on-modal-close', params)
      }
    },
    searchMeta(){
      const params=initParam({},this);
      getFormMeta({
        requestUrl:this.metaUrl,
        requestParams:params
      }).then(res => {
        const obj=this;
        responseHandle(res,this.$Message,function(formConfig){
          obj.formMeta=formConfig.items
          for(let name in formConfig.rules){
            const rules=formConfig.rules[name]
            for(let i in rules){
              //console.log(rules[i])
              if(rules[i].type==''){
                delete rules[i].type
              }
            }
          }
          console.log(formConfig.rules);
          obj.ruleValidate=formConfig.rules
        });
      }).catch(err=>{
        console.log(err)
        this.$Message.error('获取列表信息失败,请核对');
      })
    }
  },
  created () {
    console.log("created")
    this.searchMeta();
  }
}
</script>
