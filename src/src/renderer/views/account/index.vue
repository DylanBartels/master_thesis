<template>
  <div class="app-container">
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <h1>Keys</h1>
    <el-row>
      <h2>Bitcoin</h2>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p>Public Key</p>
          <p>Private Key</p>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple-light">
          <p>{{wallet.bitcoin.publickey}}</p>
          <p>{{wallet.bitcoin.privatekey}}</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <h2>BigchainDB</h2>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p>Public Key</p>
          <p>Private Key</p>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple-light">
          <p>{{wallet.bigchainDB.publickey}}</p>
          <p>{{wallet.bigchainDB.privatekey}}</p>
        </div>
      </el-col>
    </el-row>

    <h1>My Orders</h1>
    <el-row>
      <h2>Requested</h2>
      <el-table :data="myContracts"
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
      <h2>Accepted</h2>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <p>My Accepted transport</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getWallet, getConnection } from '../../datastore'

  export default {
    data () {
      return {
        wallet: {
          bitcoin: {
            publickey: null,
            privatekey: null
          },
          bigchainDB: {
            publickey: null,
            privatekey: null
          }
        },
        loading: false,
        error: null,
        connection: getConnection(),
        myContracts: null
      }
    },
    created () {
      this.fetchWallet()
      this.loadAllContracts()
    },
    methods: {
      fetchWallet () {
        this.error = null
        this.loading = true

        getWallet().findOne({}, (err, wallet) => {
          this.loading = false
          if (err) {
            this.error = err.toString()
          } else {
            this.wallet = wallet
          }
        })
      },
      loadAllContracts () {
        this.getAllAssets().then(response => {
          this.myContracts = this.filterContracts(response)
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
      filterContracts (allContracts) {
        // todo: make filter which filters on own public key
        return allContracts
      }
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>
