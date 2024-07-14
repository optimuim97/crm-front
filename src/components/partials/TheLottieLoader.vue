<script setup>

import { Vue3Lottie } from "vue3-lottie";

const props = defineProps({
        showAnim: {
            type: Boolean
        }
    })

</script>

<template>
    <div class="w-full h-[50vh]  top-0 left-0 z-99998 overflow-hidden bg-[#ffffff] flex justify-center items-center" v-if="showAnim">
        <Vue3Lottie ref="customControl" :animationLink="'/animations/data.json'" :height="250" :width="250" :loop="true" :speed="2"
                    :autoPlay="true" :pauseAnimation="false" :pauseOnHover="false"
        />
    </div>
</template>

<style scoped></style>