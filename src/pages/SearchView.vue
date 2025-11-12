<template>
  <div class="q-pa-md">
    <!-- Titolo principale -->
    <div class="text-h4 q-mb-lg text-center">Scopri la Musica per Genere</div>

    <!-- Barra di ricerca -->
    <q-input
      filled
      v-model="searchQuery"
      label="Cerca un genere..."
      clearable
      class="q-mb-lg"
      @keyup.enter="searchGenre"
    />

    <!-- Griglia generi -->
    <div class="row q-gutter-md justify-center">
      <CategorySelect
        v-for="(genre, index) in filteredGenres"
        :key="index"
        :category="genre.name"
        :image="genre.image"
        @click="selectGenre(genre.name)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CategorySelect from '../components/CategorySelect.vue'

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY

// Lista completa dei generi
const genres = ref([
  'Rock', 'Pop', 'Reggaeton', 'Classical', 'Jazz', 'Hip Hop', 'Electronic', 
  'Country', 'Soul', 'Funk', 'Blues', 'Metal', 'Reggae', 'Folk', 'R&B', 'Dance'
].map(name => ({ name, image: '' })))

const searchQuery = ref('')

// Filtra generi in base alla barra di ricerca
const filteredGenres = computed(() => {
  if (!searchQuery.value) return genres.value
  return genres.value.filter(g =>
    g.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Carica un'immagine per ogni genere da Unsplash
const fetchGenreImages = async () => {
  for (let genre of genres.value) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          genre.name
        )}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
      )
      const data = await res.json()
      if (data.results && data.results.length > 0) {
        genre.image = data.results[0].urls.regular
      } else {
        genre.image = 'https://via.placeholder.com/200?text=No+Image'
      }
    } catch (err) {
      console.error(err)
      genre.image = 'https://via.placeholder.com/200?text=Error'
    }
  }
}

onMounted(() => {
  fetchGenreImages()
})

// Cliccando sul genere
const selectGenre = (name) => {
  console.log('Genere selezionato:', name)
  // In futuro puoi navigare a una pagina artisti o canzoni
}

// Barra di ricerca Enter
const searchGenre = () => {
  console.log('Ricerca per:', searchQuery.value)
}
</script>

<style scoped>
/* Modifica delle card per essere quadrate e più piccole */
.category-card {
  width: 140px !important;
  height: 140px !important;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}

.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
}

.category-image {
  position: absolute;
  bottom: -10px;
  right: -40px;
  width: 100px;
  height: 100px;
  opacity: 0.65;
  transform: rotate(20deg);
  filter: brightness(0.9) contrast(0.7);
  border-radius: 5px;
  clip-path: inset(0 round 5px);
}

.q-input {
  max-width: 400px;
  margin: 0 auto;
  display: block;
}
</style>
