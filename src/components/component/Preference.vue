<template lang="pug">
  section.preference
    .btn_close(@click="changeSection(-1)")
      span.top
      span.bottom
    .main
      .leftside
        h1 潛在偏好
        .subbtn
          .btn(
            v-for="(i,idx) in schema"
            @click="changeUnit(idx)"
          )
            |{{ i.name }}
      .rightside
        .unitbox(v-bar)
          .unitboxin(ref="unitboxin")
            .unit(v-for="(i,idx) in dataset")
              .topbar
                .title {{ i.title }}
                .tag {{ tag[idx] }}
              .submain
                .content
                  .theme(
                    v-for="d in i.content"
                    ref="theme"
                  )
                    .subtitle {{ d.subtitle }}
                    .text(v-html="d.text ? d.text : '暫無更新'")
                .remarksbox
                  .subtitle
                    |備註
                    .rewrite(
                      :class="i.remarks.isWriting ? 'on' : ''"
                      @click="writeRemarks(idx)"
                    )
                  textarea.remarks(
                    v-show="i.remarks.isWriting"
                    v-model="i.remarks.text"
                    ref="remarks"
                  )
                  .remarks(
                    v-if="!i.remarks.isWriting"
                    v-html="i.remarks.text"
                    @click="writeRemarks(idx)"
                  )
    .bgcover(@click="changeSection(-1)")
    
</template>

<script>
export default {
  name: 'Preference',
  data(){
    return {
      aniSpeed: 300,
    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
      nowUnit: state => state.preference.nowUnit,
      dataset: state => state.preference.dataset,
      schema: state => state.preference.schema,
      tag: state => [
        state.recommend.data.preference, 
        state.recommend.data.product,
        state.recommend.data.program,
      ],
    }),
  },
  beforeMount(){
    this.changeLoading(true)
    this.getPreferenceData()
  },
  mounted(){
    this.UnitAni()
  },
  methods:{
    ...Vuex.mapMutations(['changeLoading']),
    ...Vuex.mapMutations('nav',['changeSection']),
    ...Vuex.mapMutations('preference',['changeUnit']),
    ...Vuex.mapActions('preference',['getPreferenceData','changeDatasetRemarks']),
    UnitAni(){
      let distance = $(this.$refs.theme[this.nowUnit]).offset().top - $(this.$refs.theme[0]).offset().top
      $(this.$refs.unitboxin).animate({ scrollTop: distance },this.aniSpeed)
    },
    writeRemarks(idx){
      if(this.dataset[idx].remarks.isWriting) {
        this.changeDatasetRemarks({
          idx: idx,
          text: this.dataset[idx].remarks.text.replace(/\n\r?/g, '<br>'),
          isWriting: false,
        })
      }
      else{
        this.changeDatasetRemarks({
          idx: idx,
          text: this.dataset[idx].remarks.text.replace(/<br>/g,'\n'),
          isWriting: true,
        })
        setTimeout(()=>{ $(this.$refs.remarks[idx]).focus() },100)
      } 
    }
  },
  watch:{
    nowUnit(){
      this.UnitAni()
    }
  },
  destroyed(){
    this.changeUnit(0)
  },
}
</script>

<style lang="scss" scoped>
@import "./css/component/preference.scss";
</style>
