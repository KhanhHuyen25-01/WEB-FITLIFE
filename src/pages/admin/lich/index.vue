<template>
  <div class="lich-management-container">
    <!-- Welcome Header Section -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
      <div>
        <h2 class="fw-bold text-dark mb-1">Quản Lý Lịch Tập & Lịch Dạy 📅</h2>
        <p class="text-secondary mb-0">Hệ thống phê duyệt đổi lịch, đăng ký lịch làm việc của Huấn luyện viên và quản lý lớp học nhóm.</p>
      </div>
      
      <!-- Quick Info Badges -->
      <div class="d-flex gap-2 mt-3 mt-md-0">
        <span class="badge bg-warning-subtle text-warning border border-warning rounded-pill px-3 py-2 d-flex align-items-center gap-1.5 fw-semibold" style="font-size: 0.8rem;">
          <i class="fa-solid fa-clock-rotate-left"></i>
          <span>{{ pendingRequestsCount }} Yêu cầu chờ duyệt</span>
        </span>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="card border-0 shadow-sm rounded-4 p-2 bg-white mb-4">
      <ul class="nav nav-pills nav-fill gap-2">
        <li class="nav-item">
          <button class="nav-link py-2.5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2" :class="activeTab === 'timeline' ? 'active-tab' : 'text-secondary-link'" @click="activeTab = 'timeline'">
            <i class="fa-regular fa-clock"></i>
            <span>Lịch Trình Hằng Ngày</span>
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link py-2.5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2" :class="activeTab === 'requests' ? 'active-tab' : 'text-secondary-link'" @click="activeTab = 'requests'">
            <i class="fa-solid fa-code-pull-request"></i>
            <span>Duyệt Đổi Lịch</span>
            <span v-if="pendingRequestsCount > 0" class="badge bg-danger rounded-circle ms-1 px-1.5 py-0.5" style="font-size: 0.65rem;">{{ pendingRequestsCount }}</span>
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link py-2.5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2" :class="activeTab === 'crud' ? 'active-tab' : 'text-secondary-link'" @click="activeTab = 'crud'">
            <i class="fa-solid fa-calendar-check"></i>
            <span>Đăng Ký & Thiết Lập PT</span>
          </button>
        </li>
      </ul>
    </div>

    <!-- TAB 1: TIMELINE (DAILY SCHEDULE) -->
    <div v-if="activeTab === 'timeline'" class="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3 mb-4">
        <div>
          <h5 class="fw-bold text-dark mb-0">Lịch Hoạt Động Phòng Tập</h5>
          <small class="text-secondary">Theo dõi danh sách các lớp học nhóm đang diễn ra hôm nay. Bấm vào chỉ số **chỗ trống** để xem chi tiết học viên.</small>
        </div>
        <div class="d-flex flex-wrap gap-2">
          <select class="form-select border-light-custom" v-model="roomFilter" style="width: 160px;">
            <option value="all">Tất cả phòng</option>
            <option value="Phòng Tập A">Phòng Tập A</option>
            <option value="Phòng Tập B">Phòng Tập B</option>
            <option value="Studio Yoga">Studio Yoga</option>
          </select>
          <select class="form-select border-light-custom" v-model="typeFilter" style="width: 160px;">
            <option value="all">Tất cả loại lớp</option>
            <option value="HIIT">HIIT</option>
            <option value="Yoga">Yoga</option>
            <option value="Tăng Cơ">Tăng Cơ</option>
            <option value="Zumba">Zumba</option>
          </select>
        </div>
      </div>

      <!-- Timeline List (Hours 7h - 21h) -->
      <div class="d-flex flex-column gap-3">
        <div v-for="slot in hourlySchedule" :key="slot.time" class="time-row d-flex flex-column flex-md-row gap-4 p-3 rounded-4 align-items-start align-items-md-center" :class="slot.classInfo ? 'has-class border-start-custom' : 'no-class'">
          
          <div class="time-label fw-bold text-primary fs-5" style="width: 80px; min-width: 80px;">
            {{ slot.time }}
          </div>

          <div class="flex-grow-1 w-100">
            <!-- If slot has a class -->
            <div v-if="slot.classInfo" class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
              <div>
                <h6 class="mb-1 text-dark fw-bold" style="font-size: 1rem;">{{ slot.classInfo.name }}</h6>
                <div class="d-flex flex-wrap gap-x-3 gap-y-1 align-items-center text-secondary" style="font-size: 0.8rem;">
                  <span class="me-2"><i class="fa-solid fa-user-ninja me-1.5 opacity-70"></i>PT: {{ slot.classInfo.trainer }}</span>
                  <span class="me-2"><i class="fa-solid fa-location-dot me-1.5 opacity-70"></i>{{ slot.classInfo.room }}</span>
                </div>
              </div>
              <div class="d-flex align-items-center gap-3 mt-2 mt-md-0">
                <span class="badge rounded-pill px-3 py-1.5 fw-bold" :class="slot.classInfo.badgeClass" style="font-size: 0.7rem;">
                  {{ slot.classInfo.type }}
                </span>
                <!-- Interactive Booked Indicator -->
                <span class="badge bg-light text-dark border rounded-pill px-3 py-1.5 fw-bold booking-clickable d-flex align-items-center gap-1.5" style="font-size: 0.8rem; cursor: pointer;" @click="openClassDetails(slot.classInfo)">
                  <i class="fa-solid fa-user-check text-primary"></i>
                  <span>{{ slot.classInfo.booked }}/{{ slot.classInfo.capacity }} chỗ</span>
                </span>
              </div>
            </div>

            <!-- If slot is empty -->
            <div v-else class="text-muted d-flex justify-content-between align-items-center py-1">
              <span style="font-size: 0.85rem; font-style: italic;"><i class="fa-regular fa-calendar-plus me-2"></i>Khung giờ trống — Không có lịch hoạt động</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: REQUESTS APPROVAL (DUYỆT ĐỔI LỊCH) -->
    <div v-if="activeTab === 'requests'" class="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 class="fw-bold text-dark mb-0">Yêu Cầu Thay Đổi Lịch Tập</h5>
          <small class="text-secondary">Sử dụng nút gạt ON/OFF để duyệt hoặc hủy duyệt các yêu cầu đổi ca.</small>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table align-middle custom-table">
          <thead>
            <tr>
              <th scope="col">Người Gửi</th>
              <th scope="col">Vai Trò</th>
              <th scope="col">Lịch Cũ / Ca Cũ</th>
              <th scope="col">Lịch Mới Đề Xuất</th>
              <th scope="col">Lý Do</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col" class="text-end" style="width: 100px;">Duyệt</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="req in changeRequests" :key="req.id" class="hover-row">
              <td>
                <div class="d-flex align-items-center gap-3">
                  <div class="avatar-circle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" :class="req.avatarColor">
                    {{ req.initials }}
                  </div>
                  <div>
                    <h6 class="mb-0 text-dark fw-bold" style="font-size: 0.9rem;">{{ req.name }}</h6>
                    <small class="text-secondary">{{ req.phone }}</small>
                  </div>
                </div>
              </td>
              <td>
                <span class="badge rounded-pill px-2.5 py-1 fw-bold" :class="req.role === 'Trainer' ? 'bg-primary-subtle text-primary border border-primary' : 'bg-info-subtle text-info border border-info'" style="font-size: 0.75rem;">
                  {{ req.role === 'Trainer' ? 'HLV (PT)' : 'Hội Viên' }}
                </span>
              </td>
              <td>
                <div style="font-size: 0.85rem;">
                  <div class="fw-semibold text-dark">{{ req.oldClass }}</div>
                  <div class="text-secondary"><i class="fa-regular fa-clock me-1"></i>{{ req.oldTime }}</div>
                </div>
              </td>
              <td>
                <div style="font-size: 0.85rem;">
                  <div class="fw-semibold text-primary">{{ req.newClass }}</div>
                  <div class="text-secondary"><i class="fa-regular fa-clock me-1 text-primary"></i>{{ req.newTime }}</div>
                </div>
              </td>
              <td>
                <span class="text-secondary" style="font-size: 0.85rem; max-width: 150px; display: inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" :title="req.reason">
                  {{ req.reason }}
                </span>
              </td>
              <td>
                <span class="badge rounded-pill px-2.5 py-1.5 fw-bold" :class="getStatusClass(req.status)" style="font-size: 0.75rem;">
                  {{ getStatusText(req.status) }}
                </span>
              </td>
              <td class="text-end">
                <!-- Custom iOS-style ON/OFF Toggle Switch for Approval -->
                <label class="switch-toggle">
                  <input type="checkbox" :checked="req.status === 'approved'" @change="toggleRequestStatus(req)" />
                  <span class="slider-toggle">
                    <span class="toggle-text text-on">ON</span>
                    <span class="toggle-text text-off">OFF</span>
                  </span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- TAB 3: REGISTER & CRUD TRAINERS SHIFTS -->
    <div v-if="activeTab === 'crud'" class="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h5 class="fw-bold text-dark mb-0">Đăng Ký Ca Trực & Quản Lý PT</h5>
          <small class="text-secondary">Thiết lập thời gian đứng lớp, ca trực hỗ trợ và đăng ký lịch trống của Huấn luyện viên.</small>
        </div>
        <button class="btn btn-primary rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm" @click="openAddModal">
          <i class="fa-solid fa-plus"></i>
          <span class="fw-semibold">Đăng Ký Ca PT Mới</span>
        </button>
      </div>

      <div class="table-responsive">
        <table class="table align-middle custom-table">
          <thead>
            <tr>
              <th scope="col">Huấn Luyện Viên</th>
              <th scope="col">Chuyên Môn</th>
              <th scope="col">Thời Gian Khai Báo</th>
              <th scope="col">Phòng Tập / Vị Trí</th>
              <th scope="col">Vai Trò Ca Dạy</th>
              <th scope="col" class="text-end">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pt in trainerShifts" :key="pt.id" class="hover-row">
              <td>
                <div class="d-flex align-items-center gap-3">
                  <div class="avatar-circle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" :class="pt.avatarColor">
                    {{ pt.initials }}
                  </div>
                  <div>
                    <h6 class="mb-0 text-dark fw-bold" style="font-size: 0.9rem;">{{ pt.name }}</h6>
                    <small class="text-secondary">{{ pt.phone }}</small>
                  </div>
                </div>
              </td>
              <td>
                <span class="fw-medium text-dark" style="font-size: 0.85rem;">{{ pt.specialty }}</span>
              </td>
              <td>
                <div style="font-size: 0.85rem;">
                  <div class="fw-semibold text-dark">{{ pt.time }}</div>
                  <div class="text-secondary"><i class="fa-regular fa-calendar me-1"></i>Hằng ngày</div>
                </div>
              </td>
              <td>
                <span class="text-secondary" style="font-size: 0.85rem;">{{ pt.room }}</span>
              </td>
              <td>
                <span class="badge rounded-pill px-2.5 py-1.5 fw-bold" :class="pt.type === 'Lớp Nhóm' ? 'bg-primary-subtle text-primary border border-primary' : 'bg-success-subtle text-success border border-success'" style="font-size: 0.7rem;">
                  {{ pt.type }}
                </span>
              </td>
              <td class="text-end">
                <div class="d-flex justify-content-end gap-1.5">
                  <button class="btn btn-sm btn-light border rounded-circle d-flex align-items-center justify-content-center p-0" style="width: 32px; height: 32px;" @click="openEditModal(pt)">
                    <i class="fa-solid fa-pen-to-square text-secondary"></i>
                  </button>
                  <button class="btn btn-sm btn-light border text-danger rounded-circle d-flex align-items-center justify-content-center p-0" style="width: 32px; height: 32px;" @click="deleteShift(pt.id)">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL 1: REGISTERED TRAINEES DETAILS AND LEAVE APPROVAL -->
    <div v-if="showClassDetailsModal" class="modal-overlay d-flex align-items-center justify-content-center">
      <div class="card border-0 shadow rounded-4 p-4 modal-box bg-white" style="width: 650px; max-width: 95%;">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 class="fw-bold text-dark mb-0">Học Viên Đăng Ký Lớp</h5>
            <small class="text-primary fw-semibold">{{ selectedClass.name }} - HLV {{ selectedClass.trainer }} ({{ selectedClass.time }})</small>
          </div>
          <button class="btn-close" @click="showClassDetailsModal = false"></button>
        </div>
        
        <div class="table-responsive my-3" style="max-height: 350px;">
          <table class="table align-middle custom-table">
            <thead>
              <tr>
                <th scope="col">Học Viên</th>
                <th scope="col">SĐT</th>
                <th scope="col">Lý Do Xin Nghỉ</th>
                <th scope="col">Trạng Thái</th>
                <th scope="col" class="text-end" style="width: 100px;">Duyệt Nghỉ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in selectedClass.students" :key="student.id" class="hover-row">
                <td>
                  <span class="fw-bold text-dark" style="font-size: 0.85rem;">{{ student.name }}</span>
                </td>
                <td>
                  <span class="text-secondary" style="font-size: 0.85rem;">{{ student.phone }}</span>
                </td>
                <td>
                  <span v-if="student.leaveReason" class="text-danger-emphasis bg-danger-subtle rounded px-2 py-1 d-inline-block" style="font-size: 0.8rem; max-width: 180px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" :title="student.leaveReason">
                    {{ student.leaveReason }}
                  </span>
                  <span v-else class="text-muted" style="font-size: 0.8rem; font-style: italic;">Không có</span>
                </td>
                <td>
                  <span class="badge rounded-pill px-2.5 py-1 fw-bold" :class="getStudentStatusClass(student.status)" style="font-size: 0.7rem;">
                    {{ getStudentStatusText(student.status) }}
                  </span>
                </td>
                <td class="text-end">
                  <!-- Toggle Switch for Student Leave Approval -->
                  <label class="switch-toggle" v-if="student.leaveReason">
                    <input type="checkbox" :checked="student.status === 'leave_approved'" @change="toggleStudentLeave(student)" />
                    <span class="slider-toggle">
                      <span class="toggle-text text-on">ON</span>
                      <span class="toggle-text text-off">OFF</span>
                    </span>
                  </label>
                  <span v-else class="text-muted" style="font-size: 0.75rem;">N/A</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-end mt-3">
          <button type="button" class="btn btn-light rounded-pill px-4" @click="showClassDetailsModal = false">Đóng</button>
        </div>
      </div>
    </div>

    <!-- MODAL 2: ADD / EDIT TRAINER SHIFT -->
    <div v-if="showModal" class="modal-overlay d-flex align-items-center justify-content-center">
      <div class="card border-0 shadow rounded-4 p-4 modal-box bg-white" style="width: 500px; max-width: 90%;">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="fw-bold text-dark mb-0">{{ isEditMode ? 'Chỉnh Sửa Ca PT' : 'Đăng Ký Ca PT Mới' }}</h5>
          <button class="btn-close" @click="showModal = false"></button>
        </div>
        <form @submit.prevent="submitShiftForm">
          <div class="mb-3">
            <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Huấn Luyện Viên</label>
            <select class="form-select" v-model="shiftForm.name" required>
              <option value="Marcus Webb">Marcus Webb</option>
              <option value="Priya Sharma">Priya Sharma</option>
              <option value="Dustin Myers">Dustin Myers</option>
              <option value="Sarah Jenkins">Sarah Jenkins</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Khung Giờ</label>
            <select class="form-select" v-model="shiftForm.time" required>
              <option v-for="t in hoursList" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-6">
              <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Khu vực trực</label>
              <select class="form-select" v-model="shiftForm.room">
                <option value="Phòng Tập A">Phòng Tập A</option>
                <option value="Phòng Tập B">Phòng Tập B</option>
                <option value="Khu Cardio">Khu Cardio</option>
                <option value="Studio Yoga">Studio Yoga</option>
              </select>
            </div>
            <div class="col-6">
              <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Vai Trò Ca Dạy</label>
              <select class="form-select" v-model="shiftForm.type">
                <option value="Lớp Nhóm">Lớp Nhóm</option>
                <option value="Huấn Luyện 1-1">Huấn Luyện 1-1</option>
              </select>
            </div>
          </div>
          <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="button" class="btn btn-light rounded-pill px-3" @click="showModal = false">Hủy</button>
            <button type="submit" class="btn btn-primary rounded-pill px-4">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LichHoatDong",
  data() {
    return {
      activeTab: "requests", // Defaults to approving schedule request tab
      roomFilter: "all",
      typeFilter: "all",
      showModal: false,
      showClassDetailsModal: false,
      selectedClass: null,
      isEditMode: false,
      editId: null,
      shiftForm: {
        name: "Marcus Webb",
        time: "07:00",
        room: "Phòng Tập A",
        type: "Lớp Nhóm"
      },
      hoursList: [
        "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", 
        "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", 
        "19:00", "20:00", "21:00"
      ],
      // Tab 1 Data: Schedules Timeline & registered students
      schedules: [
        {
          id: 1,
          time: "08:00",
          name: "HIIT Đốt Mỡ Buổi Sáng",
          trainer: "Marcus Webb",
          room: "Phòng Tập A",
          type: "HIIT",
          badgeClass: "bg-primary-subtle text-primary border border-primary",
          booked: 18,
          capacity: 20,
          students: [
            { id: 201, name: "Nguyễn Văn Hùng", phone: "0909 321 654", status: "attending", leaveReason: "" },
            { id: 202, name: "Lê Hoàng Yến", phone: "0912 345 678", status: "leave_pending", leaveReason: "Bị ốm đột xuất, có giấy xin nghỉ của bác sĩ" },
            { id: 203, name: "Phạm Quốc Bảo", phone: "0934 567 890", status: "attending", leaveReason: "" },
            { id: 204, name: "Trần Minh Quân", phone: "0901 234 567", status: "leave_approved", leaveReason: "Đi công tác xa không kịp về tập" },
            { id: 205, name: "Đặng Tiến Dũng", phone: "0989 123 456", status: "attending", leaveReason: "" }
          ]
        },
        {
          id: 2,
          time: "09:00",
          name: "Yoga Dòng Chảy & Luyện Thở",
          trainer: "Priya Sharma",
          room: "Phòng Tập B",
          type: "Yoga",
          badgeClass: "bg-success-subtle text-success border border-success",
          booked: 12,
          capacity: 15,
          students: [
            { id: 206, name: "Nguyễn Hương Giang", phone: "0978 888 999", status: "attending", leaveReason: "" },
            { id: 207, name: "Lâm Nhã Phương", phone: "0988 555 444", status: "leave_pending", leaveReason: "Bận đi thi học kỳ ở trường Đại học" }
          ]
        },
        {
          id: 3,
          time: "11:00",
          name: "Tập Lực & Thể Lực Chuyên Sâu",
          trainer: "Dustin Myers",
          room: "Phòng Tập A",
          type: "Tăng Cơ",
          badgeClass: "bg-warning-subtle text-warning border border-warning",
          booked: 15,
          capacity: 15,
          students: [
            { id: 208, name: "Phạm Hồng Sơn", phone: "0932 111 000", status: "attending", leaveReason: "" }
          ]
        },
        {
          id: 4,
          time: "15:00",
          name: "Zumba Sôi Động Cuối Ngày",
          trainer: "Sarah Jenkins",
          room: "Phòng Tập B",
          type: "Zumba",
          badgeClass: "bg-info-subtle text-info border border-info",
          booked: 8,
          capacity: 25,
          students: []
        }
      ],
      // Tab 2 Data: Change requests (Members and Trainers)
      changeRequests: [
        {
          id: 1,
          name: "Nguyễn Văn Hùng",
          phone: "0909 321 654",
          role: "Member",
          oldClass: "Yoga Trị Liệu",
          oldTime: "Thứ 3 - 08:00",
          newClass: "Yoga Trị Liệu",
          newTime: "Thứ 5 - 18:00",
          reason: "Trùng lịch họp công ty đột xuất",
          status: "pending",
          initials: "VH",
          avatarColor: "bg-info"
        },
        {
          id: 2,
          name: "Priya Sharma",
          phone: "0912 777 333",
          role: "Trainer",
          oldClass: "Lớp Yoga Cơ Bản",
          oldTime: "Thứ Tư - 09:00",
          newClass: "Lớp Yoga Cơ Bản (HLV Marcus thay thế)",
          newTime: "Thứ Tư - 09:00",
          reason: "Có lịch công tác ngoài thành phố",
          status: "approved",
          initials: "PS",
          avatarColor: "bg-primary"
        },
        {
          id: 3,
          name: "Trần Minh Quân",
          phone: "0901 234 567",
          role: "Member",
          oldClass: "Lớp HIIT Đốt Mỡ",
          oldTime: "Thứ Bảy - 08:00",
          newClass: "Lớp HIIT Đốt Mỡ",
          newTime: "Thứ Bảy - 15:00",
          reason: "Bận việc gia đình buổi sáng",
          status: "pending",
          initials: "MQ",
          avatarColor: "bg-success"
        }
      ],
      // Tab 3 Data: Registered Trainer Shifts
      trainerShifts: [
        {
          id: 1,
          name: "Marcus Webb",
          phone: "0901 888 222",
          specialty: "HIIT / Võ thuật",
          time: "08:00",
          room: "Phòng Tập A",
          type: "Lớp Nhóm",
          initials: "MW",
          avatarColor: "bg-primary"
        },
        {
          id: 2,
          name: "Priya Sharma",
          phone: "0912 777 333",
          specialty: "Yoga / Thiền",
          time: "09:00",
          room: "Phòng Tập B",
          type: "Lớp Nhóm",
          initials: "PS",
          avatarColor: "bg-info"
        }
      ]
    };
  },
  computed: {
    pendingRequestsCount() {
      return this.changeRequests.filter(r => r.status === 'pending').length;
    },
    hourlySchedule() {
      return this.hoursList.map(hour => {
        const classFound = this.schedules.find(s => {
          const sHour = s.time.split(":")[0];
          const hHour = hour.split(":")[0];
          const matchRoom = this.roomFilter === "all" || s.room === this.roomFilter;
          const matchType = this.typeFilter === "all" || s.type === this.typeFilter;
          return sHour === hHour && matchRoom && matchType;
        });
        return {
          time: hour,
          classInfo: classFound || null
        };
      });
    }
  },
  methods: {
    // Open Class Members Details Modal
    openClassDetails(classInfo) {
      this.selectedClass = classInfo;
      this.showClassDetailsModal = true;
    },
    // Toggle Student Leave request
    toggleStudentLeave(student) {
      if (student.status === 'leave_approved') {
        student.status = 'leave_pending';
      } else {
        student.status = 'leave_approved';
      }
    },
    getStudentStatusText(status) {
      if (status === 'leave_approved') return 'Đã Cho Nghỉ';
      if (status === 'leave_pending') return 'Chờ Duyệt Nghỉ';
      return 'Đang Tham Gia';
    },
    getStudentStatusClass(status) {
      if (status === 'leave_approved') return 'bg-success-subtle text-success border border-success';
      if (status === 'leave_pending') return 'bg-warning-subtle text-warning border border-warning';
      return 'bg-primary-subtle text-primary border border-primary';
    },
    // Toggle change request status
    toggleRequestStatus(req) {
      if (req.status === 'approved') {
        req.status = 'pending';
      } else {
        req.status = 'approved';
      }
    },
    getStatusText(status) {
      if (status === 'approved') return 'Đã Duyệt';
      if (status === 'rejected') return 'Không Duyệt';
      return 'Chờ Duyệt';
    },
    getStatusClass(status) {
      if (status === 'approved') return 'bg-success-subtle text-success border border-success';
      if (status === 'rejected') return 'bg-danger-subtle text-danger border border-danger';
      return 'bg-warning-subtle text-warning border border-warning';
    },
    // CRUD Trainer Shifts Methods
    openAddModal() {
      this.isEditMode = false;
      this.shiftForm = {
        name: "Marcus Webb",
        time: "07:00",
        room: "Phòng Tập A",
        type: "Lớp Nhóm"
      };
      this.showModal = true;
    },
    openEditModal(pt) {
      this.isEditMode = true;
      this.editId = pt.id;
      this.shiftForm = {
        name: pt.name,
        time: pt.time,
        room: pt.room,
        type: pt.type
      };
      this.showModal = true;
    },
    submitShiftForm() {
      const ptPhoneMap = {
        "Marcus Webb": "0901 888 222",
        "Priya Sharma": "0912 777 333",
        "Dustin Myers": "0934 999 555",
        "Sarah Jenkins": "0978 111 444"
      };
      const ptSpecialtyMap = {
        "Marcus Webb": "HIIT / Võ thuật",
        "Priya Sharma": "Yoga / Thiền",
        "Dustin Myers": "Cardio / Thể lực",
        "Sarah Jenkins": "Pilates"
      };
      const initials = this.shiftForm.name.split(" ").map(w => w[0]).join("").toUpperCase().substring(0, 2);

      if (this.isEditMode) {
        const index = this.trainerShifts.findIndex(pt => pt.id === this.editId);
        if (index !== -1) {
          this.trainerShifts[index].name = this.shiftForm.name;
          this.trainerShifts[index].time = this.shiftForm.time;
          this.trainerShifts[index].room = this.shiftForm.room;
          this.trainerShifts[index].type = this.shiftForm.type;
          this.trainerShifts[index].phone = ptPhoneMap[this.shiftForm.name] || "0999 999 999";
          this.trainerShifts[index].specialty = ptSpecialtyMap[this.shiftForm.name] || "General Fitness";
          this.trainerShifts[index].initials = initials;
        }
      } else {
        const newShift = {
          id: this.trainerShifts.length + 1,
          name: this.shiftForm.name,
          phone: ptPhoneMap[this.shiftForm.name] || "0999 999 999",
          specialty: ptSpecialtyMap[this.shiftForm.name] || "General Fitness",
          time: this.shiftForm.time,
          room: this.shiftForm.room,
          type: this.shiftForm.type,
          initials: initials,
          avatarColor: "bg-primary"
        };
        this.trainerShifts.unshift(newShift);
      }
      this.showModal = false;
    },
    deleteShift(id) {
      if (confirm("Bạn có chắc chắn muốn xóa ca PT đăng ký này?")) {
        this.trainerShifts = this.trainerShifts.filter(pt => pt.id !== id);
      }
    }
  }
}
</script>

<style scoped>
.active-tab {
  background-color: #1e40af !important;
  color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.25);
}
.text-secondary-link {
  color: #64748b !important;
  background-color: transparent !important;
}
.text-secondary-link:hover {
  background-color: #f1f5f9 !important;
  color: #1e293b !important;
}
.booking-clickable {
  transition: all 0.2s ease;
}
.booking-clickable:hover {
  transform: translateY(-1px);
  background-color: #e2e8f0 !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}
.border-light-custom {
  border-color: #e2e8f0 !important;
}
.custom-table th {
  font-weight: 600;
  color: #475569;
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 12px;
}
.custom-table td {
  padding: 16px 8px;
  border-bottom: 1px solid #f8fafc;
}
.hover-row {
  transition: background-color 0.2s ease;
}
.hover-row:hover {
  background-color: #f8fafc;
}
.time-row {
  border: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  background-color: #ffffff;
}
.time-row.has-class {
  border-left-width: 4px;
}
.time-row.has-class.border-start-custom {
  border-left-color: #3b82f6 !important;
}
.time-row.no-class {
  background-color: #f8fafc;
  border-style: dashed;
}
.avatar-circle {
  width: 40px; 
  height: 40px; 
  font-size: 0.85rem;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 2000;
}
.modal-box {
  animation: slideUp 0.3s ease-out;
}
.fs-xs {
  font-size: 0.75rem;
}

/* CUSTOM IOS-STYLE ON/OFF TOGGLE SWITCH CSS */
.switch-toggle {
  position: relative;
  display: inline-block;
  width: 65px;
  height: 30px;
}
.switch-toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider-toggle {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: .3s;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
}
.slider-toggle:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
  z-index: 2;
}
.switch-toggle input:checked + .slider-toggle {
  background-color: #4ade80; /* Lime green like user's request image */
}
.switch-toggle input:checked + .slider-toggle:before {
  transform: translateX(35px);
}
.toggle-text {
  font-size: 0.65rem;
  font-weight: bold;
  color: white;
  user-select: none;
  z-index: 1;
}
.text-on {
  display: none;
  margin-left: 2px;
}
.text-off {
  display: block;
  margin-left: auto;
  color: #64748b;
}
.switch-toggle input:checked + .slider-toggle .text-on {
  display: block;
}
.switch-toggle input:checked + .slider-toggle .text-off {
  display: none;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
