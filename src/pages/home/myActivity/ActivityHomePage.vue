<template>
    <div class="container">
        <Tabs v-model:active="active" width="100%">
            <TabPane label="1">
                <template #label>
                    集卡参与信息
                </template>
                <div id="main-box">
                    <div class="top-box">
                        <Button @click="activeForCardsCollection=true">点击查看收集进度</Button>
                        <Progress :stroke-color="['red', 'yellow']" :percentage="collectionProgress"></Progress>
                    </div>
                    
                    <div id="bottom-box">
                        <div class="large-box">
                            <Card>
                                <template #title>
                                    刮卡区域
                                </template>
                                <template #extra>
                                    剩余次数: {{leftScratchingCount}}
                                </template>
                                <h3 text="2xl" justify="center" class="cardFace" @click="scratchCard">点击刮卡</h3>
                            </Card>
                        </div>
                        <div class="small-box">
                            <NativeScroll  use-y-bar height="70vh" use-bar-track>
                                <Tag class="small-title" circle type="success">助力流水</Tag>
                                <br>
                                <Timeline>
                                    <TimelineItem v-for="item in assistanceEvents" :key="item">
                                        <span style="margin-bottom: 10px;">{{item.assistTime}}</span>
                                        <Card>
                                            @{{item.assistUserName}}助力您1次
                                        </Card>
                                    </TimelineItem>
                                </Timeline>
                            </NativeScroll>
                        </div>
                        <div class="small-box">
                            <NativeScroll  use-y-bar height="70vh" use-bar-track>
                                <Tag class="small-title" circle type="info">刮卡流水 {{scratchedEvents.length}}次</Tag>
                                <br>
                                <Timeline>
                                    <TimelineItem v-for="item in scratchedEvents" :key="item">
                                        <span style="margin-bottom: 10px;">{{item.scratchingTime}}</span>
                                        <Card>
                                            刮得"{{item.cardName}}"卡
                                        </Card>
                                    </TimelineItem>
                                </Timeline>
                            </NativeScroll>
                        </div>
                    </div>
                </div>
                
            </TabPane>
            <TabPane label="2">
                <template #label>
                    集卡活动信息
                </template>
                <Button @click="sharing">点击分享</Button>
                <!-- <div id="ActivityInfoDetail"> -->
                    <ActivityInfoDetail :activity-info="activityInfo"></ActivityInfoDetail>
                <!-- </div> -->
                
            </TabPane>
        </Tabs>

           <Drawer
            v-model:active="activeForCardsCollection"
            transfer
            :title="`收集进度${collectionProgress}%`"
            placement="bottom"
            >
                <div id="cards" v-if="activityInfo">
                    <CardsCollection :card-names="cardNames" :card-pics="cardPics" :card-collected="cardCollected" :card-chances="cardChances">
                    </CardsCollection>
                </div>
            </Drawer>

            <Modal
                v-model:active="scratchingShowing"
                transfer
                no-footer
                :width="500"
                draggable
                >
                <template #header>
                    {{showingCards?"恭喜抽到——"+cardNames[cardIndex]:"正在抽卡，请稍等"}}
                </template>
                <template v-if="showingCards">
                    <el-image v-if="cardPics" :src="cardPics[cardIndex]"></el-image>
                </template>
                <template v-else>
                    <Progress activated :percentage="100" :stroke-width="20" :stroke-color="['blue', 'green']"></Progress>
                </template>
                
            </Modal>
    </div>
</template>

<script lang="ts">
import { onBeforeUpdate, onMounted, ref } from "vue"
import ActivityInfoDetail from "@/components/ActivityInfoDetail.vue";
import { ElImage, ElMessage, ElLoading } from "element-plus";
import { ActivityInfo, getActivityInfo } from '@/apis/ActivityRequest'
import { useRoute } from "vue-router";
import { scratching, getScratchedEvents, ScratchedEvent, getCollectionsProgress, getTotalScratchingCount } from "@/apis/ScratchRequest";
import CardsCollection from "@/components/CardsCollection.vue";
import { AssistEvent, getAssistEvents } from "@/apis/AssistanceRequest";
import { getUserInfo } from "@/apis/UserRequest";
import useClipboard from "vue-clipboard3";
import { getSharingUrl } from "@/apis/sharingRequest";

export default {
    components:{
        ActivityInfoDetail, ElImage, CardsCollection
    },
    setup(){
        const cardIndex=ref(0)
        const showingCards=ref(false)
        const scratchingShowing=ref(false)
        // ###### 生产环境下 #####
        const prefix='http://localhost:8081/home/share'
        // ###### 开发环境下 #####
        // const prefix='http://localhost:8082/#/home/share'
        const collectionProgress=ref(0)
        const activeForCardsCollection=ref(false)
        const route=useRoute()
        // console.log(process.env.BASE_URL)
        // const router=useRouter()
        const leftScratchingCount=ref(0)
        const { toClipboard } = useClipboard();
        const activityId=ref(route.params.activityId)
        const active = ref('1')
        const activityInfo=ref<ActivityInfo>();
        const scratchedEvents=ref<ScratchedEvent[]>([])
        const assistanceEvents=ref<AssistEvent[]>([])
        const cardNames=ref()
        const cardPics=ref()
        const cardCollected=ref()
        const cardChances=ref()
        let userId='';
        async function refresh(){
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            activityId.value=route.params.activityId
            if(typeof activityId.value!=='string') return
            await getUserInfo().then((res)=>{
                userId=res.userId
                // console.log("执行")
            })
            if(typeof activityId.value!=='string') return
            getAssistEvents(activityId.value, userId).then((ans)=>{
                // console.log(ans)
                assistanceEvents.value=ans
            })
            getActivityInfo(activityId.value).then((ans)=>{
                activityInfo.value=ans
                cardNames.value=[activityInfo.value.cardName1, activityInfo.value.cardName2,activityInfo.value.cardName3,
                    activityInfo.value.cardName4,activityInfo.value.cardName5];
                cardPics.value=[activityInfo.value.cardPic1, activityInfo.value.cardPic2,activityInfo.value.cardPic3,
                    activityInfo.value.cardPic4,activityInfo.value.cardPic5]
                cardChances.value=[activityInfo.value.chance1, activityInfo.value.chance2,activityInfo.value.chance3,
                    activityInfo.value.chance4,activityInfo.value.chance5]

            })
            getScratchedEvents(activityId.value).then((ans)=>{
                // console.log(ans)
                scratchedEvents.value=ans
                if(typeof activityId.value!=='string') return
                getTotalScratchingCount(activityId.value).then(ans=>{
                    leftScratchingCount.value=ans-scratchedEvents.value.length
                })
            })
            getCollectionsProgress(activityId.value).then((ans: boolean[])=>{
                let tmp=0
                ans.forEach((item)=>{
                    if(item) tmp++;
                })
                cardCollected.value=ans
                collectionProgress.value=tmp/5*100
                loading.close()
            })
        }
        function scratchCard(){
            if(typeof activityId.value!=='string') return
            scratching(activityId.value).then((res)=>{
                // console.log(ans)
                if(res!=null){
                    cardIndex.value=res
                    scratchingShowing.value=true
                    showingCards.value=false
                    setTimeout(()=>{
                        showingCards.value=true
                        // console.log("wuyu")
                    }, 1000)
                    if(typeof activityId.value!=='string') return
                    getScratchedEvents(activityId.value).then((ans)=>{
                        // console.log(ans)
                        scratchedEvents.value=ans
                    })
                    getCollectionsProgress(activityId.value).then((ans: boolean[])=>{
                        // console.log(ans)
                        collectionProgress.value=0
                        cardCollected.value=ans
                        ans.forEach((item)=>{
                            if(item) collectionProgress.value++;
                        })
                        collectionProgress.value=collectionProgress.value/5*100
                    })
                    getTotalScratchingCount(activityId.value).then(ans=>{
                        leftScratchingCount.value=ans-scratchedEvents.value.length
                    })
                }
                
            })
            
        }

        function sharing(){
            // router.push({
            //     path: '/home/share',
            //     query:{
            //         userId: 0,
            //         activityId: activityId.value+''
            //     }
            // })
            
            if(typeof activityId.value!=='string') return
            getSharingUrl(activityId.value).then((res)=>{
                // console.log(res)
                toClipboard(prefix+res)
                ElMessage({
                    message: '已复制到剪贴板',
                    type: 'success',
                })
            })
        }
        onBeforeUpdate(refresh)
        onMounted(()=>{
            // getUserInfo().then((res)=>{
            //     userId=res.userId
            //     console.log("执行")
            // })
            // if(typeof activityId.value!=='string') return
            // getAssistEvents(activityId.value, userId).then((ans)=>{
            //     console.log(ans)
            //     assistanceEvents.value=ans
            // })
            refresh()
            
        })
        return {
            active,
            activityInfo,
            scratchedEvents,
            cardNames,
            cardPics,
            cardCollected,
            activeForCardsCollection,
            collectionProgress,
            assistanceEvents,
            leftScratchingCount,
            cardChances,
            cardIndex,
            showingCards,
            scratchingShowing,
            scratchCard,
            sharing
        }
    }
}
</script>

<style scope>
.container{
    /* padding:0 1em; */
    width: 100%;
    /* flex:1 */
}
#ActivityInfoDetail{
    display: flex;
    justify-content: flex-start;
}

#main-box{
    display: flex;
    flex-direction: column;

}
#bottom-box{
    display: flex;
}

.small-box{
    flex-grow: 2;
    border-style: dotted;
    border-color: blanchedalmond;
}
.large-box{
    flex-grow: 3;
}


#cards{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.cardFace {
    background-color: #475669;
    color: white;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
    font-size: 20px;
    height: 60vh;
 }

.gray { 
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
}

.small-title{
    font-size: large;
    font-weight: bold;
    margin: 0.5em 0;
}
</style>