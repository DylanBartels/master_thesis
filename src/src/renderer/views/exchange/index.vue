<template>
  <div class="app-container">
    <el-row>
      <h3>I am pickup</h3>
      <el-table :data="myPickup"
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
                  <p>Day: {{ scope.row.data.pickup.date_day.slice(0, -14) }}</p>
                  <p>Public Key: {{ scope.row.data.pickup.public_key }}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <h2>Dropoff</h2>
                  <p>Country: {{ scope.row.data.dropoff.country }}</p>
                  <p>City: {{ scope.row.data.dropoff.city }}</p>
                  <p>Address: {{ scope.row.data.dropoff.address }}</p>
                  <p>Postal: {{ scope.row.data.dropoff.postal }}</p>
                  <p>Day: {{ scope.row.data.dropoff.date_day.slice(0, -14) }}</p>
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
            <span>{{ scope.row.data.date.slice(0, -14) }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 20px">
        <el-input placeholder="Please input Transporting public key" v-model="transporter" style="width: 300px"></el-input>
        <el-button type="primary" @click="onExchange">Exchange With Transporter</el-button>
      </div>
    </el-row>

    <el-row>
      <h3>I am dropoff</h3>
      <el-table :data="myDropoff"
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
                  <p>Day: {{ scope.row.data.pickup.date_day.slice(0, -14) }}</p>
                  <p>Public Key: {{ scope.row.data.pickup.public_key }}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <h2>Dropoff</h2>
                  <p>Country: {{ scope.row.data.dropoff.country }}</p>
                  <p>City: {{ scope.row.data.dropoff.city }}</p>
                  <p>Address: {{ scope.row.data.dropoff.address }}</p>
                  <p>Postal: {{ scope.row.data.dropoff.postal }}</p>
                  <p>Day: {{ scope.row.data.dropoff.date_day.slice(0, -14) }}</p>
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
            <span>{{ scope.row.data.date.slice(0, -14) }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 20px">
        <el-input placeholder="Please input Transporting public key" v-model="transporter" style="width: 300px"></el-input>
        <el-button type="primary" @click="onExchange">Exchange With Transporter</el-button>
      </div>
    </el-row>

    <el-row>
      <h3>I am transporting</h3>
      <el-table :data="myTransport"
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
                  <p>Day: {{ scope.row.data.pickup.date_day.slice(0, -14) }}</p>
                  <p>Public Key: {{ scope.row.data.pickup.public_key }}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <h2>Dropoff</h2>
                  <p>Country: {{ scope.row.data.dropoff.country }}</p>
                  <p>City: {{ scope.row.data.dropoff.city }}</p>
                  <p>Address: {{ scope.row.data.dropoff.address }}</p>
                  <p>Postal: {{ scope.row.data.dropoff.postal }}</p>
                  <p>Day: {{ scope.row.data.dropoff.date_day.slice(0, -14) }}</p>
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
            <span>{{ scope.row.data.date.slice(0, -14) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getConnection } from '../../datastore'
  import store from '../../store'

  export default {
    data () {
      return {
        loading: false,
        myPickup: [],
        myDropoff: [],
        myTransport: [],
        transporter: null,
        currentRow: null,
        testP: this.getPickup(),
        testD: this.getDropoff(),
        testT: this.getTransport()
      }
    },
    computed: {
      ...mapGetters(['role', 'bigchainDB', 'bitcoin'])
    },
    methods: {
      onExchange () {
        getConnection().listTransactions(this.currentRow.id).then(response => {
          return this.transferAsset(response[response.length - 1], this.transporter)
        }).then(response => {
          console.log(response)
        })
      },
      transferAsset (selectedAsset, receiverPublicKey) {
        const driver = require('bigchaindb-driver')

        return new Promise((resolve, reject) => {
          // Construct metadata.
          const metaData = {
            'action': 'being transported',
            'date': new Date().toISOString()
          }
          // Construct the new transaction
          const transferTransaction = driver.Transaction.makeTransferTransaction(
            // The previous transaction to be chained upon.
            [{ tx: selectedAsset, output_index: 0 }],
            // The (poutput) condition to be fullfilled in the next transaction.
            [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(receiverPublicKey))],
            // Metadata
            metaData
          )
          // Sign the new transaction.
          const signedTransaction = driver.Transaction.signTransaction(
            transferTransaction, store.state.wallet.bigchainDB.privatekey)

          // Post the transaction.
          getConnection().postTransactionCommit(signedTransaction).then(successfullyPostedTransaction => {
            resolve(successfullyPostedTransaction)
          }).catch(error => {
            reject(error)
          })
        })
      },
      handleCurrentChange (val) {
        this.currentRow = val
      },
      getPickup () {
        getConnection().listOutputs(store.state.wallet.bigchainDB.publickey).then(response => {
          for (let transaction in response) {
            getConnection().getTransaction(response[transaction].transaction_id).then(response => {
              this.myPickup.push(response['asset'])
            })
          }
        })
      },
      getDropoff () {
        getConnection().searchAssets(store.state.wallet.bitcoin.publickey).then(response => {
          for (let transaction in response) {
            if (response[transaction]['data']['dropoff']['public_key'] === store.state.wallet.bitcoin.publickey) {
              this.myDropoff.push(response[transaction])
            }
          }
        })
      },
      getTransport () {
        getConnection().listOutputs(store.state.wallet.bigchainDB.publickey).then(response => {
          for (let transaction in response) {
            getConnection().getTransaction(response[transaction].transaction_id).then(response => {
              if (response['metadata']['action'] === 'being transported') {
                getConnection().getTransaction(response['asset']['id']).then(response => {
                  this.myTransport.push(response['asset'])
                })
              }
            })
          }
        })
      }
    }
  }
</script>

<style>
  ul {
    float: left;
  }
</style>