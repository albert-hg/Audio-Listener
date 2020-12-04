<template>
  <div id="app">
    <div>
      <input type="file" @change="browseAudioFile($event.target.files)" />
      <input type="text" v-model="audioUrl" />
      <button type="button" @click="loadResource(audioUrl)">載入網址資源</button>
    </div>
    <div id="waveform-container" style="width: 100%; overflow: auto;">
      <div id="waveform" ref="waveform" style="width: fit-content;"></div>
    </div>
    <div id="waveform-controller" v-if="wavesurfer && wavesurfer.backend.buffer">
      <button type="button" @click="switchPlayPause()">
        <span v-if="isNowPlaying">暫停</span>
        <span v-else>播放</span>
      </button>
      <button type="button" @click="switchKeepUpdatePosition()">
        <span v-if="isKeepUpdatePosition">取消定位</span>
        <span v-else>啟動定位</span>
      </button>
    </div>
    <div id="split-data-container"></div>
  </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";

export default {
  name: "app",
  components: {},
  data() {
    return {
      wavesurfer: null,
      peakSizePerSec: 40,
      audioPeakData: [],
      audioUrl: "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3",
      isKeepUpdatePosition: true,
      isNowPlaying: false,
    };
  },
  mounted() {
    this.initCreateWaveSurfer();
  },
  methods: {
    initCreateWaveSurfer() {
      this.wavesurfer = WaveSurfer.create({
        container: "#waveform",
        waveColor: "#2682d4",
        progressColor: "#2682d4",
        backend: "MediaElement",
        fillParent: false,
        minPxPerSec: this.peakSizePerSec,
        // audioRate: 0.8,
      });
    },
    loadResource(res) {
      clearTimeout(this.$options.keepUpdatingTogglePosition);
      this.wavesurfer.unAll();
      this.wavesurfer.load(res);
      this.setWavesurferOnWaveformReady();
      this.setWavesurferOnPause();
      this.setWavesurferOnFinish();
    },
    browseAudioFile(files = []) {
      if (!!files || files.length == 1) {
        let file = files[0];
        let reader = new FileReader();
        reader.onload = (evt) => {
          let blob = new window.Blob([new Uint8Array(evt.target.result)]);
          let audio = new Audio();
          audio.src = URL.createObjectURL(blob);
          this.loadResource(audio);
        };
        reader.onerror = (evt) => {
          console.error("Error, ", evt);
        };
        reader.readAsArrayBuffer(file);
      }
    },
    setWavesurferOnWaveformReady() {
      let wavesurfer = this.wavesurfer;
      wavesurfer.on("waveform-ready", () => {
        console.debug("The Time of Audio (second): " + wavesurfer.backend.buffer.duration);
        let data = wavesurfer.backend.mergedPeaks.map((d) => {
          return !d ? 0 : Number.parseInt(d * 1000);
        });
        console.debug(data.length);
        this.audioPeakData = data;
        this.wavesurfer = wavesurfer;
      });
    },
    setWavesurferOnPause() {
      this.wavesurfer.on("pause", () => {
        console.debug("pause");
        this.clearAllInterval();
      });
    },
    setWavesurferOnFinish() {
      this.wavesurfer.on("finish", () => {
        console.debug("finish");
        this.isNowPlaying = false;
        this.clearAllInterval();
      });
    },
    setKeepUpdatePositionInterval() {
      this.$options.keepUpdatingTogglePosition = setInterval(() => {
        this.toogleToNowPosition();
      }, 10);
    },
    toogleToNowPosition() {
      let audioTotalTime = this.wavesurfer.backend.buffer.duration;
      let waveformTotalWidth = document.getElementById("waveform").offsetWidth;
      let containerWidth = document.getElementById("waveform-container").offsetWidth;
      let waveformContainer = document.getElementById("waveform-container");
      let nowScrollPosition =
        (this.wavesurfer.getCurrentTime() * waveformTotalWidth) / audioTotalTime - containerWidth / 2;
      waveformContainer.scrollTo(nowScrollPosition, 0);
      console.debug(nowScrollPosition);
    },
    clearAllInterval() {
      clearInterval(this.$options.keepUpdatingTogglePosition);
    },
    switchKeepUpdatePosition() {
      if (this.isKeepUpdatePosition) {
        this.clearAllInterval();
      } else if (!this.isKeepUpdatePosition && this.wavesurfer.isPlaying()) {
        this.setKeepUpdatePositionInterval();
      }
      this.isKeepUpdatePosition = !this.isKeepUpdatePosition;
    },
    switchPlayPause() {
      if (!this.isNowPlaying && this.isKeepUpdatePosition) {
        this.setKeepUpdatePositionInterval();
      }
      this.wavesurfer.playPause();
      this.isNowPlaying = !this.isNowPlaying;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
