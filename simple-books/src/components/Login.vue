<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card shadow-lg p-4" style="max-width: 500px; width: 100%">
      <h2 class="text-center mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <div class="input-group">
            <input
              :type="passwordVisible ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              class="form-control"
              placeholder="Enter your password"
              required
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="togglePassword"
            >
              <i :class="passwordVisible ? 'bi-eye-slash' : 'bi-eye'"></i>
            </button>
          </div>
        </div>
        <button type="submit" class="btn btn-primary w-100 mb-3">Login</button>
        <button
          type="button"
          class="btn btn-link w-100 text-center"
          style="text-decoration: none;"
          @click="$router.push('/signup')"
        >
          Don't have an account? Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../api/api";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      passwordVisible: false,
      toast:useToast(),
    };
  },
  methods: {
    togglePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
    async handleLogin() {
      try {
        const response = await api.post("/auth/login", this.form);
        const token = response.data.token;
        localStorage.setItem("token", token);
        this.toast.success('Login Successful')
        this.$router.push("/dashboard");
      } catch (error) {
        this.toast.error('Failed to login');
      }
    },
  },
};
</script>
