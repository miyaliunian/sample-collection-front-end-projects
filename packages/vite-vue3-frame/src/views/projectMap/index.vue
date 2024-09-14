<template>
  <div class="content">
    <div class="header">
      <van-row>
        <van-col span="22" offset="1">
          <van-search v-model="searchContent" show-action placeholder="请输入机械名称" @search="onSearch">
            <template #action>
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24">
          <van-dropdown-menu>
            <van-dropdown-item :title="machineTypeDropDown.title" v-model="machineTypeDropDown.value" :options="machineTypeDropDown.options" @change="onMachineTypeChanged" />
            <van-dropdown-item :title="machineStatusDropDown.title" v-model="machineStatusDropDown.value" :options="machineStatusDropDown.options" @change="onStatusChanged" />
          </van-dropdown-menu>
        </van-col>
      </van-row>
    </div>
    <div class="body">
      <div id="map"></div>
      <div style="display: none;">
        <div ref="baiduMapMachineModalRef" class="baidumapmodal">
          <div class="header">
            <div class="row">
              <div class="cell"><img :src="machineImg" /></div>
              <div class="cell">
                <div>{{ baiduMapMachineModal.Machine.Name }}</div>
                <div>{{ baiduMapMachineModal.Machine.Type }} &nbsp;&nbsp;{{baiduMapMachineModal.Machine.Brand}}&nbsp;&nbsp;{{ baiduMapMachineModal.Machine.Capacity }}</div>
              </div>
              <div class="cell">
                <div class="innercell"><span>{{ baiduMapMachineModal.Machine.Status }}</span></div>
                <div class="innercell">
                  <van-progress pivot-text="" color="#3FC990" stroke-width="12" :percentage="baiduMapMachineModal.Machine.Power" style="width:40px;border-radius: 0;" />
                  <span>&nbsp;{{ baiduMapMachineModal.Machine.Power }}%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="row">
              <div class="cell">
                <div>当前油量</div>
                <div><b>{{ baiduMapMachineModal.Machine.OilAuantity }}</b><span>L</span></div>
                <div>{{ baiduMapMachineModal.Machine.OilAuantityRate }}</div>
              </div>
              <div class="cell">
                <div>今日工时</div>
                <div><b>{{ baiduMapMachineModal.Machine.WorkHours }}</b><span>小时</span></div>
                <div>40分钟</div>
              </div>
              <div class="cell">
                <div>持续运行</div>
                <div><b>{{ baiduMapMachineModal.Machine.ContinuousHours }}</b><span>小时</span></div>
                <div>21分钟</div>
              </div>
            </div>
            <div class="row"></div>
            <div class="row">
              <div class="cell">当前速度<span>{{ baiduMapMachineModal.Machine.Speed }}km/h</span></div>
              <div class="cell"></div>
              <div class="cell">今日里程<span>{{ baiduMapMachineModal.Machine.Mileage }}km</span></div>
            </div>
          </div>
          <div class="body">
            <div class="row">
              <div class="cell">项目</div>
              <div class="cell">{{ baiduMapMachineModal.Machine.ProjectName }}</div>
            </div>
            <div class="row">
              <div class="cell">地点</div>
              <div class="cell">
                {{ baiduMapMachineModal.Machine.ProjectAddress }}
                <span>{{ baiduMapMachineModal.Machine.ProjectDate }}</span>
              </div>
            </div>
            <div class="row">
              <van-button plain block size="small" @click="navigation(baiduMapMachineModal.Machine)">导航</van-button>&nbsp;&nbsp;
              <van-button block type="primary" size="small" @click="gotoMachineDetail(baiduMapMachineModal.Machine.Id)">详情</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import scriptMixin from './index'
export default scriptMixin
</script>
<style lang="scss" scoped>
@import './index.scss';
@import './baidumap.scss';
</style>
