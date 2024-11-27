<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router';
import { useAuthStore } from './stores/useAuthStore';

const isMobileMenuOpen = ref(false)
const authStore = useAuthStore()

const profilLink = computed(() => {
  return authStore.userLogged != null ? "/profil" : "/login"
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="container">
      <RouterLink to="/pokemons" class="logo" @click="closeMobileMenu">
        <img alt="Pokemon logo" src="@/assets/pokemon_logo.png" />
      </RouterLink>

      <nav class="desktop-nav">
        <RouterLink to="/pokemons" class="nav-link">Pokemons</RouterLink>
        <RouterLink to="/favorites" class="nav-link">Favorites</RouterLink>
        <RouterLink :to="profilLink" class="nav-link">Profile</RouterLink>
      </nav>

      <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Toggle mobile menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <nav class="mobile-nav" :class="{ 'is-active': isMobileMenuOpen }">
      <RouterLink to="/pokemons" class="nav-link" @click="closeMobileMenu">Pokemons</RouterLink>
      <RouterLink to="/favorites" class="nav-link" @click="closeMobileMenu">Favorites</RouterLink>
      <RouterLink :to="profilLink" class="nav-link" @click="closeMobileMenu">Profile</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.header {
  background-color: var(--color-background);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 120px;
  height: 60px;
  object-fit: contain;
}

.desktop-nav {
  display: none;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover, .nav-link.router-link-active {
  color: var(--color-primary);
  background-color: rgba(238, 21, 21, 0.1);
}

.mobile-menu-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.mobile-menu-btn span {
  width: 2rem;
  height: 0.25rem;
  background: var(--color-primary);
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
}

.mobile-nav.is-active {
  transform: translateY(0);
}

.mobile-nav .nav-link {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.mobile-nav .nav-link:last-child {
  border-bottom: none;
}

@media (min-width: 768px) {
  .container {
    padding: 0.5rem 2rem;
  }

  .desktop-nav {
    display: flex;
    gap: 1rem;
  }

  .mobile-menu-btn {
    display: none;
  }

  .mobile-nav {
    display: none;
  }

  .logo img {
    width: 160px;
    height: 80px;
  }
}
</style> 
