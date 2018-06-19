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
                </div>
              </el-col>
            </el-row>
            <el-row>
              <div style="margin-top: 20px">
                <el-form ref="pickup" :model="pickup" label-width="120px">
                  <el-form-item label="BigChainDB public key">
                    <el-input v-model="pickup.bigchainPublicKey"></el-input>
                  </el-form-item>
                  <el-form-item label="Bitcoin public key">
                    <el-input v-model="pickup.bitcoinPublicKey"></el-input>
                  </el-form-item>
                  <el-form-item label="Transaction Script">
                    <el-input v-model="pickup.transactionScript"></el-input>
                  </el-form-item>
                </el-form>
                <el-button type="primary" @click="onExchangePickup">Exchange With Transporter</el-button>
              </div>
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
                </div>
              </el-col>
            </el-row>
            <el-row>
              <div style="margin-top: 20px">
                <el-form ref="dropoff" :model="dropoff" label-width="150px">
                  <el-form-item label="Bitcoin public key">
                    <el-input v-model="dropoff.bitcoinPublicKey"></el-input>
                  </el-form-item>
                </el-form>
                <el-button type="primary" @click="onExchangeDropoff">Exchange With Transporter</el-button>
              </div>
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
                </div>
              </el-col>
            </el-row>
            <el-row>
              <div style="margin-top: 20px">
                <el-form ref="transport" :model="transport" label-width="150px">
                  <el-form-item label="Dropoff bigchaindb public key">
                    <el-input v-model="transport.bigchainPublicKey"></el-input>
                  </el-form-item>
                  <el-form-item label="Transaction Script">
                    <el-input v-model="transport.transactionScript"></el-input>
                  </el-form-item>
                </el-form>
                <el-button type="primary" @click="onRedeem">Get reward</el-button>
              </div>
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
  import { buildMultiSigTransaction, signSecondMultiSigTransaction, buildTransaction, createMultiSig, postTransactionScript } from '../../util/bitcoin'
  import { transferAsset, getPickupAssets, getDropoffAssets, getTransportAssets } from '../../util/bigchaindb'
  import store from '../../store'

  export default {
    data () {
      return {
        loading: false,
        myPickup: [],
        myDropoff: [],
        myTransport: [],
        currentRow: null,
        error: null,
        txb: null,
        pickup: {
          bigchainPublicKey: null,
          bitcoinPublicKey: null,
          transactionScript: null
        },
        dropoff: {
          bitcoinPublicKey: null
        },
        transport: {
          bigchainPublicKey: null,
          transactionScript: null
        }
      }
    },
    computed: {
      ...mapGetters(['bigchainDB', 'bitcoin', 'utxo'])
    },
    created () {
      this.getTransport()
      this.getDropoff()
      this.getPickup()
    },
    methods: {
      onExchangePickup () {
        this.$confirm('This will broadcast the equivalent cost transaction, ' +
          'transport cost transaction and change ownership of the digital asset. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // 1. Transfers asset to transfer public key
          getConnection().listTransactions(this.currentRow.id).then(response => {
            transferAsset(response[response.length - 1], this.pickup.bigchainPublicKey, this.bigchainDB.privatekey,
              'Being transported')
          })
          // 2. Broadcast transport cost
          postTransactionScript(buildTransaction(
            store.state.wallet.bitcoin.privatekey,
            createMultiSig(
              this.pickup.bitcoinPublicKey,
              this.currentRow.data.dropoff.public_key
            )['P2SHaddress'],
            store.state.wallet.utxo
          ))
          // 3. Broadcast equivalent cost in multisig transaction
          postTransactionScript(this.pickup.transactionScript)
          this.$message({
            type: 'success',
            message: 'Exchange completed'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Exchange canceled'
          })
        })
      },
      onExchangeDropoff () {
        // 1. sign multisig transaction (1/2)
        buildMultiSigTransaction(
          store.state.wallet.bitcoin.privatekey,
          this.dropoff.bitcoinPublicKey,
          store.state.wallet.bitcoin.publickey
        ).then(response => {
          this.$confirm('Exchange asset with transporter and give him the transactionscript:\n' +
            response +
            '\nGive him your BCDB public key:\n' +
            store.state.wallet.bigchainDB.publickey, 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: 'Exchange completed'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Exchange canceled'
            })
          })
        })
      },
      onRedeem () {
        // 1. Transfers asset to dropoff public key
        getConnection().listTransactions(this.currentRow.id).then(response => {
          transferAsset(response[response.length - 1], this.transport.bigchainPublicKey, this.bigchainDB.privatekey,
            'Completed')
        })

        // 2. sign multisig transaction and broadcast (2/2)
        signSecondMultiSigTransaction(
          store.state.wallet.bitcoin.privatekey,
          store.state.wallet.bitcoin.publickey,
          this.currentRow.data.dropoff.public_key,
          this.transport.transactionScript
        ).then(response => {
          this.$confirm('Contract redeemed and payment send! You can follow the transaction: ' +
            response, 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: 'Redeem completed'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Redeem canceled'
            })
          })
        })
      },
      handleCurrentChange (val) {
        this.currentRow = val
      },
      getPickup () {
        getPickupAssets(store.state.wallet.bigchainDB.publickey, 'Introduced', this.myPickup)
      },
      getDropoff () {
        getDropoffAssets(store.state.wallet.bitcoin.publickey, this.myDropoff)
      },
      getTransport () {
        getTransportAssets(store.state.wallet.bigchainDB.publickey, 'Being transported', this.myTransport)
      }
    }
  }
</script>

<style>
  ul {
    float: left;
  }
</style>
