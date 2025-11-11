<template>
  <q-footer class="player-footer" elevated>
    <div class="row items-center justify-between full-width">
      <!--Sezione sinistra: copertina + info -->
      <div class="col-3 flex items-center">
        <q-img :src="currentArtist.albumCover" width="56px" height="56px" class="rounded-borders q-mr-md"
          spinner-color="white" />
        <div class="column justify-center">
          <div class="text-body1 text-white text-weight-medium cursor-pointer ellipsis">
            {{ currentTrack?.name || '—' }}
          </div>
          <div class="text-caption text-grey cursor-pointer ellipsis">
            {{ currentArtist?.name || '—' }}
          </div>
        </div>
        <div class="q-ml-md flex items-center q-gutter-xs">
          <q-icon name="favorite" color="green" size="20px" class="cursor-pointer" />
          <q-icon name="picture_in_picture_alt" size="20px" class="cursor-pointer" />
        </div>
      </div>

      <!--Sezione centrale: controlli + barra -->
      <div class="col-6 column items-center justify-center">
        <!-- Controlli -->
        <div class="row items-center justify-center q-gutter-md q-mb-sm">
          <q-btn flat round dense icon="shuffle" color="grey-5" size="sm" />
          <q-btn flat round dense icon="skip_previous" color="white" size="sm"
            @click="useSong.prevSong(currentTrack)" />
          <q-btn round color="white" text-color="black" size="md"
            @click="useSong.playOrPauseThisSong(currentArtist, currentTrack)">
            <q-icon :name="isPlaying ? 'pause' : 'play_arrow'" size="28px" />
          </q-btn>
          <q-btn flat round dense icon="skip_next" color="white" size="sm" @click="useSong.nextSong(currentTrack)" />
          <q-btn flat round dense icon="repeat" color="grey-5" size="sm" />
        </div>

        <!-- Barra progresso -->
        <div class="row items-center full-width no-wrap q-gutter-sm justify-center" style="max-width: 500px">
          <div class="text-caption text-grey" style="width: 35px; text-align: right">
            {{ isTrackTimeCurrent }}
          </div>
          <q-slider v-model="range" color="green" track-color="grey-8" thumb-size="10px" class="col"
            @change="onSeekChange" @mousedown="onSeekDown" @mouseup="onSeekUp" />
          <div class="text-caption text-grey" style="width: 35px">
            {{ isTrackTimeTotal }}
          </div>
        </div>
      </div>

      <!--Sezione destra: volume -->
      <div class="col-3 flex justify-center items-center">
        <MusicPlayerVolume />
      </div>
    </div>
  </q-footer>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useSongStore } from '../stores/song'
import { storeToRefs } from 'pinia'
import MusicPlayerVolume from '../components/MusicPlayerVolume.vue'

const useSong = useSongStore()
const { isPlaying, audio, currentTrack, currentArtist } = storeToRefs(useSong)

const range = ref(0)
const isTrackTimeCurrent = ref('0:00')
const isTrackTimeTotal = ref('0:00')

const timeupdate = () => {
  audio.value?.addEventListener('timeupdate', () => {
    if (!audio.value.duration) return
    const m = Math.floor(audio.value.currentTime / 60)
    const s = Math.floor(audio.value.currentTime % 60)
    isTrackTimeCurrent.value = `${m}:${s.toString().padStart(2, '0')}`
    range.value = (100 / audio.value.duration) * audio.value.currentTime
  })
}

const loadmetadata = () => {
  audio.value?.addEventListener('loadedmetadata', () => {
    const d = audio.value.duration
    const m = Math.floor(d / 60)
    const s = Math.floor(d % 60)
    isTrackTimeTotal.value = `${m}:${s.toString().padStart(2, '0')}`
  })
}

const onSeekChange = (val) => {
  if (!audio.value) return
  const time = audio.value.duration * (val / 100)
  audio.value.currentTime = time
}

const onSeekDown = () => {
  if (audio.value) {
    audio.value.pause()
    isPlaying.value = false
  }
}

const onSeekUp = () => {
  if (audio.value) {
    audio.value.play()
    isPlaying.value = true
  }
}

onMounted(() => {
  if (audio.value) {
    setTimeout(() => {
      timeupdate()
      loadmetadata()
    }, 300)
  }
})

watch(
  () => audio.value,
  () => {
    timeupdate()
    loadmetadata()
  },
)
</script>

<style scoped>
.player-footer {
  background-color: #121212 !important;
  color: white !important;
  border-top: 1px solid #2a2a2a;
  height: 90px;
  padding: 10px 20px;
}
</style>
