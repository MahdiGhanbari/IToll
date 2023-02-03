<template>
  <div id="app">
    <el-button @click="dialogNewVisible = true" type="primary">
      New Item
      <i class="el-icon-plus" />
    </el-button>

    <!-- table -->
    <el-table :data="tableData" border align="center" class="table" max-height="800" width="1024">
      <el-table-column label="ID" type="index" sortable width="60" align="center" fixed />
      <el-table-column prop="date" label="Date" width="150" align="center" />
      <el-table-column prop="title" label="Title">
        <template v-slot="{ row }">
          <span class="hyper-text-color">{{ row.title }}</span>
          <el-tag>{{ row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="imp" label="Imp" width="100">
        <template v-slot="{ row }">
          <el-rate :value="row.imp" :max="3" disabled :colors="['#99A9BF', '#F7BA2A', '#FF9900']" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="Price" width="120" align="center">
        <template v-slot="{ row }">
          <span class="hyper-text-color">{{ thousandSeparator(row.price) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" width="120" align="center">
        <template v-slot="{ row }">
          <el-tag :type="row.state === 'pushed' ? 'success' : 'info'">
            {{ row.state }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="240" fixed="right">
        <template v-slot="{ row, $index }">
          <el-button size="mini" type="primary" @click="openEditDialog($index, row)" width="100">
            Edit
          </el-button>
          <el-button size="mini" @click="changeState($index, row)" :set="isPushed = row.state == 'pushed'"
            :type="isPushed ? '' : 'success'">
            {{ isPushed? 'Draft': 'Pushed' }}
          </el-button>
          <el-button size="mini" type="danger" @click="openRemvoeDialog($index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- moduls -->
    <el-dialog title="New" :visible.sync="dialogNewVisible" width="50%">
      <InputForm @confirm="add" @cancel="dialogNewVisible = false" />
    </el-dialog>

    <el-dialog title="Edit" :visible.sync="dialogEditVisible" width="50%">
      <InputForm :value="selected.item" @confirm="edit" @cancel="dialogEditVisible = false" />
    </el-dialog>

    <el-dialog title="Warnning" :visible.sync="dialogDeleteVisible" width="40%">
      <div>
        <div class="confirm-dialog__text">
          <i class="el-icon-warning" />
          <div>Confirm to remove the rule?</div>
        </div>
        <el-row type="flex" justify="end" class="confirm-dialog__actions">
          <el-button @click="dialogDeleteVisible = false">Cancel</el-button>
          <el-button @click="remove" type="primary">Cofirm</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import InputForm from '@/components/InputForm.vue'
import { thousandSeparator } from '@/utils/formats'

export default {
  name: 'App',
  data() {
    return {
      tableData: [],
      selected: {},
      dialogEditVisible: false,
      dialogNewVisible: false,
      dialogDeleteVisible: false
    }
  },
  methods: {
    thousandSeparator,
    async add(newItem) {
      this.dialogNewVisible = true
      const res = await this.$db.create(newItem)
      if (res) {
        await this.updateTable()
      } else {
        // TODO: handle error
      }
      this.dialogNewVisible = false
    },
    async edit(modifiedItem) {
      const id = this.selected?.id
      const res = await this.$db.update(id, modifiedItem)
      if (res) {
        await this.updateTable()
      } else {
        // TODO: handle error
      }
      this.dialogEditVisible = false
    },
    async remove() {
      const res = await this.$db.delete(this.selected?.id)
      if (res) {
        await this.updateTable()
      } else {
        // TODO: handle error
      }
      this.dialogDeleteVisible = false
    },
    openEditDialog(id, item) {
      this.dialogEditVisible = true
      this.selected = { id, item: { ...item } }
    },
    openRemvoeDialog(id) {
      this.dialogDeleteVisible = true
      this.selected = { id }
    },
    async changeState(id, item) {
      const newState = item.state == 'pushed' ? 'draft' : 'pushed'
      item.state = newState
      const res = await this.$db.update(id, item)
      if (res) {
        await this.updateTable()
      } else {
        // TODO: handle error
      }
    },
    async updateTable() {
      this.tableData = []
      this.tableData = await this.$db.getData()
    }
  },
  components: {
    InputForm
  },
  async beforeMount() {
    await this.updateTable()
  }
}
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
}

.table {
  width: 1024px;
  margin-top: 16px;
}

.hyper-text-color {
  color: #409EFF;
}

.confirm-dialog {
  &__text {
    font-size: 18px;
    display: inline-flex;
    align-items: center;

    & i {
      margin-right: 6px;
      color: #E6A23C;
      font-size: 26px;
    }
  }

  &__actions {
    margin-top: 20px
  }
}
</style>
