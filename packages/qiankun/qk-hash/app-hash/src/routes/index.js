import Home from "@/views/Home.vue";
import About from "@/views/About.vue"

const routes = [
  {
    path: '/vuehash',
    name: 'Home',
    component: Home
  },
  {
    path: '/vuehash/about',
    name: 'About',
    component: About
  }
]

export default routes
