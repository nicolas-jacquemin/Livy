<template>
  <div class="player-mask">
    <v-row class="player-bottom-bar mb-1 mx-1">
      <v-col cols="auto" class="d-flex justify-center align-center">
        <v-btn icon>
          <v-icon>{{ playButton }}</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="auto" class="d-flex justify-center align-center">
        <v-divider vertical class="timeDivider my-auto"></v-divider>
        <span class="mr-2 ml-1">{{ currentTime }}</span>
        <span class="mr-1">{{ duration }}</span>
        <v-divider vertical class="timeDivider my-auto"></v-divider>
      </v-col>
      <v-col class="d-flex justify-center align-center">
        <v-slider
          v-model="pBar"
          class="mt-0"
          hide-details
          hide-inputs
          thumb-color="primary"
          track-color="primary"
          :max="100"
        ></v-slider>
      </v-col>
      <v-col cols="3" class="d-flex justify-center align-center volCol">
        <v-btn icon>
          <v-icon size="25">{{ volIcon }}</v-icon>
        </v-btn>

        <v-slider
          step="0.1"
          @start="fsVolChange"
          @input="fsVolChange"
          @mousedown="fsVolMsDown"
          @mouseup="fsVolChangeEnd"
          v-model="vol"
          hide-details
          hide-inputs
          thumb-color="primary"
          track-color="primary"
          min="0"
          max="100"
        >
        </v-slider>
      </v-col>
      <v-col cols="auto" class="d-flex justify-center align-center">
        <v-btn icon>
          <v-icon>mdi-fullscreen-exit</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.player-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.534);
  z-index: 1;
}
.h-100 {
  height: 100%;
}

.timeDivider {
  width: 1px;
  height: 50%;
  background: rgba(255, 255, 255, 0.5);
}

.volCol {
  background: rgba(0, 0, 0, 0.24);
  transition: background, 0.2s;
  border-radius: 100px;
}

.volCol:hover {
  background: rgba(0, 0, 0, 0.5);
}

.player-bottom-bar {
  position: absolute;
  width: calc(100% - 8px);
  bottom: 0;
}
</style>

<script lang="js">
export default {
    data () {
        return {
            playButton: 'mdi-play',
            currentTime: '00:00',
            duration: '00:00',
            pBar: 0,
            vol: 100,
            volIcon: 'mdi-volume-high',
            fullScreenIcon: 'mdi-fullscreen',
            txt: {
                live: 'Live'
            }
        }
    }
}
</script>
