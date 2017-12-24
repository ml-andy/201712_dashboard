<template lang="pug">
  section.complain
    .btn_close(@click="changeSection(-1)")
      span.top
      span.bottom
    .main
      h1 曾經抱怨
      .submain(v-bar)
        ul
          li.top
            .date 日期
            .description 描述
          li(v-for="i in dataset")
            .date {{ i.datetime }}
            .description {{ i.description }}
    .bgcover(@click="changeSection(-1)")

    
</template>

<script>
export default {
  name: 'Complain',
  data(){
    return {

    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
      dataset: state => state.complain.dataset,
    }),
  },
  beforeMount(){
    this.changeLoading(true)
    this.getComplainData()
  },
  mounted(){
    
  },
  methods:{
    ...Vuex.mapMutations(['changeLoading']),
    ...Vuex.mapMutations('nav',['changeSection']),
    ...Vuex.mapActions('complain',['getComplainData']),
  },
  watch:{
    
  }
}
</script>

<style lang="scss" scoped>
@import "./css/component/complain.scss";
</style>
