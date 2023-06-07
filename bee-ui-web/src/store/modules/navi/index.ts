import { defineStore } from 'pinia'
import img1 from './imgs/img1.jpeg'
import img2 from './imgs/img2.jpeg'
import img3 from './imgs/img3.jpeg'
import img4 from './imgs/img4.jpeg'

const useNaviStore = defineStore('navi', {
  state: () => ({
    items: [
      {
        value: 'home',
        label: '首页',
      },
      {
        value: 'flower',
        label: '鲜花',
        category: [
          {
            value: 'hmg',
            label: '红玫瑰',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/12.jpg',
          },
          {
            value: 'bmg',
            label: '白玫瑰',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/11.jpg',
          },
          {
            value: 'huangmg',
            label: '黄玫瑰',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/13.jpg',
          },
          {
            value: 'lmg',
            label: '蓝玫瑰',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/9.jpg',
          },
          {
            value: 'bh',
            label: '百合',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/14.jpg',
          },
          {
            value: 'ml',
            label: '茉莉',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/15.jpg',
          },
        ],
      },
      {
        value: 'cake',
        label: '蛋糕',
        category: [
          {
            value: 'sydg',
            label: '生日蛋糕',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/1_gfo8.jpg',
          },
          {
            value: 'hqdg',
            label: '婚庆蛋糕',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/2_br3r.jpg',
          },
          {
            value: 'nydg',
            label: '奶油蛋糕',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/3_hcla.jpg',
          },
          {
            value: 'msdg',
            label: '慕斯蛋糕',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/4_f9sg.jpg',
          },
          {
            value: 'ddg',
            label: '大蛋糕',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/8_ou6u.jpg',
          },
          {
            value: 'xxdg',
            label: '小小蛋糕',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/6_05lt.jpg',
          },
        ],
      },
      {
        value: 'gift',
        label: '礼品',
        category: [
          {
            value: 'srlp',
            label: '生日礼品',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/10.jpg',
          },
          {
            value: 'qllp',
            label: '情侣礼品',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/19.jpg',
          },
          {
            value: 'txlp',
            label: '同学礼品',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/1_9el9.jpg',
          },
          {
            value: 'tslp',
            label: '同事礼品',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/4_bau6.jpg',
          },
          {
            value: 'fwlp',
            label: '服务礼品',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/2_hbo8.jpg',
          },
          {
            value: 'hzlp',
            label: '孩子礼品',
            img: 'https://pml8a4109-pic32.websiteonline.cn/upload/6_nify.jpg',
          },
        ],
      },
      {
        value: 'flash',
        label: '秒杀',
      },
      {
        value: 'group',
        label: '团购',
      },
    ],
    bannerImages: [img1, img2, img3, img4],
    categoryList: [
      {
        value: 0,
        label: '鲜花用途',
        cateList: [
          {
            value: 0,
            label: '爱情鲜花',
          },
          {
            value: 1,
            label: '生日鲜花',
          },
          {
            value: 2,
            label: '友情鲜花',
          },
          {
            value: 3,
            label: '问候长辈',
          },
          {
            value: 4,
            label: '探病慰问',
          },
          {
            value: 5,
            label: '道歉鲜花',
          },
          {
            value: 6,
            label: '祝贺鲜花',
          },
          {
            value: 7,
            label: '婚庆鲜花',
          },
          {
            value: 8,
            label: '商务鲜花',
          },
        ],
      },
      {
        value: 1,
        label: '鲜花花材',
        cateList: [
          {
            value: 0,
            label: '玫瑰',
          },
          {
            value: 1,
            label: '康乃馨',
          },
          {
            value: 2,
            label: '向日葵',
          },
          {
            value: 3,
            label: '扶郎',
          },
          {
            value: 4,
            label: '郁金香',
          },
          {
            value: 5,
            label: '马蹄莲',
          },
        ],
      },
      {
        value: 2,
        label: '永生花',
        hasPop: true,
        cateList: [
          {
            value: 0,
            label: '永生瓶花',
          },
          {
            value: 1,
            label: '经典花盒',
          },
          {
            value: 2,
            label: '特色永生花',
          },
        ],
      },
      {
        value: 3,
        label: '蛋糕',
        hasPop: true,
        cateList: [
          {
            value: 0,
            label: '元祖',
          },
          {
            value: 1,
            label: '幸福西饼',
          },
          {
            value: 2,
            label: '21cake',
          },
          {
            value: 3,
            label: '诺心蛋糕',
          },
          {
            value: 4,
            label: '窝夫小子',
          },
          {
            value: 5,
            label: 'BONCAKE',
          },
        ],
      },
    ],
  }),
})

export default useNaviStore
