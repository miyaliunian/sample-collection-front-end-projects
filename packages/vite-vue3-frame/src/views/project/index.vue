<template>
  <div class="project">
    <div class="project-header">
      <!-- row-one -->
      <div class="project-header_row_one">
        <div class="project-header_row_one_left">
          <div class="project-header_row_one_left_title">
            {{ systemProject?.projectName }}
          </div>
          <!-- <div class="project-header_row_one_left_code">
            项目编码 {{ systemProject?.projectId }}
          </div> -->
        </div>
        <div class="project-header_row_one_right">
          <router-link to="/projectlist">切换项目</router-link>
        </div>
      </div>
      <!-- row-two -->
      <div class="project-header_row_two">
        <div class="project-header_row_two_inner">
          <div class="project-header_row_two_inner_title">状态</div>
          <div class="project-header_row_two_inner_con">
            {{ systemProject?.projectStatusName }}
          </div>
        </div>
        <div class="project-header_row_two_inner">
          <div class="project-header_row_two_inner_title">类别</div>
          <div class="project-header_row_two_inner_con">
            {{ systemProject?.typeName }}
          </div>
        </div>
        <div class="project-header_row_two_inner">
          <div class="project-header_row_two_inner_title">地址</div>
          <div class="project-header_row_two_inner_con">
            <!-- <van-progress :percentage="systemProject?.finishPercent" /> -->
            {{ systemProject?.provinceName }}{{ systemProject?.cityName
            }}{{ systemProject?.countryName }}
          </div>
        </div>
      </div>
    </div>
    <div class="project-card">
      <div class="project-card-machine" @click="handleMachineList('all')">
        <div class="project-card-title">
          <img src="@/assets/img/project/machine.png" />
          <span>机械数量</span>
        </div>
        <div class="project-card-num">{{ systemProject?.machineAmount }}</div>
      </div>
      <div class="project-card-map">
        <div class="project-card-title">
          <img src="@/assets/img/project/map.png" />
          <span>
            <router-link to="/projectmap">地图数量</router-link>
          </span>
        </div>
        <div class="project-card-num">
          {{ systemProject?.mapMachineAmount }}
        </div>
      </div>
    </div>
    <!-- 机械列表 -->
    <div class="project-card-tab">
      <div class="project-card-tab-inner" @click="handleMachineList('run')">
        <div>{{ systemProject?.workingMachineAmount }}</div>
        <div>运行</div>
      </div>
      <div class="project-card-tab-inner" @click="handleMachineList('slow')">
        <div>{{ systemProject?.idlingMachineAmount }}</div>
        <div>怠速</div>
      </div>
      <div class="project-card-tab-inner" @click="handleMachineList('stop')">
        <div>{{ systemProject?.motionlessMachineAmount }}</div>
        <div>静止</div>
      </div>
      <div class="project-card-tab-inner" @click="handleMachineList('die')">
        <div>{{ systemProject?.offlineMachineAmount }}</div>
        <div>离线</div>
      </div>
    </div>
    <!-- 油量统计 -->
    <div class="project-card-oil">
      <div class="project-card-oil-header">
        <div class="project-card-oil-header-title">油量统计</div>
        <div>
          <div class="project-btn-select" @click="handleSelectType('oil')">
            <div class="project-btn-select-title">{{ selectOilType }}</div>
            <div class="project-btn-select-icon"></div>
          </div>
        </div>
      </div>
      <div>
        <div id="cartOil" style="width: 100%;height: 300px;"></div>
      </div>
    </div>
    <van-popup v-model:show="showPickerOilType" round position="bottom">
      <van-picker
        title="选择油量统计类型"
        :columns="oilTypeColumns"
        @confirm="onConfirmOilType"
        @cancel="onCancelMachineType"
      />
    </van-popup>
    <!-- 警告 -->
    <!-- <div class="project-card-warning">
      <div class="project-card-warning-header">
        <div class="project-card-warning-header-tab">
          <div
            :class="
              activeWarning == '01'
                ? 'project-card-warning-header-tab-active'
                : ''
            "
            @click="handleActiveWarn('01')"
          >
            今日警报<span style="margin-left:4px" >18</span>
          </div>
          <div
            :class="
              activeWarning == '02'
                ? 'project-card-warning-header-tab-active'
                : ''
            "
            @click="handleActiveWarn('02')"
          >
            今日异常<span style="margin-left:4px">2</span>
          </div>
        </div>
        <div class="project-card-warning-header-all">全部</div>
      </div>
      <div class="project-card-warning-body">
        <div
          v-for="(item, index) in 4"
          :key="index"
          class="project-card-warning-body-box"
        >
          <div>
            <div class="project-card-warning-body-box-point"></div>
            <div class="project-card-warning-body-box-con">
              <div>围栏背景</div>
              <div>宝鼎 混凝土 韩金水 红岩金刚</div>
            </div>
          </div>
          <div class="project-card-warning-body-box-time">09-01</div>
        </div>
      </div>
    </div> -->
    <!-- 机械开工率 -->
    <div class="project-card-oil">
      <div class="project-card-oil-header">
        <div class="project-card-oil-header-title">机械开工率</div>
        <div>
          <div class="project-btn-select" @click="handleSelectType('machine')">
            <div class="project-btn-select-title">{{ selectMachineType }}</div>
            <div class="project-btn-select-icon"></div>
          </div>
        </div>
      </div>
      <div>
        <div id="myChartMachineWork" style="width: 100%;height: 300px;"></div>
        <div class="project-card-oil-remark">
          <span class="project-card-oil-remark-sign">日开工率</span>
          =开工机械数/进场机械数
        </div>
      </div>
    </div>
    <van-popup v-model:show="showPickerMachineType" round position="bottom">
      <van-picker
        title="选择机械开工率类型"
        :columns="machineTypeColumns"
        @confirm="onConfirmMachineType"
        @cancel="onCancelMachineType"
      />
    </van-popup>
    <!-- 机械类型 -->
    <div class="project-card-oil">
      <div class="project-card-oil-header">
        <div class="project-card-oil-header-title">机械类型</div>
        <div>
          <div class="project-btn-select" v-if="false">
            <div class="project-btn-select-title">按日</div>
            <div class="project-btn-select-icon"></div>
          </div>
        </div>
      </div>
      <div>
        <div id="myChartMachineType" style="width: 100%;height: 300px;"></div>
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
