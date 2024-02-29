import myRequest from "@/utils/request";
import { ElMessage } from "element-plus";

export interface ScratchedEvent{
    scratchingEventId: string,
    activityId: string,
    userId: string,
    cardName: string,
    chance: number,
    cardPic: number,
    scratchingTime: Date
}

export async function scratching(activityId: string){
    let ans=0
    let formdata=new FormData()
    formdata.append("activityId", activityId)
    await myRequest.request({
        method: 'post',
        url: '/scratch/scratching',
        data: formdata
    }).then((res)=>{
        if(res.data.msgCode=='OTHER_SUCCESS'){
            ElMessage({
                type: 'success',
                message: res.data.msg
            })
        }else{
            ElMessage({
                type: 'error',
                message: res.data.msg
            })
        }
        ans=res.data.data
    })
    return ans;
}

export async function getScratchedEvents(activityId: string){
    let ans:ScratchedEvent[]=[]
    let formdata=new FormData()
    formdata.append("activityId", activityId)
    await myRequest.request({
        method: 'post',
        url: '/scratch/getScratchedEvents',
        data: formdata
    }).then((res)=>{
        ans=res.data.data
    })
    return ans;
}

export async function getCollectionsProgress(activityId: string) {
    let ans:boolean[]=[]
    let formdata=new FormData()
    formdata.append("activityId", activityId)
    await myRequest.request({
        method: 'post',
        url: '/scratch/getCollectionsProgress',
        data: formdata
    }).then((res)=>{
        ans=res.data.data
    })
    return ans;
}

export async function getTotalScratchingCount(activityId: string){
    let ans:number=0
    let formdata=new FormData()
    formdata.append("activityId", activityId)
    await myRequest.request({
        method: 'post',
        url: '/scratch/getTotalScratchingCount',
        data: formdata
    }).then((res)=>{
        ans=res.data.data
    })
    return ans;
}