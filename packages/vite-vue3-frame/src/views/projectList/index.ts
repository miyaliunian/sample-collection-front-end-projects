import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAllProjectList } from "@/api/base";
export default {
  setup() {
    const dataList = ref([
      {
        cityName: "锦州市",
        countryName: "市辖区",
        duration: null,
        id: 48,
        latitude: 41.096114,
        longitude: 121.126859,
        projectId: "d270b892-bdd0-4b6f-af23-46e6eed06871",
        projectName: "测试项目001",
        projectStatusName: "在建",
        provinceName: "辽宁省",
        typeName: "铁路工程",
        machineAmount:28,
        mapMachineAmount:15,
        workingMachineAmount: 8,
        idlingMachineAmount: 7,
        motionlessMachineAmount: 2,
        offlineMachineAmount:3
      },
      {
        cityName: "沈阳市",
        countryName: "铁西区",
        duration: null,
        id: 49,
        latitude: 50.12335,
        longitude: 60.12335,
        projectId: "4103235c-785c-4aef-bcac-8ae3dd4a013a",
        projectName: "测试项目002",
        projectStatusName: "在建",
        provinceName: "辽宁省",
        typeName: "铁路工程",
        machineAmount:30,
        mapMachineAmount:20,
        workingMachineAmount: 8,
        idlingMachineAmount: 4,
        motionlessMachineAmount: 2,
        offlineMachineAmount:1
      },
      {
        cityName: "市辖区",
        countryName: "东城区",
        duration: null,
        id: 50,
        latitude: 50.12335,
        longitude: 60.12335,
        projectId: "b6bb78f4-68ad-4793-8a94-be0536126db1",
        projectName: "测试项目003",
        projectStatusName: "在建",
        provinceName: "北京市",
        typeName: "铁路工程",
        machineAmount:35,
        mapMachineAmount:21,
        workingMachineAmount: 8,
        idlingMachineAmount: 14,
        motionlessMachineAmount: 4,
        offlineMachineAmount:0
      },
      {
        cityName: "丹东市",
        countryName: "凤城市",
        duration: null,
        id: 51,
        latitude: 40.45218,
        longitude: 124.066873,
        projectId: "5abcffe2-2027-4013-824d-13ea8401bea8",
        projectName:"测试项目004",
        projectStatusName: "在建",
        provinceName: "辽宁省",
        typeName: "铁路工程",
        machineAmount:12,
        mapMachineAmount:20,
        workingMachineAmount: 3,
        idlingMachineAmount: 2,
        motionlessMachineAmount: 0,
        offlineMachineAmount:1
      }
    ]);
    const router = useRouter();
    const handleChooseProject = (params: any) => {
      sessionStorage.setItem("CURRENT_PROJECT", JSON.stringify(params));
      router.push("/");
    };
    const handleGetProjectListData = () => {
      getAllProjectList("")
        .then((res: any) => {
          console.log(res);
          dataList.value = res;
        })
        .catch((err: any) => {
          console.error(err);
        });
    };
    onMounted(() => {
      //handleGetProjectListData();
    });
    return {
      dataList,
      handleChooseProject,
    };
  },
};
