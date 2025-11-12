<template>
  <q-page class="library-page bg-dark q-pa-md">
    <div class="text-h5 text-white q-mb-md">
      🎧 Libreria musicale di test
    </div>

    <!-- Qui testiamo SongRow -->
    <song-row />
  </q-page>
</template>

<script setup>
import SongRow from 'src/components/SongRow.vue'
</script>

<style scoped>
.bg-dark {
  background-color: #121212;
  min-height: 100vh;
}
</style>
