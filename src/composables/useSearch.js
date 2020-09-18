import { computed, reactive } from 'vue'
import axios from '../middlware'

export function useSearch() {
  const breedSearch = reactive({
    query: '',
    results: []
  })

  const breedEndpoint = computed(() =>
    breedSearch.query ? '/breeds/search' : '/breeds'
  )

  function runBreedSearch() {
    axios
      .get(breedEndpoint.value, {
        params: {
          limit: 8,
          q: breedSearch.query
        }
      })
      .then(res => {
        breedSearch.results = res.data.filter(breed => breed.description)
      })
  }

  return { breedSearch, runBreedSearch }
}
