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
        let bdb = new driver.Connection('https://test.bigchaindb.com/api/v1/', {
          app_id: 'b65e44fe',
          app_key: 'f5a123dba75e2f17d76a280957a14443'
        })

        const conn = new driver.Connection(bdb)
        console.log(conn)
        conn.searchAssets('g')
          .then(assets => console.log('Found assets with serial number Bicycle Inc.:', assets))
      }
    }
  }
</script>
