<template>
    <div>
        <div class="container">
            <el-image v-if="activityInfo" :src="activityInfo.postPic" class="post"></el-image>
            <template v-if="isLogined">
                <span>剩余助力次数: {{assistCount}}</span>
            </template>
            
            <Button @click="assisting"  type="primary" size="large">点击助力</Button>
            <Linker :icon="ArrowPointer" underline type="success" @click="active=true">查看活动详情</Linker>

            <div class="assist">
                <NativeScroll  use-y-bar height="50vh" use-bar-track>
                    <Tag class="small-title" circle type="warning">助力流水</Tag>
                    <br>
                    <Timeline>
                        <TimelineItem v-for="item in assistanceEvents" :key="item">
                            <span style="margin-bottom: 10px;">{{item.assistTime}}</span>
                            <Card>
                                @{{item.assistUserName}} 助力了 @该用户 
                                <br>,为他增加了1次刮卡机会
                            </Card>
                        </TimelineItem>
                    </Timeline>
                </NativeScroll>
            </div>
        </div>
        
        <Drawer
            v-model:active="active"
            transfer
            title="集卡活动详情"
            resizable
            >
            <template v-if="isLogined">
                <Button @click="getInvolved">我也要参加！</Button>
            </template>
            <ActivityInfoDetail :activity-info="activityInfo"></ActivityInfoDetail>
        </Drawer>
    </div>
</template>

<script lang="ts">
import { ActivityInfo, getActivityInfo, involveInActivity } from "@/apis/ActivityRequest"
import { AssistEvent, getAssistEvents, assist, getAvailableAssistanceCont } from "@/apis/AssistanceRequest"
import { UserInfo } from "@/apis/UserRequest"
import ActivityInfoDetail from "@/components/ActivityInfoDetail.vue"
import { ElMessage, ElImage, ElLoading } from "element-plus"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { ArrowPointer } from '@vexip-ui/icons';
export default{
    components: {
        ActivityInfoDetail, ElImage, ElLoading
    },
    setup(){
        // const loading=ref(true)
        const route=useRoute()
        const isLogined=ref(false)
        if(localStorage.getItem('token')!=null){
            isLogined.value=true
        }
        const assistCount=ref(0)
        const assistedUserId=ref(route.query.userId)
        const activityId=ref(route.query.activityId)
        // console.log(route.query)
        const active=ref(false)
        const activityInfo=ref<ActivityInfo>()
        const assistanceEvents=ref<AssistEvent[]>()

        
       
        // const assistedUserInfo=ref<UserInfo>()
        onMounted(()=>{
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            if(typeof activityId.value!=='string') return
            if(typeof assistedUserId.value!=='string') return
            getAssistEvents(activityId.value, assistedUserId.value).then((ans)=>{
                // console.log(ans)
                assistanceEvents.value=ans
            })
            getActivityInfo(activityId.value).then((ans)=>{
                // console.log(ans)
                activityInfo.value=ans
                loading.close()
                // loading.value=false
            })
            if(isLogined.value){
                getAvailableAssistanceCont(activityId.value).then((ans)=>{
                    assistCount.value=ans
                })
            }
        })

        function assisting(){
            if(typeof activityId.value!=='string') return
            if(typeof assistedUserId.value!=='string') return
            assist(activityId.value, assistedUserId.value).then((res=>{
                ElMessage({
                    type: 'info',
                    message: res,
                })
                if(isLogined.value){
                    if(typeof activityId.value!=='string') return
                    getAvailableAssistanceCont(activityId.value).then((ans)=>{
                        assistCount.value=ans
                    })
                }
                if(typeof activityId.value!=='string') return
                if(typeof assistedUserId.value!=='string') return
                getAssistEvents(activityId.value, assistedUserId.value).then((ans)=>{
                // console.log(ans)
                assistanceEvents.value=ans
            })
            }))
        }
        function getInvolved(){
            if(typeof activityId.value!=='string') return
            involveInActivity(activityId.value).then((ans)=>{
                ElMessage({
                    type: 'info',
                    message: ans,
                })
            })
        }
        return {
            active,
            activityInfo,
            assistanceEvents,
            assistCount,
            isLogined,
            assisting,
            getInvolved,
            ArrowPointer
        }
    }
}
</script>

<style scoped>
.container{
    /* height: 80vh; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    padding: 2em 0;
}
.fix{
    position: fixed;
    left: 1em;
    top: 30vh;
}

.assist{
    width: 60%;
    border-style: dashed;
    border-color: blanchedalmond;
    border-radius: 10%;
    margin-top: 1em;
}

.post{
    width: 80%;
    margin-bottom: 1em;
    border-radius: 5%;
}
</style>