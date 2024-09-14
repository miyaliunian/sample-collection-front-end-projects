import Mock from "mockjs";
export default [
  // 看板信息
  {
    url: "/api/system/project",
    type: "get",
    response: () => {
      return {
        code: 200,
        message: "成功",
        data: {
          cityName: "锦州市",
          countryName: "市辖区",
          createTime: 1670566289183,
          id: 48,
          idlingMachineAmount: 0,
          latitude: 41.096114,
          longitude: 121.126859,
          machineAmount: 14,
          mapMachineAmount: 5,
          motionlessMachineAmount: 5,
          offlineMachineAmount: 0,
          projectId: "d270b892-bdd0-4b6f-af23-46e6eed06871",
          projectName: "测试工程001",
          projectOrgId: "5785aedd-fb3d-4561-ad98-4545823237e5",
          projectStatusName: "在建",
          provinceName: "辽宁省",
          typeName: "铁路工程",
          updateTime: 1670566289183,
          workingMachineAmount: 0,
        },
      };
    },
  },
  // 内页-油量统计
  {
    url: "/api/system/oil/stastics",
    type: "get",
    response: () => {
      return {
        code: 200,
        message: "成功",
        data: {
          // 类别:
          time: "2022-12-07",
          // 运行区间
          runArea: [
            [
              {
                name: "",
                xAxis: "07:00",
              },
              {
                xAxis: "10:00",
              },
            ],
            [
              {
                name: "",
                xAxis: "17:00",
              },
              {
                xAxis: "21:00",
              },
            ],
          ],
          // 怠速区间
          slowArea: [
            [
              {
                name: "",
                xAxis: "00:00",
              },
              {
                xAxis: "01:00",
              },
            ],
            [
              {
                name: "",
                xAxis: "21:00",
              },
              {
                xAxis: "22:00",
              },
            ],
          ],
          // 加油量
          total: [
            400,
            400,
            400,
            400,
            500,
            500,
            600,
            600,
            700,
            700,
            750,
            500,
            400,
            400,
            400,
            400,
            400,
            400,
            500,
            500,
            600,
            600,
            700,
            700,
          ],
        },
      };
    },
  },
  // 工时统计
  {
    url: "/api/system/statics/hours",
    type: "get",
    response: () => {
      return {
        code: 200,
        message: "成功",
        data: [
          [
            {
              name: "占位",
              data: [0, 0, 0, 0, 0, 0, 0],
            },
            {
              name: "运行",
              data: [5, 2, 0, 0, 4, 0, 0],
            },
            {
              name: "怠速",
              data: [0, 0, 2, 4, 0, 3, 3],
            },
          ],
          // 1-2时
          [
            {
              name: "占位",
              data: [2, 0, 0, 8, 0, 0, 0],
            },
            {
              name: "运行",
              data: [0, 2, 0, 0, 4, 0, 0],
            },
            {
              name: "怠速",
              data: [0, 0, 2, 0, 0, 3, 3],
            },
          ],
          // 2-3时
          [
            {
              name: "占位",
              data: [0, 0, 0, 0, 0, 0, 0],
            },
            {
              name: "运行",
              data: [0, 1, 1, 0, 0, 1, 1],
            },
            {
              name: "怠速",
              data: [1, 1, 0, 1, 2, 0, 0],
            },
          ],
        ],
      };
    },
  },
  // 机械开工率
  {
    url: "/api/system/machine/work",
    type: "get",
    response: (params: any) => {
      let type = params.url.split("?")[1].split("=")[1];
      if (type === "day") {
        return {
          code: 200,
          message: "成功",
          data: {
            now: [18, 14, 15, 10, 12, 19, 35],
            add: [37, 8, 18, 8, 37, 8, 22],
          },
        };
      } else if (type === "week") {
        return {
          code: 200,
          message: "成功",
          data: {
            now: [1, 24, 19, 30, 22, 39, 25],
            add: [17, 28, 8, 18, 27, 18, 12],
          },
        };
      } else if (type === "month") {
        return {
          code: 200,
          message: "成功",
          data: {
            now: [12, 10, 25, 18, 19, 29, 25],
            add: [7, 18, 12, 18, 27, 30, 2],
          },
        };
      }
    },
  },
  // 首页-油量统计
  {
    url: "/api/system/home/oil",
    type: "get",
    response: (params: any) => {
      let type = params.url.split("?")[1].split("=")[1];
      if (type === "day") {
        return {
          code: 200,
          message: "成功",
          data: {
            run: [842.68, 233.64, 496.69, 131.18, 974.29, 595.43, 469.17],
            slow: [527, 399.72, 611.14, 665.12, 409.12, 673.64, 514.21],
          },
        };
      } else if (type === "week") {
        return {
          code: 200,
          message: "成功",
          data: {
            run: [5898.76, 1635.48, 3476.83, 918.26, 6820.03, 4168.01, 3284.19],
            slow: [3689, 2789.04, 4277.98, 4585.84, 2863.84, 4715.48, 3599.47],
          },
        };
      } else if (type === "month") {
        return {
          code: 200,
          message: "成功",
          data: {
            run: [
              25280.4,
              7009.2,
              14900.7,
              3935.4,
              29228.7,
              17862.9,
              14075.1,
              21280.4,
              6009.2,
              12900.7,
              3435.4,
              22228.7,
              15862.9,
              11075.1,
            ],
            slow: [
              15810,
              11991.6,
              18334.2,
              19953.6,
              12273.6,
              20209.2,
              15426,
              12810,
              10991.6,
              14334.2,
              16953.6,
              10273.6,
              18209.2,
              12426,
            ],
          },
        };
      }
    },
  },
  // GetUserInfo
  {
    url: "/api/system/userinfo",
    type: "get",
    response: () => {
      return {
        code: 200,
        message: "成功",
        data: {
          name: "testName",
        },
      };
    },
  },
  // GetToken
  {
    url: "/api/oauth/token",
    type: "post",
    response: (option: any) => {
      const $name = JSON.parse(option.body).name;
      if ($name) {
        return Mock.mock({
          code: 200,
          message: "成功",
          data: {
            name: "testToken",
          },
        });
      } else {
        return Mock.mock({
          code: 400,
          message: "未提交参数",
        });
      }
    },
  },
];
