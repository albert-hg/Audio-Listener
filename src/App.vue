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
    <div id="split-data-container" v-if="wavesurfer && wavesurfer.backend.buffer">
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Total Sec.</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="re in analyzeAduioParagraphResult" :key="re.index">
            <td>{{re.startTime}}</td>
            <td>{{re.endTime}}</td>
            <td>{{re.during}}</td>
            <td>
              <button type="button" @click="playFromTimeToTime(re.startTime, re.endTime)">播放</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
      audioUrl:
        "https://stitcher.acast.com/livestitches/MTFBRjRFMUUtNjhCRi00MEFFLUJCQTRBMEMxQjNBNUY1Q0I=/f4d291fbf2aee915622fa5ce03f3b67d.mp3?ci=NZ32SCWYv2Zzy-sQo0jQlJjELe2yS_XABLwfqSvhzzgYCKnZUA2S6Q%3D%3D&pf=rss&range=bytes%3D0-&sv=sphinx%401.42.2&uid=c18ecc397c9a658b6b0fdaf1297d999e&Expires=1620033876&Signature=NGXOldiJfosLXcbkIFDDjWO%7EUFteynpvoagVOVj9X0v2ch3xPu8-Txyu-F%7EXApGgXw5s7fpt5zas1kTmsiB6FCXKhm87CG%7EHzUNqkV3ixNzU7Tm%7EGT-Abf%7EcHpX9V6aWAyWfatFY%7EICK3LyEFZZVOxXfzYcWLEomHsNYkQkgE94WzrJ9kxicjqyxDe16xNPioWTeUwatZAHhdF62MVUaVHKnT9qQPzFKxRYiQ6JESLz3EtusTt2ErOMedwHlZODYAzFpqzie%7ELJoVfqzsOMGBisCZIuqbzainmtvRnkPYMBKRexeKtbzzflI58Ensaex-g97pcyywEeA6T%7E8Fcs7bA__&Key-Pair-Id=APKAJXAFARUOTJQ3BLOQ",
      isKeepUpdatePosition: true,
      isNowPlaying: false,
      analyzeAduioParagraphResult: [],
    };
  },
  mounted() {
    this.initCreateWaveSurfer();
  },
  beforeDestroy() {
    this.clearAllInterval();
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
        this.analyzeAduioParagraph();
      });
    },
    setWavesurferOnPause() {
      this.wavesurfer.on("pause", () => {
        console.debug("pause");
        this.isNowPlaying = false;
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
      if (!this.$options.keepUpdatingTogglePosition) {
        this.$options.keepUpdatingTogglePosition = setInterval(() => {
          this.toogleToNowPosition();
        }, 10);
      }
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
      this.$options.keepUpdatingTogglePosition = null;
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
    analyzeAduioParagraph() {
      let data = this.audioPeakData;
      let startPoiter = 0;
      let minTalkingPeakThreshold = 15; // 視為說話的閥值
      let temp = [];

      for (let endPointer = 0; endPointer < data.length; endPointer++) {
        let dataAbs = Math.abs(data[endPointer]);
        if (dataAbs < minTalkingPeakThreshold) {
          if (startPoiter < endPointer) {
            // stop talking
            temp.push({
              sp: startPoiter,
              ep: endPointer,
            });
            startPoiter = endPointer + 1;
          } else if (startPoiter >= endPointer) {
            // still not talking
            startPoiter++;
          }
        }
      }

      let pausePeakCount = 7; // 說話停頓許可Peak數
      let result = [];
      for (let endPointer = 0; endPointer < temp.length; endPointer++) {
        if (endPointer == 0) {
          result.push(temp[0]);
        } else if (temp[endPointer].sp - result[result.length - 1].ep < pausePeakCount) {
          result[result.length - 1].ep = temp[endPointer].ep;
        } else {
          result.push(temp[endPointer]);
        }
      }
      this.analyzeAduioParagraphResult = result.map((d) => {
        let st = this.parsePeaKIndexToTimeAsMs(d.sp);
        let et = this.parsePeaKIndexToTimeAsMs(d.ep);
        return {
          startTime: st / 1000,
          endTime: et / 1000,
          during: (et - st) / 1000,
        };
      });
    },
    playFromTimeToTime(startTime, endTime) {
      if (!this.isNowPlaying && this.isKeepUpdatePosition) {
        this.setKeepUpdatePositionInterval();
      }
      let bufferTime = 0.1;
      this.wavesurfer.play(startTime - bufferTime, endTime + bufferTime);
      this.isNowPlaying = true;
    },
    parsePeaKIndexToTimeAsMs(peakIndex) {
      return Math.round((peakIndex * this.wavesurfer.backend.buffer.duration * 1000) / this.audioPeakData.length);
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
