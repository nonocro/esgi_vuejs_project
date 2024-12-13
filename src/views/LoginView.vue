<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/useAuthStore";
import { ref, onMounted, onUnmounted } from "vue";

const authStore = useAuthStore()

const showRegister = ref(false);
const loginUsername = ref("");
const loginPassword = ref("");
const registerName = ref("");
const registerEmail = ref("");
const registerPassword = ref("");

const registerErrors = ref({ email: "" });
const isMobile = ref(window.innerWidth < 768);

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

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="auth-container">
    <div class="auth-form" :class="{ 'show-register': showRegister }">
      <!-- Sign In Form -->
      <div class="form-container sign-in">
        <h2>Welcome Back, Trainer!</h2>
        <p>Sign in to your Pokémon account</p>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="login-username">Username</label>
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
        <h2>Join the Pokémon World</h2>
        <p>Create your trainer account</p>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="register-name">Username</label>
            <input
              id="register-name"
              v-model="registerName"
              type="text"
              required
              placeholder="Choose your trainer name"
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
            <h2>Welcome Back, Trainer!</h2>
            <p>Ready to continue your Pokémon journey?</p>
            <button class="ghost-btn" @click="toggleRegister(false)">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h2>New Trainer?</h2>
            <p>Join the world of Pokémon today!</p>
            <button class="ghost-btn" @click="toggleRegister(true)">Sign Up</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Toggle -->
    <div v-if="isMobile" class="mobile-toggle">
      <button @click="toggleRegister(!showRegister)" class="ghost-btn">
        {{ showRegister ? 'Switch to Sign In' : 'Switch to Sign Up' }}
      </button>
    </div>
  </div>
</template>

<style scoped>

.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 1rem;
}

.auth-form {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 768px;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  padding: 2rem;
}

.sign-in {
  left: 0;
  width: 50%;
  z-index: 2;
  opacity: 1;
}

.sign-up {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.auth-form.show-register .sign-in {
  transform: translateX(100%);
  opacity: 0;
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
  background: linear-gradient(to right, var(--color-red-pokemon), var(--color-orange-pokemon));
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #fff;
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
  color: var(--color-red-pokemon);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.overlay-panel h2 {
  color: #fff;
}

p {
  color: var(--color-text);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.overlay-panel p {
  color: #fff;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-red-pokemon);
  font-size: 0.875rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid var(--color-yellow-pokemon);
  border-radius: 4px;
  background-color: #fff;
  color: var(--color-red-pokemon);
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: var(--color-red-pokemon);
  box-shadow: 0 0 0 2px rgba(237, 28, 36, 0.1);
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
  background-color: var(--color-red-pokemon);
  color: white;
  width: 100%;
}

.submit-btn:hover {
  background-color: var(--color-orange-pokemon);
}

.ghost-btn {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.ghost-btn:hover {
  background-color: #fff;
  color: var(--color-red-pokemon);
}

.mobile-toggle {
  margin-top: 1rem;
  text-align: center;
}

.mobile-toggle .ghost-btn {
  border-color: var(--color-red-pokemon);
  color: var(--color-red-pokemon);
}

.mobile-toggle .ghost-btn:hover {
  background-color: var(--color-red-pokemon);
  color: #fff;
}

.error {
  color: var(--color-red-pokemon);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

@media (max-width: 767px) {
  .auth-container{
    margin-top: 50px;
  }

  .auth-form {
    min-height: auto;
  }

  .form-container {
    position: relative;
    width: 100%;
    height: auto;
    transition: opacity 0.5s ease-in-out;
  }

  .sign-in, .sign-up {
    left: 0;
    width: 100%;
  }

  .sign-up {
    display: none;
  }

  .auth-form.show-register .sign-in {
    display: none;
  }

  .auth-form.show-register .sign-up {
    display: block;
    transform: none;
  }

  .overlay-container {
    display: none;
  }
}

@media (min-width: 768px) {
  .mobile-toggle {
    display: none;
  }
}
</style>
