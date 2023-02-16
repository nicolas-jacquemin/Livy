<template>
  <div class="d-block d-sm-none mb-10" v-for="(item, i) in section" :key="i">

    <v-row class="mb-2">
      <v-col></v-col>
      <v-col cols="auto">
        <h2>{{ item.sectionTitle }}</h2>
        <v-divider></v-divider>
      </v-col>
      <v-col></v-col>
    </v-row>
    
    <v-card  v-for="n in item.elements" :key="n" class="mx-auto mb-5" max-width="344" height="200" color="black">
      <v-img :src="n.image"></v-img>
      <v-card-title>{{ n.title }}</v-card-title>
    </v-card>
  </div>

  <div class="d-none d-sm-block" v-for="(item, i) in section" :key="i">
    <h2>{{ item.sectionTitle }}</h2>
    <v-slide-group show-arrows class="mt-5 mb-5">
      <v-slide-group-item v-for="n in item.elements" :key="n">
        <v-card class="mx-5" max-width="344" height="200" color="black" link>
          <v-img :src="n.image"></v-img>
          <v-card-title>{{ n.title }}</v-card-title>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<script lang="js">

let el = {
    title: 'Canal+ Formula 1',
    image: 'https://d1fmx1rbmqrxrr.cloudfront.net/cnet/i/edit/2022/01/cnet-guide-F1-2022-canalplus_770x577.jpg',
};

export default {
    data () {
        return {
            section: [
                {sectionTitle: 'Pinned', elements: [el, el, el, el, el, el, el, el]},
                {sectionTitle: 'Recently Viewed', elements: [el, el, el, el, el, el, el, el]},
            ],
        }
    }
}
</script>
