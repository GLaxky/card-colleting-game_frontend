<template>
    <div class="container">
        <!-- <div class="detail-item">
            <div class="label">活动标题</div>
            <div
            class="content"
            @click.stop=""
            >
            {{ activityStaticsInfo.activityTitle }}
            </div>
        </div> -->
        <div class="detail-item">
            <div class="label">完成人数</div>
            <div
            class="content"
            @click.stop=""
            >
            {{ activityStaticsInfo.achievementCount }}
            </div>
        </div>
        <div class="detail-item">
            <div class="label">参加人数</div>
            <div
            class="content"
            @click.stop=""
            >
            {{ activityStaticsInfo.participationCount }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {ActivityStaticsInfo} from "@/apis/ActivityRequest"

export default defineComponent({
    name: 'ActivityStatics',
    props:{
        activityStaticsInfo:{
            type: Object,
            default(){
                let ans: ActivityStaticsInfo={
                    // activityTitle: "标题",
                    achievementCount: 10,
                    participationCount: 20
                };
                return ans;
            }
        }
    },
    setup(){
        return {

        }
    }

})
</script>

<style scoped lang="less">

.container{
    display: flex;
    flex-direction: column;
    padding: 2em;
}
.detail-item {
    
  margin-bottom: 12px;
  .label {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    color: #999999;
    font-size: 14px;
    line-height: 20px;
  };
  .content {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 4px;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
  };
}
</style>