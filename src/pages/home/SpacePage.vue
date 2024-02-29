<template>
    <div class="container">
        <div class="left-box">
            <Avatar :icon="User" :size="250" :icon-scale="10" circle></Avatar>
        </div>
        <div class="right-box">
            
            <Form
                ref="form"
                style="width: 500px;"
                :model="formModel"
                :label-width="100"
            >
            <Card style="padding: 1em;">
                <FormItem label="【身 份】：">
                    {{formModel.userType}}
                </FormItem>
                <FormItem label="【用户名】：">
                    <!-- <Input v-model:value="formModel.userName"></Input> -->
                    {{formModel.userName}}
                </FormItem>
                <FormItem label="【昵 称】：" prop="nickName">
                    <!-- <Input v-model:value="formModel.nickName"></Input> -->
                    {{formModel.nickName}}<Button @click="activeNickName=true"  simple type="success"  class="buttons" size="small">修改</Button>
                </FormItem>
                <FormItem label="【手机号】：" prop="telephone">
                    <!-- <Input v-model:value="formModel.telephone"></Input> -->
                    {{formModel.telephone}}<Button @click="activeTelephone=true"  simple type="success"  class="buttons" size="small">修改</Button>
                </FormItem>
                <FormItem label="【注册时间】:" prop="date">
                    {{formModel.createTime}}
                </FormItem>
                <FormItem label="【性 别】：" prop="sex">
                    <RadioGroup v-model:value="formModel.sex" disabled>
                        <Radio label="保密"></Radio>
                        <Radio label="女"></Radio>
                        <Radio label="男"></Radio>
                    </RadioGroup>
                    <Button  simple type="success" class="buttons" size="small" @click="activeSex=true">修改</Button>
                </FormItem>
                <FromItem>
                    <Button  simple type="info" @click="activePassword=true">修改密码</Button>
                </FromItem>
                </Card>
            </Form>
            
            <Modal
                v-model:active="activeTelephone"
                transfer
                top="auto"
                title="修改手机号"
                :width="500"
                >
                <Form
                    ref="formTelephone"
                    style="width: 400px;"
                    :model="formTelephoneModel"
                    :label-width="100"
                >
                    <FormItem required label="新手机号" prop="telephone">
                        <Input v-model:value="formTelephoneModel.telephone"></Input>
                    </FormItem>
                    <FormItem action>
                        <Button type="primary" @click="handleSubmitForTelephoneModel()">
                            提交
                        </Button>
                        <Button @click="handleResetForTelephoneModel()">
                            重置
                        </Button>
                    </FormItem>
                </Form>
            </Modal>

            <Modal
                v-model:active="activeNickName"
                transfer
                top="auto"
                title="修改昵称"
                :width="500"
                >
                <Form
                    ref="formNickName"
                    style="width: 400px;"
                    :model="formNickNameModel"
                    :label-width="100"
                >   
                    <FormItem required label="新昵称" prop="nickName">
                        <Input v-model:value="formNickNameModel.nickName"></Input>
                    </FormItem>
                    <FormItem action>
                        <Button type="primary" @click="handleSubmitForNickNameModel()">
                            提交
                        </Button>
                        <Button @click="handleResetForNickNameModel()">
                            重置
                        </Button>
                    </FormItem>
                </Form>
            </Modal>

            <Modal
                v-model:active="activeSex"
                transfer
                top="auto"
                title="修改性别"
                :width="500"
                >
                <Form
                    ref="formSex"
                    style="width: 400px;"
                    :model="formSexModel"
                    :label-width="100"
                >
                    <FormItem required label="新性别" prop="sex">
                        <RadioGroup v-model:value="formSexModel.sex">
                            <Radio label="保密"></Radio>
                            <Radio label="女"></Radio>
                            <Radio label="男"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem action>
                        <Button type="primary" @click="handleSubmitForSexModel()">
                            提交
                        </Button>
                        <Button @click="handleResetForSexModel()">
                            重置
                        </Button>
                    </FormItem>
                </Form>
            </Modal>

            <Modal
                v-model:active="activePassword"
                transfer
                top="auto"
                title="标题"
                :width="500"
                >
                <Form
                    ref="formPassword"
                    style="width: 400px;"
                    :model="formPasswordModel"
                    :label-width="100"
                >
                    <FormItem required label="原密码" prop="password">
                        <Input v-model:value="formPasswordModel.password" type="password"></Input>
                    </FormItem>
                    <FormItem required label="新密码" prop="newPassword">
                        <Input v-model:value="formPasswordModel.newPassword" type="password"></Input>
                    </FormItem>
                    <FormItem action>
                        <Button type="primary" @click="handleSubmitForPasswordModel()">
                            提交
                        </Button>
                        <Button @click="handleResetForPasswordModel()">
                            重置
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    </div>
    
</template>

<script lang="ts">
import { editNickName, editPW, editSex, editTel, getUserInfo, UserInfo } from '@/apis/UserRequest'
import { formatDate } from '@/utils/timeStampToString'
import { User } from '@vexip-ui/icons'
import { ElMessage } from 'element-plus'
import { Form, FormItem } from 'vexip-ui'
import { onBeforeUpdate, onMounted, reactive, ref } from 'vue'

export default{
    componnets:{
        FormItem
    },
    setup(){
        const formModel = reactive({
            telephone: '18851812072',
            createTime: '2022-02-02 12:12:00',
            userName: 'userName',
            nickName: 'nickName',
            sex: '保密',
            userType: '普通用户'
        })
        const activeTelephone=ref(false)
        const activeNickName=ref(false)
        const activeSex=ref(false)
        const activePassword=ref(false)
        const formTelephoneModel=reactive({
            telephone: ''
        })
        const formNickNameModel=reactive({
            nickName: ''
        })
        const formSexModel=reactive({
            sex: ''
        })
        const formPasswordModel=reactive({
            password: '',
            newPassword: '',
        })
        const formTelephone = ref<InstanceType<typeof Form> | null>(null)
        const formNickName = ref<InstanceType<typeof Form> | null>(null)
        const formSex = ref<InstanceType<typeof Form> | null>(null)
        const formPassword = ref<InstanceType<typeof Form> | null>(null)
        function refresh(){
            getUserInfo().then((ans:UserInfo)=>{
                formModel.telephone=ans.telephone
                formModel.createTime=formatDate(ans.createTime)
                formModel.userName=ans.userName
                formModel.nickName=ans.nickName
                formModel.sex=ans.sex
                formModel.userType=ans.userType
            })
        }
        function handleSubmitForTelephoneModel() {
            formTelephone.value?.validate().then((res)=>{
                if(res.length==0){
                    editTel(formTelephoneModel.telephone).then((ans:any)=>{
                        if(ans.msgCode==="OTHER_SUCCESS"){
                            ElMessage({
                                type: 'success',
                                message: ans.msg
                            })
                        }else{
                            ElMessage({
                                type: 'error',
                                message: ans.msg
                            })
                        }
                        formTelephone.value?.reset()
                    })
                }
            })
        }

        function handleResetForTelephoneModel() {
            formTelephone.value?.reset()
        }

        function handleSubmitForNickNameModel() {
            formNickName.value?.validate().then((res)=>{
                if(res.length==0){
                    editNickName(formNickNameModel.nickName).then((ans:any)=>{
                        if(ans.msgCode==="OTHER_SUCCESS"){
                            ElMessage({
                                type: 'success',
                                message: ans.msg
                            })
                        }else{
                            ElMessage({
                                type: 'error',
                                message: ans.msg
                            })
                        }
                        formNickName.value?.reset()
                    })
                }
            })
        }

        function handleResetForNickNameModel() {
            formNickName.value?.reset()
        }

        function handleSubmitForSexModel() {
            formSex.value?.validate().then((res)=>{
                if(res.length==0){
                    editSex(formSexModel.sex).then((ans:any)=>{
                        if(ans.msgCode==="OTHER_SUCCESS"){
                            ElMessage({
                                type: 'success',
                                message: ans.msg
                            })
                        }else{
                            ElMessage({
                                type: 'error',
                                message: ans.msg
                            })
                        }
                        formSex.value?.reset()
                    })
                }
            })
        }

        function handleResetForSexModel() {
            formSex.value?.reset()
        }

        function handleSubmitForPasswordModel() {
            formPassword.value?.validate().then((res)=>{
                if(res.length==0){
                    editPW(formPasswordModel.password, formPasswordModel.newPassword).then((ans:any)=>{
                        if(ans.msgCode==="OTHER_SUCCESS"){
                            ElMessage({
                                type: 'success',
                                message: ans.msg
                            })
                        }else{
                            ElMessage({
                                type: 'error',
                                message: ans.msg
                            })
                        }
                        formPassword.value?.reset()
                    })
                }
            })
        }

        function handleResetForPasswordModel() {
            formPassword.value?.reset()
        }
        onMounted(()=>{
            refresh()
        })
        onBeforeUpdate(()=>{
            refresh()
        })
        return{
            User,
            formModel,
            activeTelephone,
            activeNickName,
            activeSex,
            activePassword,
            formTelephoneModel,
            formNickNameModel,
            formSexModel,
            formPasswordModel,
            formTelephone,
            formNickName,
            formSex,
            formPassword,
            handleSubmitForTelephoneModel,
            handleResetForTelephoneModel,
            handleSubmitForNickNameModel,
            handleResetForNickNameModel,
            handleSubmitForSexModel,
            handleResetForSexModel,
            handleSubmitForPasswordModel,
            handleResetForPasswordModel,
        }
    }
}

</script>

<style scoped>
.container{
    display: flex;
    padding: 2em;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
}

.right-box{
    flex-grow: 1;
    /* display: flex;
    justify-content: center; */
}
.left-box{
    flex-grow: 1;
    /* display: flex;
    justify-content: center; */
}

.buttons{
    margin-left: 0.5em;
}
</style>