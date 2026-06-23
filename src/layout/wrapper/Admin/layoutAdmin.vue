<template>
  <div class="wrapper vertical-layout">
    <!-- Sidebar Wrapper -->
    <MenuRocker />
    
    <!-- Top Header Wrapper -->
    <TopRocker />

    <!-- Main Content Area -->
    <div class="page-wrapper-custom">
      <div class="page-content-custom">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MenuRocker from '../../components/Admin/MenuRocker.vue'
import TopRocker from '../../components/Admin/TopRocker.vue'

export default {
  name: 'LayoutAdmin',
  components: {
    MenuRocker,
    TopRocker
  }
}
</script>

<style scoped>
.page-wrapper-custom {
  margin-left: 250px;
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  transition: all 0.3s ease;
  background-color: #f1f5f9;
}
.page-content-custom {
  padding: 24px;
}

@media (max-width: 991px) {
  .page-wrapper-custom {
    margin-left: 0 !important;
  }
}
</style>
