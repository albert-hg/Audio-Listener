<template>
  <div id="app" class="d-flex flex-column">
    <div class="res-setting-container p-0 d-flex flex-wrap justify-content-center align-items-center mb-2 h-ft">
      <label class="r-s-c__title mr-2 mt-2" for="load-mode">Load Your Resource By</label>
      <select class="r-s-c__select-mode form-control form-control-sm mr-2" id="load-mode" v-model="audioInfos.loadMode">
        <option value="URL">URL</option>
        <option value="FILE">File</option>
      </select>
      <div class="r-s-c__load-res-container flex-grow-1">
        <div v-if="audioInfos.loadMode === 'FILE'" class="custom-file">
          <input type="file" id="load-mode__file" class="custom-file-input" @change="browseAudioFile($event.target.files)" />
          <label class="custom-file-label text-left" for="load-mode__file">Choose file</label>
        </div>
        <div v-else-if="audioInfos.loadMode === 'URL'" class="input-group input-group-sm">
          <input type="text" class="form-control" v-model="audioUrl" />
          <div class="input-group-append" @click="loadResourceInWavesurfer(audioUrl)">
            <span class="input-group-text">Load URL</span>
          </div>
        </div>
      </div>
    </div>

    <div class="accordion p-0 mb-3 h-ft" id="analysis-setting-container">
      <div class="card">
        <div
          id="headingOne"
          class="card-header btn btn-link btn-sm p-2"
          type="button"
          data-toggle="collapse"
          data-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >Advanced Setting of Audio Analysis</div>
        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#analysis-setting-container">
          <div class="card-body p-3 text-left">
            <div class="form-group">
              <label class>說話峰值 (建議為8~15)</label>
              <input type="number" class="form-control form-control-sm" min="1" v-model="analyzationController.thresholdForMinSpeakingPeakSize" />
            </div>
            <div class="form-group">
              <label>允許停頓毫秒數 (建議為500毫秒)</label>
              <input type="number" class="form-control form-control-sm" min="1" v-model="analyzationController.allowedPauseMillisecondsInSpeaking" />
            </div>
            <div class="form-group clearfix mb-0">
              <button v-if="wavesurfer && wavesurfer.backend.buffer" class="btn btn-sm btn-info float-right" @click="analyzeAduioParagraph()">重新分析音檔</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="js__waveform-container" class="p-0 mb-3">
      <div id="js__waveform" ref="waveform"></div>
    </div>

    <div class="waveform-controller input-group p-0 mb-3" v-if="wavesurfer && wavesurfer.backend.buffer">
      <button type="button" class="w-c__btn__play-pause btn btn-sm btn-primary mr-2 mb-1" @click="switchPlayAndPause()">
        <font-awesome-icon v-if="playingController.isAudioPlayingNow" :icon="['fas', 'pause']" />
        <font-awesome-icon v-else :icon="['fas', 'play']" />
      </button>

      <button
        type="button"
        :class="['w-c__btn__play-pause btn btn-sm mr-2 mb-1', playingController.isRepeatyMode ? 'btn-info' : 'btn-outline-secondary']"
        @click="switchRepeatOrNot()"
      >
        <font-awesome-icon :icon="['fas', 'redo-alt']" />
      </button>

      <button
        type="button"
        :class="['w-c__btn__play-pause btn btn-sm mr-2 mb-1', playingController.isPositionCenterAlways ? 'btn-danger' : 'btn-outline-secondary']"
        @click="switchPositionCenterAlways()"
      >
        <font-awesome-icon :icon="['fas', 'tags']" />
      </button>

      <div class="d-flex align-items-center btn-sm mr-2 mb-1">
        <span class="mr-1">Speed</span>
        <input type="range" min="5" max="15" v-model="playingController.playingSpeedRate" @change="setPlayRate()" />
      </div>

      <div class="d-flex align-items-center btn-sm mr-2 mb-1">
        <span class="mr-1">Buffer(ms)</span>
        <input type="number" class="pt-0 pb-0" style="width: 70px;" min="1" v-model="playingController.playingBufferMillisecond" />
      </div>
    </div>

    <div id="analysis-result-container" v-if="wavesurfer && wavesurfer.backend.buffer" class="p-0 flex-grow-1">
      <table class="table table-sm table-hover table-striped">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Total Sec.</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="re in audioInfos.paragraghResult" :key="re.index">
            <td>{{timeFormatterFormSec(re.startTime)}}</td>
            <td>{{timeFormatterFormSec(re.endTime)}}</td>
            <td>{{re.during}}</td>
            <td>
              <button type="button" class="btn btn-sm btn-secondary pt-0 pb-0" @click="playParagraph(re)">
                <font-awesome-icon class="fa-xs" :icon="['fas', 'play']" />
              </button>
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
      audioUrl:
        "https://stitcher.acast.com/livestitches/MTFBRjRFMUUtNjhCRi00MEFFLUJCQTRBMEMxQjNBNUY1Q0I=/f4d291fbf2aee915622fa5ce03f3b67d.mp3?ci=NZ32SCWYv2Zzy-sQo0jQlJjELe2yS_XABLwfqSvhzzgYCKnZUA2S6Q%3D%3D&pf=rss&range=bytes%3D0-&sv=sphinx%401.42.2&uid=c18ecc397c9a658b6b0fdaf1297d999e&Expires=1620033876&Signature=NGXOldiJfosLXcbkIFDDjWO%7EUFteynpvoagVOVj9X0v2ch3xPu8-Txyu-F%7EXApGgXw5s7fpt5zas1kTmsiB6FCXKhm87CG%7EHzUNqkV3ixNzU7Tm%7EGT-Abf%7EcHpX9V6aWAyWfatFY%7EICK3LyEFZZVOxXfzYcWLEomHsNYkQkgE94WzrJ9kxicjqyxDe16xNPioWTeUwatZAHhdF62MVUaVHKnT9qQPzFKxRYiQ6JESLz3EtusTt2ErOMedwHlZODYAzFpqzie%7ELJoVfqzsOMGBisCZIuqbzainmtvRnkPYMBKRexeKtbzzflI58Ensaex-g97pcyywEeA6T%7E8Fcs7bA__&Key-Pair-Id=APKAJXAFARUOTJQ3BLOQ",
      audioInfos: {
        loadMode: "URL",
        totalDurationTime: 0,
        peakNumberPerSecond: 40,
        originalPeakData: [],
        paragraghResult: [],
      },
      analyzationController: {
        thresholdForMinSpeakingPeakSize: 10,
        allowedPauseMillisecondsInSpeaking: 500,
      },
      playingController: {
        fromTime: 0,
        toTime: 0,
        isPositionCenterAlways: true,
        isAudioPlayingNow: false,
        isRepeatyMode: false,
        playingBufferMillisecond: 50,
        playingSpeedRate: 10,
      },
    };
  },
  mounted() {
    this.initCreateWaveSurfer();
  },
  beforeDestroy() {
    this.unregisterPositionCenter();
    this.wavesurfer.destroy();
  },
  methods: {
    initCreateWaveSurfer() {
      this.wavesurfer = WaveSurfer.create({
        container: "#js__waveform",
        waveColor: "#2682d4",
        progressColor: "#2682d4",
        backend: "MediaElement",
        fillParent: false,
        minPxPerSec: this.audioInfos.peakNumberPerSecond,
      });
    },
    loadResourceInWavesurfer(res) {
      this.unregisterPositionCenter();
      this.wavesurfer.unAll();
      this.setWavesurferOnWaveformReady();
      this.setWavesurferOnPause();
      this.wavesurfer.load(res);
    },
    setWavesurferOnWaveformReady() {
      this.wavesurfer.on("waveform-ready", () => {
        console.debug("The Time of Audio (second): " + this.wavesurfer.backend.buffer.duration);
        let data = this.wavesurfer.backend.mergedPeaks.map((d) => {
          return !d ? 0 : Number.parseInt(d * 1000);
        });
        console.debug(data.length);
        this.audioInfos.originalPeakData = data;
        this.audioInfos.totalDurationTime = this.wavesurfer.getDuration();
        this.playingController.toTime = this.wavesurfer.getDuration();
        this.analyzeAduioParagraph();
      });
    },
    setWavesurferOnPause() {
      this.wavesurfer.on("pause", () => {
        this.unregisterPositionCenter();
        if (this.playingController.isRepeatyMode && this.playingController.isAudioPlayingNow) {
          this.doPlay();
        } else {
          this.playingController.isAudioPlayingNow = false;
        }
      });
    },
    setPlayRate() {
      this.wavesurfer.setPlaybackRate(this.playingController.playingSpeedRate / 10);
    },
    browseAudioFile(files = []) {
      if (!!files || files.length == 1) {
        let file = files[0];
        let reader = new FileReader();
        reader.onload = (evt) => {
          let blob = new window.Blob([new Uint8Array(evt.target.result)]);
          let audio = new Audio();
          audio.src = URL.createObjectURL(blob);
          this.loadResourceInWavesurfer(audio);
        };
        reader.onerror = (evt) => {
          console.error("Error, ", evt);
        };
        reader.readAsArrayBuffer(file);
      }
    },
    analyzeAduioParagraph() {
      let result = this.analyzeAduio_mergeByAllowedSpeakingPauseTime(
        this.analyzeAduio_splitDataByMinSpeakingPeakSize()
      );
      this.audioInfos.paragraghResult = result.map((d) => {
        let st = this.parsePeakIndexToTimeAsMs(d.startPeakIndex);
        let et = this.parsePeakIndexToTimeAsMs(d.endPeakIndex);
        return {
          startTime: st / 1000,
          endTime: et / 1000,
          during: (et - st) / 1000,
        };
      });
    },
    analyzeAduio_splitDataByMinSpeakingPeakSize() {
      let data = this.audioInfos.originalPeakData;
      let startPoiter = 0;
      let minTalkingPeakThreshold = this.analyzationController.thresholdForMinSpeakingPeakSize; // 視為說話的閥值
      let result = [];
      for (let endPointer = 0; endPointer < data.length; endPointer++) {
        let dataAbs = Math.abs(data[endPointer]);
        if (dataAbs < minTalkingPeakThreshold) {
          if (startPoiter < endPointer) {
            // stop talking
            result.push({
              startPeakIndex: startPoiter,
              endPeakIndex: endPointer,
            });
            startPoiter = endPointer + 1;
          } else if (startPoiter >= endPointer) {
            // still not talking
            startPoiter++;
          }
        }
      }
      return result;
    },
    analyzeAduio_mergeByAllowedSpeakingPauseTime(arr_sdbmsp) {
      let allowTalkingPausePeadSize =
        (this.analyzationController.allowedPauseMillisecondsInSpeaking * this.audioInfos.peakNumberPerSecond) / 1000; // 說話停頓許可Peak數
      let result = [];
      for (let endPointer = 0; endPointer < arr_sdbmsp.length; endPointer++) {
        if (endPointer == 0) {
          result.push(arr_sdbmsp[0]);
        } else if (
          arr_sdbmsp[endPointer].startPeakIndex - result[result.length - 1].endPeakIndex <
          allowTalkingPausePeadSize
        ) {
          result[result.length - 1].endPeakIndex = arr_sdbmsp[endPointer].endPeakIndex;
        } else {
          result.push(arr_sdbmsp[endPointer]);
        }
      }
      return result;
    },
    parsePeakIndexToTimeAsMs(peakIndex) {
      return Math.round(
        (peakIndex * this.audioInfos.totalDurationTime * 1000) / this.audioInfos.originalPeakData.length
      );
    },
    switchPlayAndPause() {
      if (!this.playingController.isAudioPlayingNow) {
        this.doPlay();
      } else {
        this.doPause();
      }
    },
    doPlay() {
      if (this.playingController.isPositionCenterAlways) {
        this.registerPositionCenter();
      }
      this.playingController.isAudioPlayingNow = true;
      let bufferTime = this.playingController.playingBufferMillisecond / 1000;
      let startTime = this.playingController.fromTime - bufferTime;
      let endTime = this.playingController.toTime + bufferTime;
      let currentTime = this.wavesurfer.getCurrentTime();
      if (currentTime >= this.playingController.fromTime && currentTime <= this.playingController.toTime) {
        startTime = currentTime;
      }
      this.wavesurfer.play(startTime, endTime);
    },
    doPause() {
      this.unregisterPositionCenter();
      this.playingController.isAudioPlayingNow = false;
      // this.playingController.isRepeatyMode = false;
      this.wavesurfer.pause();
    },
    registerPositionCenter() {
      if (!this.$options.intervel_positionCenter) {
        this.$options.intervel_positionCenter = setInterval(() => {
          this.toggleNowPositionToCenter();
        }, 10);
      }
    },
    playParagraph(paragragh) {
      this.playingController.fromTime = paragragh.startTime;
      this.playingController.toTime = paragragh.endTime;
      this.doPlay();
    },
    unregisterPositionCenter() {
      clearInterval(this.$options.intervel_positionCenter);
      this.$options.intervel_positionCenter = null;
    },
    toggleNowPositionToCenter() {
      let audioTotalTime = this.audioInfos.totalDurationTime;
      let waveformTotalWidth = document.getElementById("js__waveform").offsetWidth;
      let containerWidth = document.getElementById("js__waveform-container").offsetWidth;
      let waveformContainer = document.getElementById("js__waveform-container");
      let nowScrollPosition =
        (this.wavesurfer.getCurrentTime() * waveformTotalWidth) / audioTotalTime - containerWidth / 2;
      waveformContainer.scrollTo(nowScrollPosition, 0);
    },
    switchPositionCenterAlways() {
      if (!this.playingController.isPositionCenterAlways) {
        if (this.playingController.isAudioPlayingNow) {
          this.registerPositionCenter();
        }
        this.playingController.isPositionCenterAlways = true;
      } else {
        this.unregisterPositionCenter();
        this.playingController.isPositionCenterAlways = false;
      }
    },
    switchRepeatOrNot() {
      this.playingController.isRepeatyMode = !this.playingController.isRepeatyMode;
    },
    timeFormatterFormSec(sec_num) {
      let hours = Math.floor(sec_num / 3600);
      let minutes = Math.floor((sec_num - hours * 3600) / 60);
      let seconds = sec_num - hours * 3600 - minutes * 60;
      seconds = seconds.toFixed(3)
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
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
  margin: 0px;
  height: 97vh;
  min-height: 600px;
  padding: 20px;
}

.h-ft {
  height: fit-content;
}

#js__waveform-container {
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 130px;
}
#js__waveform {
  width: fit-content;
}

.res-setting-container > .r-s-c__title {
  min-width: fit-content;
}
.res-setting-container > .r-s-c__select-mode {
  width: auto;
}
.res-setting-container > .r-s-c__load-res-container {
  width: min-content;
  min-width: 200px;
}

.waveform-controller > .w-c__btn__play-pause {
  width: 4rem;
}
.waveform-controller > .w-c__btn__play-repeat {
  width: 6rem;
}

#analysis-result-container {
  overflow: auto;
}
</style>
