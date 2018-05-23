<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <!--<el-form-item label="Activity name">-->
        <!--<el-input v-model="form.name"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="Value category">
        <el-select v-model="form.value_category" placeholder="please select your trustless equivalent">
          <el-option label="Category 1: €10" value="10"></el-option>
          <el-option label="Category 2: €20" value="20"></el-option>
          <el-option label="Category 3: €50" value="50"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="Pick a time" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type"></el-checkbox>
          <el-checkbox label="Promotion activities" name="type"></el-checkbox>
          <el-checkbox label="Offline activities" name="type"></el-checkbox>
          <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor"></el-radio>
          <el-radio label="Venue"></el-radio>
        </el-radio-group>
      </el-form-item>
      <!--<el-form-item label="Activity form">-->
        <!--<el-input type="textarea" v-model="form.desc"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        error: null,
        form: {
          value_category: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          loc: {
            lat: '',
            lng: ''
          }
        }
      }
    },
    created () {
      this.fetchLoc()
    },
    methods: {
      fetchLoc () {
        let where = require('node-where')

        where.is('173.194.33.104', (err, result) => {
          if (err) {
            this.error = err
          } else {
            this.form.loc.lat = result.get('lat')
            this.form.loc.lng = result.get('lng')
          }
        })
      },
      onSubmit () {
        this.$message('submit!')
      },
      onCancel () {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

