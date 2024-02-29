import myRequest from "@/utils/request";
import { getOtherUserInfo, getUserInfo } from "./UserRequest";

export interface AssistEvent{
    assistEventId: string,
    assistUserId: string,
    assistUserName: string,
    assistedUserId: string,
    assistTime: Date,
    activityId: string,

}

export async function getAssistEvents(activityId: string, assistedUserId: string){
    let ans:AssistEvent[]=[]
    let formdata=new FormData()
    formdata.append("activityId", activityId)
    formdata.append("assistedUserId", assistedUserId)
    await myRequest.request({
        method: 'post',
        url: '/assistance/getAssistanceRecords',
        data: formdata
    }).then(async (res)=>{
        // ans=res.data.data
        for(let item of res.data.data){
            let userName='某用户'
            if(localStorage.getItem('token')!=null){
                await getOtherUserInfo(item.assistUserId).then((res1)=>{
                    userName=res1.userName
                })
            }
            let tmp: AssistEvent={
                assistEventId: item.assistEventId,
                assistUserId: item.assistUserId,
                assistUserName: userName,
                assistedUserId: item.assistedUserId,
                assistTime: item.assistTime,
                activityId: item.activityId
            }
            ans.push(tmp)
        }
    })
    return ans;
}

export async function assist(activityId: string, assistedUserId: string){
    let ans:string=''
    let formdata=new FormData()
    formdata.append("activityId", activityId)
    formdata.append("assistedId", assistedUserId)
    await myRequest.request({
        method: 'post',
        url: '/assistance/assist',
        data: formdata
    }).then(async (res)=>{
        ans=res.data.msg
        console.log(ans)
    })
    return ans;
}

export async function getAvailableAssistanceCont(activityId: string) {
    let ans:number=0
    let formdata=new FormData()
    formdata.append("activityId", activityId)
    await myRequest.request({
        method: 'post',
        url: '/assistance/getAvailableAssistanceCont',
        data: formdata
    }).then(async (res)=>{
        ans=res.data.data
        console.log(ans)
    })
    return ans;
}

