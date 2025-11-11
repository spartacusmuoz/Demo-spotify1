<template>
  <!-- Componente per la selezione di una categoria con una card colorata e un'immagine -->
  <q-card flat bordered class="category-card cursor-pointer rounded-borders relative overflow-hidden"
    :style="{ backgroundColor: randColor.color }" @Click="goToLibrary">

    <!-- Mostra il nome della categoria nella parte superiore della card -->
    <q-card-selection class="text-white text-h6 q-pt-md q-pb-md z-top">
      {{ category }}
    </q-card-selection>

    <!-- Mostra l'immagine della categoria in basso a destra della card -->
    <q-img :src="image" fit="cover" class="category-image" />
  </q-card>
</template>

<script setup>

import { ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import uniqolor from 'uniqolor'

const router = useRouter()

const props = defineProps({
  category: String,
  image: String,
})
const { category, image } = toRefs(props)
const randColor = ref(uniqolor.random())

const goToLibrary = () => {
  router.push('/library')
}
</script>

<style scoped>
.category-card {
  width: 100%;
  height: 220px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
}

.category-image {
  position: absolute;
  bottom: -10px;
  right: -40px;
  width: 180px;
  height: 180px;
  opacity: 0.65;
  transform: rotate(20deg);
  filter: brightness(0.9) contrast(0.7);
  border-radius: 5px;
  clip-path: inset(0 round 5px);
}

.z-top {
  position: relative;
  z-index: 2;
}
</style>
