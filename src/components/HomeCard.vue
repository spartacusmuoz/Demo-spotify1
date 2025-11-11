<template>
  <!-- Componente per visualizzare una home card con immagine, titolo e sottotitolo -->
  <q-card class="bg-dark text-white rounded--md cursor-pointer hover:scale-[1.03] transition-transform"
    style="max-width: 180px; width: 100%" @Click="goToLibrary">

    <!-- Visualizza l'immagine nella parte superiore della card -->

    <q-img :src="image" ratio="1" class="rounded-md" />

    <!-- Sezione per il titolo e il sottotitolo della card -->

    <q-card-section class="q-pa-sm">
      <div class="text-body1 ellipsis">{{ title }}</div>
      <div class="text-grey-6 text-caption ellipsis">{{ subTitle }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup>

// Importa le funzioni necessarie da Vue e Vue Router

import { toRefs } from 'vue'
import { useRouter } from 'vue-router'

// Definisci le proprietà che il componente HomeCard accetta

const props = defineProps({
  image: String,
  title: String,
  subTitle: String,
})

// Destruttura le proprietà per un accesso più semplice

const { image, title, subTitle } = toRefs(props)
const router = useRouter()

// Funzione per navigare alla pagina della libreria quando si fa clic sulla scheda

const goToLibrary = () => {
  router.push('/library')
}

</script>
