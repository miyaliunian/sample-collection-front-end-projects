<template>
  <div class="errPage">
    <div class="content">
      <img src="@/assets/img/404.png" alt="" />
      <van-button plain type="primary" hairline size="small" @click="backHome"
        >返回首页</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
export default {
  name: "error404",
  setup() {
    const router = useRouter();
    const backHome = () => {
      router.push("/");
    };
    return {
      backHome,
    };
  },
};
</script>
<style scoped>
.errPage {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
.errPage .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.errPage .content img {
  width: 50%;
  margin-bottom: 50px;
}
</style>
