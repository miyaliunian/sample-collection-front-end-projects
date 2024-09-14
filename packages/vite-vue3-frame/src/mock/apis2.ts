import Mock from "mockjs";
export default [
  // 地图
  {
    url: "/api/map",
    type: "post",
    response: function (option: any) {
      const $name = JSON.parse(option.body).name;
      if ($name) {
        return Mock.mock({
          status: 200,
          message: "提交成功",
          data: {
            map: [
              {
                name: "beijing",
                num: 1,
              },
              {
                name: "xian",
                num: 2,
              },
            ],
          },
        });
      } else {
        return Mock.mock({
          status: 400,
          message: "未提交参数",
        });
      }
    },
  },
];
