/**
 * Created by uv2sun on 15/2/14.
 * getGoodsArray 最终得到的商品数组格式：
 * [
 *      {
 *          goods:{},//添加时，给入的goods对象
 *          count:2//count
 *      },
 *      {
 *          goods:{},//添加时，给入的goods对象
 *          count:2//count
 *      },
 *      {
 *          goods:{},//添加时，给入的goods对象
 *          count:2//count
 *      }
 * ]
 */
angular.module('df.service.shopcar', [])
    .service('shopcar', ['$rootScope', function (rs) {
        rs.shopcar = {goodsArray: []};
        return {
            /**
             * @param goods 商品对象必须给入属性：goods_id
             * @param count 添加的个数，可不传，默认为1
             */
            addGoods: function (goods, count) {
                if (goods) {
                    var has = false;
                    for (var i = 0; i < rs.shopcar.goodsArray.length; i++) {
                        if (rs.shopcar.goodsArray[i].goods.goods_id == goods.goods_id) {
                            has = true;
                            rs.shopcar.goodsArray[i].count += parseInt(count || 1);
                            break;
                        }
                    }
                    if (!has) {
                        rs.shopcar.goodsArray.push({
                            goods: angular.copy(goods), count: parseInt(count || 1)
                        });
                    }
                }
            },
            /**
             * 清空购物车
             */
            clearShopCar: function () {
                rs.shopcar.goodsArray.splice(0, rs.shopcar.goodsArray.length);
            },
            /**
             * 获取购物车里的商品数组
             * 格式：[{goods:{},count:2},{goods:{},count:2},{goods:{},count:2}]
             * @returns {*}
             */
            getGoodsArray: function () {
                return rs.shopcar.goodsArray;
            },
            /**
             * 从购物车里删除指定商品
             * @param goods goods必须给入key：goods_id
             * @param count 个数可以不传，默认唯一。
             * @returns 反回剩余商品对象，格式：{goods:{},count:1}，如果没有剩余则返回false
             */
            deleteGoods: function (goods, count) {
                if (goods) {
                    var goodsObject;
                    for (var i = 0; i < rs.shopcar.goodsArray.length; i++) {
                        if (rs.shopcar.goodsArray[i].goods.goods_id == goods.goods_id) {
                            goodsObject = rs.shopcar.goodsArray[i];
                            goodsObject.count -= parseInt(count || 1);
                            if (goodsObject.count <= 0) {
                                rs.shopcar.goodsArray.splice(i, 1);
                                goodsObject = null;
                            }
                            break;
                        }
                    }
                    return goodsObject;
                }
            }
        }
    }]);
