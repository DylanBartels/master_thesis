<template>
  <div class="app-container">
    <!--<el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>-->
      <!--<el-table-column align="center" label='ID' width="95">-->
        <!--<template slot-scope="scope">-->
          <!--{{scope.$index}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="Title">-->
        <!--<template slot-scope="scope">-->
          <!--{{scope.row.title}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="Author" width="110" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.author}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="Pageviews" width="110" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--{{scope.row.pageviews}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column class-name="status-col" label="Status" width="110" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" prop="created_at" label="Display_time" width="200">-->
        <!--<template slot-scope="scope">-->
          <!--<i class="el-icon-time"></i>-->
          <!--<span>{{scope.row.display_time}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: null,
        listLoading: true
      }
    },
    // filters: {
    //   statusFilter (status) {
    //     const statusMap = {
    //       published: 'success',
    //       draft: 'gray',
    //       deleted: 'danger'
    //     }
    //     return statusMap[status]
    //   }
    // },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.listLoading = true
        const driver = require('bigchaindb-driver')

        // Init connection
        const bdb = new driver.Connection(process.env.APP_URL, {
          app_id: process.env.APP_ID,
          app_key: process.env.APP_KEY
        })

        const conn = new driver.Connection(bdb)
        console.log(conn)
        conn.searchAssets('FtfTutorialAsset')
          .then(response => console.log('Found assets with serial number Bicycle Inc.:', response))
      }
    }
  }
</script>
