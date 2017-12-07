<template lang="pug">
#app
  Loading
  Nav(:class="showNav === true ? 'on' : ''")
  transition(name="fade",mode="out-in")
    router-view
</template>

<script>
const Loading = require('./component/Loading.vue')
const Nav = require('./component/Nav.vue')
export default {
  name: 'app',
  data(){
    return {
      
    }
  },
  computed: {
    ...Vuex.mapState({
        loadingShow: state => state.loadingShow,
        showNav: state => state.showNav,
        windowSize: state => state.windowSize,
    }),
  },
  mounted(){
    $(window).load(()=>{
      this.changeWindowSize({
        width:window.innerWidth,
        height:window.innerHeight
      })
      this.changeLoading(false)
    })

    $(window).on('resize',()=>{
      this.changeWindowSize({
        width:window.innerWidth,
        height:window.innerHeight
      })
    })
  },
  methods:{
    ...Vuex.mapMutations(['changeLoading','changeShowNav','changeWindowSize']),
  },
  watch:{
    windowSize:{
      handler(e){
        this.windowSize.width > 1024 ? this.changeShowNav(true) : this.changeShowNav(false)
      },
      deep: true
    }
  },
  components:{
    Loading,
    Nav
  }
}
</script>

<style lang="scss">
@import "../css/app.scss";
</style>
