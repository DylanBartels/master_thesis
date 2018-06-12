<template>
  <div class="app-container">

    <h2>Keys</h2>
    <el-row>
      <h3>Bitcoin</h3>
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <p>Address:</p>
          <p>Public Key:</p>
          <p>Private Key:</p>
          <p>Balance:</p>
        </div>
      </el-col>
      <el-col :span="21">
        <div class="grid-content bg-purple-light">
          <p>{{ bitcoin.address }}</p>
          <p>{{ bitcoin.publickey }}</p>
          <p>{{ bitcoin.privatekey }}</p>
          <p>{{ balance }}</p>
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
          <p>{{ bigchainDB.publickey }}</p>
          <p>{{ bigchainDB.privatekey }}</p>
        </div>
      </el-col>
    </el-row>

    <h1>Change Actor</h1>
    <el-row>
      <ul v-for="role in roles" style="padding-left: 0 !important;
    padding-right: 30px;">
        <el-button @click="ChangeActor(role.role)">
          {{ role.role }}
        </el-button>
      </ul>
    </el-row>

    <h1>Generate new local keypairs</h1>
    <div style="margin-top: 20px">
      <el-button @click="genKeypairs">Generate</el-button>
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
    computed: {...mapGetters(['roles', 'bigchainDB', 'bitcoin', 'balance'])},
    methods: {
      ...mapActions(['ChangeActor']),
      genKeypairs () {
        // TODO: create function
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