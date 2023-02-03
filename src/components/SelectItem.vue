<template>
  <el-select :value="value" @input="update" filterable placeholder="Select">
    <el-option
      v-for="item in items"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    props: {
      value: Object,
      items: {
        type: Array,
        default: () => ["kjsd", 'sdklfjdls']
      }
    },
    methods: {
      update(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
</script>