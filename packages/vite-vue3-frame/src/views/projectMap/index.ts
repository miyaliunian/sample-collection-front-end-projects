import {
    onMounted,
    reactive,
    ref,
} from "vue";
import router from "@/router";
import { Toast } from 'vant';
import machine from '@/assets/img/machine.svg'
import machineEmpty from '@/assets/img/machineEmpty.svg'
import machineImg from '@/assets/img/machine1.png'
export default {
    setup() {
        // 项目集合，接口数据
        let projects: any = []
        // 指定项目下的机械集合，接口数据
        let machines: any = []
        // 机械类型集合，接口数据
        let machineTypes: any = []
        // 机械状态集合，接口数据
        let machineStatus: any = []

        const searchContent = ref('')

        const onSearch = () => {
            // 输入检索字段，调用查询
            search()
        }
        function search() {
            // 查询
            const searchStr = searchContent.value
            const machineTypeId = machineTypeDropDown.value
            const machineStatusId = machineStatusDropDown.value

            // 加载项目下所有机械标记点。            
            switch2SingleProjectView(searchStr, machineTypeId, machineStatusId)
        }

        interface filterOption {
            name: string,
            isSelected?: boolean,
        }
        interface filterOptionsInterface {
            name: string;
            options: filterOption[];
            select(option: filterOption): any;
        }
        class filterOptions implements filterOptionsInterface {
            name: string;
            options: filterOption[];
            select(option: filterOption) {
                if (this.options) {
                    for (var opt of this.options) {
                        opt.isSelected = opt == option
                    }
                }
            }

            constructor(name: string, options: filterOption[]) {
                this.name = name;
                this.options = options;
            }
        }

        interface filterCollection {
            show?: boolean,
            options?: filterOptions[]
        }
        const filters = reactive<filterCollection>(
            {
                show: false,
                options: [new filterOptions('名称/类型',
                    [
                        { name: '显示机械类型', isSelected: true },
                        { name: '显示机械名称', isSelected: false },
                        { name: '不显示', isSelected: false }
                    ]
                ), new filterOptions('围栏',
                    [
                        { name: '显示', isSelected: false },
                        { name: '不显示', isSelected: true }
                    ]
                ), new filterOptions('地图',
                    [
                        { name: '百度地图', isSelected: true },
                        { name: '天地图', isSelected: false }
                    ]
                ), new filterOptions('地图类型',
                    [
                        { name: '常规地图', isSelected: true },
                        { name: '卫星地图', isSelected: false }
                    ]
                ), new filterOptions('显示方式',
                    [
                        { name: '聚合显示', isSelected: true },
                        { name: '分开显示', isSelected: false }
                    ]
                )]
            }
        )

        const filterToggle = () => {
            filters.show = true;
            // filterDropDownRef.value.toggle();
            // Toast.success('filter')
        }
        const onFilter = () => {
            filters.show = false;
            // filterDropDownRef.value.toggle();
            Toast.success('filter')
        }

        interface dropDownOption {
            text: string,
            value: any
        }
        interface dropDownCollection {
            title: string,
            value: any,
            options: dropDownOption[]
        }

        let machineTypeDropDown = reactive<dropDownCollection>({
            title: '机械类型',
            value: 0,
            options: [
                {
                    text: '全部机械',
                    value: 0
                }
            ]
        })

        const onMachineTypeChanged = () => {
            // 选择机械类型，调用查询

            for (var option of machineTypeDropDown.options) {
                if (option.value == machineTypeDropDown.value) {
                    machineTypeDropDown.title = option.text;
                    break;
                }
            }
            search()
        }

        let machineStatusDropDown = reactive<dropDownCollection>({
            title: '机械状态',
            value: 0,
            options: [
                {
                    text: '全部状态',
                    value: 0
                }
            ]
        })
        const onStatusChanged = () => {
            // 选择机械状态，调用查询
            for (var option of machineStatusDropDown.options) {
                if (option.value == machineStatusDropDown.value) {
                    machineStatusDropDown.title = option.text;
                    break;
                }
            }
            search()
        }

        let map: any = null;
        const BMap = (window as any).BMapGL;

        // 地图项目集合，检索后的数据
        let mapProjects: any = []

        let centerPoint = {}; // 中心点
        const DisplayLevels = {
            None: 0,
            Project: 1,
            Machine: 2
        }
        let displayLevel = DisplayLevels.None; // 缩放级别
        let isMachineClicking = 0; // 是否正在处理机械点击事件
        const projectZoom = 12; // 项目缩放级别
        const machineZoom = 16; // 机械缩放级别
        const machineSingleZoom = 18; // 单个机械缩放级别
        const zoomLine = 15; // 项目与机械缩放分界。大于该值，则显示机械标记；否则显示项目标记。

        function convert2MapProject(projects: any[], searchStr?: string, machineTypeId?: number, machineStatusId?: number): any[] {
            mapProjects = []

            if (projects.length > 0) {
                for (let p of projects) {
                    // 查询项目下所有机械
                    const machines = getMachines(p.Id)

                    let machinesMap: any = []
                    if (machines && machines.length) {
                        for (let m of machines) {
                            // 1.检索机械数据
                            let b = false;
                            if (searchStr?.length) {
                                b = m.Name.indexOf(searchStr) > -1
                            } else {
                                b = true;
                            }
                            if (!b) continue;

                            if (machineTypeId != null && machineTypeId != 0) {
                                b = m.TypeId == machineTypeId
                            } else {
                                b = true;
                            }
                            if (!b) continue;

                            if (machineStatusId != null && machineStatusId != 0) {
                                b = m.StatusId == machineStatusId
                            } else {
                                b = true;
                            }
                            if (!b) continue;

                            // console.log(m)
                            // console.log(searchStr?.length + ',' + machineTypeId + ',' + machineStatusId)

                            // 2.机械数据转换为地图对象
                            let machineMap = {
                                Id: m.Id,
                                Name: m.Name,
                                Location: new BMap.Point(m.Location[0], m.Location[1]),
                            }
                            machinesMap.push(machineMap)
                        }
                    }
                    let projectMap = {
                        Id: p.Id,
                        Name: p.Name,
                        Location: new BMap.Point(p.Location[0], p.Location[1]),
                        MachineAmount: p.MachineAmount,
                        Machines: machinesMap
                    }
                    mapProjects.push(projectMap)
                }
            }

            return mapProjects;
        }

        function initMap() {
            convert2MapProject(projects);

            centerPoint = mapProjects[0].Location;

            map = new BMap.Map("map");

            addControls();
            goToDefaultPosition();
            map.enableScrollWheelZoom(true);
            map.addEventListener('click', function () {
                // Toast.success('click!')
            });
            map.addEventListener('zoomend', function () {
                const zoom = map.getZoom()
                // console.log(zoom)
                loadPoints(zoom, mapProjects)
            })

            switch2SingleProjectView(mapProjects[0].Id) // 切换到单个项目视图
            // loadPoints(map.getZoom(), mapProjects) // 添加标注

            createModal() // 创建弹窗对象
        }

        function goToDefaultPosition() {
            // 跳转到默认位置
            map.centerAndZoom(centerPoint, projectZoom);
        }

        function goToSingleProjectPosition(id: number) {
            // 跳转到项目位置，暂不实现
        }

        function switch2AllProjectView() {
            // 切换到所有项目视图，暂不实现
            // 1.更新项目集合

            // 2.更新地图标记
            convert2MapProject(projects)
            displayLevel = DisplayLevels.None;
            loadPoints(projectZoom, mapProjects)

            // 3.切换到默认位置
            goToDefaultPosition()

            Toast.success(`已切换到全部项目！`)
        }

        function switch2SingleProjectView(searchStr?: string, machineTypeId?: number, machineStatusId?: number) {
            // 切换到单个项目视图

            // 1.更新项目集合
            let projectsResult = []
            projectsResult.push(projects[0])

            // 2.更新地图标记
            convert2MapProject(projectsResult, searchStr, machineTypeId, machineStatusId)
            displayLevel = DisplayLevels.None;
            loadPoints(machineZoom, mapProjects)

            // 3.定位到标记
            map.centerAndZoom(mapProjects[0].Location, machineZoom);

            // Toast.success(`项目（${projects[0].Name}）已更新！`)
        }

        function addControls() {
            // 比例尺
            var scaleControl = new BMap.ScaleControl({
                anchor: (window as any).BMAP_ANCHOR_BOTTOM_RIGHT
            });
            map.addControl(scaleControl);

            // 平移缩放控件
            var navControl = new BMap.NavigationControl({
                anchor: (window as any).BMAP_ANCHOR_BOTTOM_RIGHT,
                type: (window as any).BMAP_NAVIGATION_CONTROL_ZOOM,
                showZoomInfo: true,
            });
            map.addControl(navControl);
            map.addControl(scaleControl);

            // 地图类型控件
            var mapTypeControl = new BMap.MapTypeControl();
            map.addControl(mapTypeControl);
        }

        function loadPoints(zoom: number, projects: any) {
            if (zoom >= zoomLine) {
                if (displayLevel != DisplayLevels.Machine) {
                    // 显示设备标记点
                    displayLevel = DisplayLevels.Machine;
                    map.clearOverlays();
                    for (var project of projects) {
                        for (var machine of project.Machines) {
                            let marker = new BMap.Marker(machine.Location);

                            marker.setIcon(getMachineIcon());

                            (function (project, machine) {
                                marker.addEventListener('click', function (e: any) {
                                    isMachineClicking = 1

                                    // const point = e.currentTarget.latLng
                                    // map.centerAndZoom(machine.Location, machineSingleZoom);
                                    showMachineModal(project, machine)

                                    isMachineClicking = 0
                                });
                            }(project, machine))

                            map.addOverlay(marker);
                        }
                    }
                }
            } else {
                if (displayLevel != DisplayLevels.Project) {
                    // 显示项目标记点
                    displayLevel = DisplayLevels.Project;
                    map.clearOverlays();

                    for (var project of projects) {
                        let marker = new BMap.Marker(project.Location);

                        var labelMachineCount = new BMap.Label(project.MachineAmount, {
                            position: project.Location,
                            offset: new BMap.Size(-5, -8)
                        });
                        labelMachineCount.setStyle({
                            color: '#fff',
                            border: 'none',
                            backgroundColor: 'transparent'
                        });
                        marker.setLabel(labelMachineCount);

                        // var labelProject = new BMap.Label(p.ProjectName, {
                        //   position: p.Location,
                        //   offset: new BMap.Size(20, -8)
                        // });
                        // labelProject.setStyle({
                        //   color: 'gray',
                        //   border: 'none',
                        //   backgroundColor: 'transparent'
                        // });
                        // marker.setLabel(labelProject);

                        marker.setIcon(getMachineEmptyIcon());

                        (function (project) {
                            marker.addEventListener('click', function (e: any) {
                                switch2SingleProjectView(project.Id)
                            });
                        }(project))

                        map.addOverlay(marker);
                    }
                }
            }

        }

        function getMachineIcon() {
            return new BMap.Icon(machine, new BMap.Size(34, 34))
        }

        function getMachineEmptyIcon() {
            return new BMap.Icon(machineEmpty, new BMap.Size(34, 34))
        }

        const baiduMapMachineModalRef = ref()
        const baiduMapMachineModal = reactive({
            Machine: {
                Id: null,
                Name: '',
                Type: '',
                Brand: '',
                Capacity: '',
                Status: '',
                Power: '',
                OilAuantity: '',
                OilAuantityRate: '',
                WorkHours: '',
                ContinuousHours: '',
                Speed: '',
                Mileage: '',
                ProjectName: '',
                ProjectAddress: '',
                ProjectDate: '',
                ProjectLocation: null,
                Location: null,
            },
            infoWindow: null
        })

        function createModal() {
            let opts = {
                // title: '【标题】',
                // width: 335,
                // height: 465,
                offset: {
                    width: 10,
                    height: -15
                }
            }
            baiduMapMachineModal.infoWindow = new BMap.InfoWindow(baiduMapMachineModalRef.value, opts);
            (baiduMapMachineModal.infoWindow as any).disableCloseOnClick(); // 关闭点击地图时关闭信息窗口
            (baiduMapMachineModal.infoWindow as any).enableAutoPan(); // 开启打开信息窗口时地图自动平移
            // baiduMapMachineModal.infoWindow.disableAutoPan() // 关闭打开信息窗口时地图自动平移

            (baiduMapMachineModal.infoWindow as any).addEventListener('open', function () { });
            (baiduMapMachineModal.infoWindow as any).addEventListener('close', function () {
                if ((baiduMapMachineModal as any).Machine.ProjectLocation && !isMachineClicking) {
                    map.centerAndZoom((baiduMapMachineModal as any).Machine.ProjectLocation, machineZoom);
                }
            });
        }
        function showMachineModal(project: any, machine: any) {
            // 地图显示弹窗
            baiduMapMachineModal.Machine = getMachine(machine.Id);
            baiduMapMachineModal.Machine.Location = machine.Location;
            baiduMapMachineModal.Machine.ProjectLocation = machine.Location; // TODO：计算项目定位
            map.openInfoWindow(baiduMapMachineModal.infoWindow, machine.Location);

            // 百度地图弹窗样式调整
            (<HTMLElement>document.getElementsByClassName('BMap_bubble_pop')[0]).style.padding = '';
            (<HTMLElement>document.getElementsByClassName('BMap_bubble_pop')[0]).style.background = 'linear-gradient(to right, #6875E8, #1961AC)';
            (<HTMLElement>document.getElementsByClassName('BMap_bubble_pop')[0]).style.border = '';
            (<HTMLElement>document.getElementsByClassName('BMap_bubble_content')[0]).style.overflow = '';
            (<HTMLElement>document.getElementsByClassName('BMap_bubble_content')[0]).style.lineHeight = '';
        }

        const playBack = () => {
            const BMap = (window as any).BMapGL;
            let myP1 = new BMap.Point(116.311662, 40.081495);    //起点
            let myP2 = new BMap.Point(116.287856, 39.919849);    //终点
            let myIcon = new BMap.Icon(machine, new BMap.Size(30, 30), {    //小车图片
                //offset: new BMap.Size(0, -5),    //相当于CSS精灵
                imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
            });
            let driving2 = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true } });    //驾车实例
            driving2.search(myP1, myP2);    //显示一条公交线路
            function run() {
                var driving = new BMap.DrivingRoute(map);    //驾车实例
                driving.search(myP1, myP2);
                driving.setSearchCompleteCallback(function () {
                    var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
                    var paths = pts.length;    //获得有几个点

                    map.setViewport(pts)
                    var carMk = new BMap.Marker(pts[0], { icon: myIcon });
                    map.addOverlay(carMk);
                    let i = 0;
                    let timer: any = null;
                    function resetMkPoint(i: number) {
                        if (timer) clearTimeout(timer)
                        carMk.setPosition(pts[i]);
                        if (i < paths) {
                            timer = setTimeout(function () {
                                i++;
                                resetMkPoint(i);
                            }, 1000);
                        }
                    }
                    timer = setTimeout(function () {
                        resetMkPoint(5);
                    }, 1000)

                });
            }

            setTimeout(function () {
                run();
            }, 1500);
        }

        function initControls() {
            // 1.初始化项目下拉框

            // 2.初始化机械类型下拉框
            if (machineTypes.length > 0) {
                let machineTypeDropDownDatas = {
                    title: '机械类型',
                    value: 0,
                    options: [
                        {
                            text: '全部机械',
                            value: 0
                        }
                    ]
                }
                for (let t of machineTypes) {
                    machineTypeDropDownDatas.options.push({ text: t.Name, value: t.Id })
                }
                machineTypeDropDown = reactive<dropDownCollection>(machineTypeDropDownDatas);
            }

            // 3.初始化机械状态下拉框
            if (machineStatus.length > 0) {
                let machineStatusDropDownDatas = {
                    title: '机械状态',
                    value: 0,
                    options: [
                        {
                            text: '全部状态',
                            value: 0
                        }
                    ]
                }
                for (let t of machineStatus) {
                    machineStatusDropDownDatas.options.push({ text: t.Name, value: t.Id })
                }
                machineStatusDropDown = reactive<dropDownCollection>(machineStatusDropDownDatas);
            }
        }

        function getProjects(id: number) {
            // TODO：查询项目，项目接口暂不包含机械集合
            const src = [
                {
                    Id: 1,
                    Name: '项目1',
                    Location: [116.308036, 40.086562],
                    MachineAmount: 6,
                    Machines: [
                        {
                            Id: 1,
                            Name: '机械1',
                            TypeId: 1,
                            TypeName: '路面机械',
                            StatusId: 1,
                            StatusName: '工作',
                            Location: [116.311662, 40.081495]
                        },
                        {
                            Id: 2,
                            Name: '机械2',
                            TypeId: 1,
                            TypeName: '路面机械',
                            StatusId: 2,
                            StatusName: '待机',
                            Location: [116.308036, 40.086562]
                        },
                        {
                            Id: 3,
                            Name: '机械3',
                            TypeId: 1,
                            TypeName: '路面机械',
                            StatusId: 3,
                            StatusName: '静止',
                            Location: [116.306684, 40.085079]
                        },
                        {
                            Id: 4,
                            Name: '机械4',
                            TypeId: 1,
                            TypeName: '路面机械',
                            StatusId: 4,
                            StatusName: '离线',
                            Location: [116.307715, 40.084371]
                        },
                        {
                            Id: 5,
                            Name: '机械5',
                            TypeId: 3,
                            TypeName: '混凝土机械',
                            StatusId: 1,
                            StatusName: '工作',
                            Location: [116.308978, 40.083542]
                        },
                        {
                            Id: 6,
                            Name: '机械6',
                            TypeId: 2,
                            TypeName: '起重机械',
                            StatusId: 1,
                            StatusName: '工作',
                            Location: [116.31037, 40.080821]
                        }]
                },
                {
                    Id: 2,
                    Name: '项目2',
                    Location: [116.305189, 40.082376],
                    MachineAmount: 5,
                    Machines: [
                        {
                            Id: 7,
                            Name: '机械1',
                            TypeId: 2,
                            TypeName: '起重机械',
                            StatusId: 1,
                            StatusName: '工作',
                            Location: [116.303569, 40.083437]
                        },
                        {
                            Id: 8,
                            Name: '机械2',
                            TypeId: 1,
                            TypeName: '路面机械',
                            StatusId: 1,
                            StatusName: '工作',
                            Location: [116.301701, 40.084265]
                        },
                        {
                            Id: 9,
                            Name: '机械3',
                            TypeId: 3,
                            TypeName: '混凝土机械',
                            StatusId: 1,
                            StatusName: '工作',
                            Location: [116.306505, 40.081722]
                        },
                        {
                            Id: 10,
                            Name: '机械4',
                            TypeId: 1,
                            TypeName: '路面机械',
                            StatusId: 1,
                            StatusName: '工作',
                            Location: [116.306785, 40.08145]
                        },
                        {
                            Id: 11,
                            Name: '机械5',
                            TypeId: 1,
                            TypeName: '路面机械',
                            StatusId: 1,
                            StatusName: '工作',
                            Location: [116.308168, 40.079928]
                        }]
                },
                {
                    Id: 3,
                    Name: '项目3',
                    Location: [116.305223, 40.091238],
                    MachineAmount: 5,
                    Machines: [
                        {
                            Id: 12,
                            Name: '机械1',
                            TypeId: 2,
                            TypeName: '起重机械',
                            StatusId: 1,
                            StatusName: '工作',
                            Location: [116.309668, 40.091659]
                        },
                        {
                            Id: 13,
                            Name: '机械2',
                            TypeId: 1,
                            TypeName: '路面机械',
                            StatusId: 1,
                            StatusName: '工作',
                            Location: [116.309863, 40.089681]
                        },
                        {
                            Id: 14,
                            Name: '机械3',
                            TypeId: 3,
                            TypeName: '混凝土机械',
                            StatusId: 1,
                            StatusName: '工作',
                            Location: [116.305586, 40.088803]
                        },
                        {
                            Id: 15,
                            Name: '机械4',
                            TypeId: 1,
                            TypeName: '路面机械',
                            StatusId: 1,
                            StatusName: '工作',
                            Location: [116.303066, 40.089099]
                        },
                        {
                            Id: 16,
                            Name: '机械5',
                            TypeId: 1,
                            TypeName: '路面机械',
                            StatusId: 1,
                            StatusName: '工作',
                            Location: [116.302649, 40.092363]
                        }]
                }
            ];
            src.length = 1
            projects = src
        }

        function getMachines(id: number): any[] {
            // TODO：查询项目下机械列表
            for (var p of projects) {
                if (p.Id == id) {
                    machines = p.Machines
                    break;
                }
            }
            return machines;
        }

        function getMachine(id: number): any {
            // TODO：获取机械详细信息
            let machine = {
                Id: id,
                Name: '自卸车003',
                Type: '自卸车',
                Brand: '红岩金刚',
                Capacity: '20方',
                Status: '静止',
                Power: '75',
                OilAuantity: '263',
                OilAuantityRate: '67%',
                WorkHours: '2',
                ContinuousHours: '0.6',
                Speed: '2.93',
                Mileage: '23.23',
                ProjectName: '智慧工地项目第二分部',
                ProjectAddress: '重庆市璧山区广谱真586乡道',
                ProjectDate: '2022-11-09',
                ProjectLocation: null,
                Location: null
            }
            return machine
        }

        function getMachineTypes() {
            // TODO：查询机械类型列表
            const src = [
                {
                    Id: 1,
                    Name: '路面机械'
                },
                {
                    Id: 2,
                    Name: '起重机械'
                },
                {
                    Id: 3,
                    Name: '混凝土机械'
                }
            ]
            machineTypes = src
        }

        function getMachineStatus() {
            // TODO：查询机械状态列表
            const src = [
                {
                    Id: 1,
                    Name: '工作'
                },
                {
                    Id: 2,
                    Name: '待机'
                },
                {
                    Id: 3,
                    Name: '静止'
                },
                {
                    Id: 4,
                    Name: '离线'
                }
            ]

            machineStatus = src
        }

        function navigation(machine: any) {
            top?.open('baidumap://map/geocoder?location=' + machine.Location.lat + ',' + machine.Location.lng + '&src=ios.glodon.iot')
        }

        function gotoMachineDetail(val: any) {
            router.push('/machine-detail')
        }

        function initialize() {
            // 1.获取查询组件数据
            getProjects(1)
            getMachineTypes()
            getMachineStatus()

            // 2.初始化组件数据
            initControls();
        }

        // 初始化数据
        initialize();

        onMounted(() => {
            // 1.初始化组件
            initMap()

            // playBack()
        });

        return {
            machineImg,
            searchContent,
            onSearch,
            filters,
            filterToggle,
            onFilter,
            machineTypeDropDown,
            onMachineTypeChanged,
            machineStatusDropDown,
            onStatusChanged,
            baiduMapMachineModalRef,
            baiduMapMachineModal,
            navigation,
            gotoMachineDetail
        };
    },
};
