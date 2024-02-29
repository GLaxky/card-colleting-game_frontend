<template>
    <div >
        <!-- 活动广场页面 -->
        <div class="ad">
            <!-- 加个v-if防止初始加载出错 -->
            <el-carousel v-if="posts" :interval="4000" type="card" height="80vh">
                <el-carousel-item v-for="item in posts" :key="item" class="el-carousel__item">
                    <el-image :src="item" fit="contain"></el-image>
                </el-carousel-item>
            </el-carousel>
        </div>
        
        <div class="container">
            <Tabs card>
                <TabPane label="所有活动" class="subContainer">
                    <ActivityPost v-for="i in activityList" :key="i" :activity-info="i" class="post-card"></ActivityPost>
                </TabPane>
                <TabPane label="未参加的活动" :icon="ChartArea"  class="subContainer">
                    <ActivityPost v-for="i in uninvolvedActivityList" :key="i" :activity-info="i" class="post-card"></ActivityPost>
                </TabPane>
            </Tabs>
        </div>
        
        
    </div>
</template>

<script lang="ts">
import { getAllUpActivities } from '@/apis/ActivityRequest';
import ActivityPost from '@/components/ActivityPost.vue'
import { ChartArea, } from '@vexip-ui/icons'
import { ElCarousel, ElCarouselItem, ElImage,ElLoading } from 'element-plus'
import { onMounted, ref } from 'vue';

export default{
    components: {
        ActivityPost, ElCarousel,ElCarouselItem, ElImage
    },
    setup(){
        const activityList=ref();
        const uninvolvedActivityList=ref()
        const posts=ref()
        
        onMounted(()=>{
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            activityList.value=[]
            getAllUpActivities().then((ans)=>{
                activityList.value=ans;
                // console.log(ans);
                posts.value=[]
                for(let i=0;i<5&&activityList.value.length;i++){
                    posts.value.push(activityList.value[i].postPic)
                }
                if(activityList.value instanceof Array)
                uninvolvedActivityList.value=activityList.value.filter((item)=>{
                    return !item.participated
                })
                loading.close()
            })
        
        })

        return {
            ChartArea,
            activityList,
            uninvolvedActivityList,
            posts
        }
    }
}
</script>

<style scoped>
/* .post-card{
    width: 40%;
    height: 10%;
} */

.subContainer{
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2em;
    padding: 1em;
    background-color:cornsilk;
}
.container{
    /* background-color: beige; */
    padding: 0.5em;
}

.ad{
    padding: 0.5em;
}

.el-carousel__item{
    display: flex;
    background-color: aliceblue;
    align-items: center;
}

/* .el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */

</style>