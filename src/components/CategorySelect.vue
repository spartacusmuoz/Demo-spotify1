<template>
    <q-card>
        flat
        bordered
        class="category-card cursor-pointer rounded-borders relative overflow-hidden"
        :style="{ backgroundColor: randColor.color}"
        @Click="goToLibrary"

        <q-card-selection class="text-white text-h6 q-pt-md q-pb-md z-top">
         {{category.name}}
        </q-card-selection>

        <q-img
            :src="image"
            fit="cover"
            class="category-image" />



    </q-card>
</template>

 <script setup>

 //importazione librerie
 import { ref, toRefs } from 'vue';
 import { useRouter } from 'vue-router';
 import uniqolor from 'uniqolor';

 const router = useRouter()
 
 const props = usedefineProps({
    category: String,
    image: String,

 })

 const { category, image } = toRefs (props)
 const randColor = ref(uniqolor.random);

 function goToLibrary() {
    router.push('library')

 </script>

<style scoped>
.category-card {
   width: 100px;
   height: 220px;
   border-radius: 10px;
   over-flow: hidden;
   position: relative;
   transition: transform 0.3s ;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);

.category-card:hover {
    transform: scale(1.05);
    box-
}
</style>