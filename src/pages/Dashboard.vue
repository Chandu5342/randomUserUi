<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="fw-bold text-primary">👤 User Dashboard</h2>
      <button @click="fetchAndInsertUsers" class="btn btn-success shadow-sm">
        <i class="bi bi-download"></i> Fetch & Insert Users
      </button>
    </div>

    <div class="input-group mb-4">
      <span class="input-group-text bg-primary text-white">
        <i class="bi bi-search"></i>
      </span>
      <input
        type="text"
        v-model="search"
        placeholder="Search by Name, Email, City"
        @input="debouncedSearch"
        class="form-control"
      />
    </div>

   
    <div class="card shadow-sm border-0">
      <div class="card-body p-0">
        <UserTable
          :users="users"
          :total-users="totalUsers"
          :per-page="perPage"
          :current-page="currentPage"
          @edit="openEditModal"
          @delete="deleteUser"
          @page-changed="fetchUsers"
        />
      </div>
    </div>

  
    <EditUserModal
      v-if="showModal"
      v-model:show="showModal"
      :user="editingUser"
      @save="saveUser"
    />
  </div>
</template>

<script>
import { fetchUsers as fetchUsersAPI, fetchAndInsertUsers as fetchInsertAPI, updateUser, deleteUser } from '../api/users.js';
import UserTable from '../components/UserTable.vue';
import EditUserModal from '../components/EditUserModal.vue';
import _ from 'lodash';

export default {
  name: 'UserDashboard',
  components: { UserTable, EditUserModal },
  data() {
    return {
      users: [],
      totalUsers: 0,
      perPage: 25,
      currentPage: 1,
      search: '',
      showModal: false,
      editingUser: {}
    };
  },
  methods: {
    async fetchUsers(page = 1) {
      try {
        const res = await fetchUsersAPI(page, this.perPage, this.search);
        this.users = res.data.data;
        this.totalUsers = res.data.total;
        this.currentPage = page;
      } catch (err) {
        console.error(err);
      }
    },
    async fetchAndInsertUsers() {
      if (confirm('Fetch users from API and insert into DB?')) {
        try {
          const res = await fetchInsertAPI();
          alert(`${res.data.count} users inserted`);
          this.fetchUsers(1);
        } catch (err) {
          console.error(err);
        }
      }
    },
    openEditModal(user) {
      this.editingUser = { ...user };
      this.showModal = true;
    },
    async saveUser(updatedUser) {
      try {
        await updateUser(updatedUser.uuid, updatedUser);
        this.showModal = false;
        this.fetchUsers(this.currentPage);
        alert('User updated successfully!');
      } catch (err) {
        console.error(err);
        alert('Error updating user');
      }
    },
    async deleteUser(uuid) {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await deleteUser(uuid);
          this.fetchUsers(this.users.length === 1 && this.currentPage > 1 ? this.currentPage - 1 : this.currentPage);
          alert(' User deleted successfully!');
        } catch (err) {
          console.error(err);
          alert(' Error deleting user');
        }
      }
    },
    debouncedSearch: _.debounce(function() {
      this.fetchUsers(1);
    }, 500)
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
}

.card {
  border-radius: 10px;
  overflow: hidden;
}

input.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn {
  transition: 0.2s;
}

.btn:hover {
  transform: scale(1.03);
}
</style>
