import router from "@/router";
import {
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  ref,
  computed,
} from "vue";
import { useRoute } from "vue-router";
export default {
  name:"MachineList",
  setup() {
    let activeName = ref('all')
    let dataList = ref([
      {
        title: '混凝土01-黄兴',
        secondTitle: '混凝土搅拌机三一其他',
        status: '运行',
        project: '沪昆高铁01分部',
        light: '90%',
        oil:'54%|202L'
      },
      {
        title: '混凝土02-黄兴',
        secondTitle: '混凝土搅拌机三一其他',
        status: '运行',
        project: '沪昆高铁02分部',
        light: '50%',
        oil:'54%|202L'
      }
    ])
    const onClickTab = (val:any) => {
      console.log(val)
      switch (val.name) {
        case 'a':
          break;
        case 'b':
          break;
        case 'c':
          break;
        case 'd':
          break;
        default:
          break;
      }
    }
    const handleDetail = (val: any) => {
      //router.push('/machine-detail')
    }
    onMounted(() => {
      const type: any = useRoute().query.type
      activeName.value = type
    })
    return {
      dataList,
      activeName,
      onClickTab,
      handleDetail
    }
  }
}