<template>
  <div class="app-container">
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <h2>My Orders</h2>
    <el-row>
      <h3>Requested</h3>
      <!--<el-table :data="myContracts"-->
                <!--element-loading-text="Loading"-->
                <!--fit-->
                <!--highlight-current-row>-->
                <!--&lt;!&ndash;@current-change="handleCurrentChange">&ndash;&gt;-->
        <!--<el-table-column align="center"width="95" type="expand">-->
          <!--<template slot-scope="scope">-->
            <!--<el-row :gutter="20">-->
              <!--<el-col :span="12">-->
                <!--<div class="grid-content bg-purple">-->
                  <!--<h2>Pickup</h2>-->
                  <!--<p>Country: {{ scope.row.data.pickup.country }}</p>-->
                  <!--<p>City: {{ scope.row.data.pickup.city }}</p>-->
                  <!--<p>Address: {{ scope.row.data.pickup.address }}</p>-->
                  <!--<p>Postal: {{ scope.row.data.pickup.postal }}</p>-->
                  <!--<p>Day: {{ filterTimeCreated(scope.row.data.pickup.date_day) }}</p>-->
                  <!--<p>Public Key: {{ scope.row.data.pickup.public_key }}</p>-->
                <!--</div>-->
              <!--</el-col>-->
              <!--<el-col :span="12">-->
                <!--<div class="grid-content bg-purple">-->
                  <!--<h2>Dropoff</h2>-->
                  <!--<p>Country: {{ scope.row.data.dropoff.country }}</p>-->
                  <!--<p>City: {{ scope.row.data.dropoff.city }}</p>-->
                  <!--<p>Address: {{ scope.row.data.dropoff.address }}</p>-->
                  <!--<p>Postal: {{ scope.row.data.dropoff.postal }}</p>-->
                  <!--<p>Day: {{ filterTimeCreated(scope.row.data.dropoff.date_day) }}</p>-->
                  <!--<p>Public Key: {{ scope.row.data.dropoff.public_key }}</p>-->
                <!--</div>-->
              <!--</el-col>-->
            <!--</el-row>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="Value Category">-->
          <!--<template slot-scope="scope">-->
            <!--€{{scope.row.data.value_category}}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="Pickup City" width="150" align="center">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.data.pickup.city}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" prop="created_at" label="Created At" width="200">-->
          <!--<template slot-scope="scope">-->
            <!--<i class="el-icon-time"></i>-->
            <!--<span>{{filterTimeCreated(scope.row.data.date)}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
      <h2>Accepted</h2>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <p>My Accepted transport</p>
        </div>
      </el-col>
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
          <p>{{wallet.bitcoin.publickey}}</p>
          <p>{{wallet.bitcoin.privatekey}}</p>
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
          <p>{{wallet.bigchainDB.publickey}}</p>
          <p>{{wallet.bigchainDB.privatekey}}</p>
        </div>
      </el-col>
    </el-row>

    <h1>Change Actor</h1>
    <el-row>
      <el-select v-model="actorWallet">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
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
            publickey: '',
            privatekey: ''
          },
          bigchainDB: {
            publickey: '',
            privatekey: ''
          }
        },
        loading: false,
        error: null,
        connection: getConnection(),
        myContracts: null,
        options: [{
          value: 'sending.db',
          label: 'sending'
        }, {
          value: 'receiving.db',
          label: 'receiving'
        }, {
          value: 'transporting.db',
          label: 'transporting'
        }],
        actorWallet: process.env.WALLET
      }
    },
    created () {
      this.fetchWallet()
      this.loadAllContracts()
    },
    watch: {
      actorWallet: function () {
        process.env.WALLET = this.value
        this.fetchWallet()
      }
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
          // todo: get pub key from wallet (this.wallet.bitcoin.publickey
          this.connection.searchAssets('1JwFR2GcjpceGJJGfPws4VWacybp6SJMpu').then(response => {
            resolve(response)
          })
        }).catch(error => {
          console.log(error)
        })
      },
      filterContracts (allContracts) {
        // todo: make filter which filters on own public key
        return allContracts
      },
      filterTimeCreated (e) {
        return e.slice(0, -14)
      }
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>
