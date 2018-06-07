<template>
  <div class="app-container">

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

    <h1>Generate new local keypairs</h1>
    <div style="margin-top: 20px">
      <el-button type="primary" @click="genKeypairs">Generate</el-button>
    </div>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data () {
      return {
        loading: false,
        error: null,
        myContracts: [],
        myContracts2: [],
        transporter: null,
        currentRow: null
      }
    },
    computed: {...mapGetters(['role', 'bigchainDB', 'bitcoin'])},
    methods: {
      ...mapActions(['ChangeActor']),
      genKeypairs () {
        return null
      }
    }
  }
</script>

<style>
  ul {
    float: left;
  }
</style>