<template>
  <div class="schedule-container" style="padding-top: 55px;">
    <div class="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
      <!-- Calendar Web Header -->
      <div class="p-4 border-bottom bg-light-gradient d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div class="d-flex align-items-center gap-3">
          <button class="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;" @click="$router.push('/client')">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h4 class="fw-bold text-dark mb-0">Lịch Tập Của Tôi</h4>
            <p class="text-secondary mb-0" style="font-size: 0.85rem;">Quản lý lịch hẹn tập luyện cá nhân và các lớp học</p>
          </div>
        </div>
        
        <!-- Date Type Switcher (Ngày, Tuần, Tháng) -->
        <div class="bg-light rounded-pill p-1 d-inline-flex align-items-center gap-1 shadow-inner-custom" style="background-color: #f1f5f9;">
          <button class="btn btn-sm rounded-pill px-4 py-1.5 border-0 fw-bold switcher-btn text-muted" :class="{ 'bg-white shadow-sm text-dark': viewType === 'day' }" @click="viewType = 'day'">Ngày</button>
          <button class="btn btn-sm rounded-pill px-5 py-1.5 border-0 fw-bold switcher-btn text-muted" :class="{ 'bg-white shadow-sm text-primary': viewType === 'week' }" @click="viewType = 'week'">Tuần</button>
          <button class="btn btn-sm rounded-pill px-4 py-1.5 border-0 fw-bold switcher-btn text-muted" :class="{ 'bg-white shadow-sm text-dark': viewType === 'month' }" @click="viewType = 'month'">Tháng</button>
        </div>
      </div>

      <!-- Weekly Horizontal Strip (T2 to CN) -->
      <div class="p-4 bg-white border-bottom shadow-sm">
        <div class="row row-cols-7 text-center g-2">
          <div v-for="day in weekDays" :key="day.date" class="col cursor-pointer" @click="activeDate = day.date">
            <div class="calendar-day-strip rounded-4 py-3 d-flex flex-column align-items-center justify-content-center position-relative" :class="{ 'active-day-box shadow-primary': activeDate === day.date, 'inactive-day-box': activeDate !== day.date }">
              <span class="text-uppercase mb-2 fw-bold tracking-wider" :class="activeDate === day.date ? 'text-white' : 'text-secondary'" style="font-size: 0.75rem;">{{ day.label }}</span>
              <span class="fw-extrabold display-6" :class="activeDate === day.date ? 'text-white' : 'text-dark'" style="font-size: 1.5rem; line-height: 1;">{{ day.date }}</span>
              <span v-if="day.hasEvent" class="dot-indicator" :class="activeDate === day.date ? 'bg-white' : 'bg-primary'"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Schedule Timeline Area -->
      <div class="schedule-timeline bg-light-gradient py-4 px-4 position-relative">
        <div class="timeline-wrapper position-relative mx-auto" style="max-width: 1200px;">
          <!-- Hour Rows -->
          <div v-for="hour in hours" :key="hour" class="timeline-row d-flex align-items-start position-relative" style="height: 95px;">
            <span class="hour-label text-secondary fw-semibold text-end pe-4" style="font-size: 0.9rem; width: 80px; margin-top: -10px;">{{ hour }}</span>
            <div class="hour-line flex-grow-1 border-top" style="border-color: #e2e8f0 !important; height: 1px; margin-top: 2px;"></div>
          </div>

          <!-- Events Blocks Absolute Overlay -->
          <div class="events-overlay position-absolute" style="left: 80px; right: 0; top: 0; bottom: 0;">
            <div v-for="event in filteredEvents" :key="event.id" class="event-card-item rounded-4 shadow-sm d-flex flex-column justify-content-between position-absolute cursor-pointer border-0" :class="event.theme" :style="getEventStyle(event)">
              <div class="card-content-top">
                <span class="text-white-80 text-uppercase fw-bold d-block card-tag-label" style="font-size: 0.65rem; letter-spacing: 0.05em; margin-bottom: 3px;">LỚP HỌC ĐÃ ĐĂNG KÝ</span>
                <h5 class="fw-bold text-white mb-0 text-truncate event-title-text" style="font-size: 0.95rem; line-height: 1.3;">{{ event.title }}</h5>
              </div>
              <div class="d-flex align-items-center justify-content-between card-content-bottom" style="margin-top: 6px;">
                <div class="d-inline-flex bg-white-20 rounded-pill px-2.5 py-0.5">
                  <i class="fa-regular fa-clock text-white me-1.5 mt-0.5" style="font-size: 0.7rem;"></i>
                  <span class="text-white fw-bold" style="font-size: 0.7rem;">{{ event.timeRange }}</span>
                </div>
                <span class="text-white-85" style="font-size: 0.75rem;">
                  <i class="fa-solid fa-location-dot me-1"></i>{{ event.room || 'Phòng Tập A' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientSchedule",
  data() {
    return {
      viewType: "week",
      activeDate: 23,
      weekDays: [
        { label: "Thứ 2", date: 22, hasEvent: true },
        { label: "Thứ 3", date: 23, hasEvent: true },
        { label: "Thứ 4", date: 24, hasEvent: true },
        { label: "Thứ 5", date: 25, hasEvent: false },
        { label: "Thứ 6", date: 26, hasEvent: false },
        { label: "Thứ 7", date: 27, hasEvent: false },
        { label: "Chủ Nhật", date: 28, hasEvent: false }
      ],
      hours: [
        "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", 
        "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", 
        "19:00", "20:00", "21:00"
      ],
      events: [
        {
          id: 1,
          date: 23,
          startHour: 8.0,
          duration: 1.0,
          title: "Dạy Private - Huấn luyện viên Marcus Webb",
          timeRange: "08:00 - 09:00",
          room: "Phòng Tập A",
          theme: "bg-success-gradient border-success-custom"
        },
        {
          id: 2,
          date: 23,
          startHour: 14.0,
          duration: 1.0,
          title: "Lớp Yoga Dòng Chảy & Luyện Thở Cơ Bản",
          timeRange: "14:00 - 15:00",
          room: "Phòng Tập B",
          theme: "bg-orange-gradient border-orange-custom"
        },
        {
          id: 3,
          date: 22,
          startHour: 9.0,
          duration: 1.5,
          title: "Tập Cardio Thể Lực Đốt Mỡ Buổi Sáng",
          timeRange: "09:00 - 10:30",
          room: "Khu Cardio",
          theme: "bg-blue-gradient border-blue-custom"
        },
        {
          id: 4,
          date: 24,
          startHour: 10.0,
          duration: 1.0,
          title: "Tập Lực Cơ Bản Kèm PT Marcus",
          timeRange: "10:00 - 11:00",
          room: "Khu Tạ Nặng",
          theme: "bg-purple-gradient border-purple-custom"
        }
      ]
    };
  },
  computed: {
    filteredEvents() {
      return this.events.filter(event => event.date === this.activeDate);
    }
  },
  methods: {
    getEventStyle(event) {
      // Each hour row in CSS has 95px height. The base start is at 7:00.
      const rowHeight = 95;
      const startOffset = 7.0; // Timeline starts at 7:00
      const top = (event.startHour - startOffset) * rowHeight;
      const height = event.duration * rowHeight - 6; // spacing
      return {
        top: `${top}px`,
        height: `${height}px`,
        width: '98%',
        left: '1%'
      };
    }
  }
}
</script>

<style scoped>
.bg-light-gradient {
  background-color: #f8fafc;
}
.bg-white-20 {
  background-color: rgba(255, 255, 255, 0.15);
}
.text-white-80 {
  color: rgba(255, 255, 255, 0.85);
}
.text-white-85 {
  color: rgba(255, 255, 255, 0.9);
}
.shadow-inner-custom {
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.03);
}
.calendar-day-strip {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  height: 85px;
  border: 1px solid #f1f5f9;
}
.inactive-day-box {
  background-color: #ffffff;
}
.inactive-day-box:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}
.active-day-box {
  background-color: #06b6d4 !important; /* Premium Cyan style matching Client Hub theme */
  color: white !important;
  border-color: #06b6d4 !important;
}
.shadow-primary {
  box-shadow: 0 10px 25px rgba(6, 182, 212, 0.4) !important;
}
.dot-indicator {
  position: absolute;
  bottom: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.schedule-timeline {
  background-color: #fafbfc;
}
.timeline-row::after {
  content: '';
  position: absolute;
  left: 80px;
  right: 0;
  bottom: 0;
  height: 1px;
}

/* Event Gradient Backgrounds matching picture style */
.bg-success-gradient {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
  color: white;
}
.bg-orange-gradient {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
  color: white;
}
.bg-blue-gradient {
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%) !important;
  color: white;
}
.bg-purple-gradient {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%) !important;
  color: white;
}

.event-card-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 14px !important;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  padding: 14px 16px !important;
}
.event-card-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}
.switcher-btn {
  font-size: 0.85rem;
}
</style>
