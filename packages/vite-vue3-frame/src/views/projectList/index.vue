<template>
  <div class="project-list">
    <div
      class="project-list-card"
      v-for="(item, index) in dataList"
      :key="index"
      @click="handleChooseProject(item)"
    >
      <div class="project-list-card-title">{{ item.projectName }}</div>
      <!-- <div class="project-list-card-con">
        <div>机械数量</div>
        <div>{{ item.machineAmount }}</div>
      </div> -->
      <div class="project-list-card-con">
        <div>状态</div>
        <div>{{ item.projectStatusName }}</div>
      </div>
      <div class="project-list-card-con">
        <div>地址</div>
        <div>
          {{ item.provinceName }}{{ item.cityName }}{{ item.countryName }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import scriptMixin from "./index";
export default scriptMixin;
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
