<template>
  <div class="lichsu-container">
    <!-- Toast Notification -->
    <div class="toast-custom" :class="[showToast ? 'show' : '', toastType]" v-if="showToast">
      <div class="d-flex align-items-center gap-2">
        <i class="fa-solid" :class="toastIcon"></i>
        <span>{{ toastMessage }}</span>
      </div>
    </div>

    <!-- Welcome Header Section -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
      <div>
        <h2 class="fw-bold text-dark mb-1">Lịch Sử Hoạt Động 📜</h2>
        <p class="text-secondary mb-0">Theo dõi toàn bộ nhật ký check-in, đăng ký lớp học và các thay đổi hệ thống.</p>
      </div>
      <div class="d-flex gap-2 mt-3 mt-md-0">
        <button class="btn btn-outline-secondary rounded-pill px-3 py-2 d-flex align-items-center gap-2 bg-white" @click="refreshLogs">
          <i class="fa-solid fa-rotate" :class="{ 'fa-spin': isRefreshing }"></i>
          <span class="fw-semibold">Làm mới</span>
        </button>
        <button class="btn btn-primary rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm btn-export" @click="exportLogs">
          <i class="fa-solid fa-download"></i>
          <span class="fw-semibold">Xuất file Excel</span>
        </button>
      </div>
    </div>

    <!-- Stats Overview Cards -->
    <div class="row g-4 mb-4">
      <!-- Total Logs Today -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white card-stats">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">TỔNG HOẠT ĐỘNG (HÔM NAY)</span>
              <h3 class="fw-bold text-dark my-1">{{ stats.totalToday }}</h3>
              <span class="badge bg-primary-subtle text-primary border border-primary rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                Có {{ stats.activeUsers }} người hoạt động
              </span>
            </div>
            <div class="bg-primary-subtle text-primary rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-clock-rotate-left fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Checkin Count Today -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white card-stats">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">LƯỢT CHECK-IN</span>
              <h3 class="fw-bold text-dark my-1">{{ stats.checkinToday }}</h3>
              <span class="badge bg-success-subtle text-success border border-success rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                <i class="fa-solid fa-arrow-up me-1"></i> +15% so với hôm qua
              </span>
            </div>
            <div class="bg-success-subtle text-success rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-right-to-bracket fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin Actions Today -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white card-stats">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">THAO TÁC ADMIN</span>
              <h3 class="fw-bold text-dark my-1">{{ stats.adminToday }}</h3>
                <span class="badge bg-success-subtle text-success border border-success rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                <i class="fa-solid fa-arrow-up me-1"></i> Tổng số thao tác quản trị hôm nay
              </span>
            </div>
            <div class="bg-purple-subtle text-purple rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-user-gear fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Warnings/Errors Today -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white card-stats">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">CẢNH BÁO / LỖI</span>
              <h3 class="fw-bold text-dark my-1" :class="{'text-danger': stats.alertsToday > 0}">{{ stats.alertsToday }}</h3>
              <span class="badge rounded-pill px-2 py-0.5" :class="stats.alertsToday > 0 ? 'bg-danger-subtle text-danger border border-danger' : 'bg-secondary-subtle text-secondary border border-secondary'" style="font-size: 0.7rem;">
                {{ stats.alertsToday > 0 ? 'Cần kiểm tra ngay' : 'Hệ thống an toàn' }}
              </span>
            </div>
            <div class="rounded-4 d-flex align-items-center justify-content-center icon-card-box" :class="stats.alertsToday > 0 ? 'bg-danger-subtle text-danger' : 'bg-secondary-subtle text-secondary'">
              <i class="fa-solid fa-triangle-exclamation fs-5"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main List Log Card -->
    <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <!-- Filter Bar -->
      <div class="d-flex flex-column flex-lg-row justify-content-between align-items-stretch align-items-lg-center gap-3 mb-4">
        <!-- Search bar -->
        <div class="input-group search-bar-input flex-grow-1" style="max-width: 450px;">
          <span class="input-group-text bg-white border-end-0 border-light-custom text-secondary">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <input type="text" class="form-control border-start-0 border-light-custom shadow-none" placeholder="Tìm kiếm tên, mã hội viên, thao tác, IP..." v-model="searchQuery" />
        </div>

        <!-- Filter dropdowns -->
        <div class="d-flex flex-wrap gap-2">
          <!-- Filter Category -->
          <select class="form-select border-light-custom shadow-none" v-model="categoryFilter" style="width: 170px;">
            <option value="all">Tất cả phân loại</option>
            <option value="checkin">Check-in / Ra vào</option>
            <option value="booking">Đặt lịch lớp/PT</option>
            <option value="billing">Hóa đơn/Thanh toán</option>
            <option value="system">Hệ thống & Admin</option>
          </select>

          <!-- Filter Severity -->
          <select class="form-select border-light-custom shadow-none" v-model="levelFilter" style="width: 160px;">
            <option value="all">Tất cả mức độ</option>
            <option value="info">Thông tin (Info)</option>
            <option value="success">Thành công (Success)</option>
            <option value="warning">Cảnh báo (Warning)</option>
            <option value="danger">Lỗi nguy hại (Danger)</option>
          </select>

          <!-- Filter Date -->
          <select class="form-select border-light-custom shadow-none" v-model="dateFilter" style="width: 150px;">
            <option value="all">Mọi thời gian</option>
            <option value="today">Hôm nay (24/06)</option>
            <option value="yesterday">Hôm qua (23/06)</option>
          </select>
        </div>
      </div>

      <!-- Logs Table -->
      <div class="table-responsive">
        <table class="table align-middle custom-table">
          <thead>
            <tr>
              <th scope="col" style="width: 140px;">Thời Gian</th>
              <th scope="col" style="width: 180px;">Đối Tượng</th>
              <th scope="col" style="width: 120px;">Phân Loại</th>
              <th scope="col">Nội Dung Hoạt Động</th>
              <th scope="col" style="width: 130px;">Mức Độ</th>
              <th scope="col" style="width: 160px;">Thiết bị & IP</th>
              <th scope="col" class="text-end" style="width: 80px;">Chi Tiết</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in paginatedLogs" :key="log.id" class="hover-row">
              <!-- Time Column -->
              <td>
                <div class="d-flex flex-column">
                  <span class="fw-semibold text-dark fs-sm">{{ log.time }}</span>
                  <small class="text-secondary" style="font-size: 0.75rem;">{{ log.date }}</small>
                </div>
              </td>

              <!-- Actor/User Column -->
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar-circle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" :class="log.actor.avatarColor" style="width: 32px; height: 32px; font-size: 0.75rem;">
                    {{ log.actor.initials }}
                  </div>
                  <div class="overflow-hidden">
                    <h6 class="mb-0 text-dark fw-bold text-truncate" style="font-size: 0.85rem;" :title="log.actor.name">{{ log.actor.name }}</h6>
                    <small class="text-secondary" style="font-size: 0.7rem;">{{ log.actor.code }}</small>
                  </div>
                </div>
              </td>

              <!-- Category Column -->
              <td>
                <span class="badge px-2 py-1 rounded fw-medium" :class="getCategoryBadgeClass(log.category)" style="font-size: 0.75rem;">
                  {{ log.categoryText }}
                </span>
              </td>

              <!-- Action Column -->
              <td>
                <span class="text-dark fs-sm" v-html="log.action"></span>
                <span v-if="log.relativeTime" class="text-muted ms-2 bg-light px-1.5 py-0.5 rounded" style="font-size: 0.65rem;">
                  {{ log.relativeTime }}
                </span>
              </td>

              <!-- Severity Level Column -->
              <td>
                <span class="badge rounded-pill px-2.5 py-1 text-uppercase" :class="log.levelClass" style="font-size: 0.7rem;">
                  <i class="fa-solid me-1" :class="getLevelIcon(log.level)"></i>
                  {{ log.levelText }}
                </span>
              </td>

              <!-- IP and Device Column -->
              <td>
                <div class="d-flex flex-column text-secondary" style="font-size: 0.75rem;">
                  <span class="text-truncate fw-medium" style="max-width: 150px;" :title="log.device">
                    <i class="fa-solid fa-desktop me-1 opacity-50"></i>{{ log.device }}
                  </span>
                  <span>
                    <i class="fa-solid fa-network-wired me-1 opacity-50"></i>{{ log.ip }}
                  </span>
                </div>
              </td>

              <!-- Action Column -->
              <td class="text-end">
                <button class="btn btn-icon-custom rounded-circle" @click="showDetails(log)" title="Xem chi tiết">
                  <i class="fa-solid fa-eye text-primary"></i>
                </button>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="filteredLogs.length === 0">
              <td colspan="7" class="text-center py-5">
                <div class="d-flex flex-column align-items-center justify-content-center text-muted">
                  <i class="fa-solid fa-file-excel fs-1 mb-3 text-secondary opacity-40"></i>
                  <h6 class="fw-bold">Không tìm thấy nhật ký hoạt động</h6>
                  <p class="mb-0 text-secondary" style="font-size: 0.85rem;">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Block -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mt-4 pt-3 border-top border-light-custom" v-if="filteredLogs.length > 0">
        <div class="text-secondary" style="font-size: 0.85rem;">
          Đang xem <span class="fw-bold text-dark">{{ startIndex + 1 }}-{{ endIndex }}</span> trong tổng số <span class="fw-bold text-dark">{{ filteredLogs.length }}</span> hoạt động
        </div>
        <nav aria-label="Page navigation" v-if="totalPages > 1">
          <ul class="pagination pagination-sm mb-0 gap-1">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <a class="page-link rounded-circle border-0 d-flex align-items-center justify-content-center" href="#" @click.prevent="setPage(currentPage - 1)">
                <i class="fa-solid fa-chevron-left"></i>
              </a>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
              <a class="page-link rounded-circle border-0 d-flex align-items-center justify-content-center fw-semibold" href="#" @click.prevent="setPage(page)">
                {{ page }}
              </a>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <a class="page-link rounded-circle border-0 d-flex align-items-center justify-content-center" href="#" @click.prevent="setPage(currentPage + 1)">
                <i class="fa-solid fa-chevron-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Detail View Modal -->
    <div class="modal-overlay d-flex align-items-center justify-content-center" v-if="selectedLog" @click.self="closeDetails">
      <div class="card border-0 shadow-lg rounded-4 modal-box bg-white overflow-hidden" style="width: 100%; max-width: 800px; max-height: 90vh;">
        <!-- Modal Header -->
        <div class="modal-header-custom p-4 d-flex justify-content-between align-items-center text-white bg-dark-deep border-bottom border-dark">
          <div class="d-flex align-items-center gap-2.5">
            <div class="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center" style="width: 38px; height: 38px;">
              <i class="fa-solid fa-file-invoice"></i>
            </div>
            <div>
              <h5 class="fw-bold mb-0" style="font-size: 1.05rem;">Chi Tiết Nhật Ký Hoạt Động</h5>
              <small class="opacity-75" style="font-size: 0.75rem;">Mã sự kiện: #LOG-{{ selectedLog.id * 1000 + 493 }}</small>
            </div>
          </div>
          <button class="btn btn-close-modal border-0 bg-transparent text-white opacity-75 hover-opacity-100" @click="closeDetails">
            <i class="fa-solid fa-xmark fs-5"></i>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body-custom p-4 overflow-y-auto" style="max-height: calc(90vh - 150px);">
          <div class="row g-4">
            <!-- Left Panel: Actor Profile & Log Metadata -->
            <div class="col-md-5 border-end border-light-custom pe-md-4">
              <!-- Actor Card -->
              <div class="p-3 rounded-4 bg-light mb-3 text-center">
                <div class="avatar-circle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm mx-auto mb-2" :class="selectedLog.actor.avatarColor" style="width: 60px; height: 60px; font-size: 1.25rem;">
                  {{ selectedLog.actor.initials }}
                </div>
                <h6 class="fw-bold text-dark mb-0.5">{{ selectedLog.actor.name }}</h6>
                <span class="badge bg-secondary-subtle text-secondary border rounded-pill px-2.5 py-0.5 mb-2" style="font-size: 0.75rem;">
                  {{ selectedLog.actor.role }}
                </span>
                <div class="text-secondary" style="font-size: 0.8rem;">
                  Mã số: <span class="fw-bold text-dark">{{ selectedLog.actor.code }}</span>
                </div>
              </div>

              <!-- Log Meta Metadata -->
              <div class="d-flex flex-column gap-2.5 px-1">
                <h6 class="fw-bold text-dark mb-1 fs-sm border-bottom pb-1.5">THÔNG TIN CHUNG</h6>
                
                <div class="d-flex justify-content-between" style="font-size: 0.8rem;">
                  <span class="text-secondary">Thời gian ghi nhận:</span>
                  <span class="fw-bold text-dark">{{ selectedLog.time }} ({{ selectedLog.date }})</span>
                </div>
                
                <div class="d-flex justify-content-between" style="font-size: 0.8rem;">
                  <span class="text-secondary">Độ ưu tiên:</span>
                  <span class="badge rounded-pill px-2 py-0.5 text-uppercase fw-bold" :class="selectedLog.levelClass" style="font-size: 0.65rem;">
                    {{ selectedLog.levelText }}
                  </span>
                </div>

                <div class="d-flex justify-content-between" style="font-size: 0.8rem;">
                  <span class="text-secondary">Địa chỉ IP mạng:</span>
                  <span class="fw-semibold text-dark"><i class="fa-solid fa-network-wired me-1 opacity-50"></i>{{ selectedLog.ip }}</span>
                </div>

                <div class="d-flex justify-content-between" style="font-size: 0.8rem;">
                  <span class="text-secondary">Thiết bị ghi nhận:</span>
                  <span class="fw-semibold text-dark text-truncate text-end" style="max-width: 140px;" :title="selectedLog.device">
                    <i class="fa-solid fa-desktop me-1 opacity-50"></i>{{ selectedLog.device }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Right Panel: Dynamic Detail Body -->
            <div class="col-md-7 ps-md-4">
              <h6 class="fw-bold text-dark mb-3 pb-1.5 border-bottom">CHI TIẾT HÀNH ĐỘNG</h6>
              
              <!-- Action Summary Text Box -->
              <div class="p-3 rounded-4 bg-primary-subtle text-primary border border-primary-subtle mb-4" style="font-size: 0.85rem; line-height: 1.5;">
                <i class="fa-solid fa-circle-info me-1.5"></i>
                <span class="text-dark" v-html="`Đối tượng <strong>${selectedLog.actor.name}</strong> ` + selectedLog.action + '.'"></span>
              </div>

              <!-- DYNAMIC DETAILS BY CATEGORY -->
              <!-- 1. CHECKIN DETAILS -->
              <div v-if="selectedLog.category === 'checkin'" class="d-flex flex-column gap-3">
                <div class="row g-3">
                  <div class="col-6">
                    <div class="p-2.5 border rounded-3 bg-white">
                      <small class="text-secondary d-block mb-1" style="font-size: 0.75rem;">Thời gian check-in</small>
                      <span class="fw-bold text-dark" style="font-size: 0.9rem;"><i class="fa-regular fa-clock me-1 text-primary"></i>{{ selectedLog.details.checkinTime }}</span>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="p-2.5 border rounded-3 bg-white">
                      <small class="text-secondary d-block mb-1" style="font-size: 0.75rem;">Điểm quét / Cổng</small>
                      <span class="fw-bold text-dark text-truncate d-block" style="font-size: 0.9rem;" :title="selectedLog.details.gate"><i class="fa-solid fa-location-dot me-1 text-primary"></i>{{ selectedLog.details.gate }}</span>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="p-2.5 border rounded-3 bg-white">
                      <small class="text-secondary d-block mb-1" style="font-size: 0.75rem;">Phương thức xác thực</small>
                      <span class="fw-bold text-dark" style="font-size: 0.9rem;"><i class="fa-solid fa-shield-halved me-1 text-primary"></i>{{ selectedLog.details.verifyMethod }}</span>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="p-2.5 border rounded-3 bg-white">
                      <small class="text-secondary d-block mb-1" style="font-size: 0.75rem;">Thân nhiệt đo được</small>
                      <span class="fw-bold text-dark" style="font-size: 0.9rem;"><i class="fa-solid fa-temperature-three-quarters me-1 text-primary"></i>{{ selectedLog.details.temp }}</span>
                    </div>
                  </div>
                </div>

                <div class="p-3 border rounded-4 bg-light mt-2">
                  <h6 class="fw-bold text-dark mb-2" style="font-size: 0.85rem;">Thông Tin Gói Tập Đăng Ký</h6>
                  <div class="d-flex justify-content-between mb-1.5" style="font-size: 0.8rem;">
                    <span class="text-secondary">Tên gói tập:</span>
                    <span class="fw-bold text-dark">{{ selectedLog.details.package }}</span>
                  </div>
                  <div class="d-flex justify-content-between" style="font-size: 0.8rem;">
                    <span class="text-secondary">Ngày hết hạn:</span>
                    <span class="fw-bold text-dark">{{ selectedLog.details.expiry }}</span>
                  </div>
                </div>
              </div>

              <!-- 2. SYSTEM / ADMIN ACTIONS DETAILS -->
              <div v-else-if="selectedLog.category === 'system'" class="d-flex flex-column gap-3">
                <div class="row g-3">
                  <div class="col-6">
                    <div class="p-2.5 border rounded-3 bg-white">
                      <small class="text-secondary d-block mb-1" style="font-size: 0.75rem;">Phân mục hệ thống</small>
                      <span class="fw-bold text-dark" style="font-size: 0.9rem;"><i class="fa-solid fa-database me-1 text-primary"></i>{{ selectedLog.details.tableName || selectedLog.details.taskName }}</span>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="p-2.5 border rounded-3 bg-white">
                      <small class="text-secondary d-block mb-1" style="font-size: 0.75rem;">Hình thức xử lý</small>
                      <span class="fw-bold text-dark" style="font-size: 0.9rem;">
                        <i class="fa-solid fa-code-compare me-1 text-primary"></i>
                        {{ selectedLog.details.operation || 'Tiến trình tự động' }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Old Value / New Value comparison -->
                <div class="d-flex flex-column gap-2 mt-2" v-if="selectedLog.details.oldValue || selectedLog.details.newValue">
                  <div class="p-2.5 border rounded-3 bg-light" style="font-size: 0.8rem;">
                    <span class="text-secondary d-block mb-1 fw-semibold text-uppercase" style="font-size: 0.65rem; letter-spacing: 0.05em;">Dữ liệu trước thay đổi</span>
                    <code class="text-dark d-block text-wrap">{{ selectedLog.details.oldValue }}</code>
                  </div>
                  <div class="p-2.5 border rounded-3 bg-primary-subtle border-primary-subtle" style="font-size: 0.8rem;">
                    <span class="text-primary d-block mb-1 fw-semibold text-uppercase" style="font-size: 0.65rem; letter-spacing: 0.05em;">Dữ liệu sau thay đổi</span>
                    <code class="text-dark d-block text-wrap fw-bold">{{ selectedLog.details.newValue }}</code>
                  </div>
                </div>

                <div class="p-2.5 border rounded-3 bg-white mt-1" v-if="selectedLog.details.location">
                  <small class="text-secondary d-block mb-1" style="font-size: 0.75rem;">Nơi lưu trữ sao lưu</small>
                  <code class="text-secondary d-block text-wrap" style="font-size: 0.8rem;">{{ selectedLog.details.location }}</code>
                </div>

                <div class="p-2.5 border rounded-3 bg-white mt-1" v-if="selectedLog.details.reason">
                  <small class="text-secondary d-block mb-1" style="font-size: 0.75rem;">Ghi chú / Lý do thực hiện</small>
                  <span class="text-dark fw-medium" style="font-size: 0.85rem;"><i class="fa-solid fa-quote-left me-1 text-secondary opacity-50"></i>{{ selectedLog.details.reason }}</span>
                </div>

                <!-- Exception event detail -->
                <div class="p-2.5 border rounded-3 bg-danger-subtle border-danger-subtle mt-1 text-danger" v-if="selectedLog.details.event">
                  <small class="text-danger d-block mb-1 fw-bold" style="font-size: 0.75rem;">SỰ CỐ PHÁT HIỆN</small>
                  <span class="fw-bold mb-2 d-block text-dark" style="font-size: 0.85rem;">{{ selectedLog.details.event }}</span>
                  <div class="p-2 bg-white rounded border border-danger-subtle text-secondary" style="font-size: 0.75rem;">
                    <span class="fw-bold text-dark">Hành động khắc phục tự động:</span> {{ selectedLog.details.actionTaken }}
                  </div>
                </div>
              </div>

              <!-- 3. BOOKING CLASSES DETAILS -->
              <div v-else-if="selectedLog.category === 'booking'" class="d-flex flex-column gap-3">
                <div class="p-3 border rounded-4 bg-light">
                  <h6 class="fw-bold text-dark mb-3" style="font-size: 0.85rem;"><i class="fa-regular fa-calendar-check me-1.5 text-primary"></i>Chi Tiết Đặt Lịch</h6>
                  
                  <div class="d-flex justify-content-between mb-2.5 border-bottom pb-2" style="font-size: 0.8rem;">
                    <span class="text-secondary">Tên lớp / Suất tập:</span>
                    <span class="fw-bold text-dark">{{ selectedLog.details.className || selectedLog.details.sessionType }}</span>
                  </div>

                  <div class="d-flex justify-content-between mb-2.5 border-bottom pb-2" style="font-size: 0.8rem;">
                    <span class="text-secondary">Huấn luyện viên phụ trách (PT):</span>
                    <span class="fw-bold text-dark">{{ selectedLog.details.trainerName }}</span>
                  </div>

                  <div class="d-flex justify-content-between mb-2.5 border-bottom pb-2" style="font-size: 0.8rem;" v-if="selectedLog.details.room">
                    <span class="text-secondary">Phòng học / Lớp học:</span>
                    <span class="fw-semibold text-dark">{{ selectedLog.details.room }}</span>
                  </div>

                  <div class="d-flex justify-content-between mb-2.5 border-bottom pb-2" style="font-size: 0.8rem;">
                    <span class="text-secondary">Thời gian diễn ra:</span>
                    <span class="fw-bold text-dark">{{ selectedLog.details.timeSlot }}</span>
                  </div>

                  <div class="d-flex justify-content-between" style="font-size: 0.8rem;" v-if="selectedLog.details.status">
                    <span class="text-secondary">Trạng thái đặt chỗ:</span>
                    <span class="badge bg-success-subtle text-success border border-success rounded-pill px-2.5 py-0.5 fw-bold" style="font-size: 0.7rem;">
                      {{ selectedLog.details.status }}
                    </span>
                  </div>

                  <div class="d-flex justify-content-between" style="font-size: 0.8rem;" v-if="selectedLog.details.cancelTime">
                    <span class="text-secondary">Thời điểm hủy & Lý do:</span>
                    <span class="text-end text-dark font-medium">
                      Hủy vào {{ selectedLog.details.cancelTime }}<br/>
                      <small class="text-secondary">({{ selectedLog.details.reason }})</small>
                    </span>
                  </div>
                </div>
              </div>

              <!-- 4. BILLING DETAILS -->
              <div v-else-if="selectedLog.category === 'billing'" class="d-flex flex-column gap-3">
                <div class="p-3 border rounded-4 bg-light">
                  <h6 class="fw-bold text-dark mb-3" style="font-size: 0.85rem;"><i class="fa-regular fa-credit-card me-1.5 text-primary"></i>Thông Tin Hóa Đơn</h6>
                  
                  <div class="d-flex justify-content-between mb-2.5 border-bottom pb-2" style="font-size: 0.8rem;">
                    <span class="text-secondary">Mã số hóa đơn:</span>
                    <span class="fw-bold text-primary">{{ selectedLog.details.billCode }}</span>
                  </div>

                  <div class="d-flex justify-content-between mb-2.5 border-bottom pb-2" style="font-size: 0.8rem;">
                    <span class="text-secondary">Tổng số tiền:</span>
                    <span class="fw-bold text-dark fs-5 text-success">{{ selectedLog.details.amount }}</span>
                  </div>

                  <div class="d-flex justify-content-between mb-2.5 border-bottom pb-2" style="font-size: 0.8rem;">
                    <span class="text-secondary">Phương thức thanh toán:</span>
                    <span class="fw-bold text-dark"><i class="fa-solid fa-wallet me-1 opacity-50"></i>{{ selectedLog.details.paymentMethod }}</span>
                  </div>

                  <div class="d-flex justify-content-between mb-2.5 border-bottom pb-2" style="font-size: 0.8rem;">
                    <span class="text-secondary">Nội dung mua gói:</span>
                    <span class="fw-semibold text-dark">{{ selectedLog.details.packageRegistered }}</span>
                  </div>

                  <div class="d-flex justify-content-between" style="font-size: 0.8rem;">
                    <span class="text-secondary">Thu ngân xử lý:</span>
                    <span class="fw-semibold text-dark">{{ selectedLog.details.cashier }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer-custom p-4 bg-light border-top border-light-custom d-flex justify-content-between align-items-center">
          <button class="btn btn-outline-secondary rounded-pill px-3.5 py-2 d-flex align-items-center gap-1.5" @click="printLog">
            <i class="fa-solid fa-print"></i>
            <span class="fw-semibold">In chi tiết nhật ký</span>
          </button>
          <button class="btn btn-secondary rounded-pill px-4 py-2 fw-semibold" @click="closeDetails">Đóng cửa sổ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LichSuHoatDong",
  data() {
    return {
      searchQuery: "",
      categoryFilter: "all",
      levelFilter: "all",
      dateFilter: "all",
      currentPage: 1,
      pageSize: 6,
      selectedLog: null,
      isRefreshing: false,
      showToast: false,
      toastMessage: "",
      toastType: "success",
      toastIcon: "fa-circle-check",
      stats: {
        totalToday: 284,
        checkinToday: 195,
        adminToday: 36,
        alertsToday: 2,
        activeUsers: 84
      },
      logs: [
        {
          id: 1,
          time: "09:15 AM",
          date: "24/06/2026",
          relativeTime: "8 phút trước",
          actor: {
            name: "Nguyễn Văn An",
            role: "Hội Viên",
            code: "FL-1024",
            avatarColor: "bg-primary",
            initials: "VA"
          },
          category: "checkin",
          categoryText: "Check-in",
          action: "đã check-in thành công tại <strong>Cổng chính</strong>",
          level: "success",
          levelText: "Thành công",
          levelClass: "bg-success-subtle text-success border border-success",
          device: "Chrome / Windows 11",
          ip: "192.168.1.45",
          details: {
            checkinTime: "09:15:23",
            gate: "Cổng chính - Sảnh chính",
            verifyMethod: "Nhận diện khuôn mặt (FaceID)",
            temp: "36.6°C",
            package: "Platinum 12 Tháng (Còn hạn)",
            expiry: "24/06/2027"
          }
        },
        {
          id: 2,
          time: "08:45 AM",
          date: "24/06/2026",
          relativeTime: "38 phút trước",
          actor: {
            name: "Alex Morgan",
            role: "Quản Trị Viên",
            code: "FL-ADM01",
            avatarColor: "bg-danger",
            initials: "AM"
          },
          category: "system",
          categoryText: "Hệ thống",
          action: "đã cập nhật gói tập cho hội viên <strong>Trần Thị Bình</strong>",
          level: "info",
          levelText: "Thông tin",
          levelClass: "bg-primary-subtle text-primary border border-primary",
          device: "Safari / MacOS",
          ip: "192.168.1.10",
          details: {
            tableName: "Gói tập hội viên",
            operation: "Cập nhật dữ liệu (Update)",
            oldValue: "Premium 6 Tháng (Trị giá: 6,500,000 VND)",
            newValue: "Platinum 12 Tháng (Trị giá: 12,000,000 VND)",
            reason: "Khách hàng nâng cấp gói tập ngày hội thao"
          }
        },
        {
          id: 3,
          time: "08:30 AM",
          date: "24/06/2026",
          relativeTime: "53 phút trước",
          actor: {
            name: "Lê Văn Cường",
            role: "Hội Viên",
            code: "FL-1150",
            avatarColor: "bg-warning",
            initials: "VC"
          },
          category: "checkin",
          categoryText: "Check-in",
          action: "bị từ chối ra vào tại <strong>Cổng VIP</strong> do gói tập hết hạn",
          level: "warning",
          levelText: "Cảnh báo",
          levelClass: "bg-warning-subtle text-warning border border-warning",
          device: "Hệ thống Cửa tự động Gate-02",
          ip: "192.168.10.12",
          details: {
            checkinTime: "08:30:11",
            gate: "Cổng VIP - Khu đặc quyền",
            verifyMethod: "Quét mã QR / Thẻ từ",
            temp: "36.4°C",
            package: "Standard 1 Tháng (Đã hết hạn ngày 20/06/2026)",
            expiry: "20/06/2026"
          }
        },
        {
          id: 4,
          time: "08:15 AM",
          date: "24/06/2026",
          relativeTime: "1 giờ trước",
          actor: {
            name: "Trần Thị Bình",
            role: "Hội Viên",
            code: "FL-1089",
            avatarColor: "bg-success",
            initials: "TB"
          },
          category: "billing",
          categoryText: "Thanh toán",
          action: "đã hoàn thành thanh toán hóa đơn <strong>#HD-1092</strong>",
          level: "success",
          levelText: "Thành công",
          levelClass: "bg-success-subtle text-success border border-success",
          device: "Chrome / Android Phone",
          ip: "192.168.1.108",
          details: {
            billCode: "#HD-1092",
            amount: "12,000,000 VND",
            paymentMethod: "Chuyển khoản Ngân hàng (Vietcombank QR)",
            packageRegistered: "Platinum 12 Tháng",
            cashier: "Alex Morgan"
          }
        },
        {
          id: 5,
          time: "07:55 AM",
          date: "24/06/2026",
          relativeTime: "1.5 giờ trước",
          actor: {
            name: "Phạm Văn Đạt",
            role: "Hội Viên",
            code: "FL-1002",
            avatarColor: "bg-info",
            initials: "VD"
          },
          category: "booking",
          categoryText: "Đặt lịch",
          action: "đã đặt lịch lớp <strong>Yoga Dòng Chảy & Luyện Thở</strong>",
          level: "success",
          levelText: "Thành công",
          levelClass: "bg-success-subtle text-success border border-success",
          device: "FitLife Mobile App",
          ip: "192.168.12.87",
          details: {
            className: "Yoga Dòng Chảy & Luyện Thở",
            trainerName: "Priya Sharma (Huấn Luyện Viên)",
            timeSlot: "09:30 AM - 10:30 AM (Hôm nay)",
            room: "Phòng Tập B (Lầu 2)",
            status: "Đã xác nhận chỗ"
          }
        },
        {
          id: 6,
          time: "07:30 AM",
          date: "24/06/2026",
          relativeTime: "2 giờ trước",
          actor: {
            name: "Hệ thống Tự động",
            role: "Hệ Thống",
            code: "FL-SYS",
            avatarColor: "bg-secondary",
            initials: "SYS"
          },
          category: "system",
          categoryText: "Hệ thống",
          action: "đã thực hiện sao lưu dữ liệu cơ sở dữ liệu định kỳ",
          level: "info",
          levelText: "Thông tin",
          levelClass: "bg-primary-subtle text-primary border border-primary",
          device: "Server Backup Daemon",
          ip: "10.0.0.1",
          details: {
            taskName: "Database Backup",
            size: "24.5 MB",
            status: "Thành công",
            location: "AWS S3 / fitlife-backups/2026-06-24.sql.gz"
          }
        },
        {
          id: 7,
          time: "07:15 AM",
          date: "24/06/2026",
          relativeTime: "2 giờ trước",
          actor: {
            name: "Marcus Webb",
            role: "Huấn Luyện Viên",
            code: "FL-PT02",
            avatarColor: "bg-navy-dark",
            initials: "MW"
          },
          category: "booking",
          categoryText: "Đặt lịch",
          action: "đã xác nhận lịch dạy kèm 1-1 cho hội viên <strong>Nguyễn Văn An</strong>",
          level: "success",
          levelText: "Thành công",
          levelClass: "bg-success-subtle text-success border border-success",
          device: "Chrome / iOS Phone",
          ip: "192.168.1.52",
          details: {
            sessionType: "Huấn luyện 1-1 (PT)",
            trainerName: "Marcus Webb",
            memberName: "Nguyễn Văn An",
            timeSlot: "14:00 PM - 15:30 PM (Hôm nay)",
            focus: "Cardio & Sức mạnh cơ bắp"
          }
        },
        {
          id: 8,
          time: "06:10 AM",
          date: "24/06/2026",
          relativeTime: "3 giờ trước",
          actor: {
            name: "Không xác định",
            role: "Hệ Thống",
            code: "DEVICE-04",
            avatarColor: "bg-dark",
            initials: "??"
          },
          category: "system",
          categoryText: "Hệ thống",
          action: "phát hiện <strong>truy cập bất thường</strong> tại cửa thoát hiểm phía sau",
          level: "danger",
          levelText: "Cảnh báo đỏ",
          levelClass: "bg-danger-subtle text-danger border border-danger",
          device: "Cảm biến Cửa thoát hiểm sau (Sensor-04)",
          ip: "192.168.10.55",
          details: {
            event: "Cửa bị mở từ phía ngoài khi chưa được cấp quyền",
            triggerTime: "06:10:04 AM",
            actionTaken: "Kích hoạt còi báo động tại phòng bảo vệ & Camera số 08 tự động quay quét"
          }
        },
        {
          id: 9,
          time: "10:30 PM",
          date: "23/06/2026",
          relativeTime: "",
          actor: {
            name: "Alex Morgan",
            role: "Quản Trị Viên",
            code: "FL-ADM01",
            avatarColor: "bg-danger",
            initials: "AM"
          },
          category: "system",
          categoryText: "Hệ thống",
          action: "đã cập nhật lịch hoạt động cho <strong>Tháng 7/2026</strong>",
          level: "info",
          levelText: "Thông tin",
          levelClass: "bg-primary-subtle text-primary border border-primary",
          device: "Chrome / Windows 11",
          ip: "192.168.1.10",
          details: {
            tableName: "Thời gian & Lớp học",
            operation: "Cập nhật cấu hình",
            oldValue: "Lịch hoạt động tháng cũ",
            newValue: "Bổ sung thêm 2 khung giờ tập Yoga tối muộn và 1 lớp HIIT nâng cao",
            reason: "Đáp ứng nhu cầu tăng cao của hội viên tập tối"
          }
        },
        {
          id: 10,
          time: "05:15 PM",
          date: "23/06/2026",
          relativeTime: "",
          actor: {
            name: "Hoàng Thị Dung",
            role: "Hội Viên",
            code: "FL-1210",
            avatarColor: "bg-purple-dark",
            initials: "HD"
          },
          category: "booking",
          categoryText: "Đặt lịch",
          action: "đã <strong>hủy đặt chỗ</strong> lớp Pilates buổi chiều",
          level: "warning",
          levelText: "Cảnh báo",
          levelClass: "bg-warning-subtle text-warning border border-warning",
          device: "FitLife Mobile App",
          ip: "192.168.5.12",
          details: {
            className: "Pilates thăng bằng cơ thể",
            trainerName: "Sarah Jenkins",
            timeSlot: "17:30 PM (23/06/2026)",
            cancelTime: "17:15 PM (Trước 15 phút so với giờ bắt đầu)",
            reason: "Hội viên báo bận đột xuất"
          }
        }
      ]
    };
  },
  computed: {
    filteredLogs() {
      return this.logs.filter(log => {
        // Search filter
        const matchSearch = log.actor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            log.actor.code.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            log.action.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            log.ip.includes(this.searchQuery) ||
                            log.device.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        // Category filter
        const matchCategory = this.categoryFilter === "all" || log.category === this.categoryFilter;

        // Level filter
        const matchLevel = this.levelFilter === "all" || log.level === this.levelFilter;

        // Date filter
        let matchDate = true;
        if (this.dateFilter === "today") {
          matchDate = log.date === "24/06/2026";
        } else if (this.dateFilter === "yesterday") {
          matchDate = log.date === "23/06/2026";
        }

        return matchSearch && matchCategory && matchLevel && matchDate;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredLogs.length / this.pageSize);
    },
    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },
    endIndex() {
      const end = this.currentPage * this.pageSize;
      return end > this.filteredLogs.length ? this.filteredLogs.length : end;
    },
    paginatedLogs() {
      return this.filteredLogs.slice(this.startIndex, this.endIndex);
    }
  },
  watch: {
    // Reset page on search or filter change
    searchQuery() { this.currentPage = 1; },
    categoryFilter() { this.currentPage = 1; },
    levelFilter() { this.currentPage = 1; },
    dateFilter() { this.currentPage = 1; }
  },
  methods: {
    getCategoryBadgeClass(category) {
      switch (category) {
        case "checkin": return "bg-success text-white";
        case "booking": return "bg-info text-white";
        case "billing": return "bg-warning text-dark";
        case "system": return "bg-secondary text-white";
        default: return "bg-light text-dark";
      }
    },
    getLevelIcon(level) {
      switch (level) {
        case "success": return "fa-circle-check";
        case "info": return "fa-circle-info";
        case "warning": return "fa-triangle-exclamation";
        case "danger": return "fa-ban";
        default: return "fa-circle-question";
      }
    },
    setPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    showDetails(log) {
      this.selectedLog = log;
    },
    closeDetails() {
      this.selectedLog = null;
    },
    triggerToast(message, type = "success") {
      this.toastMessage = message;
      this.toastType = type;
      this.toastIcon = type === "success" ? "fa-circle-check" : (type === "warning" ? "fa-triangle-exclamation" : "fa-ban");
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3500);
    },
    exportLogs() {
      this.triggerToast("Đang chuẩn bị file báo cáo nhật ký...", "success");
      setTimeout(() => {
        this.triggerToast(`Xuất file thành công! Tải xuống lịch sử hoạt động (${this.filteredLogs.length} bản ghi).`, "success");
      }, 1500);
    },
    refreshLogs() {
      this.isRefreshing = true;
      setTimeout(() => {
        this.isRefreshing = false;
        this.searchQuery = "";
        this.categoryFilter = "all";
        this.levelFilter = "all";
        this.dateFilter = "all";
        this.currentPage = 1;
        this.triggerToast("Dữ liệu hoạt động đã được làm mới!", "success");
      }, 1000);
    },
    printLog() {
      alert(`Đang in báo cáo chi tiết cho sự kiện #${this.selectedLog.id * 1000 + 493}. (Chức năng in ấn đã sẵn sàng)`);
    }
  }
}
</script>

<style scoped>
.lichsu-container {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.btn-export {
  background-color: #1e40af;
  border-color: #1e40af;
}

.btn-export:hover {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
}

.card-stats {
  transition: all 0.25s ease;
}

.card-stats:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.06) !important;
}

.card-subtitle-label {
  font-size: 0.65rem;
  letter-spacing: 0.05em;
}

.icon-card-box {
  width: 48px;
  height: 48px;
}

.border-light-custom {
  border-color: #e2e8f0 !important;
}

.custom-table th {
  font-weight: 600;
  color: #475569;
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 12px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.custom-table td {
  padding: 14px 8px;
  border-bottom: 1px solid #f8fafc;
}

.hover-row {
  transition: background-color 0.2s ease;
}

.hover-row:hover {
  background-color: #f8fafc;
}

.fs-sm {
  font-size: 0.85rem;
}

.btn-icon-custom {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  transition: all 0.2s ease;
}

.btn-icon-custom:hover {
  background-color: #f1f5f9;
  border-color: #cbd5e1;
  transform: scale(1.05);
}

/* Toast styling */
.toast-custom {
  position: fixed;
  top: 85px;
  right: 24px;
  z-index: 9999;
  background-color: #1e293b;
  color: #fff;
  padding: 14px 20px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  animation: slideInRight 0.3s ease-out;
  font-size: 0.85rem;
  font-weight: 550;
  border-left: 4px solid #3b82f6;
  max-width: 350px;
}

.toast-custom.success {
  border-left-color: #10b981;
}

.toast-custom.warning {
  border-left-color: #f59e0b;
}

.toast-custom.danger {
  border-left-color: #ef4444;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Pagination Link custom */
.pagination .page-link {
  color: #64748b;
  width: 32px;
  height: 32px;
  margin: 0 2px;
  font-size: 0.85rem;
  background-color: #f8fafc;
}

.pagination .page-item.active .page-link {
  background-color: #2563eb !important;
  color: #fff !important;
}

.pagination .page-item.disabled .page-link {
  background-color: #f1f5f9;
  color: #cbd5e1;
}

/* Modal Overlay Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(5px);
  z-index: 2500;
}

.modal-box {
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.bg-dark-deep {
  background-color: #0b0f19 !important;
}

.bg-navy-dark {
  background-color: #1e293b;
}

.bg-purple-dark {
  background-color: #581c87;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
