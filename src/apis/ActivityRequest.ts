import myRequest from "@/utils/request";
import { formatDate } from "@/utils/timeStampToString";

const filePath="http://127.0.0.1:8083/public/"
export interface ActivityInfo{
    activityId: string,
    activityTitle: string,
    postPic: string,
    startTime: Date,
    endTime: Date,
    createTime: Date,
    rules: string,
    state: string,
    cardName1: string,
    cardPic1: string,
    chance1: number,
    cardName2: string,
    cardPic2: string,
    chance2: number,
    cardName3: string,
    cardPic3: string,
    chance3: number,
    cardName4: string,
    cardPic4: string,
    chance4: number,
    cardName5: string,
    cardPic5: string,
    chance5: number,
    participated: boolean,
}

export interface UploadActivity{
    activityTitle: string,
    postPic: File[],
    startTime: string,
    endTime: string,
    rules: string,
    state: number,
    cardName1: string,
    cardPic1: File[],
    chance1: number,
    cardName2: string,
    cardPic2: File[],
    chance2: number,
    cardName3: string,
    cardPic3: File[],
    chance3: number,
    cardName4: string,
    cardPic4: File[],
    chance4: number,
    cardName5: string,
    cardPic5: File[],
    chance5: number,
}

export interface ActivityStaticsInfo{
    // activityTitle: string,
    achievementCount: number,
    participationCount: number,
}

export async function getAllUpActivities(){
    let token=localStorage.getItem('token')
    // if(token==null) token=''
    let ans: ActivityInfo[]=[];
    await myRequest.request({
        method: 'get',
        url: '/activity/allUp',
        headers: {
            'access-token' : token||''
        }
    }).then(async (res)=>{
        ans=res.data.data
        for(let item of ans){
            if(localStorage.getItem("token")!=null){
                await checkInvolvement(item.activityId).then((res1)=>{
                    item.participated=res1
                })
            }
            item.postPic=filePath+item.postPic
            item.cardPic1=filePath+item.cardPic1
            item.cardPic2=filePath+item.cardPic2
            item.cardPic3=filePath+item.cardPic3
            item.cardPic4=filePath+item.cardPic4
            item.cardPic5=filePath+item.cardPic5
            item.state=(item.state=='1')?"已上架":"待上架"
        }
        // console.log(ans)
    })
    return ans
}

export async function getAllActivities(){
    // let token=localStorage.getItem('token')
    // if(token==null) token=''
    let ans: ActivityInfo[]=[];
    await myRequest.request({
        method: 'get',
        url: '/activity/all',
        // headers: {
        //     'access-token' : token||''
        // }
    }).then(async (res)=>{
        ans=res.data.data
        for(let item of ans){
            // await checkInvolvement(item.activityId).then((res1)=>{
            //     item.participated=res1
            // })
            item.postPic=filePath+item.postPic
            item.cardPic1=filePath+item.cardPic1
            item.cardPic2=filePath+item.cardPic2
            item.cardPic3=filePath+item.cardPic3
            item.cardPic4=filePath+item.cardPic4
            item.cardPic5=filePath+item.cardPic5
            item.state=(item.state=='1')?"已上架":"待上架"
        }
        // console.log(ans)
    })
    return ans
}

export async function checkInvolvement(activityId:string) {
    let ans:boolean=false
    let token=localStorage.getItem('token')
    let formdata=new FormData()
    formdata.append("activityId", activityId)
    await myRequest.request({
        method: 'post',
        url: '/involvement/checkInvolvement',
        headers: {
            'access-token' : token||''
        },
        data: formdata 
    }).then((res)=>{
        ans=res.data.data
    })
    return ans;
}

export async function createActivity(uploadActivity: UploadActivity){
    let formdata=new FormData();
    formdata.append("activityTitle", uploadActivity.activityTitle)
    formdata.append('postPic', uploadActivity.postPic[0])
    formdata.append('startTime', uploadActivity.startTime)
    formdata.append('endTime', uploadActivity.endTime)
    formdata.append('rules', uploadActivity.rules)
    formdata.append('state', uploadActivity.state+'')
    formdata.append('cardName1', uploadActivity.cardName1)
    formdata.append('cardPic1', uploadActivity.cardPic1[0])
    formdata.append('chance1', uploadActivity.chance1+'')
    formdata.append('cardName2', uploadActivity.cardName2)
    formdata.append('cardPic2', uploadActivity.cardPic2[0])
    formdata.append('chance2', uploadActivity.chance2+'')
    formdata.append('cardName3', uploadActivity.cardName3)
    formdata.append('cardPic3', uploadActivity.cardPic3[0])
    formdata.append('chance3', uploadActivity.chance3+'')
    formdata.append('cardName4', uploadActivity.cardName4)
    formdata.append('cardPic4', uploadActivity.cardPic4[0])
    formdata.append('chance4', uploadActivity.chance4+'')
    formdata.append('cardName5', uploadActivity.cardName5)
    formdata.append('cardPic5', uploadActivity.cardPic5[0])
    formdata.append('chance5', uploadActivity.chance5+'')
    let ans={}
    await myRequest.request({
        method: 'post',
        url: '/activity/create',
        // headers: {
        //     'access-token' : token||''
        // },
        data: formdata 
    }).then((res)=>{
        // console.log(res)
        ans=res.data
    })
    return ans
}

export async function involveInActivity(activityId: string) {
    let ans;
    let formdata=new FormData()
    formdata.append("activityId", activityId)
    await myRequest.request({
        method: 'post',
        url: '/involvement/participate',
        data: formdata
    }).then(async (res)=>{
        ans=res.data
    })
    return ans
}

export async function getPaticipatedActivity() {
    let ans: ActivityInfo[]=[];
    await myRequest.request({
        method: 'get',
        url: '/involvement/getParticipatedActivities',
    }).then(async (res)=>{
        ans=res.data.data
        for(let item of ans){
            // await checkInvolvement(item.activityId).then((res1)=>{
                item.participated=true
            // })
            item.postPic=filePath+item.postPic
            item.cardPic1=filePath+item.cardPic1
            item.cardPic2=filePath+item.cardPic2
            item.cardPic3=filePath+item.cardPic3
            item.cardPic4=filePath+item.cardPic4
            item.cardPic5=filePath+item.cardPic5
            item.state=(item.state=='1')?"已上架":"待上架"
        }
        // console.log(ans)
    })
    return ans
}

export async function getActivityInfo(activityId: string) {
    let ans:ActivityInfo={
        activityId: "",
        activityTitle: "",
        postPic: "",
        startTime: new Date(),
        endTime: new Date(),
        createTime: new Date(),
        rules: "",
        state: "",
        cardName1: "",
        cardPic1: "",
        chance1: 0,
        cardName2: "",
        cardPic2: "",
        chance2: 0,
        cardName3: "",
        cardPic3: "",
        chance3: 0,
        cardName4: "",
        cardPic4: "",
        chance4: 0,
        cardName5: "",
        cardPic5: "",
        chance5: 0,
        participated: false
    };
    await myRequest.request({
        method: 'get',
        url: '/activity/info',
        params: {
            activityId: activityId
        }
    }).then(async (res)=>{
        ans=res.data.data
        ans.postPic=filePath+ans.postPic
        ans.cardPic1=filePath+ans.cardPic1
        ans.cardPic2=filePath+ans.cardPic2
        ans.cardPic3=filePath+ans.cardPic3
        ans.cardPic4=filePath+ans.cardPic4
        ans.cardPic5=filePath+ans.cardPic5
        ans.state=(ans.state=='1')?"已上架":"待上架"
        // console.log(ans)
    })
    return ans
} 


export async function getInvolvingCount(activityId: string){
    let ans:number=0
    let formdata=new FormData()
    formdata.append("activityId", activityId)
    await myRequest.request({
        method: 'post',
        url: '/involvement/getInvolvingCount',
        data: formdata 
    }).then((res)=>{
        ans=res.data.data
    })
    return ans;
}

export async function getCompletedCount(activityId: string){
    let ans:number=0
    let formdata=new FormData()
    formdata.append("activityId", activityId)
    await myRequest.request({
        method: 'post',
        url: '/involvement/getCompletedCount',
        data: formdata 
    }).then((res)=>{
        ans=res.data.data
    })
    return ans;
}

export async function editUpAndDown(activityId:string, state: number, stateField: boolean) {
    let ans:object={}
    let formdata=new FormData()
    formdata.append("activityId", activityId)
    formdata.append("state", state+'')
    formdata.append("stateField", stateField+'')
    await myRequest.request({
        method: 'post',
        url: '/activity/edit',
        data: formdata
    }).then(async (res)=>{
        ans=res.data.data
        console.log(ans)
    })
    return ans;
}