import Mock from "mockjs";
import { MockParams } from "./typing";
import apis1 from "./apis1";
import apis2 from "./apis2";
const mocks = [...apis1, ...apis2];
//设置延时时间
Mock.setup({
  timeout: "300",
});

export function mockXHR() {
  let i: MockParams;
  for (i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || "get", i.response);
  }
}
