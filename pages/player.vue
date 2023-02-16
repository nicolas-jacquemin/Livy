<template>
    <v-row class="ml-5 mr-5">
        <v-col class="col-12 col-md-8">
            <v-row>
                <v-col cols="12">
                    <video class="mx-auto bg-black" src=""></video>
                    <player-mask></player-mask>
                </v-col>
                <v-col cols="12">
                    <h2>{{ obj.title }}</h2>
                </v-col>
                <v-col cols="12">
                    <p>{{ obj.description }}</p>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="4" class="d-none d-md-flex">

        </v-col>
    </v-row>
</template>

<style>
    video {
        width: 100%;
        height: 100%;
    }
</style>

<script lang="js">

let video;
let playerMask;

const playerFitSizeOfVideo = () => {
    let videoWidth = video.offsetWidth;
    let videoHeight = video.offsetHeight;
    let videoTop = video.offsetTop;
    let videoLeft = video.offsetLeft;

    playerMask.style.width = videoWidth + 'px';
    playerMask.style.height = videoHeight + 'px';
    playerMask.style.top = videoTop + 'px';
    playerMask.style.left = videoLeft + 'px';
    setTimeout(() => {
        playerFitSizeOfVideo();
    }, 10);
}

export default {
    data() {
        return {
            obj : {
                title: 'Sample Video',
                description: 'This is a sample video',
                url: 'http://techslides.com/demos/sample-videos/small.mp4'
            }
        }
    },
    mounted() {
        this.video = document.querySelector('video')
        this.video.src = this.obj.url
        this.video.play()
        video = document.querySelector('video');
        playerMask = document.querySelector('.player-mask');
        playerFitSizeOfVideo();
    }
}

</script>