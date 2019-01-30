<template lang="pug">
  section.bonus
    .btn_close(@click="changeSection(-1)")
      span.top
      span.bottom
    .main
      .leftside
        .unit
          .topbar
            .title 紅利到期
            .ontime 即將到期
          .boxtop
            .date 日期
            .points 到期點數
          .box(v-bar)
            ul
              li(
                v-for="i in dataset.find(d=>d.name === 'expire').list"
                v-if="i.date && i.count"
              )
                .date {{ i.date.slice(2) }}
                .points {{ thousandsSeparators(i.count) }}
                .ontime(v-if="i.ontime")
              li(v-if="!dataset.find(d=>d.name === 'expire').list.find(i=>i.date) || !dataset.find(d=>d.name === 'expire').list.find(i=>i.count != 0)")
                |暫無資料
        .unit
          .topbar
            .title 各期帳單紅利
          .boxtop
            .date 日期
            .points 點數
          .box(v-bar)
            ul
              li(v-for="i in dataset.find(d=>d.name === 'points').list")
                .date {{ i.date.slice(2) }}
                .points {{ thousandsSeparators(i.count) }}
        
      .rightside
        .unitbox
          h1 紅利點數
          .linechart(ref="linechart")
            LineChart(
              :customerData="customerDailyData"
              :zoomScale="zoomScale"
              :wrapperStyleObj="wrapperStyleObj"
            )
    .bgcover(@click="changeSection(-1)")
    
</template>

<script>
const LineChart = require('./LineChart.vue')
export default {
  name: 'Bonus',
  data(){
    return {
      zoomScale:{
        def: 1,
        min: 1,
        max: 20,
      },
      wrapperStyleObj:{
        width: 0, 
        height: 0
      }
    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
      dataset: state => state.bonus.dataset,
      windowSize: state => state.windowSize,
    }),
    customerDailyData(){
      return [
        {
          colorset: '#4ab235',
          data:this.dataset[1].list
        },
      ]
    },
  },
  beforeMount(){
    this.changeLoading(true)
    this.getBonusData()
  },
  mounted(){
    this.wrapperStyleObj = {
      width: $(this.$refs.linechart).width(), 
      height: $(this.$refs.linechart).height()
    }
  },
  methods:{
    ...Vuex.mapMutations(['changeLoading']),
    ...Vuex.mapMutations('nav',['changeSection']),
    ...Vuex.mapActions('bonus',['getBonusData']),
    thousandsSeparators(value){
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
  },
  watch:{
    windowSize:{
      handler(e){
        this.wrapperStyleObj = {
          width: $(this.$refs.linechart).width(), 
          height: $(this.$refs.linechart).height()
        }
      },
      deep: true
    }
  },
  destroyed(){
    
  },
  components:{
    LineChart,
  }
}
</script>

<style lang="scss" scoped>
@import "./css/component/bonus.scss";
</style>
