<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Value category">
        <el-select v-model="form.value_category" placeholder="Select trust equivalent">
          <el-option label="Category 1: €10" value="10"></el-option>
          <el-option label="Category 2: €20" value="20"></el-option>
          <el-option label="Category 3: €50" value="50"></el-option>
        </el-select>
      </el-form-item>
      <el-collapse v-model="activeName" accordion style="margin-bottom: 22px;">
        <el-collapse-item title="Pickup" name="1">
          <el-form-item label="Recipient name">
            <el-input v-model="form.pickup.name" placeholder="Koninklijke TNT Post BV"></el-input>
          </el-form-item>
          <el-form-item label="Street address">
            <el-input v-model="form.pickup.address" placeholder="Prinses Beatrixlaan 23"></el-input>
          </el-form-item>
          <el-form-item label="Postal code">
            <el-input v-model="form.pickup.postal" placeholder="2595AK"></el-input>
          </el-form-item>
          <el-form-item label="City">
            <el-input v-model="form.pickup.city" placeholder="'S-Gravenhage"></el-input>
          </el-form-item>
          <el-form-item label="Country">
            <el-input v-model="form.pickup.country" placeholder="Netherlands"></el-input>
          </el-form-item>
          <el-form-item label="Activity time">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="Pick a date" v-model="form.pickup.date_day" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="Pick a time" v-model="form.pickup.date_time" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="Dropoff" name="2">
          <el-form-item label="Recipient name">
            <el-input v-model="form.dropoff.name" placeholder="Koninklijke TNT Post BV"></el-input>
          </el-form-item>
          <el-form-item label="Street address">
            <el-input v-model="form.dropoff.address" placeholder="Prinses Beatrixlaan 23"></el-input>
          </el-form-item>
          <el-form-item label="Postal code">
            <el-input v-model="form.dropoff.postal" placeholder="2595AK"></el-input>
          </el-form-item>
          <el-form-item label="City">
            <el-input v-model="form.dropoff.city" placeholder="'S-Gravenhage"></el-input>
          </el-form-item>
          <el-form-item label="Country">
            <el-input v-model="form.dropoff.country" placeholder="Netherlands"></el-input>
          </el-form-item>
          <el-form-item label="Activity time">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="Pick a date" v-model="form.dropoff.date_day" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="Pick a time" v-model="form.dropoff.date_time" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
      <el-form-item label="Dropoff key">
        <el-input v-model="form.dropoff.public_key" placeholder="Public key"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 22px;">
        <el-button type="primary" @click="checkForm">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getConnection, getWallet } from '../../datastore'
  const driver = require('bigchaindb-driver')

  export default {
    data () {
      return {
        error: null,
        BCDBPublickey: null,
        formErrors: [],
        activeName: '1',
        form: {
          value_category: null,
          pickup: {
            name: null,
            address: null,
            postal: null,
            city: null,
            country: null,
            date_day: null,
            date_time: null,
            public_key: null
          },
          dropoff: {
            name: null,
            address: null,
            postal: null,
            city: null,
            country: null,
            date_day: null,
            date_time: null,
            public_key: null
          }
        }
      }
    },
    created () {
      this.fetchWallet()
    },
    methods: {
      insertForm () {
        return new Promise((resolve, reject) => {
          const assetData = {
            'type': process.env.BCDB_META_TAG,
            'value_category': this.form.value_category,
            'date': new Date().toISOString(),
            'pickup': {
              'name': this.form.pickup.name,
              'address': this.form.pickup.address,
              'postal': this.form.pickup.postal,
              'city': this.form.pickup.city,
              'country': this.form.pickup.country,
              'date_day': this.form.pickup.date_day,
              'date_time': this.form.pickup.date_time,
              'public_key': this.form.pickup.public_key
            },
            'dropoff': {
              'name': this.form.dropoff.name,
              'address': this.form.dropoff.address,
              'postal': this.form.dropoff.postal,
              'city': this.form.dropoff.city,
              'country': this.form.dropoff.country,
              'date_day': this.form.dropoff.date_day,
              'date_time': this.form.dropoff.date_time,
              'public_key': this.form.dropoff.public_key
            }
          }

          const metaData = {
            'phase': 'introduced'
          }

          // Create a CREATE transaction.
          const introduceLogisticsTransaction = driver.Transaction.makeCreateTransaction(
            assetData,
            metaData,
            // Transaction output
            [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(this.BCDBPublickey))],
            this.BCDBPublickey
          )

          // We sign the transaction
          const signedTransaction = driver.Transaction.signTransaction(
            introduceLogisticsTransaction, this.BCDBPublickey)

          // Post the transaction to the network
          getConnection().postTransactionCommit(signedTransaction).then(postedTransaction => {
            resolve(postedTransaction)
          }).catch(err => {
            reject(err)
          })
        })
      },
      checkForm () {
        if (
          this.form.value_category && this.form.pickup.name &&
          this.form.pickup.address && this.form.pickup.postal &&
          this.form.pickup.city && this.form.pickup.country &&
          this.form.pickup.date_day && this.form.pickup.date_time &&
          this.form.dropoff.name && this.form.dropoff.address &&
          this.form.dropoff.postal && this.form.dropoff.city &&
          this.form.dropoff.country && this.form.dropoff.date_day &&
          this.form.dropoff.date_time && this.form.dropoff.public_key
        ) return this.submitForm()
        else {
          this.$message({
            message: 'Form is missing data!',
            type: 'warning'
          })
        }
      },
      submitForm () {
        this.insertForm()
        this.$message('submitted!')
      },
      fetchWallet () {
        this.error = null

        getWallet().findOne({}, (err, wallet) => {
          if (err) {
            this.error = err.toString()
          } else {
            this.form.pickup.public_key = wallet.bitcoin.publickey
            this.BCDBPublickey = wallet.bigchainDB.publickey
          }
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

