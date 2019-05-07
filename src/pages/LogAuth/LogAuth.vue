<template>
  <div className="log-auth-page">
    <AdminLayout>
      <template slot="default">
        <AdminTable />
      </template>
    </AdminLayout>

    <!-- 重要！！！ temp_placehold请不要移除-->
    <!-- temp_placehold -->
  </div>
</template>

<script>
//重要！！！ import_placehold\comp_placehold 请不要移除
//import_placehold
import config from '@/config';
import AdminLayout from './components/AdminLayout';
import AdminTable from './components/AdminTable';

const baseUrl = config.baseUrl();
export default {
  name: 'LogAuth',
  components: {
    //comp_placehold
    AdminLayout,
    AdminTable,
  },
  data: function() {
    return {
      local: this.$route.params.local,
    };
  },
};
</script>
