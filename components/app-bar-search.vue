<template>
  <v-autocomplete
    prepend-icon="mdi-magnify"
    v-model="select"
    v-model:search="search"
    :loading="loading"
    :items="items"
    class="mx-4"
    density="comfortable"
    hide-no-data
    hide-details
    label="Search"
    style="max-width: 300px"
  ></v-autocomplete>
</template>

<script>
export default {
  data () {
    return {
      items: [],
        search: null,
        select: null,
        content: ['coucou', 'salut', 'caca', 'coco']
    }
  },
  watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
    },
    methods: {
      querySelections (v) {
        this.loading = true
        setTimeout(() => {
          this.items = this.content.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      },
  },
}
</script>