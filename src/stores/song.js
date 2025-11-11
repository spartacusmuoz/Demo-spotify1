import { defineStore } from 'pinia'
import artistData from '../artist.json'

export const useSongStore = defineStore('song', {
  state: () => ({
    isPlaying: false,
    audio: null,
    currentArtist: null,
    currentTrack: null,
  }),

  actions: {
    async loadArtistData() {
      try {
        //Carica i dati locali
        this.currentArtist = artistData

        //Recupera la copertina album da iTunes API
        const artistName = artistData.name
        const albumName = artistData.album || 'Borondo' // puoi aggiungere "album" nel tuo JSON

        const query = encodeURIComponent(`${artistName} ${albumName}`)
        const url = `https://itunes.apple.com/search?term=${query}&entity=album&limit=1`

        const response = await fetch(url)
        if (!response.ok) throw new Error('Errore nella risposta API iTunes')

        const data = await response.json()

        if (data.results && data.results.length > 0) {
          //iTunes restituisce artworkUrl100 — sostituiamo la dimensione
          const artwork = data.results[0].artworkUrl100.replace('100x100', '600x600')
          this.currentArtist.albumCover = artwork
        } else {
          console.warn('Nessuna copertina trovata per:', artistName, albumName)
          this.currentArtist.albumCover = '/assets/default_cover.jpg'
        }
      } catch (err) {
        console.error('Errore nel recupero copertina album:', err)
        this.currentArtist.albumCover = '/assets/default_cover.jpg'
      }
    },

    loadSong(artist, track) {
      this.currentArtist = artist
      this.currentTrack = track

      if (this.audio && this.audio.src) {
        this.audio.pause()
        this.isPlaying = false
        this.audio.src = ''
      }

      this.audio = new Audio(track.path)

      setTimeout(() => {
        this.isPlaying = true
        this.audio.play()
      }, 200)
    },

    playOrPauseSong() {
      if (!this.audio) return

      if (this.audio.paused) {
        this.isPlaying = true
        this.audio.play()
      } else {
        this.isPlaying = false
        this.audio.pause()
      }
    },

    playOrPauseThisSong(artist, track) {
      if (!this.audio || !this.audio.src || this.currentTrack?.id !== track.id) {
        this.loadSong(artist, track)
        return
      }
      this.playOrPauseSong()
    },

    prevSong(currentTrack) {
      const index = currentTrack.id - 2
      if (index >= 0) {
        const track = artistData.tracks[index]
        this.loadSong(artistData, track)
      }
    },

    nextSong(currentTrack) {
      const index = currentTrack.id
      const track = artistData.tracks[index % artistData.tracks.length]
      this.loadSong(artistData, track)
    },

    playFromFirst() {
      this.resetState()
      const firstTrack = artistData.tracks[0]
      this.loadSong(artistData, firstTrack)
    },

    resetState() {
      this.isPlaying = false
      this.audio = null
      this.currentArtist = null
      this.currentTrack = null
    },
  },

  persist: true,
})
