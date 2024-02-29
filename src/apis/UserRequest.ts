import myRequest from "@/utils/request";

export interface UserInfo{
    userName: string,
    password: string,
    sex: string,
    telephone: string,
    nickName: string,
    userType: string,
    createTime: Date,
    userId:string,
}

export async function login(userName: string, password: string){
    let ans;
    let formdata=new FormData()
    formdata.append("userName", userName)
    formdata.append("password", password)
    await myRequest.request({
        method: 'post',
        url: '/login',
        data: formdata
    }).then((res)=>{
        let token=res.data.data
        localStorage.setItem("token", token)
        ans=res.data
    })
    return ans;
}

export async function register(userInfo: UserInfo) {
    let ans;
    let formdata=new FormData()
    formdata.append("userName", userInfo.userName)
    formdata.append("password", userInfo.password)
    formdata.append("sex", userInfo.sex)
    formdata.append("telephone", userInfo.telephone)
    formdata.append("nickName", userInfo.nickName)
    formdata.append("userType", userInfo.userType)
    await myRequest.request({
        method: 'post',
        url: '/register',
        data: formdata
    }).then((res)=>{
        ans=res.data
    })
    return ans
}

export async function getUserInfo() {
    let ans: UserInfo={
        userName: "",
        password: "",
        sex: "",
        telephone: "",
        nickName: "",
        userType: "",
        createTime: new Date(),
        userId: ''
    }
    await myRequest.request({
        method: 'get',
        url: '/user/info',
    }).then((res)=>{
        ans=res.data.data
    })
    return ans
}

export async function getOtherUserInfo(userId: string) {
    let ans: UserInfo={
        userName: "",
        password: "",
        sex: "",
        telephone: "",
        nickName: "",
        userType: "",
        createTime: new Date(),
        userId: ''
    }
    let formdata=new FormData()
    formdata.append('userId', userId)
    await myRequest.request({
        method: 'post',
        url: '/user/infoOther',
        data: formdata
    }).then((res)=>{
        ans=res.data.data
    })
    return ans
}

export async function editTel(newTel:string){
    let ans:string=''
    let formdata=new FormData()
    formdata.append("newTel", newTel)
    await myRequest.request({
        method: 'post',
        url: '/user/editTel',
        data: formdata
    }).then((res)=>{
        ans=res.data
    })
    return ans;
}

export async function editSex(newSex:string){
    let ans:string=''
    let formdata=new FormData()
    formdata.append("newSex", newSex)
    await myRequest.request({
        method: 'post',
        url: '/user/editSex',
        data: formdata
    }).then((res)=>{
        ans=res.data
    })
    return ans;
}

export async function editNickName(nickName:string){
    let ans:string=''
    let formdata=new FormData()
    formdata.append("nickName", nickName)
    await myRequest.request({
        method: 'post',
        url: '/user/editNickName',
        data: formdata
    }).then((res)=>{
        ans=res.data
    })
    return ans;
}

export async function editPW(PW:string, newPW:string){
    let ans:string=''
    let formdata=new FormData()
    formdata.append("PW", PW)
    formdata.append("newPW", newPW)
    await myRequest.request({
        method: 'post',
        url: '/user/editPW',
        data: formdata
    }).then((res)=>{
        ans=res.data
    })
    return ans;
}