<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card shadow-lg p-4" style="max-width: 500px; width: 100%">
      <h2 class="text-center mb-4">Sign Up</h2>
      <form @submit.prevent="handleSignUp">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            class="form-control"
            placeholder="Enter your username"
            required
          />
        </div>
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
        <button type="submit" class="btn btn-primary w-100 mb-3">
          Sign Up
        </button>
        <button
          type="button"
          class="btn btn-link w-100 text-center"
          style="text-decoration: none"
          @click="$router.push('/')"
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../api/api";

export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
      passwordVisible:false,
    };
  },
  methods: {
    togglePassword(){
        this.passwordVisible = !this.passwordVisible;
    },
    async handleSignUp() {
      try {
        await api.post("/auth/register", this.form);
        alert("Registration Successful");
        this.$router.push("/");
      } catch (error) {
        alert("Sign-up failed. Please try again.");
      }
    },
  },
};
</script>
