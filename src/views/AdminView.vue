<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore, type User } from '@/stores/useAuthStore'

const authStore = useAuthStore()
const users = computed(() => authStore.users)

const newUser = ref<User>({ username: '', email: '', password: '', role: '' })
const editingUser = ref<User | null>(null)

const addUser = () => {
}

const startEdit = (user: User) => {
  editingUser.value = { ...user }
}

const saveEdit = () => {
  if (editingUser.value) {
    editingUser.value = null
  }
}

const cancelEdit = () => {
  editingUser.value = null
}

const deleteUser = (username: string) => {
  if (confirm(`Are you sure you want to delete user ${username}?`)) {
    authStore.deleteUser(username)
  }
}
</script>

<template>
  <div class="user-management">
    <h2>User Management</h2>

    <!-- Add new user form -->
    <form @submit.prevent="addUser" class="user-form">
      <input v-model="newUser.username" placeholder="Username" required />
      <input v-model="newUser.email" type="email" placeholder="Email" required />
      <input v-model="newUser.password" type="password" placeholder="Password" required />
      <button type="submit">Add User</button>
    </form>

    <!-- User list -->
    <ul class="user-list">
      <li v-for="user in users" :key="user.username" class="user-item">
        <template v-if="editingUser?.username === user.username">
          <input v-model="editingUser.username" placeholder="Username" required />
          <input v-model="editingUser.email" type="email" placeholder="Email" required />
          <div class="user-actions">
            <button @click="saveEdit" class="save">Save</button>
            <button @click="cancelEdit" class="cancel">Cancel</button>
          </div>
        </template>
        <template v-else>
          <div class="user-info">
            <strong>{{ user.username }}</strong>
            <span>{{ user.email }}</span>
          </div>
          <div class="user-actions">
            <button @click="startEdit(user)" class="edit">Edit</button>
            <button @click="deleteUser(user.username)" class="delete">Delete</button>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.user-management {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--color-surface);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.user-form {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

input {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button[type="submit"] {
  background-color: var(--color-primary);
  color: white;
}

button[type="submit"]:hover {
  background-color: #3A7BC8;
}

.user-list {
  list-style-type: none;
  padding: 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.user-item:last-child {
  border-bottom: none;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-info strong {
  font-size: 1.1rem;
  color: var(--color-text);
}

.user-info span {
  font-size: 0.9rem;
  color: var(--color-text-light);
}

.user-actions {
  display: flex;
  gap: 0.5rem;
}

.edit {
  background-color: var(--color-secondary);
  color: white;
}

.edit:hover {
  background-color: #3ECFB2;
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
  .user-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-actions {
    margin-top: 1rem;
  }
}
</style>
