<template>
    <div class="header">
        <div id="left-part">
            <Tag ghost circle class="little-box" size="large">
                CMB INTERN 集卡门户
            </Tag>
            <!-- <router-link :to="{name: 'playground'}">广场</router-link>
            <router-link :to="{name: 'myActivity'}">我的活动</router-link>
            <router-link :to="{name: 'space'}">个人空间</router-link> -->
        </div>
        <div id="right-part">
            <Button ghost class="little-box" @click="goToPlayground">
                活动广场
            </Button>
            <template v-if="!isLogined">
                <Button ghost  class="little-box" @click="goToLogin">
                    去登录
                </Button>
                <Button ghost  class="little-box" @click="goToRegister">
                    去注册
                </Button>
            </template>
            <template v-else>
                <Button ghost  class="little-box" @click="goToAdmin">
                    我是管理员
                </Button>
                <div id="user-avator"  class="little-box">
                    <Avatar circle :icon="User"></Avatar>
                    <Dropdown trigger="click">
                        <Button ghost size="small" text>
                            我
                            <Icon :scale="1">
                                <AngleDown></AngleDown>
                            </Icon>
                        </Button>
                    
                        <template #drop>
                        <DropdownList>
                            <DropdownItem @click="goToMyActivity">我的活动</DropdownItem>
                            <DropdownItem @click="goToSpace">个人信息</DropdownItem>
                            <DropdownItem @click="logout">
                                注销
                            </DropdownItem>
                        </DropdownList>
                        </template>
                    </Dropdown>
                </div>
            </template>
            
            
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUpdate, onMounted, ref } from 'vue';
import { Lock, User, Check, AngleRight, AngleDown} from '@vexip-ui/icons';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "MyHeader",
    components: {
        AngleDown
    },
    setup(){
        const router = useRouter();
        const isLogined=ref(false);
        onBeforeUpdate(()=>{
            if(localStorage.getItem('token')!==null){
                isLogined.value=true
            }
            // console.log(isLogined.value)
        })
        onMounted(()=>{
            if(localStorage.getItem('token')!==null){
                isLogined.value=true
            }
            // console.log('wuyu')
        })

        function goToMyActivity(){
            router.push('/home/myActivity')
        }

        function goToSpace(){
            router.push('/home/space')
        }

        function goToPlayground(){
            router.push('/home/playground')
        }

        function goToLogin(){
            router.push('/login')
        }

        function goToRegister(){
            router.push('/register')
        }

        function goToAdmin(){
            router.push('/home/admin')
        }

        function logout(){
            localStorage.removeItem("token")
            isLogined.value=false
            router.push('/')
            
        }

        return{
            User,
            AngleDown,
            isLogined,
            goToPlayground,
            goToMyActivity,
            goToSpace,
            goToLogin,
            goToRegister,
            goToAdmin,
            logout,
        }
    }
})
</script>

<style scoped>
.header{
    background-color: #779a3b;
    /* width: 50em; */
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 75px;
    font-size: 22px;
    font-weight: 800;
    /* color: darkkhaki; */
    display: flex;
    flex-direction: row;
    align-items: center;
}

#left-part{
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0.5em;
}

#right-part{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 0.5em;
}

.little-box{
    margin: 0 0.3em;
    
}

#user-avator{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>