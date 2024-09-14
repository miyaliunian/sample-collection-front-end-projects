<template>
  <div class="machine-list">
    <van-tabs v-model:active="activeName" @click-tab="onClickTab" color="#1961AC">
      <van-tab title="全部" name="all"></van-tab>
      <van-tab title="运行" name="run"></van-tab>
      <van-tab title="怠速" name="slow"></van-tab>
      <van-tab title="静止" name="stop"></van-tab>
      <van-tab title="离线" name="die"></van-tab>
      <van-tab title="未入网" name="offline"></van-tab>
    </van-tabs>
    <!-- 卡片列表 -->
    <div class="machine-list-card" v-for="(item,index) in dataList" :key="index" @click="handleDetail(item)" >
      <div class="machine-list-card-img">
        <img src="@/assets/img/machine01.png" />
      </div>
      <div class="machine-list-card-con">
        <div class="machine-list-card-con-desc">
          <div class="machine-list-card-con-desc-sign">
            <div class="machine-list-card-con-desc-sign-title">
              <div>{{item.title}}</div>
              <div>{{item.secondTitle}}</div>
            </div>
            <div class="machine-list-card-con-desc-sign-run">
              <span v-if="activeName == 'all'" >运行</span>
              <span v-if="activeName == 'run'" >运行</span>
              <span v-if="activeName == 'slow'" >怠速</span>
              <span v-if="activeName == 'stop'" >静止</span>
              <span v-if="activeName == 'die'" >离线</span>
              <span v-if="activeName == 'offline'" >未入网</span>
            </div>
          </div>
          <div class="machine-list-card-con-desc-box">
            <div class="machine-list-card-con-desc-box-row">
              <span>项目</span><span>{{item.project}}</span>
            </div>
            <div class="machine-list-card-con-desc-box-row">
              <span>终端电量</span><span>{{item.light}}</span>
            </div>
            <div class="machine-list-card-con-desc-box-row">
              <span>当前油量</span><span>{{item.oil}}</span>
            </div>
          </div>
        </div>
        <div class="machine-list-card-con-panel">
          <div class="panel-box-run">
            <div class="panel-point-run"></div>
            <span>今日运行</span>
          </div>
          <div class="panel-box-desc">9.21h</div>
          <div class="machine-list-card-con-panel-line"></div>
          <div class="panel-box-stop">
            <div class="panel-point-stop"></div>
            <span>今日怠速</span>
          </div>
          <div class="panel-box-desc">1.58h</div>
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
