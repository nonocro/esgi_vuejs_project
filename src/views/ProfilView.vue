<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, type User } from '@/stores/useAuthStore'

const authStore = useAuthStore()
const router = useRouter()

const currentUser = computed(() => authStore.userLogged)
const editedUser = ref<User | null>(null)
const isEditing = ref(false)
const password = ref("")

onMounted(() => {
  if (!currentUser.value) {
    router.push('/login')
  } else {
    editedUser.value = { ...currentUser.value }
  }
})

const startEditing = () => {
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
  editedUser.value = { ...currentUser.value! }
}

const saveChanges = async () => {
  if (editedUser.value) {
    await authStore.updateUser(authStore.userLogged?.username ?? "", editedUser.value.username, editedUser.value.email, password.value, authStore.userLogged?.role == 'admin')
    isEditing.value = false
  }
}

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}

const requestAnonymization = async () => {
  if (confirm('Are you sure you want to anonymize your account? For the purpose of the connection, we must keep your username.')) {
    await authStore.requestAnonymization(authStore.userLogged?.username ?? "")
  }
}
</script>

<template>
  <div v-if="currentUser" class="profile-container">
    <div class="profile-card">
      <div class="profile-header">
        <img src="@/assets/pokemon_trainer.png" alt="Trainer Avatar" class="trainer-avatar" />
        <h1>Trainer Profile</h1>
      </div>
      <div v-if="!isEditing" class="profile-info">
        <p><strong>Trainer Name:</strong> {{ currentUser.username }}</p>
        <p><strong>Poké Mail:</strong> {{ currentUser.email }}</p>
        <button @click="startEditing" class="edit-btn">Edit Trainer Info</button>
      </div>
      <form v-else @submit.prevent="saveChanges" class="edit-form">
        <div class="form-group">
          <label for="username">Trainer Name:</label>
          <input id="username" v-model="editedUser!.username" required />
        </div>
        <div class="form-group">
          <label for="email">Poké Mail:</label>
          <input id="email" v-model="editedUser!.email" type="email" required />
        </div>
        <div class="form-group">
          <label for="password">New Secret Code (leave blank to keep current):</label>
          <input id="password" v-model="password" type="password" />
        </div>
        <div class="button-group">
          <button type="submit" class="save-btn">Save Changes</button>
          <button type="button" @click="cancelEditing" class="cancel-btn">Cancel</button>
        </div>
      </form>
      <div class="action-buttons">
        <button @click="logout" class="logout-btn">Logout</button>
        <button @click="requestAnonymization" class="anonymize-btn">Request Trainer Privacy</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 2rem;
}

.profile-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.trainer-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--color-red-pokemon);
  margin-bottom: 1rem;
}

h1 {
  color: var(--color-red-pokemon);
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.profile-info p {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: var(--color-blue-pokemon);
}

.edit-form {
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-blue-pokemon);
  font-size: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid var(--color-yellow-pokemon);
  border-radius: 4px;
  font-size: 1rem;
  color: var(--color-blue-pokemon);
}

input:focus {
  outline: none;
  border-color: var(--color-red-pokemon);
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.edit-btn, .save-btn {
  background-color: var(--color-red-pokemon);
  color: white;
}

.edit-btn:hover, .save-btn:hover {
  background-color: var(--color-orange-pokemon);
}

.cancel-btn {
  background-color: var(--color-blue-pokemon);
  color: white;
}

.cancel-btn:hover {
  background-color: #2A3A99;
}

.action-buttons {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.logout-btn {
  background-color: var(--color-orange-pokemon);
  color: white;
}

.logout-btn:hover {
  background-color: #D97D16;
}

.anonymize-btn {
  background-color: var(--color-blue-pokemon);
  color: white;
}

.anonymize-btn:hover {
  background-color: #2A3A99;
}

@media (max-width: 600px) {
  .profile-card {
    padding: 1rem;
  }

  .button-group {
    flex-direction: column;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
