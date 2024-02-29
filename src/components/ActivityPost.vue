<template>
    <div>
        <Card shadow="hover" @click="active=true">
            <template #title>
                <div class="">
                    <Ellipsis>{{activityInfo.activityTitle}}</Ellipsis>
                    <br>
                    <Tag
                        simple
                    >
                        {{activityInfo.state}}
                    </Tag>
                    <template v-if="!activityInfo.participated">
                        <Tag>
                            未参加
                        </Tag>
                    </template>
                    <template v-else>
                        <Tag>
                            已参与
                        </Tag>
                    </template>
                </div>
                
            </template>
            <div class="image">
                <el-image  :src="activityInfo.postPic" fit="scale-down">
                    <template #error>
                        <div class="image-slot">
                            <el-image
                            src="https://img.tukuppt.com/png_preview/00/06/02/Ci3mfMQItP.jpg!/fw/780"
                            />
                        </div>
                    </template>
                </el-image>
            </div>
            
            <template #extra>
                
                
            </template>
        </Card>

        <Modal
            v-model:active="active"
            transfer
            draggable
            top="auto"
            title="集卡活动详情"
            :width="500"
            >
            <ActivityInfoDetail :activity-info="activityInfo"></ActivityInfoDetail>
            <!-- <template v-if="activityInfo.participated"> -->
                <template #footer>
                    <Button @click="getInvolved" v-if="!activityInfo.participated">参加该活动</Button>
                </template>
            <!-- </template> -->
            
        </Modal>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Card } from "vexip-ui";
import { ElImage, ElMessage } from 'element-plus'
import { ActivityInfo, involveInActivity } from "@/apis/ActivityRequest";
import ActivityInfoDetail from "./ActivityInfoDetail.vue";

export default defineComponent({
    name: 'ActivityPost',
    components: {
        Card, ElImage, ActivityInfoDetail
    },
    props: {
        activityInfo:{
            type: Object,
            default:{
                // let ans:ActivityInfo={
                    activityId: "0",
                    activityTitle: "标题名字",
                    postPic: "http://127.0.0.1:8083/public/picture-4.jpg",
                    startTime: new Date(),
                    endTime: new Date(),
                    createTime: new Date(),
                    rules: "rules",
                    state: "已上架",
                    cardName1: 'string',
                    cardPic1: 'string',
                    chance1: 0,
                    cardName2: 'string',
                    cardPic2: 'string',
                    chance2: 0,
                    cardName3: 'string',
                    cardPic3: 'string',
                    chance3: 0,
                    cardName4: 'string',
                    cardPic4: 'string',
                    chance4: 0,
                    cardName5: 'string',
                    cardPic5: 'string',
                    chance5: 0,
                    participated: false
                // }
                // return ans;
            }
        }
    },
    setup(props){
        const active=ref(false)
        function getInvolved(){
            involveInActivity(props.activityInfo.activityId).then((ans:any)=>{
                // console.log(ans)
                // if(ans!=null){
                if(ans.msgCode=='OTHER_SUCCESS'){
                    ElMessage({
                        type: 'success',
                        message: '参加活动成功'
                    })
                    props.activityInfo.participated=true
                }else{
                    ElMessage({
                        type: 'error',
                        message: '参加活动失败'
                    })
                }
                // }
                
            })
        }
        return {
            active,
            getInvolved
        }
    }
})
</script>

<style scoped>
.image {
    /* width: 13em;
    height: 13em; */
    background-color: whitesmoke;
    min-height: 13em;
    display: flex;
    align-items: center;
}
.title{
    display: flex;
    flex-direction: column;
}

</style>

<style>
.vxp-card__content {
    padding: 0 0;
}
</style>