<template lang="pug">
  .panel.journey
    .container(v-if="data.length > 0 ? true : false")
      .title 近五筆重要往來資訊
      .topbar
        span(
          v-for="i in schema"
          @click="switchNewsData(i.type)"
          :class="[i.type,newsDataClass.indexOf(i.type) >= 0 ? '' : 'off']"
        ) {{ i.name }}
      .main(v-bar)
        ul
          transition(
            v-for="i in data"
            name="fade"
            mode="out-in"
            v-if="newsDataClass.indexOf(i.event_type) >= 0 ? true : false"
          )
            li
              .subtitle(
                :class="i.event_type"
              ) {{ schema.find(d=> d.type === i.event_type) ? schema.find(d=> d.type === i.event_type).name : '其他'}}
              .content(v-html="i.event_description")
              .time {{ i.date_time }}
    .container_empty(v-else) 暫無重要往來資訊
        
</template>

<script>

export default {
  name: 'Journey',
  data(){
    return {
      newsDataClass:[],
    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
      data: state => state.journey.dataset,
      schema: state => state.journey.schema,
    }),
  },
  beforeMount(){
    this.newsDataClass = this.schema.map(i=>i.type)
    this.getJourneyData()
  },
  mounted(){
    
  },
  methods:{
    ...Vuex.mapMutations('nav',['changeSection']),
    ...Vuex.mapActions('journey',['getJourneyData']),
    switchNewsData(classify){
      let result = this.newsDataClass.indexOf(classify)
      if(result >= 0) this.newsDataClass.splice(result,1)
      else this.newsDataClass.push(classify)
    }
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
@import "./css/index/component/journey.scss";
</style>
