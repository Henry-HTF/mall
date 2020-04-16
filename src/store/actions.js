import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    // 1.添加新的商品
    // 常用的数组方法有哪些：push/pop/unshift/shift/sort/reverse/map/filter/reduce/join
    let oldProduct = null;
    for (let item of context.state.cartList) {
      if (item.iid === payload.iid) {
        oldProduct = item;
      }
    }

    // 2.判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}