<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"

  import Scroll from "components/common/scroll/Scroll"

  import {getDetail, Goods, Shop} from "network/detail"

  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {}
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      Scroll,
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        // 2.1 获取轮播图信息
        const data = res.result;
        this.topImages = data.itemInfo.topImages
        // 2.2 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 2.3 获取商家信息
        this.shop = new Shop(data.shopInfo)
        // 2.4 获取商品详细信息
        this.detailInfo = data.detailInfo;
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }

</style>