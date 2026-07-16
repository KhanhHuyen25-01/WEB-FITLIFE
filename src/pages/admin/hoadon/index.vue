<template>
  <div class="billing-page">
    <div
      class="d-flex flex-column flex-xl-row justify-content-between align-items-start align-items-xl-center gap-3 mb-4">
      <div>
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="page-kicker">Tài chính</span>
          <span class="text-secondary">/</span>
          <span class="text-secondary fw-semibold">Hóa đơn & phí</span>
        </div>
        <h2 class="fw-bold text-dark mb-1">Hóa Đơn & Phí</h2>
        <p class="text-secondary mb-0">Theo dõi hóa đơn hội viên, công nợ, gói tập và các khoản phí phát sinh.</p>
      </div>

      <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-light border rounded-pill px-3 py-2 d-flex align-items-center gap-2 fw-semibold"
          @click="refreshData">
          <i class="fa-solid fa-rotate" :class="{ 'fa-spin': isRefreshing }"></i>
          Làm mới
        </button>
        <button class="btn btn-outline-primary rounded-pill px-3 py-2 d-flex align-items-center gap-2 fw-semibold"
          @click="exportInvoices">
          <i class="fa-solid fa-file-export"></i>
          Xuất báo cáo
        </button>
        <button class="btn btn-primary rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold shadow-sm">
          <i class="fa-solid fa-plus"></i>
          Tạo hóa đơn
        </button>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-md-6 col-xl-3" v-for="metric in metrics" :key="metric.label">
        <div class="card border-0 shadow-sm rounded-4 p-4 h-100 metric-card">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="metric-label">{{ metric.label }}</span>
              <h3 class="fw-bold text-dark my-2">{{ metric.value }}</h3>
              <span class="badge rounded-pill px-2 py-1" :class="metric.badgeClass">
                <i class="fa-solid me-1" :class="metric.badgeIcon"></i>{{ metric.note }}
              </span>
            </div>
            <div class="metric-icon" :class="metric.iconClass">
              <i class="fa-solid" :class="metric.icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-xl-8">
        <div class="card border-0 shadow-sm rounded-4 p-4 h-100">
          <div
            class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3 mb-4">
            <div>
              <span class="section-label">Dòng tiền tháng này</span>
              <h5 class="fw-bold text-dark mb-0 mt-1">Doanh thu theo tuần</h5>
            </div>
            <div class="d-flex align-items-center gap-3 text-secondary small">
              <span><i class="fa-solid fa-circle text-primary me-1"></i>Đã thu</span>
              <span><i class="fa-solid fa-circle text-warning me-1"></i>Chờ thu</span>
            </div>
          </div>

          <div class="cashflow-chart">
            <div v-for="week in cashflow" :key="week.label" class="chart-column">
              <div class="chart-track">
                <div class="chart-bar pending" :style="{ height: week.pending + '%' }"></div>
                <div class="chart-bar paid" :style="{ height: week.paid + '%' }"></div>
              </div>
              <span class="chart-label">{{ week.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 h-100">
          <div class="d-flex justify-content-between align-items-start mb-4">
            <div>
              <span class="section-label">Nhắc thu phí</span>
              <h5 class="fw-bold text-dark mb-0 mt-1">Cần xử lý</h5>
            </div>
            <span class="badge bg-danger-subtle text-danger border border-danger rounded-pill px-3 py-2">{{
              overdueInvoices.length }} quá hạn</span>
          </div>

          <div class="d-flex flex-column gap-3">
            <div class="reminder-item" v-for="invoice in overdueInvoices" :key="invoice.id">
              <div class="d-flex justify-content-between gap-3">
                <div class="overflow-hidden">
                  <h6 class="fw-bold text-dark mb-1 text-truncate">{{ invoice.member }}</h6>
                  <div class="text-secondary small">{{ invoice.code }} · {{ invoice.plan }}</div>
                </div>
                <div class="text-end flex-shrink-0">
                  <div class="fw-bold text-danger">{{ formatCurrency(invoice.amount) }}</div>
                  <small class="text-secondary">{{ invoice.dueDate }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-xl-8">
        <div class="card border-0 shadow-sm rounded-4 p-4">
          <div
            class="d-flex flex-column flex-lg-row justify-content-between align-items-stretch align-items-lg-center gap-3 mb-4">
            <div class="input-group search-box">
              <span class="input-group-text bg-white border-end-0">
                <i class="fa-solid fa-magnifying-glass text-secondary"></i>
              </span>
              <input v-model="searchQuery" type="text" class="form-control border-start-0 shadow-none"
                placeholder="Tìm mã hóa đơn, hội viên, gói tập..." />
            </div>

            <div class="d-flex flex-wrap gap-2">
              <select v-model="statusFilter" class="form-select shadow-none filter-select">
                <option value="all">Tất cả trạng thái</option>
                <option value="paid">Đã thanh toán</option>
                <option value="pending">Chờ thanh toán</option>
                <option value="overdue">Quá hạn</option>
                <option value="refunded">Hoàn tiền</option>
              </select>
              <select v-model="typeFilter" class="form-select shadow-none filter-select">
                <option value="all">Tất cả khoản phí</option>
                <option value="membership">Gói tập</option>
                <option value="pt">PT cá nhân</option>
                <option value="service">Dịch vụ</option>
              </select>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table align-middle billing-table">
              <thead>
                <tr>
                  <th>Mã hóa đơn</th>
                  <th>Hội viên</th>
                  <th>Khoản phí</th>
                  <th>Hạn thanh toán</th>
                  <th class="text-end">Số tiền</th>
                  <th>Trạng thái</th>
                  <th class="text-end">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="invoice in filteredInvoices" :key="invoice.id">
                  <td>
                    <div class="fw-bold text-dark">{{ invoice.code }}</div>
                    <small class="text-secondary">{{ invoice.createdAt }}</small>
                  </td>
                  <td>
                    <div class="d-flex align-items-center gap-2">
                      <div class="avatar-circle" :class="invoice.avatarClass">{{ invoice.initials }}</div>
                      <div>
                        <div class="fw-bold text-dark">{{ invoice.member }}</div>
                        <small class="text-secondary">{{ invoice.memberCode }}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="fw-semibold text-dark">{{ invoice.plan }}</div>
                    <small class="text-secondary">{{ getTypeText(invoice.type) }}</small>
                  </td>
                  <td>
                    <span class="fw-semibold text-dark">{{ invoice.dueDate }}</span>
                  </td>
                  <td class="text-end fw-bold text-dark">{{ formatCurrency(invoice.amount) }}</td>
                  <td>
                    <span class="badge rounded-pill px-3 py-2" :class="getStatusClass(invoice.status)">
                      {{ getStatusText(invoice.status) }}
                    </span>
                  </td>
                  <td class="text-end">
                    <button class="btn btn-icon" title="Xem chi tiết" @click="openInvoice(invoice)">
                      <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn btn-icon ms-1" title="In hóa đơn" @click="printInvoice(invoice)">
                      <i class="fa-solid fa-print"></i>
                    </button>
                  </td>
                </tr>

                <tr v-if="filteredInvoices.length === 0">
                  <td colspan="7" class="text-center py-5">
                    <i class="fa-solid fa-receipt fs-1 text-secondary opacity-50 mb-3 d-block"></i>
                    <h6 class="fw-bold text-dark">Không tìm thấy hóa đơn phù hợp</h6>
                    <p class="text-secondary mb-0">Thử đổi từ khóa hoặc bộ lọc trạng thái.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span class="section-label">Biểu phí</span>
              <h5 class="fw-bold text-dark mb-0 mt-1">Gói phổ biến</h5>
            </div>
            <button class="btn btn-light border rounded-circle btn-small" title="Cập nhật biểu phí">
              <i class="fa-solid fa-pen"></i>
            </button>
          </div>

          <div class="d-flex flex-column gap-3">
            <div class="pricing-item" v-for="plan in pricingPlans" :key="plan.name">
              <div>
                <div class="fw-bold text-dark">{{ plan.name }}</div>
                <small class="text-secondary">{{ plan.description }}</small>
              </div>
              <div class="text-end">
                <div class="fw-bold text-primary">{{ formatCurrency(plan.price) }}</div>
                <small class="text-secondary">{{ plan.cycle }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="card border-0 shadow-sm rounded-4 p-4">
          <span class="section-label">Phương thức thanh toán</span>
          <h5 class="fw-bold text-dark mb-3 mt-1">Tỷ trọng giao dịch</h5>

          <div class="payment-method" v-for="method in paymentMethods" :key="method.name">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-semibold text-dark"><i class="fa-solid me-2" :class="method.icon"></i>{{ method.name
              }}</span>
              <span class="fw-bold text-secondary">{{ method.percent }}%</span>
            </div>
            <div class="progress rounded-pill payment-progress">
              <div class="progress-bar rounded-pill" :class="method.barClass" :style="{ width: method.percent + '%' }">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedInvoice" class="modal-overlay d-flex align-items-center justify-content-center"
      @click.self="selectedInvoice = null">
      <div class="card border-0 shadow-lg rounded-4 invoice-modal overflow-hidden">
        <div class="modal-header-custom d-flex justify-content-between align-items-center p-4">
          <div>
            <span class="text-white-50 small fw-semibold">Chi tiết hóa đơn</span>
            <h5 class="text-white fw-bold mb-0">{{ selectedInvoice.code }}</h5>
          </div>
          <button class="btn text-white border-0" @click="selectedInvoice = null">
            <i class="fa-solid fa-xmark fs-5"></i>
          </button>
        </div>

        <div class="p-4">
          <div class="invoice-preview mb-4">
            <div class="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h5 class="fw-bold text-dark mb-1">FITLIFE GYM</h5>
                <p class="text-secondary small mb-0">123 Nguyễn Trãi, Quận 1, TP.HCM</p>
              </div>
              <span class="badge rounded-pill px-3 py-2" :class="getStatusClass(selectedInvoice.status)">
                {{ getStatusText(selectedInvoice.status) }}
              </span>
            </div>

            <div class="row g-3 mb-4">
              <div class="col-sm-6">
                <small class="text-secondary d-block">Khách hàng</small>
                <span class="fw-bold text-dark">{{ selectedInvoice.member }}</span>
              </div>
              <div class="col-sm-6">
                <small class="text-secondary d-block">Hạn thanh toán</small>
                <span class="fw-bold text-dark">{{ selectedInvoice.dueDate }}</span>
              </div>
              <div class="col-sm-6">
                <small class="text-secondary d-block">Khoản phí</small>
                <span class="fw-bold text-dark">{{ selectedInvoice.plan }}</span>
              </div>
              <div class="col-sm-6">
                <small class="text-secondary d-block">Phương thức</small>
                <span class="fw-bold text-dark">{{ selectedInvoice.method }}</span>
              </div>
            </div>

            <div class="invoice-total d-flex justify-content-between align-items-center">
              <span class="fw-bold text-dark">Tổng thanh toán</span>
              <span class="fw-bold text-primary fs-4">{{ formatCurrency(selectedInvoice.amount) }}</span>
            </div>
          </div>

          <div class="d-flex flex-wrap justify-content-end gap-2">
            <button class="btn btn-light border rounded-pill px-4 fw-semibold"
              @click="selectedInvoice = null">Đóng</button>
            <button class="btn btn-outline-primary rounded-pill px-4 fw-semibold"
              @click="printInvoice(selectedInvoice)">
              <i class="fa-solid fa-print me-2"></i>In
            </button>
            <button class="btn btn-primary rounded-pill px-4 fw-semibold">
              <i class="fa-solid fa-paper-plane me-2"></i>Gửi nhắc phí
            </button>
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
import axios from "axios";
const API = "http://192.168.1.228:8000/api/admin";
export default {
  name: "HoaDonVaPhi",
  data() {
    return {
      searchQuery: "",
      statusFilter: "all",
      typeFilter: "all",
      invoices: [],

      summary: {
        da_thu: 0,
        cho_thu: 0,
        qua_han: 0,
        ti_le_thu_dung_han: 0
      },
      selectedInvoice: null,
      isRefreshing: false,
      toastMessage: "",
      cashflow: [
        { label: "Tuần 1", paid: 62, pending: 22 },
        { label: "Tuần 2", paid: 74, pending: 18 },
        { label: "Tuần 3", paid: 55, pending: 28 },
        { label: "Tuần 4", paid: 88, pending: 12 }
      ],
      pricingPlans: [
        { name: "Basic 1 tháng", description: "Tập tự do khung giờ thường", price: 650000, cycle: "/ tháng" },
        { name: "Premium 6 tháng", description: "Tập tự do, lớp nhóm, đo chỉ số", price: 3500000, cycle: "/ 6 tháng" },
        { name: "Platinum 12 tháng", description: "Không giới hạn, ưu tiên lớp hot", price: 6800000, cycle: "/ năm" },
        { name: "PT 10 buổi", description: "Huấn luyện cá nhân 1-1", price: 4200000, cycle: "/ gói" }
      ],
      paymentMethods: [
        { name: "Chuyển khoản", percent: 48, icon: "fa-building-columns", barClass: "bg-primary" },
        { name: "Tiền mặt", percent: 27, icon: "fa-money-bill-wave", barClass: "bg-success" },
        { name: "Thẻ ngân hàng", percent: 18, icon: "fa-credit-card", barClass: "bg-info" },
        { name: "Ví điện tử", percent: 7, icon: "fa-wallet", barClass: "bg-warning" }
      ],

    };
  },
  computed: {
    filteredInvoices() {
      const keyword = this.searchQuery.toLowerCase().trim();

      return this.invoices.filter((invoice) => {
        const matchesKeyword = !keyword ||
          invoice.code.toLowerCase().includes(keyword) ||
          invoice.member.toLowerCase().includes(keyword) ||
          invoice.memberCode.toLowerCase().includes(keyword) ||
          invoice.plan.toLowerCase().includes(keyword);
        const matchesStatus = this.statusFilter === "all" || invoice.status === this.statusFilter;
        const matchesType = this.typeFilter === "all" || invoice.type === this.typeFilter;

        return matchesKeyword && matchesStatus && matchesType;
      });
    },
    overdueInvoices() {
      return this.invoices.filter((invoice) => invoice.status === "overdue");
    },
    metrics() {
      const paid = this.invoices.filter((invoice) => invoice.status === "paid").reduce((sum, invoice) => sum + invoice.amount, 0);
      const pending = this.invoices.filter((invoice) => invoice.status === "pending").reduce((sum, invoice) => sum + invoice.amount, 0);
      const overdue = this.overdueInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);

      return [
        {
          label: "Đã thu tháng này",
          value: this.formatCurrency(Number(this.summary.da_thu)),
          note: "Đã thanh toán",
          badgeIcon: "fa-arrow-up",
          badgeClass:
            "bg-success-subtle text-success border border-success",
          icon: "fa-sack-dollar",
          iconClass: "bg-primary-subtle text-primary"
        },
        {
          label: "Chờ thanh toán",
          value: this.formatCurrency(Number(this.summary.cho_thu)),
          note: "Đang chờ thu",
          badgeIcon: "fa-clock",
          badgeClass:
            "bg-warning-subtle text-warning border border-warning",
          icon: "fa-hourglass-half",
          iconClass: "bg-warning-subtle text-warning"
        },
        {
          label: "Quá hạn",
          value: this.summary.qua_han,
          note: "Hóa đơn quá hạn",
          badgeIcon: "fa-triangle-exclamation",
          badgeClass:
            "bg-danger-subtle text-danger border border-danger",
          icon: "fa-bell",
          iconClass: "bg-danger-subtle text-danger"
        },
        {
          label: "Tỷ lệ thu đúng hạn",
          value: this.summary.ti_le_thu_dung_han + "%",
          note: "Tỷ lệ thu",
          badgeIcon: "fa-chart-line",
          badgeClass:
            "bg-info-subtle text-info border border-info",
          icon: "fa-gauge-high",
          iconClass: "bg-info-subtle text-info"
        }
      ];
    }
  },
  methods: {
    async getInvoices() {
      try {
        const token = localStorage.getItem("token_admin");

        const res = await axios.get(
          "http://192.168.1.228:8000/api/admin/invoices",
          {
            params: {
              keyword: this.searchQuery
            },
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            }
          }
        );

        this.invoices = res.data.data.map(item => ({
          id: item.ma_hoa_don,
          code: item.ma_hoa_don,
          member: item.hoi_vien,
          memberCode: "",
          initials: item.hoi_vien
            .split(" ")
            .map(i => i[0])
            .slice(-2)
            .join("")
            .toUpperCase(),
          avatarClass: "bg-primary",
          plan: item.goi_tap,
          amount: Number(item.so_tien),
          createdAt: item.ngay_tao,
          dueDate: item.ngay_tao,
          method: "",
          type: "membership",
          status:
            item.trang_thai === "Đã thanh toán"
              ? "paid"
              : item.trang_thai === "Đã hủy"
                ? "refunded"
                : "pending",
        }));
      } catch (e) {
        console.log(e);
      }
    },
    async getSummary() {
      try {
        const token = localStorage.getItem("token_admin");

        const res = await axios.get(
          "http://192.168.1.228:8000/api/admin/sum/invoices",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            }
          }
        );

        this.summary = res.data.data;
      } catch (e) {
        console.log(e);
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0
      }).format(value);
    },
    getStatusText(status) {
      const statuses = {
        paid: "Đã thanh toán",
        pending: "Chờ thanh toán",
        overdue: "Quá hạn",
        refunded: "Hoàn tiền"
      };

      return statuses[status] || "Không rõ";
    },
    getStatusClass(status) {
      const classes = {
        paid: "bg-success-subtle text-success border border-success",
        pending: "bg-warning-subtle text-warning border border-warning",
        overdue: "bg-danger-subtle text-danger border border-danger",
        refunded: "bg-secondary-subtle text-secondary border border-secondary"
      };

      return classes[status] || "bg-light text-dark border";
    },
    getTypeText(type) {
      const types = {
        membership: "Phí gói tập",
        pt: "Phí huấn luyện cá nhân",
        service: "Phí dịch vụ"
      };

      return types[type] || "Khoản phí khác";
    },
    openInvoice(invoice) {
      this.selectedInvoice = invoice;
    },
    printInvoice(invoice) {
      this.showToast(`Đã chuẩn bị bản in cho ${invoice.code}.`);
    },
    exportInvoices() {
      this.showToast(`Đã xuất báo cáo ${this.filteredInvoices.length} hóa đơn.`);
    },
    refreshData() {
      this.isRefreshing = true;

      Promise.all([
        this.getInvoices(),
        this.getSummary()
      ]).finally(() => {
        this.isRefreshing = false;
        this.showToast("Đã làm mới dữ liệu.");
      });
    },
    showToast(message) {
      this.toastMessage = message;
      setTimeout(() => {
        this.toastMessage = "";
      }, 2600);
    }
  },
  mounted() {
    this.getInvoices();
    this.getSummary();
  },
  watch: {
    searchQuery() {
      this.getInvoices();
    }
  },

};
</script>

<style scoped>
.billing-page {
  animation: fadeIn 0.25s ease-out;
}

.page-kicker,
.section-label,
.metric-label {
  color: #64748b;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.metric-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08) !important;
}

.metric-icon {
  align-items: center;
  border-radius: 16px;
  display: flex;
  flex: 0 0 48px;
  height: 48px;
  justify-content: center;
  width: 48px;
}

.cashflow-chart {
  align-items: end;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  height: 260px;
  padding: 16px 8px 0;
}

.chart-column {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  justify-content: end;
}

.chart-track {
  align-items: end;
  background: repeating-linear-gradient(to top, #f8fafc, #f8fafc 1px, transparent 1px, transparent 52px);
  border-radius: 14px;
  display: flex;
  gap: 6px;
  height: 210px;
  justify-content: center;
  padding: 0 10px;
  width: 100%;
}

.chart-bar {
  border-radius: 999px 999px 0 0;
  min-height: 14px;
  width: 30%;
}

.chart-bar.paid {
  background: #2563eb;
}

.chart-bar.pending {
  background: #f59e0b;
}

.chart-label {
  color: #64748b;
  font-size: 0.78rem;
  font-weight: 700;
}

.reminder-item,
.pricing-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 14px;
}

.pricing-item {
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.search-box {
  max-width: 430px;
}

.filter-select {
  min-width: 170px;
}

.billing-table th {
  border-bottom: 2px solid #eef2f7;
  color: #64748b;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding-bottom: 12px;
  text-transform: uppercase;
}

.billing-table td {
  border-bottom: 1px solid #f1f5f9;
  padding: 14px 8px;
}

.billing-table tbody tr {
  transition: background-color 0.2s ease;
}

.billing-table tbody tr:hover {
  background-color: #f8fafc;
}

.avatar-circle {
  align-items: center;
  border-radius: 999px;
  color: #fff;
  display: flex;
  flex: 0 0 36px;
  font-size: 0.78rem;
  font-weight: 800;
  height: 36px;
  justify-content: center;
  width: 36px;
}

.bg-purple {
  background-color: #7c3aed !important;
}

.btn-icon,
.btn-small {
  align-items: center;
  display: inline-flex;
  height: 34px;
  justify-content: center;
  width: 34px;
}

.btn-icon {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  color: #2563eb;
}

.btn-icon:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.payment-method+.payment-method {
  margin-top: 18px;
}

.payment-progress {
  background-color: #eef2f7;
  height: 7px;
}

.modal-overlay {
  backdrop-filter: blur(5px);
  background: rgba(15, 23, 42, 0.5);
  bottom: 0;
  left: 0;
  padding: 20px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 2500;
}

.invoice-modal {
  max-height: 92vh;
  max-width: 760px;
  overflow-y: auto;
  width: 100%;
}

.modal-header-custom {
  background: #0b0f19;
}

.invoice-preview {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 20px;
}

.invoice-total {
  background: #fff;
  border: 1px dashed #cbd5e1;
  border-radius: 16px;
  padding: 16px;
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
  .search-box {
    max-width: none;
  }

  .cashflow-chart {
    gap: 12px;
  }

  .chart-track {
    padding: 0 6px;
  }

  .filter-select {
    width: 100%;
  }
}
</style>
