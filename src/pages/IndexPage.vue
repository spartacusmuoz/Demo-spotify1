<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px" />
  </q-page>
  <category-select></category-select>
  <home-card></home-card>
</template>

<script setup>

import CategorySelect from 'src/components/CategorySelect.vue';
import HomeCard from 'src/components/HomeCard.vue';

</script>
