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
        activeName: '1',
        txid: '',
        form: {
          value_category: '',
          pickup: {
            name: '',
            address: '',
            postal: '',
            city: '',
            country: '',
            date_day: '',
            date_time: ''
          },
          dropoff: {
            name: '',
            address: '',
            postal: '',
            city: '',
            country: '',
            date_day: '',
            date_time: '',
            public_key: ''
          }
        }
      }
    },
    methods: {
      // // Possible to do loc instead of address format
      // fetchLoc () {
      //   const where = require('node-where')
      //
      //   where.is('173.194.33.104', (err, result) => {
      //     if (err) {
      //       this.error = err
      //     } else {
      //       this.form.loc.lat = result.get('lat')
      //       this.form.loc.lng = result.get('lng')
      //     }
      //   })
      // },
      insertForm () {
        const driver = require('bigchaindb-driver')

        // Init connection
        let bdb = new driver.Connection('https://test.bigchaindb.com/api/v1/', {
          app_id: 'b65e44fe',
          app_key: 'f5a123dba75e2f17d76a280957a14443'
        })

        // Create a new keypair for Alice and Bob
        const alice = new driver.Ed25519Keypair()
        const bob = new driver.Ed25519Keypair()

        console.log('Alice: ', alice.publicKey)
        console.log('Bob: ', bob.publicKey)

        // Create asset
        const assetdata = {
          'value_category': this.form.value_category,
          'pickup': {
            'name': this.form.pickup.name,
            'address': this.form.pickup.address,
            'postal': this.form.pickup.postal,
            'city': this.form.pickup.city,
            'country': this.form.pickup.country,
            'date_day': this.form.pickup.date_day,
            'date_time': this.form.pickup.date_time
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
        const metadata = {'planet': 'earth'}

        // Creating transaction
        const txCreateAliceSimple = driver.Transaction.makeCreateTransaction(
          assetdata,
          metadata,

          // A transaction needs an output
          [ driver.Transaction.makeOutput(
            driver.Transaction.makeEd25519Condition(alice.publicKey))
          ],
          alice.publicKey
        )

        // Signing transaction
        const txCreateAliceSimpleSigned = driver.Transaction.signTransaction(txCreateAliceSimple, alice.privateKey)

        // Sending
        const conn = new driver.Connection(bdb)
        this.txid = txCreateAliceSimpleSigned.id

        conn.postTransactionCommit(txCreateAliceSimpleSigned)
          .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))
          // With the postTransactionCommit if the response is correct, then the transaction
          // is valid and commited to a block

          // Transfer bicycle to Bob
          .then(() => {
            const txTransferBob = driver.Transaction.makeTransferTransaction(
              // signedTx to transfer and output index
              [{ tx: txCreateAliceSimpleSigned, output_index: 0 }],
              [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(bob.publicKey))],
              // metadata
              {price: '100 euro'}
            )

            // Sign with alice's private key
            let txTransferBobSigned = driver.Transaction.signTransaction(txTransferBob, alice.privateKey)
            console.log('Posting signed transaction: ', txTransferBobSigned)

            // Post with commit so transaction is validated and included in a block
            return conn.postTransactionCommit(txTransferBobSigned)
          })
          .then(res => {
            console.log('Response from BDB server:', res)
            return res.id
          })
          .then(tx => {
            console.log('Is Bob the owner?', tx['outputs'][0]['public_keys'][0] === bob.publicKey)
            console.log('Was Alice the previous owner?', tx['inputs'][0]['owners_before'][0] === alice.publicKey)
          })
          // Search for asset based on the serial number of the bicycle
          .then(() => conn.searchAssets('Bicycle Inc.'))
          .then(assets => console.log('Found assets with serial number Bicycle Inc.:', assets))
      },
      onSubmit () {
        this.insertForm()
        this.$message('submitted!')
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

