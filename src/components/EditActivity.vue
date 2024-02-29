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
                    <FormItem required label="宣传图上传" prop="postPic">
                        <Upload list-type="card" button-label="宣传图"></Upload>
                    </FormItem>
                </div>
                <div class="right-box">
                    <Tabs active="卡种1" card>
                        <TabPane  label="卡种1">
                            <FormItem required label="概率" prop="chance1">
                                <NumberInput  class="inputs" v-model:value="formModel.chance1"></NumberInput>
                            </FormItem>
                            <FormItem required label="卡种名称" prop="cardName1">
                                <Input  class="inputs" v-model:value="formModel.cardName1"></Input>
                            </FormItem>
                            <FormItem required label="卡面上传" prop="">
                                <Upload  list-type="card" button-label="卡片列表"></Upload>
                            </FormItem>
                        </TabPane >
                        <TabPane   label="卡种2">
                            <FormItem required label="概率" prop="chance2">
                                <NumberInput  class="inputs" v-model:value="formModel.chance2"></NumberInput>
                            </FormItem>
                            <FormItem required label="卡种名称" prop="cardName2">
                                <Input class="inputs" v-model:value="formModel.cardName2"></Input>
                            </FormItem>
                            <FormItem required label="卡面上传" prop="">
                                <Upload list-type="card" button-label="卡面"></Upload>
                            </FormItem>
                        </TabPane >
                        <TabPane label="卡种3">
                            <FormItem required label="概率" prop="chance3">
                                <NumberInput class="inputs" v-model:value="formModel.chance3"></NumberInput>
                            </FormItem>
                            <FormItem required label="卡种名称" prop="cardName3">
                                <Input class="inputs" v-model:value="formModel.cardName3"></Input>
                            </FormItem>
                            <FormItem required label="卡面上传" prop="">
                                <Upload list-type="card" button-label="卡面"></Upload>
                            </FormItem>
                        </TabPane>
                        <TabPane label="卡种4">
                            <FormItem required label="概率/权重" prop="chance4">
                                <NumberInput class="inputs" v-model:value="formModel.chance4"></NumberInput>
                            </FormItem>
                            <FormItem required label="卡种名称" prop="cardName4">
                                <Input class="inputs" v-model:value="formModel.cardName4"></Input>
                            </FormItem>
                            <FormItem required label="卡面上传" prop="">
                                <Upload list-type="card" button-label="卡面"></Upload>
                            </FormItem>
                        </TabPane>
                        <TabPane label="卡种5">
                            <FormItem required label="概率" prop="chance5">
                                <NumberInput class="inputs" v-model:value="formModel.chance5"></NumberInput>
                            </FormItem>
                            <FormItem required label="卡种名称" prop="cardName5">
                                <Input class="inputs" v-model:value="formModel.cardName5"></Input>
                            </FormItem>
                            <FormItem required label="卡面上传" prop="">
                                <Upload list-type="card" button-label="卡面"></Upload>
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
import { ActivityInfo, UploadActivity } from "@/apis/ActivityRequest"
import { defineComponent, ref, reactive, onMounted } from 'vue'

import type { Form } from 'vexip-ui'
export default defineComponent({
    name: "CreateActivity",
    components:{
        
    },
    props:{
        oldActivityInfo:{
            type: Object,
            default:{
                    activityTitle: "activityTitle",
                    postPic: "",
                    startTime: new Date(),
                    endTime: new Date(),
                    createTime: new Date(),
                    rules: "rules",
                    state: "已上架",
                    cardName1: "cardName1",
                    cardPic1: "",
                    chance1: 50,
                    cardName2: "cardName2",
                    cardPic2: "",
                    chance2: 30,
                    cardName3: "cardName3",
                    cardPic3: "",
                    chance3: 15,
                    cardName4: "cardName4",
                    cardPic4: "",
                    chance4: 4,
                    cardName5: "cardName5",
                    cardPic5: "",
                    chance5: 1,
                    participated: false
            }
        }
    },
    setup(props) {
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

        onMounted(()=>{
            formModel.activityTitle=props.oldActivityInfo.activityTitle
            formModel.rules=props.oldActivityInfo.rules
            formModel.state=props.oldActivityInfo.state
            formModel.cardName1=props.oldActivityInfo.cardName1
            formModel.cardName2=props.oldActivityInfo.cardName2
            formModel.cardName3=props.oldActivityInfo.cardName3
            formModel.cardName4=props.oldActivityInfo.cardName4
            formModel.cardName5=props.oldActivityInfo.cardName5
            formModel.chance1=props.oldActivityInfo.chance1
            formModel.chance2=props.oldActivityInfo.chance2
            formModel.chance3=props.oldActivityInfo.chance3
            formModel.chance4=props.oldActivityInfo.chance4
            formModel.chance5=props.oldActivityInfo.chance5
        })

        const form = ref<InstanceType<typeof Form> | null>(null)

        function handleSubmit() {
            form.value?.validate()
        }

        function handleReset() {
            form.value?.reset()
        }

        return {
            formModel,
            form,
            handleSubmit,
            handleReset
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