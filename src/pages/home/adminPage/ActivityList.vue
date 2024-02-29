<template>
    <div class="container">
        <div>
            <Button @click="setUpsAndDowns" v-show="show">批量上下架</Button>
            <Button @click="confirmUpsAndDowns" v-show="!show">确认上下架</Button>
            <!-- <Button @click="recover">恢复</Button> -->
            <Button @click="activeCreate=true">创建活动</Button>
            <Button @click="activeFilter=true">筛选</Button>
        </div>
        <el-table
            ref="table"
            :data="data"
            style="width: 95%"
            @selection-change="handleSelectionChange"
            @select="onSelect"
        >
            <template  v-if="handleUpAndDown">
                <el-table-column type="selection"/>
            </template>
            
            <el-table-column label="是否上架">
                <template #default="scope"><Tag>{{ scope.row.state}}</Tag></template>
            </el-table-column>
            <el-table-column property="activityTitle" label="活动标题" show-overflow-tooltip />
            <el-table-column property="createTime" label="创建日期" show-overflow-tooltip>
                <template #default="scope">
                    {{formatDate(scope.row.createTime)}}
                </template>
            </el-table-column>
            <el-table-column property="startTime" label="起始时间" show-overflow-tooltip>
                <template #default="scope">
                    {{formatDate(scope.row.startTime)}}
                </template>
            </el-table-column>
            <el-table-column property="endTime" label="终止时间" show-overflow-tooltip >
                <template #default="scope">
                    {{formatDate(scope.row.endTime)}}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" >
                <template #default="scope">
                    <Button @click="checkInfo(scope.$index, scope.row)">查看</Button>
                    <Button @click="edit(scope.$index, scope.row)">编辑</Button>
                </template>
            </el-table-column>
        </el-table>
        <Modal
        v-model:active="activeCreate"
        transfer
        top="auto"
        draggable
        title="创建新的活动"
        >
            <CreateActivity></CreateActivity>
        </Modal>

        <Modal
        v-model:active="activeFilter"
        transfer
        top="auto"
        title="高级筛选"
        >
            <Form
                ref="filterForm"
                :model="filterFormModel"
                :label-width="100"
            >
                <FormItem required label="活动标题" prop="input">
                    <Input v-model:value="filterFormModel.title"></Input>
                </FormItem>
                <FormItem required label="创建日期" prop="date">
                    <DatePicker v-model:value="filterFormModel.date" clearable></DatePicker>
                </FormItem>
            </Form>
        </Modal>

        <Modal
        v-model:active="activeCheck"
        transfer
        draggable
        top="auto"
        title="查看活动详情"
        :width="500"
        >
            <Tabs active="基本信息">
                <TabPane label="基本信息">
                    <ActivityInfoDetail :activity-info="targetActivity"></ActivityInfoDetail>
                </TabPane>
                <TabPane label="统计信息">
                    <ActivityStatics :activity-statics-info="targetStatics"></ActivityStatics>
                </TabPane>
            </Tabs>
        </Modal>

        <Modal
        v-model:active="activeEdit"
        transfer
        top="auto"
        title="编辑活动"
        >
            <EditActivity></EditActivity>
        </Modal>
    </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElTable, ElTableColumn, ElLoading } from 'element-plus'
import type { Form } from 'vexip-ui'
import { ActivityInfo, ActivityStaticsInfo, getAllActivities,getInvolvingCount, getCompletedCount, editUpAndDown } from '@/apis/ActivityRequest'
import CreateActivity from '@/components/CreateActivity.vue'
import ActivityStatics from '@/components/ActivityStatics.vue'
import ActivityInfoDetail from '@/components/ActivityInfoDetail.vue'
import EditActivity from '@/components/EditActivity.vue'
import { formatDate } from "@/utils/timeStampToString";

export default{
    components:{
    ElTable,
    ElTableColumn,
    CreateActivity,
    ActivityStatics,
    ActivityInfoDetail,
    EditActivity,
},
    setup(){
        const filterFormModel=reactive({
            title:'',
            createDate: '',
        })
        const show=ref(true)
        const targetStatics=ref<ActivityStaticsInfo>()
        const targetActivity=ref<ActivityInfo>()
        const filterForm = ref<InstanceType<typeof Form> | null>(null)
        const activeFilter=ref(false)
        const activeCreate=ref(false)
        const activeCheck=ref(false)
        const activeEdit=ref(false)
        const table = ref<InstanceType<typeof ElTable> | null>(null)
        const multipleSelectionSaving=ref<ActivityInfo[]>([])
        const handleUpAndDown=ref(false);
        const data = ref<ActivityInfo[]>([])

        // function getSelectedRows() {
        //     // console.log(table.value)
        //     return table.value?.getSelected() ?? []
        // }
        function refresh(){
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            getAllActivities().then((res)=>{
                data.value=res
                loading.close()
            })
            setTimeout(()=>{
                loading.close()
            }, 1000)
        }
        onMounted(refresh)
        
        function setUpsAndDowns(){
            handleUpAndDown.value=true
            show.value=false
            data.value.forEach(element => {
                if(element.state=='已上架'){
                    table.value!.toggleRowSelection(element, true)
                    multipleSelectionSaving.value?.push(element)
                }
                    
            });
        }

        function onSelect(selection: any, row: ActivityInfo){
            // console.log(row)
            editUpAndDown(row.activityId, row.state=='已上架'?0:1, true)
            
        }

        function recover(){
            console.log(multipleSelectionSaving.value)
            data.value.forEach(element => {
                if(multipleSelectionSaving.value?.find((item)=>{return element.activityTitle===item.activityTitle})==null){
                    table.value!.toggleRowSelection(element, false)
                }else{
                    
                    table.value!.toggleRowSelection(element, true)
                }
            });
            
        }

        function confirmUpsAndDowns(){
            handleUpAndDown.value=false
            multipleSelectionSaving.value=[]
            show.value=true
            refresh()
        }
        const handleSelectionChange = (val: ActivityInfo[]) => {
            // console.log(val)
        }

        function checkInfo(rowIndex: number, row: ActivityInfo){
            targetActivity.value=row
            Promise.all([getInvolvingCount(targetActivity.value.activityId),getCompletedCount(targetActivity.value.activityId)]).then((res)=>{
                // console.log(res)
                targetStatics.value={
                    achievementCount: res[1],
                    participationCount: res[0],
                }
            })
            activeCheck.value=true
            // console.log(rowIndex)
        }

        function edit(rowIndex: number, row: ActivityInfo){
            targetActivity.value=row
            activeEdit.value=true
            // console.log(rowIndex)
            
        }

        function filter(createDate:string, title:string){

        }
        return { 
            data, table, 
            handleUpAndDown,
            multipleSelectionSaving,
            activeCreate,
            filterFormModel,
            filterForm,
            activeFilter,
            activeCheck,
            activeEdit,
            targetActivity,
            targetStatics,
            show,
            // getSelectedRows,
            setUpsAndDowns,
            confirmUpsAndDowns,
            // testAccessor,
            // testRow,
            onSelect,
            edit,
            checkInfo,
            handleSelectionChange,
            recover,
            filter,
            formatDate
        }
    }
}
</script>

<style scoped>
.container{
    padding: 1em 2em;
}
</style>

<style>

.vxp-ellipsis {
    font-size: var(--vxp-font-size-base);
    line-height: var(--vxp-line-height-base);
    color: var(--vxp-content-color-base);
    vertical-align: middle;
    display: inline-block;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

</style>