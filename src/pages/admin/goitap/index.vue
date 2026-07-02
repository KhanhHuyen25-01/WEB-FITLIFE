<template>
  <div class="goitap-container">
    <!-- Header Section -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
      <div>
        <h2 class="fw-bold text-dark mb-1">Quản Lý Gói Tập </h2>
        <p class="text-secondary mb-0">Tạo, chỉnh sửa và quản lý các gói dịch vụ tập luyện tại FitLife.</p>
      </div>
      <button class="btn btn-primary rounded-pill px-4 py-2 mt-3 mt-md-0 d-flex align-items-center gap-2 shadow-sm" @click="openAddModal">
        <i class="fa-solid fa-plus-circle"></i>
        <span class="fw-semibold">Thêm Gói Tập Mới</span>
      </button>
    </div>

    <!-- Quick Stats Cards -->
    <div class="row g-4 mb-4">
      <!-- Total Packages -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">TỔNG SỐ GÓI</span>
              <h3 class="fw-bold text-dark my-1 mb-5">{{ packages.length }}</h3>
              <span class="badge bg-primary-subtle text-primary border border-primary rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                Đang quản lý
              </span>
            </div>
            <div class="bg-primary-subtle text-primary rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-box-open fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Packages -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">ĐANG KINH DOANH</span>
              <h3 class="fw-bold text-success my-1 mb-5">{{ activeCount }}</h3>
              <span class="badge bg-success-subtle text-success border border-success rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                Hiển thị trên app
              </span>
            </div>
            <div class="bg-success-subtle text-success rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-eye fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Paused Packages -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">ĐÃ TẠM DỪNG</span>
              <h3 class="fw-bold text-warning my-1 mb-5">{{ inactiveCount }}</h3>
              <span class="badge bg-warning-subtle text-warning border border-warning rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                Ngừng đăng ký mới
              </span>
            </div>
            <div class="bg-warning-subtle text-warning rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-eye-slash fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Most Popular -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">BÁN CHẠY NHẤT</span>
              <h3 class="fw-bold text-danger my-1" style="font-size: 1.5rem; line-height: 1.6;">{{ popularPackageName }}</h3>
              <span class="badge bg-danger-subtle text-danger border border-danger rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                Yêu thích nhất 
              </span>
            </div>
            <div class="bg-danger-subtle text-danger rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-fire fs-5"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter & Toolbar Area -->
    <div class="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
      <div class="d-flex flex-column flex-lg-row justify-content-between align-items-stretch align-items-lg-center gap-3">
        <!-- Search and Filters Group -->
        <div class="d-flex flex-wrap gap-3 flex-grow-1">
          <!-- Search Bar -->
          <div class="input-group search-bar-input flex-grow-1" style="max-width: 380px; min-width: 250px;">
            <span class="input-group-text bg-white border-end-0 border-light-custom text-secondary">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input type="text" class="form-control border-start-0 border-light-custom" placeholder="Tìm tên hoặc mã gói tập..." v-model="searchQuery" />
          </div>

          <!-- Duration Filter -->
          <select class="form-select border-light-custom" v-model="durationFilter" style="width: 160px;">
            <option value="all">Tất cả thời hạn</option>
            <option value="1">1 Tháng</option>
            <option value="3">3 Tháng</option>
            <option value="6">6 Tháng</option>
            <option value="12">12 Tháng</option>
          </select>

          <!-- Type/PT Filter -->
          <select class="form-select border-light-custom" v-model="ptFilter" style="width: 170px;">
            <option value="all">Tất cả loại gói</option>
            <option value="with-pt">Có PT hướng dẫn</option>
            <option value="no-pt">Tự tập (Không PT)</option>
          </select>

          <!-- Status Filter -->
          <select class="form-select border-light-custom" v-model="statusFilter" style="width: 170px;">
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang kinh doanh</option>
            <option value="inactive">Đã tạm dừng</option>
          </select>
        </div>

        <!-- View Mode Toggle -->
        <div class="d-flex align-items-center gap-2 mt-3 mt-lg-0">
          <span class="text-secondary fw-semibold me-2" style="font-size: 0.85rem;">Chế độ xem:</span>
          <div class="btn-group shadow-sm rounded-pill p-1 bg-light-custom" role="group">
            <button type="button" class="btn rounded-pill px-3 py-1 btn-toggle-view" :class="{ 'active bg-white text-primary': viewMode === 'grid', 'text-secondary bg-transparent': viewMode !== 'grid' }" @click="viewMode = 'grid'">
              <i class="fa-solid fa-grip-vertical me-1"></i> Card
            </button>
            <button type="button" class="btn rounded-pill px-3 py-1 btn-toggle-view" :class="{ 'active bg-white text-primary': viewMode === 'table', 'text-secondary bg-transparent': viewMode !== 'table' }" @click="viewMode = 'table'">
              <i class="fa-solid fa-list me-1"></i> Bảng
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Area: Grid View -->
    <div v-if="viewMode === 'grid'" class="row g-4 mb-5">
      <div class="col-md-6 col-lg-4" v-for="item in filteredPackages" :key="item.id">
        <div class="card border-0 shadow-sm rounded-4 h-100 package-card overflow-hidden bg-white" :class="{ 'popular-card border-gradient': item.isPopular }">
          <!-- Popular badge -->
          <div v-if="item.isPopular" class="popular-ribbon">
            <span>BÁN CHẠY</span>
          </div>

          <div class="card-body p-4 d-flex flex-column h-100">
            <!-- Header of card -->
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <span class="badge bg-light text-secondary border rounded-pill px-2.5 py-1 fw-bold mb-2" style="font-size: 0.75rem;">
                  Mã: {{ item.code }}
                </span>
                <h5 class="fw-bold text-dark mb-1">{{ item.name }}</h5>
                <span class="text-muted" style="font-size: 0.85rem;">
                  <i class="fa-regular fa-clock me-1"></i> Thời hạn: <strong>{{ item.duration }} tháng</strong>
                </span>
              </div>
              <div class="form-check form-switch p-0 m-0">
                <input class="form-check-input ms-0 status-switch cursor-pointer" type="checkbox" role="switch" :checked="item.status === 'active'" @change="toggleStatus(item)">
              </div>
            </div>

            <!-- Price -->
            <div class="my-3 py-2 border-top border-bottom border-light-custom d-flex align-items-baseline gap-1">
              <h2 class="fw-bold text-primary mb-0">{{ formatPrice(item.price) }}</h2>
              <span class="text-secondary" style="font-size: 0.85rem;">/ {{ item.duration }} tháng</span>
            </div>

            <!-- Features -->
            <div class="flex-grow-1 mb-4">
              <h6 class="text-dark fw-bold mb-2.5" style="font-size: 0.85rem;">Dịch vụ đi kèm:</h6>
              <ul class="list-unstyled d-flex flex-column gap-2 mb-0">
                <li v-for="(feat, idx) in item.features" :key="idx" class="d-flex align-items-start gap-2" style="font-size: 0.85rem;">
                  <i class="fa-solid fa-circle-check text-success mt-1" style="font-size: 0.8rem;"></i>
                  <span class="text-secondary">{{ feat }}</span>
                </li>
                <!-- PT Sessions detail -->
                <li v-if="item.ptSessions > 0" class="d-flex align-items-start gap-2 fw-medium text-primary" style="font-size: 0.85rem;">
                  <i class="fa-solid fa-user-ninja mt-1"></i>
                  <span>Có {{ item.ptSessions }} buổi tập cùng PT cá nhân</span>
                </li>
                <li v-else class="d-flex align-items-start gap-2 text-muted" style="font-size: 0.85rem;">
                  <i class="fa-solid fa-info-circle mt-1"></i>
                  <span>Tự tập tự do</span>
                </li>
              </ul>
            </div>

            <!-- Action buttons -->
            <div class="d-flex gap-2 mt-auto pt-3 border-top border-light-custom">
              <button class="btn btn-outline-primary rounded-pill px-3 py-1.5 flex-grow-1 fw-semibold btn-action-card" @click="openEditModal(item)">
                <i class="fa-regular fa-edit me-1.5"></i> Sửa Gói
              </button>
              <button class="btn btn-outline-danger rounded-pill px-3 py-1.5 flex-grow-1 fw-semibold btn-action-card" @click="confirmDelete(item)">
                <i class="fa-regular fa-trash-can me-1.5"></i> Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Empty state inside view -->
      <div class="col-12 text-center py-5" v-if="filteredPackages.length === 0">
        <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23cbd5e1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'></circle><path d='M16 16s-1.5-2-4-2-4 2-4 2'></path><line x1='9' y1='9' x2='9.01' y2='9'></line><line x1='15' y1='9' x2='15.01' y2='9'></line></svg>" alt="No data" class="mb-3 opacity-60" style="width: 80px;" />
        <h5 class="text-secondary fw-semibold">Không tìm thấy gói tập phù hợp</h5>
        <p class="text-muted mb-0">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
      </div>
    </div>

    <!-- Content Area: Table View -->
    <div v-else class="card border-0 shadow-sm rounded-4 p-4 bg-white mb-5">
      <div class="table-responsive">
        <table class="table align-middle custom-table mb-0">
          <thead>
            <tr>
              <th scope="col" style="width: 120px;">Mã Gói</th>
              <th scope="col">Tên Gói Tập</th>
              <th scope="col">Thời Hạn</th>
              <th scope="col">Giá Gói</th>
              <th scope="col">Số Buổi PT</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col" class="text-end" style="width: 180px;">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredPackages" :key="item.id" class="hover-row">
              <td>
                <span class="badge bg-light text-secondary border rounded-pill px-2.5 py-1 fw-bold">
                  {{ item.code }}
                </span>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="fw-bold text-dark">{{ item.name }}</span>
                  <span v-if="item.isPopular" class="badge bg-danger-subtle text-danger rounded-pill fw-bold" style="font-size: 0.65rem;">
                    BÁN CHẠY
                  </span>
                </div>
                <small class="text-secondary text-truncate d-inline-block" style="max-width: 250px;">{{ item.description || 'Không có mô tả' }}</small>
              </td>
              <td>
                <span class="fw-semibold text-secondary">{{ item.duration }} Tháng</span>
              </td>
              <td>
                <span class="fw-bold text-primary">{{ formatPrice(item.price) }}</span>
              </td>
              <td>
                <span class="badge bg-primary-subtle text-primary rounded-pill px-2.5 py-1 fw-bold" v-if="item.ptSessions > 0">
                  {{ item.ptSessions }} Buổi
                </span>
                <span class="text-muted fs-7" v-else>Không kèm PT</span>
              </td>
              <td>
                <div class="form-check form-switch p-0 m-0">
                  <input class="form-check-input ms-0 status-switch cursor-pointer" type="checkbox" role="switch" :checked="item.status === 'active'" @change="toggleStatus(item)">
                  <span class="ms-2 fs-7 align-middle" :class="item.status === 'active' ? 'text-success fw-semibold' : 'text-secondary'">
                    {{ item.status === 'active' ? 'Kinh doanh' : 'Tạm dừng' }}
                  </span>
                </div>
              </td>
              <td class="text-end">
                <div class="d-flex justify-content-end gap-2">
                  <button class="btn btn-icon-action text-primary bg-primary-subtle rounded-circle" title="Sửa" @click="openEditModal(item)">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button class="btn btn-icon-action text-danger bg-danger-subtle rounded-circle" title="Xóa" @click="confirmDelete(item)">
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredPackages.length === 0">
              <td colspan="7" class="text-center py-5 text-secondary">
                Không tìm thấy gói tập phù hợp.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Modal (Bootstrap layout emulation for reactivity & ease of styling) -->
    <div v-if="showModal" class="modal-backdrop-custom d-flex align-items-center justify-content-center">
      <div class="modal-dialog-custom bg-white rounded-4 shadow-lg overflow-hidden animate__animated animate__fadeInUp">
        <div class="modal-header-custom p-4 d-flex justify-content-between align-items-center border-bottom border-light-custom bg-light-custom">
          <h5 class="fw-bold text-dark mb-0">{{ isEditMode ? 'Cập Nhật Gói Tập' : 'Tạo Gói Tập Mới' }}</h5>
          <button class="btn-close-custom bg-transparent border-0 text-secondary" @click="closeModal">
            <i class="fa-solid fa-xmark fs-5"></i>
          </button>
        </div>
        <div class="modal-body-custom p-4 overflow-y-auto" style="max-height: 70vh;">
          <form @submit.prevent="savePackage">
            <!-- Row 1: Code & Name -->
            <div class="row g-3 mb-3">
              <div class="col-md-4">
                <label class="form-label fw-semibold text-secondary">Mã Gói Tập <span class="text-danger">*</span></label>
                <input type="text" class="form-control border-light-custom" placeholder="Ví dụ: GOLD3M" v-model="formData.code" required :disabled="isEditMode" />
              </div>
              <div class="col-md-8">
                <label class="form-label fw-semibold text-secondary">Tên Gói Tập <span class="text-danger">*</span></label>
                <input type="text" class="form-control border-light-custom" placeholder="Ví dụ: Gói Vàng Thể Hình" v-model="formData.name" required />
              </div>
            </div>

            <!-- Row 2: Price & Duration -->
            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold text-secondary">Giá Gói (VNĐ) <span class="text-danger">*</span></label>
                <input type="number" class="form-control border-light-custom" placeholder="Ví dụ: 1500000" v-model="formData.price" required min="0" />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold text-secondary">Thời Hạn (Tháng) <span class="text-danger">*</span></label>
                <select class="form-select border-light-custom" v-model="formData.duration" required>
                  <option :value="1">1 Tháng</option>
                  <option :value="3">3 Tháng</option>
                  <option :value="6">6 Tháng</option>
                  <option :value="12">12 Tháng</option>
                </select>
              </div>
            </div>

            <!-- Row 3: Personal Trainer (PT) Sessions & Status -->
            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold text-secondary">Số Buổi PT Kèm Theo</label>
                <input type="number" class="form-control border-light-custom" placeholder="0 nếu tự tập" v-model="formData.ptSessions" min="0" />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold text-secondary">Trạng Thái Kinh Doanh</label>
                <select class="form-select border-light-custom" v-model="formData.status">
                  <option value="active">Đang kinh doanh (Active)</option>
                  <option value="inactive">Tạm dừng bán (Inactive)</option>
                </select>
              </div>
            </div>

            <!-- Highlights / Options -->
            <div class="mb-3 d-flex gap-4">
              <div class="form-check">
                <input class="form-check-input cursor-pointer" type="checkbox" id="checkPopular" v-model="formData.isPopular">
                <label class="form-check-label fw-semibold text-secondary cursor-pointer" for="checkPopular">
                  Đánh dấu là gói Bán chạy / Phổ biến
                </label>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-3">
              <label class="form-label fw-semibold text-secondary">Mô Tả Gói Tập</label>
              <textarea class="form-control border-light-custom" rows="2" placeholder="Nhập mô tả ngắn gọn về đặc quyền của gói..." v-model="formData.description"></textarea>
            </div>

            <!-- Dynamic Features List -->
            <div class="mb-4">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <label class="form-label fw-semibold text-secondary mb-0">Các dịch vụ & đặc quyền đi kèm</label>
                <button type="button" class="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-1 text-xs" @click="addFeatureField">
                  <i class="fa-solid fa-plus me-1"></i> Thêm đặc quyền
                </button>
              </div>
              <div class="d-flex flex-column gap-2">
                <div v-for="(feat, index) in formData.features" :key="index" class="d-flex align-items-center gap-2">
                  <input type="text" class="form-control form-control-sm border-light-custom" placeholder="Đặc quyền ví dụ: Sử dụng phòng xông hơi" v-model="formData.features[index]" />
                  <button type="button" class="btn btn-sm btn-outline-danger rounded-circle p-1" style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;" @click="removeFeatureField(index)">
                    <i class="fa-solid fa-trash-can" style="font-size: 0.75rem;"></i>
                  </button>
                </div>
                <div class="text-muted text-xs mt-1" v-if="formData.features.length === 0">
                  Chưa có đặc quyền nào được thêm. Hãy nhấn Thêm đặc quyền ở trên.
                </div>
              </div>
            </div>

            <!-- Actions buttons in modal -->
            <div class="d-flex gap-2 justify-content-end pt-3 border-top border-light-custom">
              <button type="button" class="btn btn-light rounded-pill px-4" @click="closeModal">Đóng</button>
              <button type="submit" class="btn btn-primary rounded-pill px-4">Lưu Lại</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Toast Notification (Custom micro-interaction) -->
    <div v-if="toast.show" class="toast-custom shadow rounded-3 border-start border-4 animate__animated animate__fadeInRight" :class="toast.typeClass">
      <div class="d-flex align-items-center gap-3 p-3">
        <i :class="toast.iconClass" class="fs-5"></i>
        <div>
          <h6 class="mb-0 fw-bold text-dark text-xs">{{ toast.title }}</h6>
          <small class="text-secondary text-xs">{{ toast.message }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Dummy initial workout packages data
const packages = ref([
  {
    id: 1,
    code: 'STD1M',
    name: 'Gói Standard 1 Tháng',
    price: 490000,
    duration: 1,
    ptSessions: 0,
    status: 'active',
    isPopular: false,
    description: 'Phù hợp cho người mới bắt đầu trải nghiệm hệ thống phòng tập chất lượng cao.',
    features: ['Sử dụng toàn bộ trang thiết bị cardio & tạ', 'Tủ khóa cá nhân thông minh', 'Nước uống tinh khiết miễn phí']
  },
  {
    id: 2,
    code: 'PRE3M',
    name: 'Gói Premium 3 Tháng',
    price: 1290000,
    duration: 3,
    ptSessions: 2,
    status: 'active',
    isPopular: true,
    description: 'Lựa chọn thông dụng nhất, cân bằng hoàn hảo giữa hiệu quả tập luyện và chi phí.',
    features: ['Truy cập không giới hạn khung giờ', '2 buổi định hướng và thiết kế lộ trình với PT', 'Sử dụng phòng tắm nước nóng & phòng xông hơi', 'Khăn tập miễn phí mỗi buổi']
  },
  {
    id: 3,
    code: 'PLA6M',
    name: 'Gói Platinum 6 Tháng',
    price: 2490000,
    duration: 6,
    ptSessions: 5,
    status: 'active',
    isPopular: false,
    description: 'Thích hợp cho hội viên cam kết tập luyện đều đặn dài hạn với ưu đãi lớn.',
    features: ['Toàn bộ đặc quyền của gói Premium', '5 buổi tập chuyên sâu cùng PT', 'Đo chỉ số cơ thể InBody miễn phí hàng tháng', 'Mời 1 bạn đi cùng 2 lần/tháng']
  },
  {
    id: 4,
    code: 'VIP12M',
    name: 'Gói VIP Thượng Hạng 12 Tháng',
    price: 4890000,
    duration: 12,
    ptSessions: 12,
    status: 'active',
    isPopular: false,
    description: 'Chương trình tập luyện đẳng cấp nhất với sự đồng hành toàn diện của đội ngũ PT.',
    features: ['Không giới hạn dịch vụ tại tất cả chi nhánh', '12 buổi tập chuyên sâu 1-kèm-1 cùng PT', 'Miễn phí tủ đồ cố định dài hạn', 'Đồ uống bổ sung năng lượng và khăn cao cấp miễn phí']
  },
  {
    id: 5,
    code: 'OFFLINE1M',
    name: 'Gói Trải Nghiệm Thử',
    price: 150000,
    duration: 1,
    ptSessions: 0,
    status: 'inactive',
    isPopular: false,
    description: 'Gói kích hoạt ngắn hạn cho các chiến dịch sự kiện trải nghiệm.',
    features: ['Sử dụng tạ và máy chạy trong 7 ngày đầu', 'Hỗ trợ đo Inbody 1 lần']
  }
]);

// Filtering and Searching State
const searchQuery = ref('');
const durationFilter = ref('all');
const ptFilter = ref('all');
const statusFilter = ref('all');
const viewMode = ref('grid'); // 'grid' | 'table'

// Stats computation
const activeCount = computed(() => packages.value.filter(p => p.status === 'active').length);
const inactiveCount = computed(() => packages.value.filter(p => p.status === 'inactive').length);
const popularPackageName = computed(() => {
  const popular = packages.value.find(p => p.isPopular);
  return popular ? popular.name : 'Gói Premium';
});

// Filter package list
const filteredPackages = computed(() => {
  return packages.value.filter(p => {
    // Search filter
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          p.code.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    // Duration filter
    const matchesDuration = durationFilter.value === 'all' || p.duration.toString() === durationFilter.value;
    
    // PT filter
    const matchesPT = ptFilter.value === 'all' || 
                      (ptFilter.value === 'with-pt' && p.ptSessions > 0) ||
                      (ptFilter.value === 'no-pt' && p.ptSessions === 0);
    
    // Status filter
    const matchesStatus = statusFilter.value === 'all' || 
                          (statusFilter.value === 'active' && p.status === 'active') ||
                          (statusFilter.value === 'inactive' && p.status === 'inactive');

    return matchesSearch && matchesDuration && matchesPT && matchesStatus;
  });
});

// Modal state & data
const showModal = ref(false);
const isEditMode = ref(false);
const editingId = ref(null);
const formData = ref({
  code: '',
  name: '',
  price: 0,
  duration: 1,
  ptSessions: 0,
  status: 'active',
  isPopular: false,
  description: '',
  features: []
});

// Feature management inside form
const addFeatureField = () => {
  formData.value.features.push('');
};
const removeFeatureField = (index) => {
  formData.value.features.splice(index, 1);
};

// Modal Actions
const openAddModal = () => {
  isEditMode.value = false;
  editingId.value = null;
  formData.value = {
    code: '',
    name: '',
    price: 0,
    duration: 1,
    ptSessions: 0,
    status: 'active',
    isPopular: false,
    description: '',
    features: ['Sử dụng toàn bộ trang thiết bị', 'Tủ khóa cá nhân thông minh']
  };
  showModal.value = true;
};

const openEditModal = (item) => {
  isEditMode.value = true;
  editingId.value = item.id;
  formData.value = {
    code: item.code,
    name: item.name,
    price: item.price,
    duration: item.duration,
    ptSessions: item.ptSessions,
    status: item.status,
    isPopular: item.isPopular,
    description: item.description || '',
    features: [...item.features]
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

// Toast state & trigger
const toast = ref({
  show: false,
  title: '',
  message: '',
  typeClass: 'border-primary',
  iconClass: 'fa-solid fa-circle-info text-primary'
});

const showToast = (title, message, type = 'success') => {
  toast.value.title = title;
  toast.value.message = message;
  toast.value.show = true;
  
  if (type === 'success') {
    toast.value.typeClass = 'border-success bg-white text-success';
    toast.value.iconClass = 'fa-solid fa-circle-check text-success';
  } else if (type === 'danger') {
    toast.value.typeClass = 'border-danger bg-white text-danger';
    toast.value.iconClass = 'fa-solid fa-triangle-exclamation text-danger';
  } else {
    toast.value.typeClass = 'border-primary bg-white text-primary';
    toast.value.iconClass = 'fa-solid fa-circle-info text-primary';
  }

  setTimeout(() => {
    toast.value.show = false;
  }, 3500);
};

// Save package
const savePackage = () => {
  // Validate and trim features
  const cleanedFeatures = formData.value.features
    .map(f => f.trim())
    .filter(f => f.length > 0);

  if (isEditMode.value) {
    // Update package
    const index = packages.value.findIndex(p => p.id === editingId.value);
    if (index !== -1) {
      packages.value[index] = {
        ...packages.value[index],
        name: formData.value.name,
        price: Number(formData.value.price),
        duration: Number(formData.value.duration),
        ptSessions: Number(formData.value.ptSessions || 0),
        status: formData.value.status,
        isPopular: formData.value.isPopular,
        description: formData.value.description,
        features: cleanedFeatures
      };
      // If popular status is enabled, unset other populars
      if (formData.value.isPopular) {
        packages.value.forEach(p => {
          if (p.id !== editingId.value) p.isPopular = false;
        });
      }
      showToast('Thành Công', `Gói tập ${formData.value.name} đã được cập nhật!`, 'success');
    }
  } else {
    // Check duplicate code
    const duplicate = packages.value.find(p => p.code.toLowerCase() === formData.value.code.toLowerCase());
    if (duplicate) {
      showToast('Lỗi Trùng Mã', `Mã gói tập ${formData.value.code} đã tồn tại! Vui lòng chọn mã khác.`, 'danger');
      return;
    }

    // Insert package
    const newId = packages.value.length ? Math.max(...packages.value.map(p => p.id)) + 1 : 1;
    const newPkg = {
      id: newId,
      code: formData.value.code.toUpperCase().trim(),
      name: formData.value.name.trim(),
      price: Number(formData.value.price),
      duration: Number(formData.value.duration),
      ptSessions: Number(formData.value.ptSessions || 0),
      status: formData.value.status,
      isPopular: formData.value.isPopular,
      description: formData.value.description.trim(),
      features: cleanedFeatures
    };
    
    packages.value.push(newPkg);

    // If popular is enabled, clear others
    if (newPkg.isPopular) {
      packages.value.forEach(p => {
        if (p.id !== newId) p.isPopular = false;
      });
    }

    showToast('Tạo Mới Thành Công', `Gói tập ${newPkg.name} đã được thêm thành công!`, 'success');
  }

  closeModal();
};

// Toggle active/inactive status quickly
const toggleStatus = (item) => {
  item.status = item.status === 'active' ? 'inactive' : 'active';
  showToast(
    item.status === 'active' ? 'Đã kích hoạt' : 'Đã tạm dừng', 
    `Đã chuyển trạng thái gói ${item.name} thành công.`,
    'success'
  );
};

// Delete package
const confirmDelete = (item) => {
  if (confirm(`Bạn chắc chắn muốn xóa gói tập "${item.name}"? Hành động này không thể hoàn tác.`)) {
    packages.value = packages.value.filter(p => p.id !== item.id);
    showToast('Đã Xóa', `Gói tập ${item.name} đã bị loại bỏ khỏi hệ thống.`, 'success');
  }
};

// Helper price format
const formatPrice = (val) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
};
</script>

<style scoped>
/* Page Layout */
.goitap-container {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Typography and common */
.card-subtitle-label {
  font-size: 0.65rem;
  letter-spacing: 0.8px;
}

.border-light-custom {
  border-color: #f1f5f9 !important;
}

.bg-light-custom {
  background-color: #f8fafc !important;
}

.icon-card-box {
  width: 48px;
  height: 48px;
}

/* Pricing Grid view card design */
.package-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  border: 1px solid #f1f5f9;
}

.package-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05) !important;
  border-color: #e2e8f0;
}

.popular-card {
  border: 2px solid #ff4d4f !important;
}

/* Popular badge diagonal ribbon */
.popular-ribbon {
  position: absolute;
  top: 15px;
  right: -30px;
  background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
  color: white;
  text-align: center;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 4px 30px;
  transform: rotate(45deg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
  z-index: 1;
}

.status-switch {
  width: 2.8em;
  height: 1.4em;
  background-color: #cbd5e1;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><circle cx='4' cy='4' r='3' fill='white'/></svg>");
  background-repeat: no-repeat;
  background-position: left center;
  border: none;
}

.status-switch:checked {
  background-color: #10b981;
  background-position: right center;
}

.btn-action-card {
  font-size: 0.8rem;
  border-width: 1.5px;
}

/* Table Style custom design */
.custom-table {
  border-collapse: separate;
  border-spacing: 0 8px;
}

.custom-table thead th {
  font-weight: 600;
  color: #64748b;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #f1f5f9;
  padding: 12px;
}

.custom-table tbody tr {
  background-color: #ffffff;
  transition: all 0.2s ease;
}

.custom-table tbody td {
  padding: 14px 12px;
  border-bottom: 1px solid #f1f5f9;
}

.hover-row:hover {
  background-color: #f8fafc !important;
}

.btn-icon-action {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.btn-icon-action:hover {
  transform: scale(1.1);
}

/* Toggle View button styling */
.btn-toggle-view {
  font-size: 0.8rem;
  font-weight: 600;
  border: none;
  box-shadow: none;
}

/* Custom modal styling (Clean overlay style) */
.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1050;
}

.modal-dialog-custom {
  width: 100%;
  max-width: 600px;
  margin: 20px;
  z-index: 1051;
}

.btn-close-custom {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-close-custom:hover {
  background-color: #e2e8f0 !important;
  color: #0f172a !important;
}

/* Custom toast styles */
.toast-custom {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1090;
  min-width: 300px;
  max-width: 400px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
  animation: slideInRight 0.3s ease-out;
}

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.cursor-pointer {
  cursor: pointer;
}
.fs-7 {
  font-size: 0.8rem;
}
.text-xs {
  font-size: 0.75rem;
}
</style>
