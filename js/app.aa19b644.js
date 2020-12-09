(function(e){function n(n){for(var r,a,l=n[0],s=n[1],u=n[2],p=0,f=[];p<l.length;p++)a=l[p],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&f.push(i[a][0]),i[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);d&&d(n);while(f.length)f.shift()();return o.push.apply(o,u||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],r=!0,l=1;l<t.length;l++){var s=t[l];0!==i[s]&&(r=!1)}r&&(o.splice(n--,1),e=a(a.s=t[0]))}return e}var r={},i={app:0},o=[];function a(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=e,a.c=r,a.d=function(e,n,t){a.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,n){if(1&n&&(e=a(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)a.d(t,r,function(n){return e[n]}.bind(null,r));return t},a.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(n,"a",n),n},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},a.p="/Audio-Listener/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=n,l=l.slice();for(var u=0;u<l.length;u++)n(l[u]);var d=s;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";t("64a9")},"56d7":function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d");var r=t("2b0e"),i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("div",[t("input",{attrs:{type:"file"},on:{change:function(n){return e.browseAudioFile(n.target.files)}}}),t("input",{directives:[{name:"model",rawName:"v-model",value:e.audioUrl,expression:"audioUrl"}],attrs:{type:"text"},domProps:{value:e.audioUrl},on:{input:function(n){n.target.composing||(e.audioUrl=n.target.value)}}}),t("button",{attrs:{type:"button"},on:{click:function(n){return e.loadResourceInWavesurfer(e.audioUrl)}}},[e._v("載入網址資源")])]),t("div",{staticStyle:{width:"100%",overflow:"auto"},attrs:{id:"js__waveform-container"}},[t("div",{ref:"waveform",staticStyle:{width:"fit-content"},attrs:{id:"js__waveform"}})]),e.wavesurfer&&e.wavesurfer.backend.buffer?t("div",{attrs:{id:"js__waveform-controller"}},[t("button",{attrs:{type:"button"},on:{click:function(n){return e.switchPlayAndPause()}}},[e.playingController.isAudioPlayingNow?t("span",[e._v("暫停")]):t("span",[e._v("播放")])]),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.playingController.isReplayMode,expression:"playingController.isReplayMode"}],attrs:{type:"checkbox",id:"replayMode"},domProps:{checked:Array.isArray(e.playingController.isReplayMode)?e._i(e.playingController.isReplayMode,null)>-1:e.playingController.isReplayMode},on:{change:function(n){var t=e.playingController.isReplayMode,r=n.target,i=!!r.checked;if(Array.isArray(t)){var o=null,a=e._i(t,o);r.checked?a<0&&e.$set(e.playingController,"isReplayMode",t.concat([o])):a>-1&&e.$set(e.playingController,"isReplayMode",t.slice(0,a).concat(t.slice(a+1)))}else e.$set(e.playingController,"isReplayMode",i)}}}),t("label",{attrs:{for:"replayMode"}},[e._v("循環撥放")])]),t("button",{attrs:{type:"button"},on:{click:function(n){return e.switchPositionCenterAlways()}}},[e.playingController.isPositionCenterAlways?t("span",[e._v("取消定位")]):t("span",[e._v("啟動定位")])]),t("button",{on:{click:function(n){return e.analyzeAduioParagraph()}}},[e._v("分析斷句")]),t("div",[t("span",[e._v("播放速度")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.playingController.playingSpeedRate,expression:"playingController.playingSpeedRate"}],attrs:{type:"range",min:"5",max:"15"},domProps:{value:e.playingController.playingSpeedRate},on:{change:function(n){return e.setPlayRate()},__r:function(n){return e.$set(e.playingController,"playingSpeedRate",n.target.value)}}})]),t("div",[t("span",[e._v("說話峰值(建議為8~15)")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.analyzationController.thresholdForMinSpeakingPeakSize,expression:"analyzationController.thresholdForMinSpeakingPeakSize"}],attrs:{type:"number",min:"1"},domProps:{value:e.analyzationController.thresholdForMinSpeakingPeakSize},on:{input:function(n){n.target.composing||e.$set(e.analyzationController,"thresholdForMinSpeakingPeakSize",n.target.value)}}})]),t("div",[t("span",[e._v("允許停頓毫秒數(建議為500毫秒)")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.analyzationController.allowedPauseMillisecondsInSpeaking,expression:"analyzationController.allowedPauseMillisecondsInSpeaking"}],attrs:{type:"number",min:"1"},domProps:{value:e.analyzationController.allowedPauseMillisecondsInSpeaking},on:{input:function(n){n.target.composing||e.$set(e.analyzationController,"allowedPauseMillisecondsInSpeaking",n.target.value)}}})]),t("div",[t("span",[e._v("播放緩衝毫秒數(建議為50毫秒)")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.playingController.playingBufferMillisecond,expression:"playingController.playingBufferMillisecond"}],attrs:{type:"number",min:"1"},domProps:{value:e.playingController.playingBufferMillisecond},on:{input:function(n){n.target.composing||e.$set(e.playingController,"playingBufferMillisecond",n.target.value)}}})])]):e._e(),e.wavesurfer&&e.wavesurfer.backend.buffer?t("div",{attrs:{id:"split-data-container"}},[t("table",[e._m(0),t("tbody",e._l(e.audioInfos.paragraghResult,(function(n){return t("tr",{key:n.index},[t("td",[e._v(e._s(n.startTime))]),t("td",[e._v(e._s(n.endTime))]),t("td",[e._v(e._s(n.during))]),t("td",[t("button",{attrs:{type:"button"},on:{click:function(t){return e.playParagraph(n)}}},[e._v("播放")])])])})),0)])]):e._e()])},o=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("thead",[t("tr",[t("th",[e._v("From")]),t("th",[e._v("To")]),t("th",[e._v("Total Sec.")])])])}],a=(t("34ef"),t("c5f6"),t("04ff"),t("8896")),l=t.n(a),s={name:"app",components:{},data:function(){return{wavesurfer:null,audioUrl:"https://stitcher.acast.com/livestitches/MTFBRjRFMUUtNjhCRi00MEFFLUJCQTRBMEMxQjNBNUY1Q0I=/f4d291fbf2aee915622fa5ce03f3b67d.mp3?ci=NZ32SCWYv2Zzy-sQo0jQlJjELe2yS_XABLwfqSvhzzgYCKnZUA2S6Q%3D%3D&pf=rss&range=bytes%3D0-&sv=sphinx%401.42.2&uid=c18ecc397c9a658b6b0fdaf1297d999e&Expires=1620033876&Signature=NGXOldiJfosLXcbkIFDDjWO%7EUFteynpvoagVOVj9X0v2ch3xPu8-Txyu-F%7EXApGgXw5s7fpt5zas1kTmsiB6FCXKhm87CG%7EHzUNqkV3ixNzU7Tm%7EGT-Abf%7EcHpX9V6aWAyWfatFY%7EICK3LyEFZZVOxXfzYcWLEomHsNYkQkgE94WzrJ9kxicjqyxDe16xNPioWTeUwatZAHhdF62MVUaVHKnT9qQPzFKxRYiQ6JESLz3EtusTt2ErOMedwHlZODYAzFpqzie%7ELJoVfqzsOMGBisCZIuqbzainmtvRnkPYMBKRexeKtbzzflI58Ensaex-g97pcyywEeA6T%7E8Fcs7bA__&Key-Pair-Id=APKAJXAFARUOTJQ3BLOQ",audioInfos:{totalDurationTime:0,peakNumberPerSecond:40,originalPeakData:[],paragraghResult:[]},analyzationController:{thresholdForMinSpeakingPeakSize:10,allowedPauseMillisecondsInSpeaking:500},playingController:{fromTime:0,toTime:0,isPositionCenterAlways:!0,isAudioPlayingNow:!1,isReplayMode:!1,playingBufferMillisecond:50,playingSpeedRate:10}}},mounted:function(){this.initCreateWaveSurfer()},beforeDestroy:function(){this.unregisterPositionCenter(),this.wavesurfer.destroy()},methods:{initCreateWaveSurfer:function(){this.wavesurfer=l.a.create({container:"#js__waveform",waveColor:"#2682d4",progressColor:"#2682d4",backend:"MediaElement",fillParent:!1,minPxPerSec:this.audioInfos.peakNumberPerSecond})},loadResourceInWavesurfer:function(e){this.unregisterPositionCenter(),this.wavesurfer.unAll(),this.setWavesurferOnWaveformReady(),this.setWavesurferOnPause(),this.wavesurfer.load(e)},setWavesurferOnWaveformReady:function(){var e=this;this.wavesurfer.on("waveform-ready",(function(){console.debug("The Time of Audio (second): "+e.wavesurfer.backend.buffer.duration);var n=e.wavesurfer.backend.mergedPeaks.map((function(e){return e?Number.parseInt(1e3*e):0}));console.debug(n.length),e.audioInfos.originalPeakData=n,e.audioInfos.totalDurationTime=e.wavesurfer.getDuration(),e.playingController.toTime=e.wavesurfer.getDuration(),e.analyzeAduioParagraph()}))},setWavesurferOnPause:function(){var e=this;this.wavesurfer.on("pause",(function(){e.unregisterPositionCenter(),e.playingController.isReplayMode&&e.playingController.isAudioPlayingNow?e.doPlay():e.playingController.isAudioPlayingNow=!1}))},setPlayRate:function(){this.wavesurfer.setPlaybackRate(this.playingController.playingSpeedRate/10)},browseAudioFile:function(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(n||1==n.length){var t=n[0],r=new FileReader;r.onload=function(n){var t=new window.Blob([new Uint8Array(n.target.result)]),r=new Audio;r.src=URL.createObjectURL(t),e.loadResourceInWavesurfer(r)},r.onerror=function(e){console.error("Error, ",e)},r.readAsArrayBuffer(t)}},analyzeAduioParagraph:function(){var e=this,n=this.analyzeAduio_mergeByAllowedSpeakingPauseTime(this.analyzeAduio_splitDataByMinSpeakingPeakSize());this.audioInfos.paragraghResult=n.map((function(n){var t=e.parsePeakIndexToTimeAsMs(n.startPeakIndex),r=e.parsePeakIndexToTimeAsMs(n.endPeakIndex);return{startTime:t/1e3,endTime:r/1e3,during:(r-t)/1e3}}))},analyzeAduio_splitDataByMinSpeakingPeakSize:function(){for(var e=this.audioInfos.originalPeakData,n=0,t=this.analyzationController.thresholdForMinSpeakingPeakSize,r=[],i=0;i<e.length;i++){var o=Math.abs(e[i]);o<t&&(n<i?(r.push({startPeakIndex:n,endPeakIndex:i}),n=i+1):n>=i&&n++)}return r},analyzeAduio_mergeByAllowedSpeakingPauseTime:function(e){for(var n=this.analyzationController.allowedPauseMillisecondsInSpeaking*this.audioInfos.peakNumberPerSecond/1e3,t=[],r=0;r<e.length;r++)0==r?t.push(e[0]):e[r].startPeakIndex-t[t.length-1].endPeakIndex<n?t[t.length-1].endPeakIndex=e[r].endPeakIndex:t.push(e[r]);return t},parsePeakIndexToTimeAsMs:function(e){return Math.round(e*this.audioInfos.totalDurationTime*1e3/this.audioInfos.originalPeakData.length)},switchPlayAndPause:function(){this.playingController.isAudioPlayingNow?this.doPause():this.doPlay()},doPlay:function(){this.playingController.isPositionCenterAlways&&this.registerPositionCenter(),this.playingController.isAudioPlayingNow=!0;var e=this.playingController.playingBufferMillisecond/1e3,n=this.playingController.fromTime-e,t=this.playingController.toTime+e,r=this.wavesurfer.getCurrentTime();r>=this.playingController.fromTime&&r<=this.playingController.toTime&&(n=r),this.wavesurfer.play(n,t)},doPause:function(){this.unregisterPositionCenter(),this.playingController.isAudioPlayingNow=!1,this.wavesurfer.pause()},registerPositionCenter:function(){var e=this;this.$options.intervel_positionCenter||(this.$options.intervel_positionCenter=setInterval((function(){e.toggleNowPositionToCenter()}),10))},playParagraph:function(e){this.playingController.fromTime=e.startTime,this.playingController.toTime=e.endTime,this.doPlay()},unregisterPositionCenter:function(){clearInterval(this.$options.intervel_positionCenter),this.$options.intervel_positionCenter=null},toggleNowPositionToCenter:function(){var e=this.audioInfos.totalDurationTime,n=document.getElementById("js__waveform").offsetWidth,t=document.getElementById("js__waveform-container").offsetWidth,r=document.getElementById("js__waveform-container"),i=this.wavesurfer.getCurrentTime()*n/e-t/2;r.scrollTo(i,0)},switchPositionCenterAlways:function(){this.playingController.isPositionCenterAlways?(this.unregisterPositionCenter(),this.playingController.isPositionCenterAlways=!1):(this.playingController.isAudioPlayingNow&&this.registerPositionCenter(),this.playingController.isPositionCenterAlways=!0)}}},u=s,d=(t("034f"),t("2877")),p=Object(d["a"])(u,i,o,!1,null,null,null),f=p.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(f)}}).$mount("#app")},"64a9":function(e,n,t){}});
//# sourceMappingURL=app.aa19b644.js.map