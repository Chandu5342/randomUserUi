<template>
  <div class="user-table-container">
   
    <table class="styled-table w-100">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.uuid">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.city }}</td>
          <td class="actions">
            <button @click="$emit('edit', user)" class="btn-edit">Edit</button>
            <button @click="$emit('delete', user.uuid)" class="btn-delete">Delete</button>
          </td>
        </tr>

        <tr v-if="!users || users.length === 0">
          <td colspan="4" class="text-center text-muted py-3">
            No users found.
          </td>
        </tr>
      </tbody>
    </table>

   
    <div class="pagination">
      <button
        class="btn-nav"
        :disabled="currentPage === 1"
        @click="$emit('page-changed', currentPage - 1)"
      >
         Prev
      </button>

      <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>

      <button
        class="btn-nav"
        :disabled="currentPage === totalPages"
        @click="$emit('page-changed', currentPage + 1)"
      >
        Next 
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserTable",
  props: ["users", "totalUsers", "perPage", "currentPage"],
  computed: {
    totalPages() {
      return Math.ceil(this.totalUsers / this.perPage) || 1;
    },
  },
};
</script>

<style scoped>
.user-table-container {
  margin-top: 10px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.08);
  overflow: hidden;
}


.styled-table {
  border-collapse: collapse;
  width: 100%;
  font-size: 15px;
}

.styled-table thead tr {
  background: linear-gradient(90deg, #007bff, #00c4ff);
  color: white;
  text-align: left;
  font-weight: bold;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #f1f1f1;
}

.styled-table tbody tr {
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.styled-table tbody tr:hover {
  background-color: #f5f9ff;
  transform: scale(1.005);
}


.actions button {
  margin-right: 8px;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit {
  background: linear-gradient(90deg, #0d6efd, #00aaff);
  color: white;
}
.btn-edit:hover {
  transform: scale(1.05);
  background: linear-gradient(90deg, #0070e0, #00bbff);
}

.btn-delete {
  background: linear-gradient(90deg, #dc3545, #ff6b81);
  color: white;
}
.btn-delete:hover {
  transform: scale(1.05);
  background: linear-gradient(90deg, #c82333, #ff5166);
}


.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-top: 1px solid #eee;
}

.page-info {
  margin: 0 15px;
  font-weight: 500;
}

.btn-nav {
  border: none;
  padding: 6px 14px;
  border-radius: 20px;
  background: linear-gradient(90deg, #007bff, #00c4ff);
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-nav:hover {
  transform: scale(1.05);
}
.btn-nav:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
