<template>
    <div id="container">
        <Card id="card">
            <div id="main-box">
                <div id="left-box">
                    <img alt="Vue logo" src="../assets/logo.png">
                    <div class="title">Now, join us please!</div>
                </div>
                <div id="right-box">
                    <Form
                        id="RegisterForm"
                        ref="form"
                        :model="RegisterForm"
                        :rules="rules"
                        hide-label
                        action=""
                        target="_blank"
                    >
                        <FormItem label="userName" prop="userName">
                            <Input v-model:value="RegisterForm.userName" clearable placeholder="请输入用户名">
                                <template #prefix>
                                <Icon><User></User></Icon>
                                </template>
                            </Input>
                        </FormItem>
                        <FormItem label="nickName" prop="nickName">
                            <Input v-model:value="RegisterForm.nickName" clearable placeholder="请输入昵称">
                                <template #prefix>
                                <Icon><User></User></Icon>
                                </template>
                            </Input>
                        </FormItem>
                        <FormItem label="telephone" prop="telephone">
                            <Input v-model:value="RegisterForm.telephone" clearable placeholder="请输入手机号">
                                <template #prefix>
                                <Icon><User></User></Icon>
                                </template>
                            </Input>
                        </FormItem>
                        <FormItem label="password" prop="password">
                            <Input v-model:value="RegisterForm.password" clearable type="password" placeholder="请输入密码">
                                <template #prefix>
                                <Icon><Lock></Lock></Icon>
                                </template>
                            </Input>
                        </FormItem>
                        <FormItem label="rePassword" prop="rePassword">
                            <Input v-model:value="RegisterForm.rePassword" clearable type="password" placeholder="再次输入密码">
                                <template #prefix>
                                <Icon><Lock></Lock></Icon>
                                </template>
                            </Input>
                        </FormItem>
                        <FormItem label="code" prop="code">
                            <div class="flex-box">
                                <div id="margin-box1">
                                    <image-code :change="data.change_img_code" @click="changeImageCode" @getCode="backImageCode"></image-code>
                                </div>
                                
                                <div id="margin-box2">
                                    <Input v-model:value="RegisterForm.code" clearable placeholder="请输入验证码" id="verifyCodeArea">
                                        <!-- <template #prefix>
                                        <Icon><Lock></Lock></Icon>
                                        </template> -->
                                    </Input>
                                </div>
                                
                            </div>
                            
                        </FormItem>
                        <FormItem>
                            <div id="button-box">
                                <Button circle type="success" class="buttons" @click="goToRegister">
                                    <Icon><Check></Check></Icon>
                                    注 册
                                </Button>
                                <Button ghost type="info" @click="goToLogin" class="buttons">
                                    去 登 录
                                </Button>
                            </div>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </Card>
    </div>
</template>
<script lang="ts" >
import { reactive, ref } from 'vue';
import { Lock, User, Check } from '@vexip-ui/icons';
import { useRouter } from 'vue-router';
import ImageCode from '../components/ImageCode.vue'
import { register, UserInfo } from '@/apis/UserRequest';
import { Form } from 'vexip-ui';
import { ElMessage } from 'element-plus';

export default {
    components: {
        Lock, User, Check, ImageCode
    },
  setup() {
    // const verifyCode=ref("")
    const router = useRouter();
    const sexes=["保密", "女", "男"]
    const form = ref<InstanceType<typeof Form> | null>(null)
    const RegisterForm = reactive({
      userName: '',
      nickName: '',
      telephone: '',
      password: '',
      rePassword: '',
      code: '',
    });

    const rules=ref({
        userName: {
            required: true,
            message: '用户名不能为空'
        },
        nickName:{
            required: true,
            message: '昵称不能为空'
        },
        telephone:{
            required: true,
            message: '手机号不能为空'
        },
        password:[
            {
                required: true,
                message: '密码不能为空'
            },
            {
                validator: (value: string) =>{
                    if(value.length<8){
                        return '密码长度应该不少于8'
                    }else if(!(/[A-Z]+/.test(value))) {
                        return "密码未包含大写字母"
                    }else if (!(/[0-9]+/.test(value))) {
                        return "密码未包含数字"
                    }else if (!(/[a-z]+/.test(value))) {
                        return "密码未包含小写字母"
                    }
                    return true
                }
            }
        ],
        rePassword:{
            validator: (value: string) =>{
                if(value!=RegisterForm.password){
                    return '两次密码应该一致'
                }
                return true
            }
        },
        code: {
            validator: ()=>{
                return RegisterForm.code!=''
            },
            message: '验证码不能为空'
        }
    })

    function goToRegister(){
        form.value?.validate().then((res=>{
            if(res.length==0){
                if(data.img_code!=RegisterForm.code){
                    ElMessage({
                        type: 'warning',
                        message: '验证码不正确'
                    })
                    return
                }
                let userInfo: UserInfo={
                    userName: RegisterForm.userName,
                    sex: '保密',
                    password: RegisterForm.password,
                    telephone: RegisterForm.telephone,
                    nickName: RegisterForm.nickName,
                    userType: 'normal',
                    createTime: new Date(),
                    userId: ''
                }
                register(userInfo).then((ans:any)=>{
                    // console.log(ans)
                    if(ans.msgCode=='REGISTER_SUCCESS'){
                        ElMessage({
                            type: 'success',
                            message: ans.msg
                        })
                        RegisterForm.code=''
                        form.value?.reset()
                    }else{
                        ElMessage({
                            type: 'error',
                            message: ans.msg
                        })
                    }
                    // router.push('/home')
                    changeImageCode()
                })
            }
        }))
        
        
        
        
    }

    function goToLogin(){
        router.push('/login')
    }

    const data = reactive({
        change_img_code: false, // 刷新验证码
        img_code:'',// 加密后的验证码值
    })
                
                // 刷新验证码操作
    const changeImageCode = ()=> {
        data.change_img_code = !data.change_img_code
    }
    
                // 接收组件返回加密后的验证码值
    const backImageCode = (code: string) =>{
        data.img_code = code
        // console.log('data',data.img_code)
    }

    return {
      RegisterForm,
      sexes,
      rules,
      form,
      goToLogin,
      changeImageCode,
      backImageCode,
      goToRegister,
      data
    };
  },
};

</script>

<style scoped>
#container{
    margin: 6em auto;
    width: 80%;
    height: 30em;
    display: flex;
    justify-content: center;
    align-items: center;

}
#main-box{
    width: 50em;
    height: 35em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    
}

#card{
    box-shadow: 0 12px 16px 0  rgba(0,0,0,0.24), 0 17px 50px 0 #4E655D;
}

#left-box{
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
#right-box{
    padding: 1em;
    width: 50%;
    height: 100%;
    background-color: gainsboro;
    display: flex;
    justify-content: center;
    align-items: center;
}
#button-box{
    display: flex;
    flex-direction: row-reverse;
    /* margin: 0.5em 1em; */
}
.buttons{
    margin: 0 0 0 1em;
}

#verifyCodeArea{
    width: 8em;
}
.flex-box{
    display: flex;
    align-items: center;
    justify-content: center;
}

#magin-box1{
    width: 11em;
}
#magin-box2{
    flex: 1;
    margin-left: 1em;
}
</style>
