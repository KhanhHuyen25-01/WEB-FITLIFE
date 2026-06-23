<template>
  <div class="client-dashboard-container">
    <!-- Client Welcome Header Section -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
      <div>
        <h2 class="fw-bold text-dark mb-1">Xin chào, Priya! 👋</h2>
        <p class="text-secondary mb-0">Dưới đây là lộ trình thể hình và đề xuất hôm nay của bạn.</p>
      </div>
      <div class="d-flex gap-2 mt-3 mt-md-0">
        <button class="btn btn-outline-info rounded-pill px-4 py-2 d-flex align-items-center gap-2">
          <i class="fa-solid fa-utensils"></i>
          <span class="fw-semibold">Nhật Ký Ăn Uống</span>
        </button>
        <button class="btn btn-info text-white rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm" style="background-color: #0dcaf0; border-color: #0dcaf0;" @click="$router.push('/client/schedule')">
          <i class="fa-solid fa-calendar-plus"></i>
          <span class="fw-semibold">Đặt Lịch Tập</span>
        </button>
      </div>
    </div>

    <!-- Client Fitness Statistics Widgets -->
    <div class="row g-4 mb-4">
      <!-- Widget 1: Calories Burned -->
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-uppercase text-secondary fw-bold" style="font-size: 0.75rem; letter-spacing: 0.05em;">LƯỢNG CALO ĐÃ ĐỐT</span>
            <div class="bg-info-subtle text-info rounded-3 p-2">
              <i class="fa-solid fa-fire-flame-curved"></i>
            </div>
          </div>
          <h2 class="fw-bold text-dark mb-1">450 kcal</h2>
          <span class="text-info fw-medium" style="font-size: 0.8rem;">Mục tiêu: 600 kcal (Đạt 75%)</span>
        </div>
      </div>

      <!-- Widget 2: Weekly Classes -->
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-uppercase text-secondary fw-bold" style="font-size: 0.75rem; letter-spacing: 0.05em;">BUỔI TẬP ĐÃ THAM GIA</span>
            <div class="bg-info-subtle text-info rounded-3 p-2">
              <i class="fa-solid fa-child-reaching"></i>
            </div>
          </div>
          <h2 class="fw-bold text-dark mb-1">4 / 6</h2>
          <span class="text-secondary" style="font-size: 0.8rem;">Đúng tiến độ mục tiêu tuần này</span>
        </div>
      </div>

      <!-- Widget 3: Weight Target -->
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-uppercase text-secondary fw-bold" style="font-size: 0.75rem; letter-spacing: 0.05em;">MỤC TIÊU CÂN NẶNG</span>
            <div class="bg-info-subtle text-info rounded-3 p-2">
              <i class="fa-solid fa-weight-scale"></i>
            </div>
          </div>
          <h2 class="fw-bold text-dark mb-1">54.2 kg</h2>
          <span class="text-info fw-medium" style="font-size: 0.8rem;">
            <i class="fa-solid fa-circle-down me-1"></i> -1.8 kg trong tháng này
          </span>
        </div>
      </div>
    </div>

    <!-- Bottom Panels (Assigned Trainer, Current Workouts, Nutrition) -->
    <div class="row g-4">
      <!-- Exercise Planner list -->
      <div class="col-lg-7">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
          <h5 class="fw-bold text-dark mb-3">Kế Hoạch Tập Luyện Hôm Nay</h5>
          <div class="table-responsive">
            <table class="table table-borderless align-middle">
              <thead>
                <tr class="text-uppercase text-secondary" style="font-size: 0.75rem;">
                  <th>Tên Bài Tập</th>
                  <th>Hiệp & Lần</th>
                  <th>Mức Tạ</th>
                  <th>Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="exercise in workout" :key="exercise.id" class="border-bottom">
                  <td class="py-3">
                    <span class="fw-bold text-dark">{{ exercise.name }}</span>
                  </td>
                  <td>{{ exercise.sets }}</td>
                  <td>{{ exercise.weight }}</td>
                  <td>
                    <span class="badge rounded-pill" :class="exercise.status === 'Đã hoàn thành' ? 'bg-success-subtle text-success' : 'bg-light text-secondary'">
                      {{ exercise.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Personal Trainer and Nutrition Details -->
      <div class="col-lg-5">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
          <h5 class="fw-bold text-dark mb-3">PT Của Tôi</h5>
          <div class="d-flex align-items-center gap-3 p-3 rounded-4 mb-4" style="background-color: #f8fafc;">
            <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 48px; height: 48px;">
              MW
            </div>
            <div>
              <h6 class="mb-0.5 text-dark fw-bold">Marcus Webb</h6>
              <small class="text-secondary">Chuyên môn: Sức mạnh & HIIT</small>
            </div>
            <button class="btn btn-outline-info rounded-pill ms-auto btn-sm">Trò Chuyện</button>
          </div>

          <h5 class="fw-bold text-dark mb-3">Khuyến Nghị Dinh Dưỡng</h5>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center gap-2.5 p-2 rounded hover-nutrition">
              <i class="fa-solid fa-circle-check text-info"></i>
              <span class="text-secondary" style="font-size: 0.85rem;">Đạt tối thiểu 110g protein mỗi ngày</span>
            </div>
            <div class="d-flex align-items-center gap-2.5 p-2 rounded hover-nutrition">
              <i class="fa-solid fa-circle-check text-info"></i>
              <span class="text-secondary" style="font-size: 0.85rem;">Uống đủ 3.2 Lít nước mỗi ngày</span>
            </div>
            <div class="d-flex align-items-center gap-2.5 p-2 rounded hover-nutrition">
              <i class="fa-solid fa-circle-xmark text-muted"></i>
              <span class="text-secondary" style="font-size: 0.85rem;">Uống sinh tố Whey & Chuối sau tập</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientDashboard",
  data() {
    return {
      workout: [
        { id: 1, name: "Goblet Squats (Gánh tạ đùm)", sets: "4 Hiệp x 12 Lần", weight: "16 kg", status: "Đã hoàn thành" },
        { id: 2, name: "Romanian Deadlift (Đùi sau/Mông)", sets: "3 Hiệp x 10 Lần", weight: "30 kg", status: "Đã hoàn thành" },
        { id: 3, name: "Dumbbell Shoulder Press (Đẩy vai)", sets: "3 Hiệp x 12 Lần", weight: "8 kg", status: "Chờ tập" }
      ]
    };
  }
}
</script>

<style scoped>
.hover-nutrition {
  transition: background-color 0.2s ease;
}
.hover-nutrition:hover {
  background-color: #f8fafc;
}
</style>
