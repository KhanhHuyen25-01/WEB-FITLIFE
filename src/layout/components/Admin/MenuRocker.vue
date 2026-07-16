<template>
  <div class="sidebar-wrapper" style="width: 250px; background-color: #0b0f19; color: #94a3b8; position: fixed; top: 0; bottom: 0; left: 0; z-index: 1000; box-shadow: 4px 0 10px rgba(0,0,0,0.15); display: flex; flex-direction: column; justify-content: space-between; overflow-y: auto;">
    
    <!-- Top Brand Area -->
    <div class="brand-section px-4 py-3 d-flex align-items-center border-bottom border-dark">
      <div class="logo-icon bg-primary text-white rounded d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px; font-size: 1.25rem;">
        <i class="fa-solid fa-dumbbell"></i>
      </div>
      <div>
        <h5 class="mb-0 text-white fw-bold tracking-wide" style="font-size: 1.1rem;">FITLIFE</h5>
        <span class="text-uppercase tracking-wider text-muted fw-bold" style="font-size: 0.65rem;">ADMIN PANEL</span>
      </div>
    </div>

    <!-- Navigation Menu -->
    <div class="menu-section flex-grow-1 py-3 px-3">
      <!-- Admin Menu -->
      <div class="menu-group-label text-uppercase text-muted fw-bold mb-2 ps-2" style="font-size: 0.65rem; letter-spacing: 0.05em;">MENU CHÍNH</div>
      <ul class="nav flex-column gap-1">
        <li class="nav-item" v-for="item in adminMenu" :key="item.name">
          <router-link :to="item.link" class="nav-link py-2 px-3 rounded d-flex align-items-center justify-content-between text-decoration-none" :class="$route.path === item.link ? 'active-menu bg-primary text-white' : 'text-muted-link'">
            <span class="d-flex align-items-center gap-3">
              <i :class="item.icon" style="width: 20px;"></i>
              <span class="fw-medium">{{ item.name }}</span>
            </span>
            <i v-if="item.badge" class="fa-solid fa-angle-right fs-xs opacity-50"></i>
          </router-link>
        </li>
      </ul>

      <!-- Common Settings -->
      <div class="menu-group-label text-uppercase text-muted fw-bold mt-4 mb-2 ps-2" style="font-size: 0.65rem; letter-spacing: 0.05em;">CÀI ĐẶT HỆ THỐNG</div>
      <ul class="nav flex-column gap-1">
       <li class="nav-item">
  <router-link
    to="/admin/caidat"
    class="nav-link py-2 px-3 rounded d-flex align-items-center gap-3 text-decoration-none"
    :class="$route.path === '/admin/caidat' ? 'active-menu bg-primary text-white' : 'text-muted-link'">
    <i class="fa-solid fa-gear" style="width: 20px;"></i>
    <span class="fw-medium">Cài Đặt</span>
  </router-link>
</li>
        <li class="nav-item">
          <a href="#" @click.prevent="logout" class="nav-link py-2 px-3 rounded d-flex align-items-center gap-3 text-decoration-none text-muted-link text-danger-hover">
            <i class="fa-solid fa-right-from-bracket" style="width: 20px;"></i>
            <span class="fw-medium">Đăng Xuất</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- User Profile Footer Area -->
    <button class="user-profile-section p-3 border-top border-dark bg-dark-deep mt-auto">
      <div class="d-flex align-items-center justify-content-between p-2 rounded" style="background-color: rgba(255,255,255,0.03);">
        <div class="d-flex align-items-center gap-2">
          <!-- Avatar Icon with initial -->
          <div class="avatar-circle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm bg-primary" style="width: 40px; height: 40px; font-size: 0.95rem;">
            AM
          </div>
          <router-link to="/admin/profile" class="user-info overflow-hidden" style="max-width: 130px;">
            <div class="text-white fw-semibold text-truncate mb-0 fs-sm" style="font-size: 0.85rem;">Alex Morgan</div>
            <div class="text-muted text-truncate" style="font-size: 0.7rem;">Quản Trị Viên</div>
          </router-link>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
import baseRequestAdmin from '../../../core/baseRequestAdmin';
export default {
  name: "MenuRocker",
  data() {
    return {
      adminMenu: [
        { name: 'Bảng Điều Khiển', icon: 'fa-solid fa-chart-line', link: '/admin/dashboard', active: true, badge: true },
        { name: 'Hội Viên', icon: 'fa-solid fa-users', link: '/admin/hoivien', active: false, badge: false },
        { name: 'Huấn Luyện Viên', icon: 'fa-solid fa-user-ninja', link: '/admin/huanluyenvien', active: false, badge: false },
        { name: 'Gói Tập', icon: 'fa-solid fa-user-ninja', link: '/admin/goitap', active: false, badge: false },
        { name: 'Lịch Hoạt Động', icon: 'fa-solid fa-calendar-days', link: '/admin/lich', active: false, badge: false },
        { name: 'Số Liệu Phân Tích', icon: 'fa-solid fa-chart-pie', link: '/admin/solieu', active: false, badge: false },
        { name: 'Hóa Đơn & Phí', icon: 'fa-solid fa-credit-card', link: '/admin/hoadon', active: false, badge: false },
        { name: 'Lịch Sử Hoạt Động', icon: 'fa-solid fa-file-invoice', link: '/admin/lichsuhoatdong', active: false, badge: false },
      ]
    }
  },
  methods: {
    logout() {
            baseRequestAdmin.post('admin/logout', {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token_admin"),
                },
            })
                .then(res => {
                    if (res.data.status) {
                        localStorage.removeItem('token_admin');
                        localStorage.removeItem('ho_ten_admin');
                        
                        this.$toast.success(res.data.message);
                        this.$router.push('/admin/login');
                    }
                })
                .catch((err) => {
                    const listErr = err.response.data.errors;
                    Object.values(listErr).forEach((error) => {
                        this.$toast.error(error[0]);
                    });
                });
        }

  }
}
</script>


<style scoped>
.sidebar-wrapper {
  transition: all 0.3s ease;
}
.text-muted-link {
  color: #94a3b8 !important;
  transition: all 0.2s ease;
}
.text-muted-link:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
  color: #f8fafc !important;
}
.text-danger-hover:hover {
  color: #f87171 !important;
  background-color: rgba(239, 68, 68, 0.1) !important;
}
.bg-dark-deep {
  background-color: #05070f !important;
}
.active-menu {
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.25);
}
.fs-xs {
  font-size: 0.75rem;
}
</style>
