<template>
  <div class="login-page-container d-flex align-items-center justify-content-center">
    <!-- Dark overlay mask -->
    <div class="dark-overlay"></div>

    <!-- Login card styled exactly like the mobile app screen -->
    <div class="login-mobile-frame d-flex flex-column justify-content-between p-4 p-md-5 text-white">
      <div>
        <!-- Welcome Header -->
        <div class="text-center mt-4 mb-5">
          <h1 class="welcome-title fw-bold text-white mb-2">Welcome Back!</h1>
          <p class="subtitle text-secondary-custom">Ready to crush your goals?</p>
        </div>

        <form @submit.prevent="DangNhap" class="d-flex flex-column gap-3">
          <!-- Username Input -->
          <div class="custom-input-group">
            <span class="input-icon">
              <i class="fa-solid fa-user"></i>
            </span>
            <input type="text" class="custom-input" placeholder="Username" required v-model="user.email" />
          </div>

          <!-- Password Input -->
          <div class="custom-input-group">
            <span class="input-icon">
              <i class="fa-solid fa-lock"></i>
            </span>
            <input :type="showPassword ? 'text' : 'password'" class="custom-input" placeholder="Password" required v-model="user.password" />
            <span class="eye-icon" @click="showPassword = !showPassword">
              <i :class="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
            </span>
          </div>

          <!-- Remember me & Forgot Password -->
          <div class="d-flex justify-content-between align-items-center mt-2 px-1">
            <label class="d-flex align-items-center gap-2 check-container text-secondary-custom" style="font-size: 0.85rem; cursor: pointer; user-select: none;">
              <input type="checkbox" class="custom-checkbox" v-model="user.remember" />
              <span>Remember me</span>
            </label>
            <a href="#" class="forgot-password-link text-decoration-none fw-semibold">Forgot Password?</a>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="alert alert-custom py-2 px-3 mt-2 text-center" style="font-size: 0.8rem;">
            <i class="fa-solid fa-circle-exclamation me-1.5"></i>
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Login Button -->
          <button type="submit" class="btn btn-login fw-bold text-uppercase w-100 py-3 mt-3 d-flex align-items-center justify-content-center gap-2">
            <span v-if="loading" class="spinner-border spinner-border-sm text-dark" role="status"></span>
            <span>LOGIN</span>
          </button>
        </form>

        <!-- Social Separator -->
        <div class="text-center my-4 text-secondary-custom font-medium" style="font-size: 0.8rem;">
          Or Continue With
        </div>

        <!-- Social Icons Row -->
        <div class="d-flex justify-content-center gap-3 mb-4">
          <button class="btn btn-social">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style="width: 20px; height: 20px;" />
          </button>
          <button class="btn btn-social text-white">
            <i class="fa-brands fa-apple fs-5"></i>
          </button>
          <button class="btn btn-social text-white">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" style="width: 20px; height: 20px;" />
          </button>
        </div>
      </div>

      <!-- Footer Account Link -->
      <div class="text-center mb-2" style="font-size: 0.85rem;">
        <span class="text-secondary-custom">Create An Account? </span>
        <a href="#" class="signup-link text-decoration-none fw-bold">Sign Up</a>
      </div>
    </div>
  </div>
</template>

<script>
import baseRequestAdmin from '../../../core/baseRequestAdmin';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            showPassword: false,
            loading: false,
            errorMessage: "",
        }
    },
    methods: {
        DangNhap() {
            baseRequestAdmin.post('admin/login', this.user)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message)
                        this.user = {};
                        localStorage.setItem('token_admin',res.data.token);
                        this.$router.push('/admin/dashboard');
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((err) => {
                    const listErr = err.response.data.errors;
                    Object.values(listErr).forEach((error) => {
                            toaster.error(error[0]);
                    });
                });
        }
    }
}
</script>
<style scoped>
.login-page-container {
  min-height: 100vh;
  width: 100vw;
  position: relative;
  background-image: url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1500");
  background-size: cover;
  background-position: center;
  font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif;
  overflow: hidden;
}
.dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(10px);
  z-index: 1;
}
.login-mobile-frame {
  width: 440px;
  max-width: 100%;
  min-height: 85vh;
  z-index: 2;
  background: rgba(25, 25, 27, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.4s ease-out;
}
.welcome-title {
  font-size: 2.1rem;
  letter-spacing: 0.5px;
}
.text-secondary-custom {
  color: #a1a1aa !important;
}
.custom-input-group {
  position: relative;
  width: 100%;
}
.custom-input {
  width: 100%;
  padding: 16px 20px 16px 50px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  color: #ffffff;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}
.custom-input:focus {
  border-color: rgba(154, 254, 3, 0.7);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 10px rgba(154, 254, 3, 0.15);
}
.input-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #a1a1aa;
  font-size: 1.1rem;
  pointer-events: none;
}
.eye-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #a1a1aa;
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.2s ease;
}
.eye-icon:hover {
  color: #ffffff;
}

/* Green accents matching the mobile app */
.forgot-password-link, .signup-link {
  color: #9afe03 !important;
  font-size: 0.85rem;
  transition: opacity 0.2s ease;
}
.forgot-password-link:hover, .signup-link:hover {
  opacity: 0.85;
}

.custom-checkbox {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #9afe03;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: transparent;
  transition: all 0.2s ease;
}
.custom-checkbox:checked {
  background-color: #9afe03;
}
.custom-checkbox:checked::after {
  content: "✓";
  color: #000000;
  font-size: 0.8rem;
  font-weight: bold;
}

.btn-login {
  background-color: #9afe03;
  color: #000000;
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  letter-spacing: 1px;
  transition: all 0.25s ease;
}
.btn-login:hover {
  background-color: #8be310;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(154, 254, 3, 0.35);
}

.btn-social {
  width: 70px;
  height: 50px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.btn-social:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.alert-custom {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #f87171;
  border-radius: 12px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 576px) {
  .login-mobile-frame {
    min-height: 100vh;
    border-radius: 0;
    border: none;
    background: rgba(0, 0, 0, 0.85);
  }
}
</style>
