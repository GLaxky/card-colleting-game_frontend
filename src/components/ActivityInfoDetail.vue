<template>
    <div class="container">
        <NativeScroll use-y-bar height="100%">
        <div class="detail-item">
            <div class="label">活动宣传图片</div>
            <div
            class="content"
            @click.stop=""
            >
                <el-image class="image" :src="activityInfo.postPic" fit="scale-down">
                    <template #error>
                        <div class="image-slot">
                            <el-image
                            src="https://img.tukuppt.com/png_preview/00/06/02/Ci3mfMQItP.jpg!/fw/780"
                            />
                        </div>
                    </template>
                </el-image>
            </div>
        </div>
        <div class="detail-item">
            <div class="label">活动标题</div>
            <div
            class="content"
            @click.stop=""
            >
            {{ activityInfo.activityTitle }}
            </div>
        </div>
        <div class="detail-item">
            <div class="label">状态</div>
            <div
            class="content"
            @click.stop=""
            >
            {{ activityInfo.state }}
            </div>
        </div>

        <div class="detail-item">
            <div class="label">起始时间</div>
            <div
            class="content"
            @click.stop=""
            >
            {{formatDate(activityInfo.startTime)  }}
            </div>
        </div>

        <div class="detail-item">
            <div class="label">截止时间</div>
            <div
            class="content"
            @click.stop=""
            >
            {{formatDate(activityInfo.endTime)  }}
            </div>
        </div>

        <div class="detail-item">
            <div class="label">创建时间</div>
            <div
            class="content"
            @click.stop=""
            >
            {{ formatDate(activityInfo.createTime)  }}
            </div>
        </div>

        <div class="detail-item">
            <div class="label">规则</div>
            <div
            class="content"
            @click.stop=""
            >
            {{ activityInfo.rules }}
            </div>
        </div>

        <div class="detail-item">
            <div class="label">集卡种类</div>
            <div
            class="card_display"
            @click.stop=""
            >
                <div class="block text-center" m="t-4"> 
                    <el-carousel direction="vertical" :autoplay="false"  trigger="click" >
                        <!-- <el-carousel-item v-for="item in 4" :key="item">
                        <h3 text="2xl" justify="center">{{ item }}</h3>
                        </el-carousel-item> -->
                        <el-carousel-item>
                            <Tag simple type="info" class="demonstration">{{ activityInfo.cardName1 }}</Tag>
                            <el-image :src="activityInfo.cardPic1">
                            </el-image>
                        </el-carousel-item>
                        <el-carousel-item>
                            <Tag simple type="info" class="demonstration">{{ activityInfo.cardName2 }}</Tag>
                            <el-image :src="activityInfo.cardPic2"></el-image>
                        </el-carousel-item>
                        <el-carousel-item>
                            <Tag simple type="info" class="demonstration">{{ activityInfo.cardName3 }}</Tag>
                            <el-image :src="activityInfo.cardPic3"></el-image>
                        </el-carousel-item>
                        <el-carousel-item>
                            <Tag simple type="info" class="demonstration">{{ activityInfo.cardName4 }}</Tag>
                            <el-image :src="activityInfo.cardPic4"></el-image>
                        </el-carousel-item>
                        <el-carousel-item>
                            <Tag simple type="info" class="demonstration">{{ activityInfo.cardName5 }}</Tag>
                            <el-image :src="activityInfo.cardPic5"></el-image>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </div>
    </NativeScroll>
    </div>
</template>

<script lang="ts">
import { ActivityInfo } from "@/apis/ActivityRequest";
import { defineComponent } from "vue";
import { ElCarousel, ElCarouselItem, ElImage } from 'element-plus';
import { formatDate } from "@/utils/timeStampToString";

export default defineComponent({
    name: "ActivityInfoDetail",
    components: {
        ElCarousel, ElCarouselItem, ElImage
    },
    props: {
        activityInfo: {
            type: Object,
            default:{
                // let ans:ActivityInfo={
                    activityTitle: "标题名字",
                    postPic: "https://www.vexipui.com/picture-4.jpg",
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
                    participated: false,
                    activityId: '0'
                // }
                // return ans;
            }
        }
    },
    setup(props){
        // props.activityInfo.createTime=formatDate(props.activityInfo.createTime)
        // props.activityInfo.startTime=formatDate(props.activityInfo.startTime)
        // props.activityInfo.endTime=formatDate(props.activityInfo.endTime)
        return {
            formatDate
        }
    }
})
</script>

<style scoped  lang="less">
.container{
    padding: 1em;
    // width: 90%;
    height: 70vh;
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

// .el-carousel__item h3 {
//   color: #475669;
//   opacity: 0.75;
//   line-height: 200px;
//   margin: 0;
//   text-align: center;
// }

// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }
</style>