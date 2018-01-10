<template lang="pug">
  section.index
    .namebar(v-if="showName")
      .name {{ customer_name }}
      .male {{ data.gender === 'F' ? '小姐' : '先生' }}
    .area.recommend
      Recommend
    .area.information
      Information
    .area.creditcard
      Creditcard
    .area.news
      Journey

</template>

<script>
const Recommend = require('./component/Recommend.vue')
const Information = require('./component/Information.vue')
const Creditcard = require('./component/Creditcard.vue')
const Journey = require('./component/Journey.vue')

export default {
  name: 'Index',
  data(){
    return {
      showName: false,
    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
      windowSize: state => state.windowSize,
      data: state => state.information.dataset,
      customer_name: state => state.customer_name,
    }),
  },
  mounted(){
    
  },
  methods:{
    ...Vuex.mapActions(['changeLoading']),
  },
  watch:{
    windowSize:{
      handler(e){
        this.windowSize.width >= 768 ? this.showName = false : this.showName = true
      },
      deep: true
    }
  },
  destroyed(){
    
  },
  components:{
    Recommend,
    Information,
    Creditcard,
    Journey,
  }
}
</script>

<style lang="scss" scoped>
@import "./css/index/index.scss";
</style>
