<template lang="pug">
  .customer_wrapper(
    :style="{width: wrapperStyleObj.width + 'px',height: wrapperStyleObj.height + 'px'}",
    @mousewheel="zoomSvg($event)",
    @mousemove="$refs.wrapper.focus()",
    @keydown.shift="startZoom(1)",
    @keyup="startZoom(-1)",
    tabIndex="-1",
    ref="wrapper"
  )
    svg(
      :width="svgWH.width",
      :height="svgWH.height",
      @mousedown="dragSvg(1,$event)",
      @mousemove="dragSvg(0,$event)",
      :style="{transform: `translateX(${dragValue.org + dragValue.temp}px)`}",
      ref="svg"
    )
      g.grid.xgrid(:transform="`translate(${padding.left},${svgWH.height - padding.bottom})`")
      g.grid.ygrid(:transform="`translate(${padding.left},${padding.top})`")
      g.xaxis(:transform="`translate(${padding.left},${svgWH.height - padding.bottom})`")
      g.yaxis(:transform="`translate(${padding.left},${padding.top})`")
      g(v-for="(d,index) in dataset")
        path.linepath(
          fill="none",
          :stroke="d.colorset",
          stroke-width="1.5",
          :transform="`translate(${padding.left},${padding.top})`",
          :d="setline(index)"
        )
        circle.dot(
          v-for="(e,index) in d.datas",
          key="index",
          :r="6",
          :fill="d.colorset",
          :cx="xScale(e.name) + padding.left",
          :cy="yScale(e.data) + padding.top",
          @mouseover="circleOver(e,$event)",
          @mouseout="circleOut",
        )
    .tipBox(
      :style="tipBoxStyleObj",
      :class="tipBoxOn",
      ref="tipBox")
      .startDate
        span.subtitle {{nowItem.name.toLocaleString('zh-tw',{year:'2-digit',month:'2-digit',day:'2-digit'})}}
        span {{nowItem.data}}
    .zoombar(ref="zoombar")
      .zoomdrag(
        :class="canZoomdrag ? 'on' : ''",
        :style="{top: (1 - (zoomValue-1) / (zoomScale.max-1)) * 100 + '%'}",
        @mousedown="moveZoomDrag(1,$event)",
      )
      .zoomin(@click="zoomSvgScale({wheelDelta:-1, clientX:wrapperCenter},svgWH.width)")
      .zoomout(@click="zoomSvgScale({wheelDelta:1, clientX:wrapperCenter},svgWH.width)")
</template>

<script>
export default {
  name: 'customerDaily',
  props:{
    customerData:{
      type: Array,
      required: true,
    },
    zoomScale:{
      type: Object,
      required: true,
    },
    wrapperStyleObj:{
      type: Object,
      required: true,
    },
  },
  data(){
    return {
      dataset:[],
      padding:{
        left:60,
        right:30,
        top:20,
        bottom:40,
      },
      xScale:function(){return 0},
      yScale:function(){return 0},
      zScale:'',
      xAxis:'',
      yAxis:'',
      dom:'',
      line:'',
      nowSelectX:0,
      nowSelectY:0,
      tipBoxOn:'',
      nowItem:{
        name:0,
        data:0,
      },
      overTimeout:'',
      zoomValue:1,
      canSvgMouseWheel: false,
      canDrag: false,
      dragValue:{
        org:0,
        start: 0,
        temp: 0,
      },
      canZoomdrag: false,
      zoomdragValue:{
        org: 0,
        start: 0,
        temp: 0,
      },
      wrapperCenter: 0,
    }
  },
  computed: {
    ...Vuex.mapState({
      loadingShow: state => state.loadingShow,
    }),
    tipBoxStyleObj(){
      return {
        left: `${this.nowSelectX}px`,
        top: `${this.nowSelectY}px`,
      }
    },
    svgWH(){
      return {
        width: this.wrapperStyleObj.width * this.zoomValue,
        height: this.wrapperStyleObj.height,
      }
    },
  },
  beforeMount(){
    this.dataset = this.customerData.slice().map(d=>{
      let datas = d.data.slice()
        .map(data=>{
          return {
            name: new Date(data.date),
            data: data.count
          }
        })
        .sort((a,b)=>{
          return a.name - b.name
        })
      return {
        productName:d.productName,
        datas:datas,
        colorset:d.colorset,
      }
    })
  },
  mounted(){
    this.dom = d3.select(this.$el)
    $('body').on('mouseup',this.everyDragStop)
    $('body').on('mousemove',this.everyMoveZoomDrag)
    this.wrapperCenter = $(this.$refs.wrapper).offset().left + $(this.$refs.wrapper).width() / 2
    this.uploadmultilineData()
  },
  methods:{
    ...Vuex.mapActions(['changeLoading']),
    uploadmultilineData(){
      if(this.customerData.length === 0) return

      this.dataset = this.customerData.slice().map(d=>{
        let datas = d.data.slice()
          .map(data=>{
            return {
              name: new Date(data.date),
              data: data.count
            }
          })
          .sort((a,b)=>{
            return a.name - b.name
          })
        return {
          productName:d.productName,
          datas:datas,
          colorset:d.colorset,
        }
      })
      
      this.xScale = d3.scaleTime()
        .domain([
          d3.min(this.dataset, (c)=>{ return d3.min(c.datas, (d)=>{ return d.name }) }),
          d3.max(this.dataset, (c)=>{ return d3.max(c.datas, (d)=>{ return d.name }) })
        ])
        .range([0,this.svgWH.width - this.padding.left - this.padding.right])
      
      this.yScale = d3.scaleLinear()
        .domain([
          // d3.min(this.dataset, (c)=>{ return d3.min(c.datas, (d)=>{ return d.data*1 }) }),
          0,
          d3.max(this.dataset, (c)=>{ return d3.max(c.datas, (d)=>{ return d.data*1 }) })
        ])
        .range([this.svgWH.height - this.padding.top - this.padding.bottom, 0])
        
      this.zScale = d3.scaleOrdinal(d3.schemeCategory20)
        .domain(this.dataset.map((c)=>{ return c.productName }))

      this.line = d3.line()
        .x((d)=>{ return this.xScale(new Date(d.name)) })
        .y((d)=>{ return this.yScale(d.data) })

      let xAxisArray = []
      let yAxisArray = []
      this.dataset.forEach((d)=>{
        d.datas.forEach((e)=>{
          if(!xAxisArray.find(f=>f.getTime()==e.name.getTime())) xAxisArray.push(e.name)
          if(!yAxisArray.find(f=>f===e.data)) yAxisArray.push(e.data)
        })
      })
      
      this.xAxis = d3.axisBottom(this.xScale).tickValues(xAxisArray).tickFormat(d3.timeFormat("%Y.%m.%d"))
      this.yAxis = d3.axisLeft(this.yScale).tickValues(yAxisArray).tickFormat(d=>d)

      this.dom.select('.xaxis')
        .call(this.xAxis)
        .selectAll("text")
        .call((t)=>{                
          t.each(function(d){
            let self = d3.select(this)
            let s = self.text().split('.')
            self.text('')
            self.append("tspan")
              .attr("x", 0)
              .attr("dy",".8em")
              .text(s[0]);
            self.append("tspan")
              .attr("x", 0)
              .attr("dy",".8em")
              .text(s[1]+'-'+s[2])
          })
        })
        
      this.dom.select('.yaxis').call(this.yAxis)
      this.dom.select('.xgrid').call(d3.axisBottom(this.xScale).tickValues(xAxisArray).tickSize(-1*(this.svgWH.height - this.padding.top - this.padding.bottom)).tickFormat(""))
      this.dom.select('.ygrid').call(d3.axisLeft(this.yScale).tickValues(yAxisArray).tickSize(-1*(this.svgWH.width - this.padding.left - this.padding.right)).tickFormat(""))
    },
    setline(index){
      return this.line != '' ? this.line(this.dataset[index].datas) : ''
    },
    circleOver(d,e){
      $(e.target).css('opacity','1')
      this.nowItem = d
      
      if(this.overTimeout) clearTimeout(this.overTimeout)
      this.overTimeout = setTimeout(()=>{
        let nowSelectX = e.clientX - $(this.$el).offset().left
        nowSelectX >= this.svgWH.width / 2 ? this.nowSelectX = nowSelectX - $(this.$refs.tipBox).width() : this.nowSelectX = nowSelectX
        this.nowSelectY = this.yScale(d.data)
        this.tipBoxOn = 'on'
      },1)
    },
    circleOut(e){
      $(e.target).css('opacity','0.3')
      this.tipBoxOn = ''
    },
    zoomSvg(e){
      if(!this.canSvgMouseWheel) return
      else e.preventDefault()

      this.zoomSvgScale(e, this.svgWH.width)
    },
    zoomSvgScale(e, orgWidth){
      if(e.wheelDelta > 0) this.zoomValue -= this.zoomScale.def
      else this.zoomValue += this.zoomScale.def
      if(this.zoomValue > this.zoomScale.max) this.zoomValue = this.zoomScale.max
      else if(this.zoomValue < this.zoomScale.min) this.zoomValue = this.zoomScale.min

      this.zoomdragValue.org = 100 - ((1 - (this.zoomValue - 1) / (this.zoomScale.max-1)) * 100)
      this.uploadmultilineData()
      
      this.dragValue.org -= (this.svgWH.width - orgWidth) * (e.clientX - $(this.$refs.svg).offset().left) / $(this.$refs.svg).width()
      let min = this.wrapperStyleObj.width * 1 - this.svgWH.width
      if(this.dragValue.org > 0) this.dragValue.org = 0
      else if(this.dragValue.org < min) this.dragValue.org = min
    },
    startZoom(type){
      if(type === 1) this.canSvgMouseWheel = true
      else this.canSvgMouseWheel = false
    },
    dragSvg(type, e){
      let min = this.wrapperStyleObj.width * 1 - this.svgWH.width - this.dragValue.org
      let max = this.dragValue.org * -1

      switch (type){
        case 1:
          this.canDrag = true
          this.dragValue.start = e.clientX
          break
        case 0:
          if(!this.canDrag) return
          this.dragValue.temp = e.clientX - this.dragValue.start

          if(this.dragValue.temp < min) this.dragValue.temp = min
          else if(this.dragValue.temp > max) this.dragValue.temp = max
          break
      }
    },
    moveZoomDrag(type, e){
      switch (type){
        case 1:
          this.canZoomdrag = true
          this.zoomdragValue.start = e.clientY
          break
        case 0:
          let orgWidth = this.svgWH.width

          this.zoomdragValue.temp = (e.clientY - this.zoomdragValue.start) / $(this.$refs.zoombar).height() * 100 * -1
          if(this.zoomdragValue.temp + this.zoomdragValue.org < 0) this.zoomdragValue.temp = 0 - this.zoomdragValue.org
          else if(this.zoomdragValue.temp + this.zoomdragValue.org > 100) this.zoomdragValue.temp = 100 - this.zoomdragValue.org

          this.zoomValue = (1 - ((100 - this.zoomdragValue.temp - this.zoomdragValue.org) / 100)) * (this.zoomScale.max-1) + 1
          this.uploadmultilineData()
          
          this.dragValue.org -= (this.svgWH.width - orgWidth) * (this.wrapperCenter - $(this.$refs.svg).offset().left) / $(this.$refs.svg).width()
          let min = this.wrapperStyleObj.width * 1 - this.svgWH.width
          if(this.dragValue.org > 0) this.dragValue.org = 0
          else if(this.dragValue.org < min) this.dragValue.org = min
          break
      }
    },
    everyMoveZoomDrag(e){
      if(this.canZoomdrag) this.moveZoomDrag(0, e);
    },
    everyDragStop(){
      this.canDrag = false
      this.dragValue.org += this.dragValue.temp
      this.dragValue.temp = 0

      this.canZoomdrag = false
      this.zoomdragValue.org += this.zoomdragValue.temp
      this.zoomdragValue.temp = 0
    }
  },
  watch:{
    customerData:{
      handler(e){
        this.uploadmultilineData()
      },
      deep: true
    },
    wrapperStyleObj:{
      handler(e){
        this.uploadmultilineData()
      },
      deep: true
    },

  },
  destroyed(){
    $('body').off('mouseup',this.everyDragStop)
    $('body').off('mousemove',this.everyMoveZoomDrag)
  },
  components:{

  }
}
</script>

<style lang="scss" scoped>
.customer_wrapper{
  outline: 0;
  overflow-x: hidden;
  user-select: none;

  rect{
    transition: height 0.6s ease,y 0.6s ease;
  }

  .grid{
    opacity: 0.1;

    line{
      stroke: lightgrey;
      stroke-opacity: 0.1;
      shape-rendering: crispEdges;
    }

    path{
      stroke-width: 0;
    }
  }

  .dot{
    opacity: 0.3;
    cursor: pointer;
  }

  svg{
    position: absolute;
    z-index: 1;
    cursor: pointer;
  }

  
  .tipBox{
    position: absolute;
    width: auto;
    background-color: rgba(255,255,255,0.9);
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px;
    transition: 0;
    opacity: 0;
    z-index: 9;
    pointer-events: none;

    &.on{
      transition:opacity 0.3s;
      opacity: 1;
    }

    .startDate,.endDate{
      position: relative;
      min-width: 50px;
      display: inline-block;
      margin-right: 10px;
      padding-right: 10px;
      vertical-align: top;

      .subtitle{ font-weight: bolder; }
    }

    span{
      position: relative;
      display: block;
      font-size: 12px;
      color: #000;
      line-height: 16px;
      margin-bottom: 6px;
    }
  }

  .tip{
    position: relative;
    width:auto;
    float: left;
    text-align: left;
    margin-right: 15px;

    .rect{
      width: 10px;
      height: 10px;
      display: inline-block;
      margin-right: 5px;
      margin-top: 3px;
      vertical-align: top;
    }

    .text{
      widows: auto;
      font-size: 12px;
      color: #000;
      display: inline-block;
      vertical-align: top;
    }
  }

  .zoombar{
    position: absolute;
    width: 14px;
    height: 70px;
    right: 45px;
    bottom: 100px;
    z-index: 8;
    pointer-events: none;

    &:before{
      position: absolute;
      content: "";
      width: 4px;
      height: calc(100% + 30px);
      left: 5px;
      top: 0;
      z-index: 0;
      background-color: #e3e0e1;
    }

    .zoomdrag{
      position: absolute;
      width: 14px;
      height: 30px;
      left: 0;
      background-color: #e3e0e1;
      z-index: 1;
      pointer-events: auto;
      cursor: grab;

      &.on{
        pointer-events: none;
      }

      &:before{
        position: absolute;
        width: 100%;
        height: 100%;
        content: "=";
        font-size: 12px;
        line-height: 30px;
        text-align: center;
        color: #fff;
      }
    }

    .zoomin{
      position: absolute;
      width: 14px;
      height: 14px;
      top: -15px;
      left: 0;
      background-color: #e3e0e1;
      cursor: pointer;
      pointer-events: auto;

      &:before{
        position: absolute;
        width: 100%;
        height: 100%;
        content:"+";
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        color: #fff;
      }
    }

    .zoomout{
      position: absolute;
      width: 14px;
      height: 14px;
      bottom: -45px;
      left: 0;
      background-color: #e3e0e1;
      cursor: pointer;
      pointer-events: auto;

      &:before{
        position: absolute;
        width: 100%;
        height: 100%;
        content:"-";
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        color: #fff;
      }
    }
  }
}

</style>