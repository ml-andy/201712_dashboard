<template lang="pug">
  .wrapper.index
      
</template>

<script>

export default {
  name: 'Index',
  data(){
    return {
      
    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
    }),
  },
  mounted(){
    
  },
  methods:{
    ...Vuex.mapActions(['changeLoading']),
  },
  watch:{
    
  },
  destroyed(){
    
  },
  components:{

  }
}
</script>

<style lang="scss" scoped>
@import "./css/index/index.scss";
</style>
