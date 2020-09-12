<template>
  <div
    class="max-w-md rounded overflow-hidden shadow-lg m-2 flex flex-col justify-between"
  >
    <div>
      <img
        v-if="imageUrl"
        class="w-full"
        :src="imageUrl"
        :alt="`${breed.name} picture`"
      />
      <div class="px-6 py-4">
        <h3 class="font-bold text-xl mb-2">{{ breed.name }}</h3>
        <div class="flex text-secondary-darker text-lg mb-2">
          <span class="pr-3">
            <i class="fas fa-battery-three-quarters"></i>
            {{ breed.energy_level }}
          </span>
          <span class="pr-3">
            <i class="fas fa-heart"></i>
            {{ breed.affection_level }}
          </span>
          <span class="pr-3">
            <i class="fas fa-dog"></i>
            {{ breed.dog_friendly }}
          </span>
        </div>
        <p class="text-gray-700 text-base">
          {{ breed.description }}
        </p>
      </div>
    </div>
    <div class="px-6 py-4">
      <a
        v-if="breed.cfa_url"
        class="inline-block bg-accent-lighter rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        :href="breed.cfa_url"
        target="_blank"
        >CFA</a
      >
      <a
        v-if="breed.vcahospitals_url"
        class="inline-block bg-accent-lighter rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        :href="breed.vcahospitals_url"
        target="_blank"
        >VCA</a
      >
      <a
        v-if="breed.vetstreet_url"
        class="inline-block bg-accent-lighter rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        :href="breed.vetstreet_url"
        target="_blank"
        >Vetstreet</a
      >
    </div>
  </div>
</template>

<script>
import axios from '../middlware'

export default {
  props: {
    breed: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imageUrl: ''
    }
  },
  mounted() {
    if (this.breed.id) {
      axios
        .get(`/images/search?breed_ids=${this.breed.id}&size=thumb`)
        .then(res => {
          this.imageUrl = res.data[0].url
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
