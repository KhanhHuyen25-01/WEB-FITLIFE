<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-4" style="height: 70px; position: fixed; top: 0; right: 0; left: 250px; z-index: 999; transition: all 0.3s ease;">
    <div class="container-fluid d-flex justify-content-between align-items-center p-0">
      
      <!-- Date & Page Title -->
      <div class="d-flex flex-column">
        <h5 class="mb-0 fw-bold text-dark fs-5">{{ title }}</h5>
        <span class="text-secondary fw-semibold" style="font-size: 0.8rem;">{{ currentDate }}</span>
      </div>

      <!-- Right Action Items -->
      <div class="d-flex align-items-center gap-3">
        <!-- Search bar -->
        <div class="position-relative d-none d-md-block" style="width: 280px;">
          <input type="text" class="form-control border-0 bg-light rounded-pill ps-4 pe-5 text-secondary" placeholder="Tìm kiếm hội viên, PT..." style="height: 40px; font-size: 0.85rem; padding-top: 10px; padding-bottom: 10px;">
          <i class="fa-solid fa-magnifying-glass position-absolute text-muted" style="right: 18px; top: 12px;"></i>
        </div>

        <!-- Role Quick Switcher (Useful dropdown) -->
        <div class="dropdown">
          <button class="btn btn-light border-0 rounded-pill px-3 py-2 text-dark fw-semibold d-flex align-items-center gap-2" style="font-size: 0.85rem;" type="button" id="roleSwitcherDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="role-dot" :class="roleColorClass"></span>
            <span>Vai trò: {{ roleName }}</span>
            <i class="fa-solid fa-angle-down opacity-50 ms-1" style="font-size: 0.75rem;"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-2 p-2" aria-labelledby="roleSwitcherDropdown">
            <li>
              <button class="dropdown-item rounded py-2 d-flex align-items-center gap-2 text-primary" @click="changeRole('/admin')">
                <span class="role-dot bg-primary"></span> Quản Trị Viên (Admin)
              </button>
            </li>
            <li>
              <button class="dropdown-item rounded py-2 d-flex align-items-center gap-2 text-success" @click="changeRole('/pt')">
                <span class="role-dot bg-success"></span> Huấn Luyện Viên (PT)
              </button>
            </li>
            <li>
              <button class="dropdown-item rounded py-2 d-flex align-items-center gap-2 text-info" @click="changeRole('/client')">
                <span class="role-dot bg-info"></span> Hội Viên (Client)
              </button>
            </li>
          </ul>
        </div>

        <!-- Notification Bell -->
        <button class="btn btn-light rounded-circle border-0 d-flex align-items-center justify-content-center position-relative" style="width: 40px; height: 40px;">
          <i class="fa-regular fa-bell text-secondary" style="font-size: 1.1rem;"></i>
          <span class="position-absolute top-1 start-75 translate-middle p-1 bg-danger border border-light rounded-circle">
            <span class="visually-hidden">Thông báo mới</span>
          </span>
        </button>

        <!-- User Profile Initials Circle -->
        <div class="avatar-circle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" :class="avatarBg" style="width: 40px; height: 40px; cursor: pointer; font-size: 0.95rem;">
          {{ initials }}
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TopRocker",
  computed: {
    currentRole() {
      const path = this.$route.path;
      if (path.startsWith('/pt')) return 'pt';
      if (path.startsWith('/client')) return 'client';
      return 'admin';
    },
    title() {
      if (this.currentRole === 'pt') return 'Khu Vực PT';
      if (this.currentRole === 'client') return 'Khu Vực Hội Viên';
      return 'Bảng Điều Khiển';
    },
    roleName() {
      if (this.currentRole === 'pt') return 'Huấn Luyện Viên';
      if (this.currentRole === 'client') return 'Hội Viên';
      return 'Admin';
    },
    roleColorClass() {
      if (this.currentRole === 'pt') return 'bg-success';
      if (this.currentRole === 'client') return 'bg-info';
      return 'bg-primary';
    },
    initials() {
      if (this.currentRole === 'pt') return 'MW';
      if (this.currentRole === 'client') return 'PS';
      return 'AM';
    },
    avatarBg() {
      if (this.currentRole === 'pt') return 'bg-success';
      if (this.currentRole === 'client') return 'bg-info';
      return 'bg-dark';
    }
  },
  data() {
    return {
      currentDate: "Thứ Bảy, ngày 21 tháng 06 năm 2026"
    };
  },
  methods: {
    changeRole(route) {
      this.$router.push(route);
    }
  }
}
</script>

<style scoped>
nav {
  transition: all 0.3s ease;
}
.role-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

@media (max-width: 991px) {
  nav {
    left: 0 !important;
  }
}
</style>
