import { reactive } from 'vue'

export function useSearch() {
  const breedSearch = reactive({
    query: '',
    results: []
  })

  return { breedSearch }
}
