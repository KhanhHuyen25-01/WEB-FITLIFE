<template>
  <div class="meal-planner-container" style="padding-top: 55px;">
    <!-- Meal Planner Header -->
    <div class="card border-0 shadow-sm rounded-4 bg-white overflow-hidden mb-4">
      <div class="p-4 bg-light-gradient d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div class="d-flex align-items-center gap-3">
          <button class="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;" @click="$router.push('/client')">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h4 class="fw-bold text-dark mb-0">Thực Đơn Ăn Uống & Dinh Dưỡng</h4>
            <p class="text-secondary mb-0" style="font-size: 0.85rem;">Quản lý chế độ ăn uống, lượng calo hấp thụ và dinh dưỡng mỗi ngày</p>
          </div>
        </div>
        
        <!-- Target Calorie Info Badge -->
        <div class="d-flex align-items-center gap-2 bg-info-subtle text-info px-4 py-2 rounded-pill fw-bold" style="font-size: 0.9rem;">
          <i class="fa-solid fa-apple-whole"></i>
          <span>Mục tiêu ngày: 2,000 kcal</span>
        </div>
      </div>
    </div>

    <!-- Daily Target Progress Bars -->
    <div class="row g-3 mb-4">
      <div v-for="macro in dailyMacros" :key="macro.name" class="col-md-3 col-6">
        <div class="card border-0 shadow-sm rounded-4 p-3.5 bg-white text-center">
          <span class="text-uppercase text-secondary fw-bold" style="font-size: 0.7rem; letter-spacing: 0.05em;">{{ macro.name }}</span>
          <h3 class="fw-extrabold text-dark my-1.5">{{ macro.current }} / {{ macro.target }}</h3>
          <div class="progress rounded-pill" style="height: 5px; background-color: #f1f5f9;">
            <div class="progress-bar rounded-pill" :class="macro.barClass" role="progressbar" :style="'width: ' + (macro.current / macro.target * 100) + '%'"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Weekly Selector -->
    <div class="card border-0 shadow-sm rounded-4 bg-white p-3 mb-4">
      <div class="row row-cols-7 text-center g-2">
        <div v-for="day in weekDays" :key="day.id" class="col cursor-pointer" @click="activeDayId = day.id">
          <div class="rounded-pill py-2.5 fw-bold" :class="activeDayId === day.id ? 'bg-info text-white shadow-sm' : 'bg-light text-secondary border'">
            {{ day.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- Main Meal Content -->
    <div class="row g-4">
      <!-- Left side: Meal Breakdown -->
      <div class="col-lg-8">
        <div class="d-flex flex-column gap-3">
          <div v-for="meal in activeMeals" :key="meal.name" class="card border-0 shadow-sm rounded-4 p-4 bg-white meal-card">
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <div class="d-flex align-items-center gap-3">
                <div class="bg-info-subtle text-info rounded-circle d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; font-size: 1.2rem;">
                  <i :class="meal.icon"></i>
                </div>
                <div>
                  <h5 class="fw-extrabold text-dark mb-0.5">{{ meal.name }}</h5>
                  <span class="text-secondary" style="font-size: 0.8rem;">Thời gian đề xuất: {{ meal.time }}</span>
                </div>
              </div>
              <span class="badge bg-light text-dark border rounded-pill px-3 py-1.5 fw-bold text-muted">{{ meal.calories }} kcal</span>
            </div>

            <!-- Foods list -->
            <div class="d-flex flex-column gap-2 mb-3">
              <div v-for="food in meal.foods" :key="food.name" class="d-flex justify-content-between align-items-center py-1.5 px-2 rounded hover-food">
                <span class="text-dark fw-bold" style="font-size: 0.9rem;">{{ food.name }} <span class="text-secondary fw-normal">({{ food.weight }})</span></span>
                <span class="text-secondary" style="font-size: 0.85rem;">{{ food.calories }} kcal</span>
              </div>
            </div>

            <!-- Macro summaries for this meal -->
            <div class="d-flex flex-wrap gap-3 bg-light p-3 rounded-4" style="font-size: 0.8rem;">
              <span class="text-secondary"><strong class="text-dark">Protein:</strong> {{ meal.protein }}g</span>
              <span class="text-secondary"><strong class="text-dark">Carbs:</strong> {{ meal.carbs }}g</span>
              <span class="text-secondary"><strong class="text-dark">Chất béo:</strong> {{ meal.fat }}g</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side: General diet checklist and guidance -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top h-100" style="top: 85px;">
          <h5 class="fw-bold text-dark mb-3 border-bottom pb-2">Khuyến Nghị Dinh Dưỡng</h5>
          <div class="d-flex flex-column gap-3 mb-4">
            <div v-for="tip in nutritionTips" :key="tip.id" class="d-flex align-items-start gap-3 p-2 rounded-3 hover-nutrition">
              <i class="fa-solid fa-circle-check text-info mt-1" style="font-size: 1.05rem;"></i>
              <div>
                <h6 class="fw-bold text-dark mb-0.5" style="font-size: 0.85rem;">{{ tip.title }}</h6>
                <p class="text-secondary mb-0" style="font-size: 0.8rem; line-height: 1.3;">{{ tip.desc }}</p>
              </div>
            </div>
          </div>

          <h5 class="fw-bold text-dark mb-3 border-bottom pb-2">Nước Uống & Hydrat hóa</h5>
          <div class="p-3 bg-light-gradient rounded-4 text-center">
            <i class="fa-solid fa-glass-water text-info display-6 mb-2"></i>
            <h5 class="fw-extrabold text-dark mb-1">1.8 Lít / 3.2 Lít</h5>
            <div class="progress rounded-pill mb-2" style="height: 6px; background-color: #e2e8f0;">
              <div class="progress-bar rounded-pill bg-info" role="progressbar" style="width: 56%;"></div>
            </div>
            <button class="btn btn-sm btn-info text-white rounded-pill px-4 fw-bold mt-2 shadow-sm" style="background-color: #06b6d4; border-color: #06b6d4;">
              <i class="fa-solid fa-plus me-1.5"></i> Thêm 250ml Nước
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MealPlanner",
  data() {
    return {
      activeDayId: 1,
      weekDays: [
        { id: 1, name: "Thứ 2" },
        { id: 2, name: "Thứ 3" },
        { id: 3, name: "Thứ 4" },
        { id: 4, name: "Thứ 5" },
        { id: 5, name: "Thứ 6" },
        { id: 6, name: "Thứ 7" },
        { id: 7, name: "Chủ Nhật" }
      ],
      dailyMacros: [
        { name: "Lượng Calo", current: 1450, target: 2000, barClass: "bg-info" },
        { name: "Protein", current: 95, target: 130, barClass: "bg-primary" },
        { name: "Carbs", current: 175, target: 220, barClass: "bg-success" },
        { name: "Chất béo", current: 48, target: 65, barClass: "bg-warning" }
      ],
      mealsData: {
        1: [
          {
            name: "Bữa Sáng",
            time: "07:30 - 08:00 AM",
            icon: "fa-solid fa-egg",
            calories: 450,
            protein: 28,
            carbs: 45,
            fat: 12,
            foods: [
              { name: "Yến mạch nấu sữa tươi không đường", weight: "80g", calories: 280 },
              { name: "Trứng gà luộc chín", weight: "2 quả", calories: 140 },
              { name: "Chuối chín ngọt", weight: "1 quả", calories: 30 }
            ]
          },
          {
            name: "Bữa Trưa",
            time: "12:00 - 12:30 PM",
            icon: "fa-solid fa-bowl-rice",
            calories: 620,
            protein: 45,
            carbs: 80,
            fat: 15,
            foods: [
              { name: "Ức gà áp chảo sốt mật ong", weight: "150g", calories: 245 },
              { name: "Cơm gạo lứt dẻo", weight: "150g", calories: 215 },
              { name: "Bông cải xanh luộc", weight: "100g", calories: 60 },
              { name: "Dầu ô liu xào", weight: "10ml", calories: 100 }
            ]
          },
          {
            name: "Bữa Xế (Sau Tập)",
            time: "04:00 - 04:30 PM",
            icon: "fa-solid fa-mug-hot",
            calories: 380,
            protein: 22,
            carbs: 50,
            fat: 21,
            foods: [
              { name: "Sinh tố chuối & bột Whey protein", weight: "1 ly lớn", calories: 280 },
              { name: "Hạnh nhân thô ăn nhẹ", weight: "20g", calories: 100 }
            ]
          }
        ]
      },
      nutritionTips: [
        {
          id: 1,
          title: "Uống đủ nước trong và sau tập",
          desc: "Nước giúp đẩy nhanh quá trình trao đổi chất, giảm đau cơ và tối ưu hiệu suất tập luyện."
        },
        {
          id: 2,
          title: "Ưu tiên đạm chất lượng cao",
          desc: "Bổ sung ức gà, cá thu, trứng và đạm whey để kích thích phục hồi cơ bắp tốt nhất."
        },
        {
          id: 3,
          title: "Hạn chế đồ ăn chế biến sẵn",
          desc: "Tránh các thức ăn chiên nhiều dầu mỡ và đồ ngọt để giữ cơ thể săn chắc, tránh tích tụ mỡ thừa."
        }
      ]
    };
  },
  computed: {
    activeMeals() {
      // Return meals for active day or default to Monday if not filled
      return this.mealsData[this.activeDayId] || this.mealsData[1];
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
.meal-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #f1f5f9;
}
.meal-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08) !important;
}
.hover-food {
  transition: background-color 0.2s ease;
}
.hover-food:hover {
  background-color: #f8fafc;
}
.hover-nutrition {
  transition: background-color 0.2s ease;
}
.hover-nutrition:hover {
  background-color: #f8fafc;
}
.switcher-btn {
  font-size: 0.85rem;
}
.btn-info {
  background-color: #06b6d4;
  border-color: #06b6d4;
}
.text-info {
  color: #06b6d4 !important;
}
.bg-info-subtle {
  background-color: rgba(6, 182, 212, 0.1) !important;
}
</style>
