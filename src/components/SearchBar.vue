<template>
  <v-text-field
    v-model="searchValue"
    :placeholder="placeholder"
    prepend-inner-icon="mdi-magnify"
    @input="onInput"
    outlined
    dense
    class="mb-3"
  />
</template>

<script>
import _ from 'lodash';

export default {
  name: 'SearchBar',
  props: ['value', 'placeholder'],
  data() {
    return { searchValue: this.value || '' };
  },
  mounted() {
    this.debouncedInput = _.debounce(() => {
      this.$emit('input', this.searchValue);
    }, 500);
  },
  methods: {
    onInput() {
      this.debouncedInput();
    }
  },
  watch: {
    value(newVal) {
      this.searchValue = newVal;
    }
  }
};
</script>
