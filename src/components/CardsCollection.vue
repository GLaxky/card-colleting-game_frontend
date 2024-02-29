<template>
        <div class="container">
            <template v-for="i in 5" :key="i">
                <div class="card">
                    <div>{{cardNames[i-1]}}【{{cardChances[i-1]}}%】</div>
                    <div >
                        <el-image :src="cardPics[i-1]" fit="scale-down" :style="cardStyle[i-1]">
                        </el-image>
                    </div>
                </div>
                
            </template>
        </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeUpdate } from "vue";
import { ElImage } from "element-plus";

export default defineComponent({
    name: 'CardCollection',
    components:{
        ElImage
    },
    props:{
        cardNames: {
            type: Array,
            default: ["卡种一", "卡种二", "卡种三", "卡种四", "卡种五"]
        },
        cardPics:{
            type: Array,
            default: ["https://www.vexipui.com/picture-4.jpg", "https://www.vexipui.com/picture-4.jpg", 
            "https://www.vexipui.com/picture-4.jpg", "https://www.vexipui.com/picture-4.jpg", "https://www.vexipui.com/picture-4.jpg"]
        },
        cardCollected: {
            type: Array,
            default: [false,false,false,false,false,false]
        },
        cardChances:{
            type: Array,
            default: [0, 0, 0, 0, 0]
        }
    },
    setup(props){
        const greyStyle="-webkit-filter: grayscale(100%);-moz-filter: grayscale(100%);-ms-filter: grayscale(100%);-o-filter: grayscale(100%);filter: grayscale(100%);filter: gray;"
        const cardStyle=ref(['', '', '', '', '']);
        // console.log(props.cardCollected)
        for(let i=0;i<5;i++){
            cardStyle.value[i]=(props.cardCollected[i])?"":greyStyle;
        }
        // console.log(cardStyle.value)
        watch(()=>props.cardCollected,(newval, oldval)=>{
            // console.log(newval)
            for(let i=0;i<5;i++){
                cardStyle.value[i]=(newval[i])?"":greyStyle;
            }
        })
        // onBeforeUpdate(()=>{
        //     // console.log(props)
        //     for(let i=0;i<5;i++){
        //         cardStyle.value[i]=(props.cardCollected[i])?"":greyStyle;
        //     }
        // })
        return {
            cardStyle,
            greyStyle
        }
    }
})
</script>

<style scope>
.container{
    display: flex;
    
}
.grey { 
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
}
.card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:0 1em;
    flex-grow: 1;
    flex-basis: 0;
}
</style>

