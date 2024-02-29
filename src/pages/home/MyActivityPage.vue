<template>
    <div class="container">
        
        <div id="left-box">
            <Card>
                <Menu @select="handleSelect" class="menu">
                    <MenuItem label="-1" :icon="EnvelopesBulk">
                        我的活动列表
                        <template #group>
                            <template v-for="(item,index) in myActivity" :key="index">
                                <MenuItem :label="`${index}`" :meta="{ path: item.activityId }">
                                    <Ellipsis>{{item.activityTitle}}</Ellipsis>
                                </MenuItem>
                            </template>
                        </template>
                    </MenuItem>
                </Menu>
            </Card>
        </div>
        <div id="right-box" >
            
            <router-view></router-view>
        </div>
        
    </div>
</template>

<script lang="ts">
import { ActivityInfo, getPaticipatedActivity} from '@/apis/ActivityRequest'
import { EnvelopesBulk, City, ChartPie, User } from '@vexip-ui/icons'
import { onMounted, ref } from 'vue'
// import {MenuItem } from "vexip-ui"
import { useRouter } from 'vue-router'

export default {
    componets:{
        
    },
    setup(){
        const myActivity=ref<ActivityInfo[]>()
        onMounted(()=>{
            getPaticipatedActivity().then((ans)=>{
                myActivity.value=ans
            })
            
        })
        const router=useRouter()
        function handleSelect(label: string, meta: { path: string }){
            router.push('/home/myActivity/activityHome/'+meta.path)
        }
        function gotoActivity(){
            router.push('/home/myActivity/activityHome/1')
        }
        return {
            EnvelopesBulk, City, ChartPie, User,
            myActivity,
            gotoActivity,
            handleSelect
        }
    }
}

</script>

<style scoped>
.container{
    display: flex;
    /* padding: 1em; */
}

#left-box{
    /* flex-grow: 1; */
    padding: 1em;
    max-width: 15em;
}

#right-box{
    /* flex-grow: 3; */
    flex: 1;
    padding: 1em;
}

.menu{
    width: 15em;
}

</style>
