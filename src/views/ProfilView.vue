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
    await authStore.updateUser(authStore.userLogged?.username ?? "" ,editedUser.value.username, editedUser.value.email, password.value, authStore.userLogged?.role == 'admin')
    isEditing.value = false
  }
}

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}

const requestAnonymization = async () => {
  if (confirm('Are you sure you want to anonymize your account? For the purpose of the connexion we must keep your username.'))
    await authStore.requestAnonymization(authStore.userLogged?.username ?? "")
}
</script>

<template>
  <div v-if="currentUser" class="profile-container">
    <h1>User Profile</h1>
    <div v-if="!isEditing" class="profile-info">
      <p><strong>Username:</strong> {{ currentUser.username }}</p>
      <p><strong>Email:</strong> {{ currentUser.email }}</p>
      <button @click="startEditing" class="edit-btn">Edit Profile</button>
    </div>
    <form v-else @submit.prevent="saveChanges" class="edit-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input id="username" v-model="editedUser!.username" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" v-model="editedUser!.email" type="email" required />
      </div>
      <div class="form-group">
        <label for="password">New Password (leave blank to keep current):</label>
        <input id="password" v-model="password" type="password" />
      </div>
      <div class="button-group">
        <button type="submit" class="save-btn">Save Changes</button>
        <button type="button" @click="cancelEditing" class="cancel-btn">Cancel</button>
      </div>
    </form>
    <div class="action-buttons">
      <button @click="logout" class="logout-btn">Logout</button>
      <button @click="requestAnonymization" class="anonymize-btn">Request Anonymization</button>
    </div>
  </div>
</template>

<style scoped>

.profile-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--color-surface);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.profile-info p {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
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
  color: var(--color-text);
  font-size: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.edit-btn, .save-btn {
  background-color: var(--color-primary);
  color: white;
}

.edit-btn:hover, .save-btn:hover {
  background-color: #3A7BC8;
}

.cancel-btn {
  background-color: var(--color-text-light);
  color: white;
}

.cancel-btn:hover {
  background-color: #999999;
}

.action-buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}

.logout-btn {
  background-color: var(--color-error);
  color: white;
}

.logout-btn:hover {
  background-color: #FF7875;
}

.anonymize-btn {
  background-color: var(--color-text-light);
  color: white;
}

.anonymize-btn:hover {
  background-color: #999999;
}
</style>
