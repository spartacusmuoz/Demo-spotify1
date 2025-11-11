<template>
  <div class="row items-center no-wrap q-gutter-sm">
    <!-- Icona volume -->
    <q-icon :name="vol === 0 ? 'volume_off' : 'volume_up'" size="24px" class="cursor-pointer" @click="toggleMute" />

    <!-- Slider volume -->
    <q-slider v-model.number="vol" :min="0" :max="100" :step="1" color="green" track-color="grey-8" thumb-size="10px"
      class="volume-slider" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useSongStore } from '../stores/song'
import { storeToRefs } from 'pinia'

const useSong = useSongStore()
const { audio } = storeToRefs(useSong)

const vol = ref(80) // Volume iniziale tra 0 e 100
let lastVol = 80 // Per ricordare il volume prima del mute

// Aggiorna il volume dell'audio quando vol cambia
watch(vol, (value) => {
  if (audio.value && typeof audio.value.volume === 'number') {
    audio.value.volume = value / 100
  }
})

// Toggle mute/unmute
const toggleMute = () => {
  if (vol.value === 0) {
    vol.value = lastVol
  } else {
    lastVol = vol.value
    vol.value = 0
  }
}

// Sincronizza il volume iniziale quando l’audio è pronto
onMounted(() => {
  if (audio.value && typeof audio.value.volume === 'number') {
    vol.value = Math.round(audio.value.volume * 100)
  }
})
</script>

<style scoped>
.volume-slider {
  width: 150px;
}
</style>
