<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import AppMain from './AppMain'
  import Sidebar from './Sidebar/index'

  export default {
    name: 'layout',
    components: {
      Sidebar,
      AppMain
    },
    computed: {
      sidebar () {
        return this.$store.state.app.sidebar
      },
      device () {
        return this.$store.state.app.device
      },
      classObj () {
        return {
          hideSidebar: !this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    methods: {
      handleClickOutside () {
        this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*@import "src/styles/mixin.scss";*/
  .app-wrapper {
    //@include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
