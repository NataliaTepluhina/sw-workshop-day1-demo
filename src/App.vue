<template>
  <main>
    <nav class="bg-main py-2 shadow-md flex text-white text-xl items-center">
      <img src="./assets/logo.png" alt="Cat logo" class="logo mx-3" />
      Catsplorer
    </nav>
    <section class="container flex flex-wrap mx-auto">
      <input
        class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 ml-2 mr-10 my-3 block w-full appearance-none leading-normal"
        type="text"
        placeholder="Search breeds..."
        v-model="breedSearch.query"
        @keyup.enter="runBreedSearch"
      />
      <BreedSorting
        :options="resultSorting.options"
        v-model="resultSorting.selectedOptionIndex"
      />
      <BreedCard
        v-for="breed in sortedResults"
        :key="breed.id"
        :breed="breed"
      />
    </section>
  </main>
</template>

<script>
import * as lodash from 'lodash'
import BreedCard from './components/BreedCard.vue'
import BreedSorting from './components/BreedSorting.vue'
import axios from './middlware'

interface Breed {
  [key: string]: unknown;
}

export default {
  name: 'app',
  components: {
    BreedCard,
    BreedSorting
  },
  data() {
    return {
      breedSearch: {
        query: '',
        results: []
      },
      resultSorting: {
        options: [
          ['energy_level', 'desc'],
          ['affection_level', 'desc'],
          ['dog_friendly', 'desc']
        ],
        selectedOptionIndex: 0
      }
    }
  },
  computed: {
    breedEndpoint() {
      return this.breedSearch.query ? '/breeds/search' : '/breeds'
    },
    sortedResults() {
      const selectedOption = this.resultSorting.options[
        this.resultSorting.selectedOptionIndex
      ]
      return lodash.orderBy(this.breedSearch.results, ...selectedOption)
    }
  },
  methods: {
    runBreedSearch() {
      axios
        .get(this.breedEndpoint, {
          params: {
            limit: 8,
            q: this.breedSearch.query
          }
        })
        .then(res => {
          this.breedSearch.results = res.data.filter(breed => breed.description)
        })
    }
  },
  mounted() {
    this.runBreedSearch()
  }
}
</script>

<style lang="scss">
.container {
  max-width: 960px;
}

.logo {
  max-width: 40px;
}
</style>
