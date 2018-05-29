<template>
  <div class="app-container">
    <el-table :data="allContracts"
              v-loading.body="listLoading"
              element-loading-text="Loading"
              fit
              highlight-current-row
              @current-change="handleCurrentChange">
      <el-table-column align="center"width="95" type="expand">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <h2>Pickup</h2>
                <p>Country: {{ scope.row.data.pickup.country }}</p>
                <p>City: {{ scope.row.data.pickup.city }}</p>
                <p>Address: {{ scope.row.data.pickup.address }}</p>
                <p>Postal: {{ scope.row.data.pickup.postal }}</p>
                <p>Day: {{ filterTimeCreated(scope.row.data.pickup.date_day) }}</p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <h2>Dropoff</h2>
                <p>Country: {{ scope.row.data.dropoff.country }}</p>
                <p>City: {{ scope.row.data.dropoff.city }}</p>
                <p>Address: {{ scope.row.data.dropoff.address }}</p>
                <p>Postal: {{ scope.row.data.dropoff.postal }}</p>
                <p>Day: {{ filterTimeCreated(scope.row.data.dropoff.date_day) }}</p>
                <p>Public Key: {{ scope.row.data.dropoff.public_key }}</p>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="Value Category">
        <template slot-scope="scope">
          €{{scope.row.data.value_category}}
        </template>
      </el-table-column>
      <el-table-column label="Pickup City" width="150" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.data.pickup.city}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Created At" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{filterTimeCreated(scope.row.data.date)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button type="primary" @click="onAccept">Accept Contract</el-button>
    </div>
  </div>
</template>

<script>
  import { getConnection } from '../../datastore'

  export default {
    data () {
      return {
        listLoading: true,
        allContracts: [],
        currentRow: null,
        connection: getConnection()
      }
    },
    created () {
      this.loadAllContracts()
    },
    methods: {
      loadAllContracts () {
        this.getAllAssets().then(response => {
          this.allContracts = response
          this.listLoading = false
        })
      },
      getAllAssets () {
        return new Promise((resolve) => {
          this.connection.searchAssets('logisticsContractCompleteData').then(response => {
            resolve(response)
          })
        }).catch(error => {
          console.log(error)
        })
      },
      handleCurrentChange (val) {
        this.currentRow = val
      },
      onAccept () {
        this.$message('Contract accepted!')
      },
      filterTimeCreated (e) {
        return e.slice(0, -14)
      }
    }
  }
</script>
