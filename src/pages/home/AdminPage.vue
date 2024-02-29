<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { EnvelopesBulk, City, ChartPie, User } from '@vexip-ui/icons'
import { useRouter } from 'vue-router'

export default{
    components: {
        // EnvelopesBulk, City, ChartPie, User
    },
    setup(){
        const reduced = ref(false)
        const router=useRouter()

        function handleSelect(label: string, meta: { path: string }) {
            // console.info(label, meta)
            router.push(meta.path)
        }
        return {
            EnvelopesBulk, City, ChartPie, User,
            reduced,
            handleSelect
        }
    }
}
</script>

<style scoped>


.container{
    display: flex;
    /* justify-content: flex-start; */
    flex-direction: column;
}
</style>