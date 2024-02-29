<template>
    <div>
        <Form
            ref="form"
            :model="formModel"
            :label-width="100"
        >
            <div class="container">
                <div class="left-box">
                    <FormItem required label="活动标题" prop="activityTitle">
                        <Input v-model:value="formModel.activityTitle" class="inputs"></Input>
                    </FormItem>
                    <FormItem required label="规则" prop="rules">
                        <Textarea v-model:value="formModel.rules"  class="inputs"></Textarea>
                    </FormItem>
                    <FormItem required label="开始时间" prop="startTime">
                        <DatePicker  class="inputs" type="datetime" v-model:value="formModel.startTime" style="max-width: 300px;" clearable></DatePicker>
                    </FormItem>
                    <FormItem required label="截止时间" prop="endTime">
                        <DatePicker class="inputs" type="datetime" v-model:value="formModel.endTime" style="max-width: 300px;" clearable></DatePicker>
                    </FormItem>
                    <FormItem label="宣传图上传" prop="postPic">
                        <Upload list-type="card" button-label="宣传图" @change="getPostPic"></Upload>
                    </FormItem>
                </div>
                <div class="right-box">
                    <Tabs active="卡种1" card>
                        <TabPane  label="卡种1">
                            <FormItem required label="概率" prop="chance1">
                                <NumberInput class="inputs" v-model:value="formModel.chance1"></NumberInput>
                            </FormItem>
                            <FormItem required label="卡种名称" prop="cardName1">
                                <Input  class="inputs" v-model:value="formModel.cardName1"></Input>
                            </FormItem>
                            <FormItem label="卡面上传" prop="">
                                <Upload  list-type="card" button-label="卡面"  @change="getCardPic1"></Upload>
                            </FormItem>
                        </TabPane >
                        <TabPane   label="卡种2">
                            <FormItem required label="概率" prop="chance2">
                                <NumberInput  class="inputs" v-model:value="formModel.chance2"></NumberInput>
                            </FormItem>
                            <FormItem required label="卡种名称" prop="cardName2">
                                <Input class="inputs" v-model:value="formModel.cardName2"></Input>
                            </FormItem>
                            <FormItem label="卡面上传" prop="">
                                <Upload list-type="card" button-label="卡面"  @change="getCardPic2"></Upload>
                            </FormItem>
                        </TabPane >
                        <TabPane label="卡种3">
                            <FormItem required label="概率" prop="chance3">
                                <NumberInput class="inputs" v-model:value="formModel.chance3"></NumberInput>
                            </FormItem>
                            <FormItem required label="卡种名称" prop="cardName3">
                                <Input class="inputs" v-model:value="formModel.cardName3"></Input>
                            </FormItem>
                            <FormItem label="卡面上传" prop="">
                                <Upload list-type="card" button-label="卡面"   @change="getCardPic3"></Upload>
                            </FormItem>
                        </TabPane>
                        <TabPane label="卡种4">
                            <FormItem required label="概率" prop="chance4">
                                <NumberInput class="inputs" v-model:value="formModel.chance4"></NumberInput>
                            </FormItem>
                            <FormItem required label="卡种名称" prop="cardName4">
                                <Input class="inputs" v-model:value="formModel.cardName4"></Input>
                            </FormItem>
                            <FormItem label="卡面上传" prop="">
                                <Upload list-type="card" button-label="卡面"   @change="getCardPic4"></Upload>
                            </FormItem>
                        </TabPane>
                        <TabPane label="卡种5">
                            <FormItem required label="概率" prop="chance5">
                                <NumberInput class="inputs" v-model:value="formModel.chance5"></NumberInput>
                            </FormItem>
                            <FormItem required label="卡种名称" prop="cardName5">
                                <Input class="inputs" v-model:value="formModel.cardName5"></Input>
                            </FormItem>
                            <FormItem label="卡面上传" prop="">
                                <Upload list-type="card" button-label="卡面"   @change="getCardPic5"></Upload>
                            </FormItem>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            
            
            <FormItem action>
            <Button type="primary" @click="handleSubmit()">
                提交
            </Button>
            <Button @click="handleReset()">
                重置
            </Button>
            </FormItem>
        </Form>
    </div>
</template>

<script lang="ts">
import { createActivity, UploadActivity } from "@/apis/ActivityRequest"
import { defineComponent, ref, reactive } from 'vue'
import {ElMessage} from 'element-plus'

import type { Form } from 'vexip-ui'
export default defineComponent({
    name: "CreateActivity",
    components:{
        
    },
    // props:{

    // },
    setup() {
        const formModel = reactive<UploadActivity>({
            activityTitle: '',
            postPic: [] as File[],
            startTime: '',
            endTime: '',
            rules: '',
            state: 0,
            cardName1: '',
            cardPic1: [] as File[],
            chance1: 0,
            cardName2: '',
            cardPic2: [] as File[],
            chance2: 0,
            cardName3: '',
            cardPic3: [] as File[],
            chance3: 0,
            cardName4: '',
            cardPic4: [] as File[],
            chance4: 0,
            cardName5: '',
            cardPic5: [] as File[],
            chance5: 0,
        })

        const form = ref<InstanceType<typeof Form> | null>(null)

        function handleSubmit() {
            form.value?.validate().then((res)=>{
                if(res.length==0){
                    createActivity(formModel).then((ans:any)=>{
                        if(ans.msgCode=='CREATE_ACTIVITY_SUCCESS'){
                            ElMessage({
                                type: 'success',
                                message: '创建成功'
                            })
                            handleReset()
                        }else{
                            ElMessage({
                                type: 'error',
                                message: '创建失败'
                            })
                        }
                        
                    })
                }
            })
            // console.log(formModel)
            
        }

        function handleReset() {
            form.value?.reset()
            formModel.cardPic1=[]
            formModel.cardPic2=[]
            formModel.cardPic3=[]
            formModel.cardPic4=[]
            formModel.cardPic5=[]
            formModel.postPic=[]
        }

        function getCardPic1(files: File[]){
            // console.log(files)
            formModel.cardPic1=files
        }

        function getCardPic2(files: File[]){
            // console.log(files)
            formModel.cardPic2=files
        }

        function getCardPic3(files: File[]){
            // console.log(files)
            formModel.cardPic3=files
        }

        function getCardPic4(files: File[]){
            // console.log(files)
            formModel.cardPic4=files
        }

        function getCardPic5(files: File[]){
            // console.log(files)
            formModel.cardPic5=files
        }

        function getPostPic(files: File[]){
            // console.log(files)
            formModel.postPic=files
        }


        return {
            formModel,
            form,
            handleSubmit,
            handleReset,
            getCardPic1, getCardPic2, getCardPic3, getCardPic4, getCardPic5,
            getPostPic
        }
    }
})


</script>

<style scoped>
.container{
    display: flex;
    width: 60em;
    
}

.left-box{
    flex-grow: 1;
    padding: 1em;
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
}

.right-box{
    flex-grow: 1;
    padding: 1em;
    /* flex-direction: column;
    display: flex;
    justify-content: center; */
}

.inputs{
    width: 20em;
}
</style>