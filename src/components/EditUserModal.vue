<template>
  <div class="modal-backdrop fade show"></div>
  <div class="modal d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">Edit User</h5>
          <button type="button" class="btn-close" @click="$emit('update:show', false)"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input v-model="localUser.name" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="localUser.email" type="email" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">City</label>
            <input v-model="localUser.city" type="text" class="form-control" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="$emit('update:show', false)">Cancel</button>
          <button class="btn btn-primary" @click="save">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditUserModal',
  props: {
    show: Boolean,
    user: Object
  },
  data() {
    return {
      localUser: { ...this.user }
    };
  },
  watch: {
    user(newVal) {
      this.localUser = { ...newVal };
    }
  },
  methods: {
    save() {
      this.$emit('save', { ...this.localUser });
      this.$emit('update:show', false);
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  z-index: 1040;
}
.modal {
  z-index: 1050;
}
.modal-content {
  border-radius: 12px;
}
</style>
