import myRequest from "@/utils/request";
import { ElMessage } from "element-plus";

export async function getSharingUrl(activityId: string) {
    let ans:string=''
    let formdata=new FormData()
    formdata.append("activityId", activityId)
    await myRequest.request({
        method: 'post',
        url: '/share/generateUrl',
        data: formdata
    }).then((res)=>{
        ans=res.data.data
        if(res.data.msgCode=="OTHER_SUCCESS"){
            ElMessage({
                type: 'info',
                message: res.data.msg
            })
        }   
    })
    return ans;
}