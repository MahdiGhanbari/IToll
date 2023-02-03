<template>
	<div>
		<el-form :model="value" :rules="rules" ref="form" label-position="left" label-width="120px" class="form">
			<el-form-item label="Type" prop="type" class="label">
				<el-select :value="value.type" @input="update($event, 'type')" filterable placeholder="Select">
					<el-option v-for="cType in countyTypes" :key="cType" :label="cType" :value="cType" />
				</el-select>
			</el-form-item>

			<el-form-item label="Date" prop="date" class="label">
				<el-date-picker type="datetime" :value="value.date" @input="update($event, 'date')" format="yyyy/mm/dd HH:MM"
					value-format="yyyy/mm/dd HH:MM" style="max-width: 200px" />
			</el-form-item>

			<el-form-item label="Title" prop="title" class="label">
				<el-input :value="value.title" @input="update($event, 'title')" />
			</el-form-item>

			<el-form-item label="Status" class="label">
				<el-select :value="value.state" @input="update($event, 'state')" filterable style="max-width: 150px">
					<el-option v-for="item in status" :key="item" :label="item" :value="item" />
				</el-select>
			</el-form-item>

			<el-form-item label="Imp" class="imp-item label">
				<el-rate :value="value.imp" @input="update($event, 'imp')" :max="3" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
					class="imp-item__rate" />
			</el-form-item>

			<el-form-item label="Price" class="label" style="max-width: 300px">
				<input-number :value="value.price" @input="update($event, 'price')"
					:elInputProps="{ placeholder: 'Insert decimal number' }" />
			</el-form-item>
		</el-form>
		<el-row type="flex" justify="end">
			<el-button @click="cancel">Cancel</el-button>
			<el-button @click="confirm" type="primary">Cofirm</el-button>
		</el-row>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import InputNumber from '@/components/InputNumber.vue'

class Item {
	constructor() {
		this.title = '-'
		this.date = ''
		this.type = ''
		this.state = 'pushed'
		this.imp = 1
		this.price = '0'
	}
}

export default {
	props: {
		value: {
			type: Item,
			default: () => new Item()
		}
	},
	data() {
		return {
			newValue: new Item(),
			rules: {
				title: [
					{ required: true, message: 'Please input Title', trigger: 'blur' },
					{ min: 3, max: 15, message: 'Length should be 3 to 20', trigger: 'blur' }
				],
				type: [{ required: true, message: 'Please select a type', trigger: 'blur' }],
				date: [{ required: true, message: 'The date is required', trigger: 'blur' }]
			}
		}
	},
	methods: {
		confirm() {
			this.$refs.form.validate(isValid => {
				if (isValid) {
					this.$emit('confirm', { ...this.newValue })
				}
			})
		},
		cancel() {
			this.$emit('cancel')
		},
		update(v, k) {
			this.newValue = this.value
			this.newValue[k] = v
			this.$emit('input', { ...this.newValue })
		}
	},
	computed: {
		...mapState(['countyTypes', 'status'])
	},
	components: { InputNumber }
}
</script>

<style scoped>
.imp-item {
	display: flex;
	align-items: center;
}

.imp-item>>>.el-form-item__content {
	margin: 0 !important;
}

.label {
	font-weight: bold;
}

.form {
	max-width: 450px;
	margin-inline-start: 50px;
}
</style>