<template>
    <div id="container">
        <Card id="card">
            <div id="main-box">
                <div id="left-box">
                    <img alt="Vue logo" src="../assets/logo.png">
                    <div class="title">Welcome to cmb colect!</div>
                </div>
                <div id="right-box">
                    <Form
                        id="loginForm"
                        ref="form"
                        :model="formModel"
                        hide-label
                        action=""
                        target="_blank"
                        :rules="rules"
                    >
                        <FormItem label="username" prop="username">
                            <Input v-model:value="formModel.username" clearable placeholder="请输入帐号">
                                <template #prefix>
                                <Icon><User></User></Icon>
                                </template>
                            </Input>
                        </FormItem>
                        <FormItem label="password" prop="password">
                            <Input v-model:value="formModel.password" clearable type="password" placeholder="请输入密码">
                                <template #prefix>
                                <Icon><Lock></Lock></Icon>
                                </template>
                            </Input>
                        </FormItem>
                        <FormItem prop="code" label="code">
                            <div class="flex-box">
                                <image-code :change="data.change_img_code" @click="changeImageCode" @getCode="backImageCode"></image-code>
                            
                                <Input v-model:value="formModel.code" clearable placeholder="请输入验证码" id="verifyCodeArea">
                                </Input>
                            </div>
                            
                        </FormItem>
                        <FormItem>
                            <div id="button-box">
                                <Button circle type="success" class="buttons" @click="goToMainPage">
                                    <Icon><Check></Check></Icon>
                                    登 陆
                                </Button>
                                <Button ghost type="info" @click="goToRegister" class="buttons">
                                    注 册
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
import { Lock, User, Check, } from '@vexip-ui/icons';
import { useRouter } from 'vue-router';
import ImageCode from '../components/ImageCode.vue'
import {login} from '../apis/UserRequest'
import { Form } from 'vexip-ui';
import { ElMessage } from 'element-plus'

export default {
    components: {
        Lock, User, Check, ImageCode
    },
  setup() {
    // const verifyCode=ref("")
    const loading =ref(false);
    const router = useRouter();
    const form = ref<InstanceType<typeof Form> | null>(null)
    const formModel = reactive({
      username: '',
      password: '',
      code: ''
    });

    const rules=ref({
        username: {
            required: true,
            message: '用户名不能为空'
        },
        password:{
            required: true,
            message: '密码不能为空'
        },
        code: {
            validator: ()=>{
                return formModel.code!=''
            },
            message: '验证码不能为空'
        }
    })

    function goToRegister(){
        router.push('/register')
    }
    
    function goToMainPage(){
        form.value?.validate().then(res=>{
            
            if(res.length==0){
                if(data.img_code!=formModel.code){
                    ElMessage({
                        type: 'warning',
                        message: '验证码不正确'
                    })
                    return
                }
                // loading.value=true
                login(formModel.username, formModel.password).then((res: any)=>{
                    // to-do
                    // console.log(res)
                    // loading.value=false
                    if(res==null)return
                    if(res.msgCode=='LOGIN_SUCCESS'){
                        ElMessage({
                            type: 'success',
                            message: res.msg
                        })
                        router.push('/home')
                    }else{
                        ElMessage({
                            type: 'error',
                            message: res.msg
                        })
                    }
                    
                    
                })
            }
        })
        
    }

    const data = reactive({
        change_img_code: false, // 刷新验证码
        img_code:'',// 验证码值
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
      formModel,
    //   verifyCode,
        loading,
      form,
      rules,
      goToRegister,
      goToMainPage,
      changeImageCode,
      backImageCode,
      data
    };
  },
};

</script>

<style scoped>
#container{
    margin: 6em auto;
    width: 80%;
    height: 25em;
    display: flex;
    justify-content: center;
    align-items: center;

}
#main-box{
    width: 50em;
    height: 30em;
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

.flex-box{
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
