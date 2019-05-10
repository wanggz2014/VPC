<template>
  <div className="log-auth-page">

    <AdminPage :Meta="MetaJson"></AdminPage>

    <!-- 重要！！！ temp_placehold请不要移除-->
    <!-- temp_placehold -->
  </div>
</template>

<script>
//重要！！！ import_placehold\comp_placehold 请不要移除
//import_placehold
import AdminPage from '@/components/AdminPage';
import MetaJson from './meta.json';

export default {
  name: 'LogAuth',
  components: {
    //comp_placehold
    AdminPage
  },
  data: function() {
    return {
      MetaJson:MetaJson
    };
  }
};
</script>
