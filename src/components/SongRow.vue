<template>
  <div class="song-list q-pa-md" v-if="artist">
    <!-- Sezione immagine e info artista -->
    <div class="artist-header row items-center q-mb-lg">
      <q-img
        :src="artist.albumCover || '/assets/default_cover.jpg'"
        spinner-color="green"
        style="width: 200px; height: 200px; border-radius: 15px;"
        class="q-mr-xl shadow-3"
      />
      <div class="column">
        <div class="text-h4 text-white q-mb-sm">{{ artist.name }}</div>
        <div class="text-h6 text-grey-5">{{ artist.album }} ({{ artist.releaseYear }})</div>
      </div>
    </div>

    <!-- Lista canzoni -->
    <q-list bordered separator class="bg-grey-9 rounded-borders">
      <q-item
        v-for="track in artist.tracks"
        :key="track.id"
        clickable
        v-ripple
        @click="playTrack(track)"
        :class="{ 'active-track': currentTrack?.id === track.id }"
      >
        <q-item-section avatar>
          <q-icon
            :name="currentTrack?.id === track.id && isPlaying ? 'equalizer' : 'music_note'"
            color="green"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-white">{{ track.name }}</q-item-label>
          <q-item-label caption class="text-grey-5">{{ artist.album }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            flat
            round
            dense
            :icon="currentTrack?.id === track.id && isPlaying ? 'pause' : 'play_arrow'"
            color="white"
            @click.stop="playTrack(track)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <div v-else class="q-pa-md text-white">Caricamento artista…</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSongStore } from '../stores/song'
import { storeToRefs } from 'pinia'

const useSong = useSongStore()
const { currentTrack, isPlaying, currentArtist } = storeToRefs(useSong)

const artist = currentArtist

onMounted(async () => {
  if (!artist.value) {
    await useSong.loadArtistData()
  }
})

const playTrack = (track) => {
  useSong.playOrPauseThisSong(currentArtist.value, track)
}
</script>

<style scoped>
.song-list {
  background-color: #181818;
  border-radius: 10px;
}

.artist-header {
  min-height: 200px;
}

.q-item.active-track {
  background-color: rgba(30, 215, 96, 0.15);
}

.q-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.q-item-label {
  cursor: pointer;
}
</style>
