<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/useAuthStore";
import { ref } from "vue";

const authStore = useAuthStore()

const showRegister = ref(false);
const loginUsername = ref("");
const loginPassword = ref("");
const registerName = ref("");
const registerEmail = ref("");
const registerPassword = ref("");

// Error state for validation

const registerErrors = ref({ email: "" });

const toggleRegister = (status: boolean) => {
  showRegister.value = status;
};

const validateEmail = () => {
  const email = registerEmail.value;
  const errors = registerErrors;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  errors.value.email = emailRegex.test(email) ? "" : "Invalid email address";
};

const handleLogin = async () => {
  try{
    await authStore.login(loginUsername.value, loginPassword.value)
    router.push("/pokemons")
  }catch(error){
    console.error(error)
  }
};

const handleRegister = () => {
  if (!registerErrors.value.email)
    authStore.register(registerName.value, registerEmail.value, registerPassword.value)

  router.push("/pokemons")
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-form" :class="{ 'show-register': showRegister }">
      <!-- Sign In Form -->
      <div class="form-container sign-in">
        <h2>Welcome Back</h2>
        <p>Please sign in to your account</p>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="login-username">Usename</label>
            <input
              id="login-username"
              v-model="loginUsername"
              type="text"
              required
              placeholder="Enter your username"
            />
          </div>
          <div class="form-group">
            <label for="login-password">Password</label>
            <input
              id="login-password"
              v-model="loginPassword"
              type="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" class="submit-btn">Sign in</button>
        </form>
      </div>

      <!-- Sign Up Form -->
      <div class="form-container sign-up">
        <h2>Create Account</h2>
        <p>Sign up for a new account</p>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="register-name">Username</label>
            <input
              id="register-name"
              v-model="registerName"
              type="text"
              required
              placeholder="Enter your username"
            />
          </div>
          <div class="form-group">
            <label for="register-email">Email address</label>
            <input
              id="register-email"
              v-model="registerEmail"
              type="email"
              required
              placeholder="Enter your email"
              @input="validateEmail"
            />
            <small v-if="registerErrors.email" class="error">{{ registerErrors.email }}</small>
          </div>
          <div class="form-group">
            <label for="register-password">Password</label>
            <input
              id="register-password"
              v-model="registerPassword"
              type="password"
              required
              placeholder="Create a password"
            />
          </div>
          <button type="submit" class="submit-btn">Sign up</button>
        </form>
      </div>

      <!-- Overlay Container -->
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h2>Welcome Back!</h2>
            <p>Already have an account? Sign in here</p>
            <button class="ghost-btn" @click="toggleRegister(false)">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h2>Hello, Friend!</h2>
            <p>Don't have an account? Sign up here</p>
            <button class="ghost-btn" @click="toggleRegister(true)">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-background);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.auth-form {
  background-color: var(--color-surface);
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in {
  left: 0;
  width: 50%;
  z-index: 2;
  opacity: 1;
  transition: transform 0.6s ease-in-out, opacity 0.5s ease-in-out;
}

.auth-form.show-register .sign-in {
  transform: translateX(100%);
  opacity: 0;
}

.sign-up {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  transition: transform 0.6s ease-in-out, opacity 0.5s ease-in-out;
}

.auth-form.show-register .sign-up {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.auth-form.show-register .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: var(--color-surface);
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.auth-form.show-register .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.auth-form.show-register .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.auth-form.show-register .overlay-right {
  transform: translateX(20%);
}

h2 {
  color: var(--color-text);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

p {
  color: var(--color-text);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text);
  font-size: 0.875rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid var(--color-input-border);
  border-radius: 4px;
  background-color: var(--color-surface);
  color: var(--color-text);
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.submit-btn, .ghost-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn {
  background-color: var(--color-primary);
  color: white;
  width: 100%;
}

.submit-btn:hover {
  background-color: var(--color-primary-dark);
}

.ghost-btn {
  background-color: transparent;
  border: 1px solid var(--color-surface);
  color: var(--color-surface);
}

.ghost-btn:hover {
  background-color: var(--color-surface);
  color: var(--color-primary);
}

.form-container {
  padding: 2rem;
}

@media (max-width: 768px) {
  .auth-form {
    min-height: 650px;
  }

  .form-container, .overlay-container {
    width: 100%;
    height: 50%;
    left: 0;
  }

  .sign-in, .sign-up, .overlay {
    width: 100%;
    height: 100%;
  }

  .sign-up, .overlay-container {
    top: 50%;
  }

  .auth-form.show-register .sign-in {
    transform: translateY(-100%);
  }

  .auth-form.show-register .sign-up {
    transform: translateY(-100%);
  }

  .auth-form.show-register .overlay-container {
    transform: translateY(-100%);
  }

  .overlay {
    left: 0;
    height: 200%;
  }

  .auth-form.show-register .overlay {
    transform: translateY(-50%);
  }

  .overlay-panel {
    width: 100%;
    height: 50%;
  }

  .overlay-right {
    bottom: 0;
    top: auto;
  }
}
</style>

