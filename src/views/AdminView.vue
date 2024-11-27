<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore, type User } from '@/stores/useAuthStore'

const authStore = useAuthStore()
const users = computed(() => authStore.users)

const newUser = ref<User>({ username: '', email: '', password: '', role: '' })
const editingUser = ref<User | null>(null)
let editingUserOldUsername = ""

const addUser = () => {
  authStore.addUser(newUser.value.username, newUser.value.email, newUser.value.password, newUser.value.role)
  newUser.value = { username: '', email: '', password: '', role: '' }
}

const startEdit = (user: User) => {
  editingUser.value = { ...user }
  editingUserOldUsername = user.username
}

const saveEdit = () => {
  if (editingUser.value) {
    authStore.updateUser(editingUserOldUsername, editingUser.value.username, editingUser.value.email, "", editingUser.value.role == "admin")
    editingUser.value = null
  }
}

const cancelEdit = () => {
  editingUser.value = null
}

const deleteUser = (username: string) => {
  if (confirm(`Are you sure you want to release trainer ${username} from the Pokémon League?`)) {
    authStore.deleteUser(username)
  }
}
</script>

<template>
  <div class="admin-panel">
    <div class="panel-header">
      <img src="@/assets/pokemon_logo.png" alt="Pokémon Logo" class="pokemon-logo" />
      <h2>Pokémon Trainer Management</h2>
    </div>

    <!-- Add new trainer form -->
    <form @submit.prevent="addUser" class="trainer-form">
      <input v-model="newUser.username" placeholder="Trainer Username" required />
      <input v-model="newUser.email" type="email" placeholder="Poké Mail" required />
      <input v-model="newUser.password" type="password" placeholder="Secret Code" required />
      <select v-model="newUser.role" required>
        <option value="" disabled selected>Select Trainer Type</option>
        <option value="admin">Admin</option>
        <option value="user">Trainer</option>
      </select>
      <button type="submit">Register New Trainer</button>
    </form>

    <!-- Trainer list -->
    <ul class="trainer-list">
      <li v-for="user in users" :key="user.username" class="trainer-item">
        <template v-if="editingUser?.username === user.username">
          <input v-model="editingUser.username" placeholder="Trainer Name" required />
          <input v-model="editingUser.email" type="email" placeholder="Poké Mail" required />
          <div class="trainer-actions">
            <button @click="saveEdit" class="save">Save</button>
            <button @click="cancelEdit" class="cancel">Cancel</button>
          </div>
        </template>
        <template v-else>
          <div class="trainer-info">
            <strong>{{ user.username }}</strong>
            <span>{{ user.email }}</span>
            <span class="trainer-type">{{ user.role === 'admin' ? 'Admin' : 'Trainer' }}</span>
          </div>
          <div class="trainer-actions">
            <button @click="startEdit(user)" class="edit">Edit</button>
            <button @click="deleteUser(user.username)" class="delete">Delete</button>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<style scoped>
:root {
  --color-yellow-pokemon: #FFDC01;
  --color-red-pokemon: #ed1c24;
  --color-orange-pokemon: #F8931D;
  --color-blue-pokemon: #3B4CCA;
  --color-background: #F0F4F8;
  --color-surface: #FFFFFF;
  --color-text: #333333;
  --color-text-light: #666666;
  --color-border: #E0E0E0;
  --color-error: #FF4D4F;
  --color-success: #52C41A;
}

.admin-panel {
  max-width: 800px;
  margin: 2rem auto;
  margin-top: 150px;
  padding: 2rem;
  background-color: var(--color-surface);
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.panel-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.pokemon-logo {
  width: 100px;
  height: auto;
  margin-right: 1rem;
}

h2 {
  color: var(--color-red-pokemon);
  font-size: 1.8rem;
  margin: 0;
}

.trainer-form {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: var(--color-yellow-pokemon);
  padding: 1.5rem;
  border-radius: 8px;
}

input, select {
  padding: 0.75rem;
  border: 2px solid var(--color-orange-pokemon);
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
}

input:focus, select:focus {
  outline: none;
  border-color: var(--color-blue-pokemon);
}

button {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

button:active {
  transform: scale(0.98);
}

button[type="submit"] {
  background-color: var(--color-red-pokemon);
  color: white;
}

button[type="submit"]:hover {
  background-color: var(--color-orange-pokemon);
}

.trainer-list {
  list-style-type: none;
  padding: 0;
}

.trainer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 2px solid var(--color-yellow-pokemon);
  transition: background-color 0.3s ease;
}

.trainer-item:last-child {
  border-bottom: none;
}

.trainer-item:hover {
  background-color: #f9f9f9;
}

.trainer-info {
  display: flex;
  flex-direction: column;
}

.trainer-info strong {
  font-size: 1.1rem;
  color: var(--color-blue-pokemon);
}

.trainer-info span {
  font-size: 0.9rem;
  color: var(--color-text-light);
}

.trainer-type {
  font-size: 0.8rem;
  color: var(--color-orange-pokemon);
  font-weight: bold;
  text-transform: uppercase;
}

.trainer-actions {
  display: flex;
  gap: 0.5rem;
}

.edit {
  background-color: var(--color-blue-pokemon);
  color: white;
}

.edit:hover {
  background-color: #2A3A99;
}

.delete {
  background-color: var(--color-error);
  color: white;
}

.delete:hover {
  background-color: #FF7875;
}

.save {
  background-color: var(--color-success);
  color: white;
}

.save:hover {
  background-color: #73D13D;
}

.cancel {
  background-color: var(--color-text-light);
  color: white;
}

.cancel:hover {
  background-color: #999999;
}

@media (max-width: 600px) {
  .admin-panel {
    padding: 1rem;
  }

  .panel-header {
    flex-direction: column;
    text-align: center;
  }

  .pokemon-logo {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .trainer-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .trainer-actions {
    margin-top: 1rem;
  }

  .trainer-form {
    padding: 1rem;
  }
}
</style>
