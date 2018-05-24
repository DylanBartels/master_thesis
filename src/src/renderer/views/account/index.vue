<template>
  <div class="app-container">
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <el-form ref="user" label-width="120px">
      <el-form-item label="Public Key">
        <el-form-item>{{ wallet.publickey }}</el-form-item>
      </el-form-item>
      <el-form-item label="Private Key">
        <el-form-item>{{ wallet.privatekey }}</el-form-item>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import { getWallet } from '../../datastore'

  export default {
    data () {
      return {
        wallet: {
          publickey: '',
          privatekey: ''
        },
        loading: false,
        error: null
      }
    },
    created () {
      this.fetchWallet()
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
      }
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>
