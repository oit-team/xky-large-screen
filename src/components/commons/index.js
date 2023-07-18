import Vue from 'vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Image from './Image'
import Button from './Button'
import Icon from './Icon'
import Message from './Message'

import 'swiper/css/swiper.css'

Vue.prototype.$message = Message

Vue.component('VSwiper', Swiper)
Vue.component('VSwiperSlide', SwiperSlide)
Vue.component(Image.name, Image)
Vue.component(Button.name, Button)
Vue.component(Icon.name, Icon)
