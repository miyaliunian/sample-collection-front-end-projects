import {
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  ref,
  computed,
} from "vue";
import { getAllProjectList, getBaseProjectInfo } from "@/api/base";
import axios from "axios";
import router from "@/router";
import { truncate } from "fs";
import moment from "moment";
export default {
  setup() {
    const initData = ref()
    const echarts = getCurrentInstance()?.appContext.config.globalProperties
      .$echarts;
    // 当前项目数据
    const systemProject = computed({
      get: () => {
        const data = sessionStorage.getItem("CURRENT_PROJECT") || "";
        if (data) {
          return JSON.parse(data);
        } else {
          return initData.value
        }
      },
      set: (val) => {
        return val;
      },
    });
    const getData = () => {

    };
    // 查看机械列表
    const handleMachineList = (val: any) => {
      router.push({ path: "/machineList", query: { type: val } });
    };
    // 选择统计类型
    const handleSelectType = (name: string) => {
      if (name == "oil") {
        showPickerOilType.value = true;
      } else if (name == "machine") {
        showPickerMachineType.value = true;
      }
    };
    // 警告异常
    let activeWarning = ref("01");
    const handleActiveWarn = (val: any) => {
      activeWarning.value = val;
    };
    // 油量模块
    // 油量统计模块
    let selectOilType = ref("按日");
    let initEchartOil = ref();
    let showPickerOilType:any = ref(false);
    let oilData = ref({
      run: [],
      slow: [],
    });
    const oilTypeColumns = [
      { text: "按日", value: "day" },
      { text: "按周", value: "week" },
      { text: "按月", value: "mounth" },
    ];
    const onConfirmOilType = (val: any) => {
      selectOilType.value = val.text;
      showPickerOilType.value = false;
      getOilData();
    };
    const xAxisData = ref(["1", "2", "3", "4", "5", "6","7"])
    // 绘制油量图表
    const echartOil = () => {
      // 基于准备好的dom，初始化echarts实例
      initEchartOil.value = echarts.init(document.getElementById("cartOil"));
      // 绘制图表
      initEchartOil.value.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["项目加油总量", "项目总耗油量"],
          icon: "rect",
          itemHeight: 8,
          itemWidth: 8,
          left: 0,
          top: 0,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: xAxisData.value,
        },
        yAxis: [
          {
            name: '单位(L)',
            type: "value",
          },
        ],
        series: [
          {
            name: "项目加油总量",
            type: "line",
            data: oilData.value.run,
            label: {
              show: true, //开启显示
              color: "#13C2C2",
              position: "top", //在上方显示
            },
            itemStyle: {
              borderColor: "#13C2C2",
              color: "#13C2C2",
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(19,194,194, 0.56)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(19,194,194, 0)'
                  }
                ],
                global: false // 缺省为 false
              }
            },
          },
          {
            name: "项目总耗油量",
            type: "line",
            data: oilData.value.slow,
            label: {
              show: true, //开启显示
              color: "#1961AC",
              position: "top", //在上方显示
            },
            itemStyle: {
              borderColor: "#1961AC",
              color: "#1961AC",
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(25,97,172, 0.56)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(25,97,172, 0)'
                  }
                ],
                global: false // 缺省为 false
              }
            },
          },
        ],
      });
    };
    // 机械开工率模块
    let selectMachineType = ref("今日");
    let showPickerMachineType = ref(false);
    let machineData = ref({
      now: [],
      add: [],
    });
    const machineTypeColumns = [
      { text: "今日", value: "day" },
      { text: "本周", value: "week" },
      { text: "本月", value: "mounth" },
    ];
    const onConfirmMachineType = (val: any) => {
      selectMachineType.value = val.text;
      showPickerMachineType.value = false;
      getMachineData();
    };
    const onCancelMachineType = () => {
      showPickerMachineType.value = false;
      showPickerOilType.value = false;
    };
    let initMachineWork = ref();
    const machineWork = () => {
      // 基于准备好的dom，初始化echarts实例
      initMachineWork.value = echarts.init(
        document.getElementById("myChartMachineWork")
      );
      // 绘制图表
      initMachineWork.value.setOption({
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            inside: false,
            fontSize: "10",
          },
          data: ["搅拌机", "推土机", "挖掘机", "自卸车"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
            stack: "one",
            barWidth: "22",
            itemStyle: {
              borderColor: "#1961AC",
              color: "#1961AC",
            },
            label: {
              show: true,
              position: "top",
              formatter: "{c}%",
            },
            data: machineData.value.now,
          },
          {
            type: "bar",
            stack: "one",
            barWidth: "22",
            itemStyle: {
              borderColor: "#D1DFEE",
              color: "#D1DFEE",
            },
            data: machineData.value.add,
          },
        ],
      });
    };
    // 机械类型模块
    let initMachineType = ref();
    const machineType = () => {
      // 基于准备好的dom，初始化echarts实例
      initMachineType.value = echarts.init(
        document.getElementById("myChartMachineType")
      );
      // 绘制图表
      initMachineType.value.setOption({
        title: {
          show: false,
          fontSize: 20,
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertial",
          itemWidth: 8,
          itemHeight: 8,
          right: 0,
          bottom: "40%",
          textStyle: {
            color: "rgba(0,0,0,0.65)",
          },
        },
        series: [
          {
            showEmptyCircle: true,
            name: "机械类型",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "inside",
              formatter: "{c}",
              align: "center",
              baseline: "middle",
              fontSize: 14,
              color: "#fff",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "14",
                fontWeight: "bold",
              },
            },
            center: ["35%", "50%"],
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 8,
                name: "混凝土搅拌车",
                itemStyle: {
                  borderColor: "#1961AC",
                  color: "#1961AC",
                },
              },
              {
                value: 5,
                name: "推土机",
                itemStyle: {
                  borderColor: "#13C2C2",
                  color: "#13C2C2",
                },
              },
              {
                value: 12,
                name: "挖掘机",
                itemStyle: {
                  borderColor: "#A3E4D7",
                  color: "#A3E4D7",
                },
              },
              {
                value: 9,
                name: "自卸车",
                itemStyle: {
                  borderColor: "#EDB524",
                  color: "#EDB524",
                },
              },
            ],
          },
        ],
      });
    };
    // 初始化信息
    //const systemProject = ref();
    const getSystemProject = (projectId: any) => {
      axios
        .get("/api/system/project")
        .then((res) => {
          console.log("看板数据", res);
          initData.value = res
          //systemProject.set(res)
          //systemProject.value = res;
          console.log('pppp',systemProject)
        })
        .catch((err) => {
          console.error(err);
        });
      // getBaseProjectInfo({ projectId: projectId })
      //   .then((res: any) => {
      //     console.log("看板数据", res);
      //     systemProject.value = res;
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    };
    // 项目列表信息
    const handleGetProjectListData = () => {
      getAllProjectList("")
        .then((res: any) => {
          console.log("项目列表信息", res);
          const projectId = res[0].projectId;
          getSystemProject(projectId);
        })
        .catch((err: any) => {
          console.error(err);
        });
    };
    // 获取油量统计信息
    const getOilData = () => {
      let type = "day";
      switch (selectOilType.value) {
        case "按日":
          type = "day";
          xAxisData.value = ["1", "2", "3", "4", "5", "6","7"]
          break;
        case "按周":
          type = "week";
          xAxisData.value = ["1", "2", "3", "4", "5", "6","7"]
          break;
        case "按月":
          type = "month";
          xAxisData.value = ["1", "2", "3", "4", "5", "6","7","8","9","10","11","12"]
          break;
        default:
          break;
      }
      axios
        .get(`/api/system/home/oil?type=${type}`)
        .then((res: any) => {
          oilData.value = res;
          let oilEchart = initEchartOil;
          // 重新渲染图表前注销当前图表
          if (oilEchart.value) {
            function echartClear(e: any) {
              e.value.clear(); //清空图表
              e.value.dispose(); //释放图表组件
              e.value = null;
            }
            echartClear(initEchartOil);
          }
          echartOil();
        })
        .catch((err) => {
          console.error(err);
        });
    };
    // 获取机械开工率信息
    const getMachineData = () => {
      let type = "day";
      switch (selectMachineType.value) {
        case "今日":
          type = "day";
          break;
        case "本周":
          type = "week";
          break;
        case "本月":
          type = "month";
          break;
        default:
          break;
      }
      axios
        .get(`/api/system/machine/work?type=${type}`)
        .then((res: any) => {
          console.log("机械开工率", res);
          machineData.value = res;
          let machineEchart = initMachineWork;
          // 重新渲染图表前注销当前图表
          if (machineEchart.value) {
            function echartClear(e: any) {
              e.value.clear(); //清空图表
              e.value.dispose(); //释放图表组件
              e.value = null;
            }
            echartClear(initMachineWork);
          }
          machineWork();
        })
        .catch((err) => {
          console.error(err);
        });
    };
    onMounted(() => {
      getOilData();
      getMachineData();
      machineType();
      // handleGetProjectListData();
      getSystemProject('')
    });
    onBeforeUnmount(() => {
      function echartClear(e: any) {
        e.value.clear(); //清空图表
        e.value.dispose(); //释放图表组件
        e.value = null;
      }
      echartClear(initEchartOil);
      echartClear(initMachineWork);
      echartClear(initMachineType);
    });
    return {
      initData,
      systemProject,
      //currentProject,
      getData,
      handleSelectType,
      activeWarning,
      handleActiveWarn,
      handleMachineList,
      // 油量模块
      oilData,
      selectOilType,
      onConfirmOilType,
      showPickerOilType,
      oilTypeColumns,
      // 机械开工率模块
      getMachineData,
      selectMachineType,
      machineTypeColumns,
      onConfirmMachineType,
      showPickerMachineType,
      onCancelMachineType,
    };
  },
};
