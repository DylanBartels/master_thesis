<template>
  <div class="app-container">
    <!--<div v-if="error" class="error">-->
      <!--{{ error }}-->
    <!--</div>-->

    <h2>My Orders</h2>
    <el-row>
      <h3>Requested</h3>
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
        <el-button type="primary" @click="onExchange">Exchange Ownership</el-button>
      </div>
    </el-row>

    <h2>Keys</h2>
    <el-row>
      <h3>Bitcoin</h3>
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <p>Public Key:</p>
          <p>Private Key:</p>
        </div>
      </el-col>
      <el-col :span="21">
        <div class="grid-content bg-purple-light">
          <p>{{ $store.state.wallet.bitcoin.publickey }}</p>
          <p>{{ $store.state.wallet.bitcoin.privatekey }}</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <h3>BigchainDB</h3>
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <p>Public Key:</p>
          <p>Private Key:</p>
        </div>
      </el-col>
      <el-col :span="21">
        <div class="grid-content bg-purple-light">
          <p>{{ $store.state.wallet.bigchainDB.publickey }}</p>
          <p>{{ $store.state.wallet.bigchainDB.privatekey }}</p>
        </div>
      </el-col>
    </el-row>

    <h1>Change Actor</h1>
    <el-row>
      <ul v-for="role in $store.state.wallet.roles">
        <el-button @click="ChangeActor(role.role)">{{ role.role }}</el-button>
      </ul>
    </el-row>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { getConnection } from '../../datastore'
  import store from '../../store'

  export default {
    data () {
      return {
        loading: false,
        error: null,
        myContracts: [],
        transporter: null,
        currentRow: null
      }
    },
    computed: {
      ...mapGetters(['assets'])
    },
    methods: {
      ...mapActions(['ChangeActor']),
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
      }
    },
    watch: {
      assets (promise) {
        promise.then(result => (this.myContracts = result))
      }
    }
  }
</script>

<style>
  ul {
    float: left;
  }
</style>