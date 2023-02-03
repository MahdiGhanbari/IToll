<template>
  <el-input v-model="innerValue" @keydown.native="keydown" v-bind="elInputProps" />
</template>

<script>
import { thousandSeparator } from '@/utils/formats';

export default {
  props: {
    value: String,
    elInputProps: Object
  },
  data() {
    return {
      orginalStr: ''
    }
  },
  methods: {
    keydown(e) {
      const isBackspace = e.key == 'Backspace'
      const isNumber = /[0-9]/.test(e.key)

      if (!isNumber && !isBackspace) {
        e.preventDefault()
      }
    }
  },
  computed: {
    innerValue: {
      set(v) {
        // emit
        this.orginalStr = v.replaceAll(',', '')
        this.$emit('input', this.orginalStr)
      },
      get() {
        // speration
        return thousandSeparator(this.orginalStr)
      }
    }
  },
  watch: {
    value: function () {
      this.orginalStr = this.value
    }
  }

}
</script>