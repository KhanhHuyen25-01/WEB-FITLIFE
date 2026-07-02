<template>
  <div class="settings-page">
    <div class="d-flex flex-column flex-xl-row justify-content-between align-items-start align-items-xl-center gap-3 mb-4">
      <div>
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="page-kicker">Quản trị</span>
          <span class="text-secondary">/</span>
          <span class="text-secondary fw-semibold">Cài đặt hệ thống</span>
        </div>
        <h2 class="fw-bold text-dark mb-1">Cài Đặt FitLife</h2>
        <p class="text-secondary mb-0">Quản lý cấu hình vận hành, bảo mật, thông báo và thanh toán cho phòng tập.</p>
      </div>

      <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-light border rounded-pill px-3 py-2 d-flex align-items-center gap-2 fw-semibold" @click="resetSettings">
          <i class="fa-solid fa-rotate-left"></i>
          Khôi phục
        </button>
        <button class="btn btn-outline-primary rounded-pill px-3 py-2 d-flex align-items-center gap-2 fw-semibold" @click="testConnection">
          <i class="fa-solid fa-plug-circle-check"></i>
          Kiểm tra kết nối
        </button>
        <button class="btn btn-primary rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold shadow-sm btn-save" @click="saveSettings">
          <i class="fa-solid fa-floppy-disk"></i>
          Lưu thay đổi
        </button>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-md-6 col-xl-3" v-for="item in overviewCards" :key="item.label">
        <div class="card border-0 shadow-sm rounded-4 p-4 h-100 overview-card">
          <div class="d-flex justify-content-between align-items-start gap-3">
            <div>
              <span class="metric-label">{{ item.label }}</span>
              <h3 class="fw-bold text-dark my-2">{{ item.value }}</h3>
              <span class="badge rounded-pill px-2 py-1" :class="item.badgeClass">
                <i class="fa-solid me-1" :class="item.badgeIcon"></i>{{ item.note }}
              </span>
            </div>
            <div class="overview-icon" :class="item.iconClass">
              <i class="fa-solid" :class="item.icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-xl-8">
        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3 mb-4">
            <div>
              <span class="section-label">Thông tin cơ sở</span>
              <h5 class="fw-bold text-dark mb-0 mt-1">Hồ sơ phòng tập</h5>
            </div>
            <span class="badge bg-success-subtle text-success border border-success rounded-pill px-3 py-2">
              <i class="fa-solid fa-circle-check me-1"></i>Đang hoạt động
            </span>
          </div>

          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label settings-label">Tên phòng tập</label>
              <input v-model="club.name" class="form-control settings-input shadow-none" type="text" />
            </div>
            <div class="col-md-6">
              <label class="form-label settings-label">Hotline</label>
              <input v-model="club.phone" class="form-control settings-input shadow-none" type="text" />
            </div>
            <div class="col-md-6">
              <label class="form-label settings-label">Email hỗ trợ</label>
              <input v-model="club.email" class="form-control settings-input shadow-none" type="email" />
            </div>
            <div class="col-md-6">
              <label class="form-label settings-label">Múi giờ</label>
              <select v-model="club.timezone" class="form-select settings-input shadow-none">
                <option>Asia/Ho_Chi_Minh</option>
                <option>Asia/Bangkok</option>
                <option>UTC</option>
              </select>
            </div>
            <div class="col-12">
              <label class="form-label settings-label">Địa chỉ chi nhánh chính</label>
              <input v-model="club.address" class="form-control settings-input shadow-none" type="text" />
            </div>
          </div>
        </div>

        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <div class="d-flex justify-content-between align-items-start gap-3 mb-4">
            <div>
              <span class="section-label">Vận hành</span>
              <h5 class="fw-bold text-dark mb-0 mt-1">Quy tắc check-in & lớp học</h5>
            </div>
            <button class="btn btn-light border rounded-circle btn-small" title="Cập nhật quy tắc" @click="saveSettings">
              <i class="fa-solid fa-pen"></i>
            </button>
          </div>

          <div class="row g-3">
            <div class="col-md-4" v-for="rule in operationRules" :key="rule.key">
              <div class="rule-box">
                <div class="rule-icon" :class="rule.iconClass">
                  <i class="fa-solid" :class="rule.icon"></i>
                </div>
                <label class="form-label settings-label">{{ rule.label }}</label>
                <div class="input-group">
                  <input v-model.number="rule.value" class="form-control settings-input shadow-none" type="number" min="0" />
                  <span class="input-group-text bg-white">{{ rule.unit }}</span>
                </div>
                <small class="text-secondary">{{ rule.description }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="card border-0 shadow-sm rounded-4 p-4">
          <div class="mb-4">
            <span class="section-label">Thông báo</span>
            <h5 class="fw-bold text-dark mb-0 mt-1">Kênh gửi tin cho hội viên</h5>
          </div>

          <div class="notification-list">
            <div class="setting-row" v-for="channel in notificationChannels" :key="channel.key">
              <div class="d-flex align-items-center gap-3">
                <div class="setting-icon" :class="channel.iconClass">
                  <i class="fa-solid" :class="channel.icon"></i>
                </div>
                <div>
                  <h6 class="fw-bold text-dark mb-1">{{ channel.title }}</h6>
                  <p class="text-secondary small mb-0">{{ channel.description }}</p>
                </div>
              </div>
              <label class="switch-control">
                <input v-model="channel.enabled" type="checkbox" />
                <span></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <div class="mb-4">
            <span class="section-label">Bảo mật</span>
            <h5 class="fw-bold text-dark mb-0 mt-1">Quyền truy cập admin</h5>
          </div>

          <div class="d-flex flex-column gap-3">
            <div class="security-item" v-for="item in securitySettings" :key="item.key">
              <div>
                <div class="fw-bold text-dark">{{ item.title }}</div>
                <small class="text-secondary">{{ item.description }}</small>
              </div>
              <label class="switch-control">
                <input v-model="item.enabled" type="checkbox" />
                <span></span>
              </label>
            </div>
          </div>
        </div>

        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <div class="d-flex justify-content-between align-items-start gap-3 mb-4">
            <div>
              <span class="section-label">Thanh toán</span>
              <h5 class="fw-bold text-dark mb-0 mt-1">Cổng giao dịch</h5>
            </div>
            <span class="badge bg-primary-subtle text-primary border border-primary rounded-pill px-3 py-2">{{ activePaymentCount }} bật</span>
          </div>

          <div class="payment-list">
            <div class="payment-row" v-for="method in paymentMethods" :key="method.name">
              <div class="d-flex align-items-center gap-2">
                <i class="fa-solid text-primary" :class="method.icon"></i>
                <span class="fw-semibold text-dark">{{ method.name }}</span>
              </div>
              <label class="switch-control small-switch">
                <input v-model="method.enabled" type="checkbox" />
                <span></span>
              </label>
            </div>
          </div>
        </div>

        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <div class="mb-4">
            <span class="section-label">Sao lưu</span>
            <h5 class="fw-bold text-dark mb-0 mt-1">Dữ liệu hệ thống</h5>
          </div>

          <div class="backup-panel">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-semibold text-dark">Sao lưu tự động</span>
              <span class="badge bg-success-subtle text-success border border-success rounded-pill">Hằng ngày</span>
            </div>
            <p class="text-secondary small mb-3">Bản sao lưu gần nhất: 24/06/2026 lúc 03:00.</p>
            <div class="progress rounded-pill backup-progress mb-3">
              <div class="progress-bar bg-success rounded-pill" style="width: 78%;"></div>
            </div>
            <button class="btn btn-light border rounded-pill w-100 fw-semibold" @click="backupNow">
              <i class="fa-solid fa-cloud-arrow-up me-2"></i>Sao lưu ngay
            </button>
          </div>
        </div>

        <div class="card border-0 shadow-sm rounded-4 p-4">
          <div class="mb-3">
            <span class="section-label">Nhật ký cấu hình</span>
            <h5 class="fw-bold text-dark mb-0 mt-1">Thay đổi gần đây</h5>
          </div>

          <div class="activity-timeline">
            <div class="timeline-item" v-for="activity in recentActivities" :key="activity.id">
              <div class="timeline-dot" :class="activity.dotClass"></div>
              <div>
                <div class="fw-bold text-dark">{{ activity.title }}</div>
                <small class="text-secondary">{{ activity.time }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="toast-custom" v-if="toastMessage">
      <i class="fa-solid fa-circle-check me-2"></i>{{ toastMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminCaiDat",
  data() {
    return {
      toastMessage: "",
      club: {
        name: "FitLife Gym & Wellness",
        phone: "0909 888 777",
        email: "support@fitlife.vn",
        timezone: "Asia/Ho_Chi_Minh",
        address: "123 Nguyễn Trãi, Quận 1, TP.HCM"
      },
      operationRules: [
        { key: "checkinWindow", label: "Check-in trước lớp", value: 15, unit: "phút", description: "Cho phép hội viên vào lớp sớm.", icon: "fa-door-open", iconClass: "bg-primary-subtle text-primary" },
        { key: "lateCancel", label: "Hủy lịch tối thiểu", value: 120, unit: "phút", description: "Áp dụng trước giờ lớp bắt đầu.", icon: "fa-calendar-xmark", iconClass: "bg-warning-subtle text-warning" },
        { key: "guestPass", label: "Lượt khách mời", value: 2, unit: "lượt", description: "Mỗi hội viên trong một tháng.", icon: "fa-user-plus", iconClass: "bg-success-subtle text-success" }
      ],
      notificationChannels: [
        { key: "email", title: "Email nhắc lịch", description: "Gửi lịch tập, hóa đơn và thông báo gia hạn.", icon: "fa-envelope", iconClass: "bg-primary-subtle text-primary", enabled: true },
        { key: "sms", title: "SMS khẩn cấp", description: "Dùng cho cảnh báo bảo mật và lịch bị thay đổi.", icon: "fa-comment-sms", iconClass: "bg-warning-subtle text-warning", enabled: true },
        { key: "app", title: "Thông báo ứng dụng", description: "Đẩy tin mới đến app hội viên FitLife.", icon: "fa-mobile-screen-button", iconClass: "bg-info-subtle text-info", enabled: false }
      ],
      securitySettings: [
        { key: "twoFactor", title: "Xác thực 2 lớp", description: "Yêu cầu mã OTP khi admin đăng nhập.", enabled: true },
        { key: "sessionLock", title: "Khóa phiên sau 15 phút", description: "Tự đăng xuất khi không thao tác.", enabled: true },
        { key: "ipGuard", title: "Giới hạn IP quản trị", description: "Chỉ cho phép truy cập từ IP đã duyệt.", enabled: false }
      ],
      paymentMethods: [
        { name: "Chuyển khoản ngân hàng", icon: "fa-building-columns", enabled: true },
        { name: "Thẻ ngân hàng", icon: "fa-credit-card", enabled: true },
        { name: "Ví điện tử", icon: "fa-wallet", enabled: true },
        { name: "Tiền mặt tại quầy", icon: "fa-money-bill-wave", enabled: false }
      ],
      recentActivities: [
        { id: 1, title: "Alex bật xác thực 2 lớp", time: "Hôm nay, 09:20", dotClass: "bg-success" },
        { id: 2, title: "Cập nhật hotline chi nhánh", time: "Hôm qua, 16:45", dotClass: "bg-primary" },
        { id: 3, title: "Sao lưu dữ liệu hoàn tất", time: "24/06/2026, 03:00", dotClass: "bg-info" }
      ]
    };
  },
  computed: {
    activePaymentCount() {
      return this.paymentMethods.filter((method) => method.enabled).length;
    },
    overviewCards() {
      return [
        { label: "Trạng thái hệ thống", value: "Ổn định", note: "99.9% uptime", badgeIcon: "fa-signal", badgeClass: "bg-success-subtle text-success border border-success", icon: "fa-server", iconClass: "bg-success-subtle text-success" },
        { label: "Thông báo đang bật", value: `${this.notificationChannels.filter((item) => item.enabled).length}/3`, note: "Đồng bộ realtime", badgeIcon: "fa-bell", badgeClass: "bg-primary-subtle text-primary border border-primary", icon: "fa-bullhorn", iconClass: "bg-primary-subtle text-primary" },
        { label: "Bảo mật admin", value: `${this.securitySettings.filter((item) => item.enabled).length}/3`, note: "Khuyến nghị cao", badgeIcon: "fa-shield-halved", badgeClass: "bg-warning-subtle text-warning border border-warning", icon: "fa-lock", iconClass: "bg-warning-subtle text-warning" },
        { label: "Cổng thanh toán", value: `${this.activePaymentCount}/4`, note: "Sẵn sàng nhận phí", badgeIcon: "fa-credit-card", badgeClass: "bg-info-subtle text-info border border-info", icon: "fa-money-check-dollar", iconClass: "bg-info-subtle text-info" }
      ];
    }
  },
  methods: {
    showToast(message) {
      this.toastMessage = message;
      setTimeout(() => {
        this.toastMessage = "";
      }, 2600);
    },
    saveSettings() {
      this.showToast("Đã lưu cấu hình hệ thống.");
    },
    resetSettings() {
      this.showToast("Đã khôi phục cấu hình mặc định cho bản xem trước.");
    },
    testConnection() {
      this.showToast("Kết nối API, thanh toán và sao lưu đều ổn định.");
    },
    backupNow() {
      this.showToast("Đã đưa yêu cầu sao lưu dữ liệu vào hàng đợi.");
    }
  }
};
</script>

<style scoped>
.settings-page {
  animation: fadeIn 0.25s ease-out;
}

.page-kicker,
.section-label,
.metric-label,
.settings-label {
  color: #64748b;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.btn-save {
  background-color: #1e40af;
  border-color: #1e40af;
}

.btn-save:hover {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
}

.overview-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.overview-card:hover {
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08) !important;
  transform: translateY(-3px);
}

.overview-icon,
.setting-icon,
.rule-icon {
  align-items: center;
  border-radius: 16px;
  display: flex;
  flex: 0 0 48px;
  height: 48px;
  justify-content: center;
  width: 48px;
}

.settings-input {
  border-color: #e2e8f0;
  border-radius: 14px;
  color: #0f172a;
  font-weight: 600;
  min-height: 46px;
}

.settings-input:focus {
  border-color: #93c5fd;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08) !important;
}

.rule-box,
.backup-panel {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  height: 100%;
  padding: 16px;
}

.rule-icon {
  height: 42px;
  margin-bottom: 14px;
  width: 42px;
}

.notification-list,
.payment-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.setting-row,
.security-item,
.payment-row {
  align-items: center;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding: 14px;
}

.security-item,
.payment-row {
  background: #f8fafc;
}

.switch-control {
  cursor: pointer;
  flex: 0 0 auto;
  height: 28px;
  margin: 0;
  position: relative;
  width: 50px;
}

.switch-control input {
  height: 0;
  opacity: 0;
  width: 0;
}

.switch-control span {
  background: #cbd5e1;
  border-radius: 999px;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: background-color 0.2s ease;
}

.switch-control span::before {
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.22);
  content: "";
  height: 22px;
  left: 3px;
  position: absolute;
  top: 3px;
  transition: transform 0.2s ease;
  width: 22px;
}

.switch-control input:checked + span {
  background: #2563eb;
}

.switch-control input:checked + span::before {
  transform: translateX(22px);
}

.small-switch {
  height: 24px;
  width: 44px;
}

.small-switch span::before {
  height: 18px;
  width: 18px;
}

.small-switch input:checked + span::before {
  transform: translateX(20px);
}

.btn-small {
  align-items: center;
  display: inline-flex;
  height: 36px;
  justify-content: center;
  width: 36px;
}

.backup-progress {
  background-color: #e2e8f0;
  height: 8px;
}

.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.timeline-item {
  display: flex;
  gap: 12px;
  position: relative;
}

.timeline-dot {
  border: 3px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 3px #e2e8f0;
  flex: 0 0 12px;
  height: 12px;
  margin-top: 5px;
  width: 12px;
}

.toast-custom {
  background: #0f172a;
  border-left: 4px solid #22c55e;
  border-radius: 12px;
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.22);
  color: #fff;
  font-weight: 700;
  max-width: 360px;
  padding: 14px 18px;
  position: fixed;
  right: 24px;
  top: 86px;
  z-index: 3000;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .setting-row,
  .security-item {
    align-items: flex-start;
  }

  .setting-icon {
    display: none;
  }
}
</style>
