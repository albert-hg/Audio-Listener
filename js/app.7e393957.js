(function(e){function t(t){for(var i,a,s=t[0],u=t[1],l=t[2],c=0,d=[];c<s.length;c++)a=s[c],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&d.push(r[a][0]),r[a]=0;for(i in u)Object.prototype.hasOwnProperty.call(u,i)&&(e[i]=u[i]);f&&f(t);while(d.length)d.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,s=1;s<n.length;s++){var u=n[s];0!==r[u]&&(i=!1)}i&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},r={app:0},o=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/Audio-Listener/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var f=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("64a9")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var i=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",[n("input",{attrs:{type:"file"},on:{change:function(t){return e.browseAudioFile(t.target.files)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.audioUrl,expression:"audioUrl"}],attrs:{type:"text"},domProps:{value:e.audioUrl},on:{input:function(t){t.target.composing||(e.audioUrl=t.target.value)}}}),n("button",{attrs:{type:"button"},on:{click:function(t){return e.loadResource(e.audioUrl)}}},[e._v("載入網址資源")])]),n("div",{staticStyle:{width:"100%",overflow:"auto"},attrs:{id:"waveform-container"}},[n("div",{ref:"waveform",staticStyle:{width:"fit-content"},attrs:{id:"waveform"}})]),e.wavesurfer&&e.wavesurfer.backend.buffer?n("div",{attrs:{id:"waveform-controller"}},[n("button",{attrs:{type:"button"},on:{click:function(t){return e.switchPlayPause()}}},[e.isNowPlaying?n("span",[e._v("暫停")]):n("span",[e._v("播放")])]),n("button",{attrs:{type:"button"},on:{click:function(t){return e.switchKeepUpdatePosition()}}},[e.isKeepUpdatePosition?n("span",[e._v("取消定位")]):n("span",[e._v("啟動定位")])])]):e._e(),e.wavesurfer&&e.wavesurfer.backend.buffer?n("div",{attrs:{id:"split-data-container"}},[n("table",[e._m(0),n("tbody",e._l(e.analyzeAduioParagraphResult,(function(t){return n("tr",{key:t.index},[n("td",[e._v(e._s(t.startTime))]),n("td",[e._v(e._s(t.endTime))]),n("td",[e._v(e._s(t.during))]),n("td",[n("button",{attrs:{type:"button"},on:{click:function(n){return e.playFromTimeToTime(t.startTime,t.endTime)}}},[e._v("播放")])])])})),0)])]):e._e()])},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("thead",[n("tr",[n("th",[e._v("From")]),n("th",[e._v("To")]),n("th",[e._v("Total Sec.")])])])}],a=(n("c5f6"),n("04ff"),n("34ef"),n("8896")),s=n.n(a),u={name:"app",components:{},data:function(){return{wavesurfer:null,peakSizePerSec:40,audioPeakData:[],audioUrl:"https://stitcher.acast.com/livestitches/MTFBRjRFMUUtNjhCRi00MEFFLUJCQTRBMEMxQjNBNUY1Q0I=/f4d291fbf2aee915622fa5ce03f3b67d.mp3?ci=NZ32SCWYv2Zzy-sQo0jQlJjELe2yS_XABLwfqSvhzzgYCKnZUA2S6Q%3D%3D&pf=rss&range=bytes%3D0-&sv=sphinx%401.42.2&uid=c18ecc397c9a658b6b0fdaf1297d999e&Expires=1620033876&Signature=NGXOldiJfosLXcbkIFDDjWO%7EUFteynpvoagVOVj9X0v2ch3xPu8-Txyu-F%7EXApGgXw5s7fpt5zas1kTmsiB6FCXKhm87CG%7EHzUNqkV3ixNzU7Tm%7EGT-Abf%7EcHpX9V6aWAyWfatFY%7EICK3LyEFZZVOxXfzYcWLEomHsNYkQkgE94WzrJ9kxicjqyxDe16xNPioWTeUwatZAHhdF62MVUaVHKnT9qQPzFKxRYiQ6JESLz3EtusTt2ErOMedwHlZODYAzFpqzie%7ELJoVfqzsOMGBisCZIuqbzainmtvRnkPYMBKRexeKtbzzflI58Ensaex-g97pcyywEeA6T%7E8Fcs7bA__&Key-Pair-Id=APKAJXAFARUOTJQ3BLOQ",isKeepUpdatePosition:!0,isNowPlaying:!1,analyzeAduioParagraphResult:[]}},mounted:function(){this.initCreateWaveSurfer()},beforeDestroy:function(){this.clearAllInterval()},methods:{initCreateWaveSurfer:function(){this.wavesurfer=s.a.create({container:"#waveform",waveColor:"#2682d4",progressColor:"#2682d4",backend:"MediaElement",fillParent:!1,minPxPerSec:this.peakSizePerSec})},loadResource:function(e){clearTimeout(this.$options.keepUpdatingTogglePosition),this.wavesurfer.unAll(),this.wavesurfer.load(e),this.setWavesurferOnWaveformReady(),this.setWavesurferOnPause(),this.setWavesurferOnFinish()},browseAudioFile:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(t||1==t.length){var n=t[0],i=new FileReader;i.onload=function(t){var n=new window.Blob([new Uint8Array(t.target.result)]),i=new Audio;i.src=URL.createObjectURL(n),e.loadResource(i)},i.onerror=function(e){console.error("Error, ",e)},i.readAsArrayBuffer(n)}},setWavesurferOnWaveformReady:function(){var e=this,t=this.wavesurfer;t.on("waveform-ready",(function(){console.debug("The Time of Audio (second): "+t.backend.buffer.duration);var n=t.backend.mergedPeaks.map((function(e){return e?Number.parseInt(1e3*e):0}));console.debug(n.length),e.audioPeakData=n,e.wavesurfer=t,e.analyzeAduioParagraph()}))},setWavesurferOnPause:function(){var e=this;this.wavesurfer.on("pause",(function(){console.debug("pause"),e.isNowPlaying=!1,e.clearAllInterval()}))},setWavesurferOnFinish:function(){var e=this;this.wavesurfer.on("finish",(function(){console.debug("finish"),e.isNowPlaying=!1,e.clearAllInterval()}))},setKeepUpdatePositionInterval:function(){var e=this;this.$options.keepUpdatingTogglePosition||(this.$options.keepUpdatingTogglePosition=setInterval((function(){e.toogleToNowPosition()}),10))},toogleToNowPosition:function(){var e=this.wavesurfer.backend.buffer.duration,t=document.getElementById("waveform").offsetWidth,n=document.getElementById("waveform-container").offsetWidth,i=document.getElementById("waveform-container"),r=this.wavesurfer.getCurrentTime()*t/e-n/2;i.scrollTo(r,0),console.debug(r)},clearAllInterval:function(){clearInterval(this.$options.keepUpdatingTogglePosition),this.$options.keepUpdatingTogglePosition=null},switchKeepUpdatePosition:function(){this.isKeepUpdatePosition?this.clearAllInterval():!this.isKeepUpdatePosition&&this.wavesurfer.isPlaying()&&this.setKeepUpdatePositionInterval(),this.isKeepUpdatePosition=!this.isKeepUpdatePosition},switchPlayPause:function(){!this.isNowPlaying&&this.isKeepUpdatePosition&&this.setKeepUpdatePositionInterval(),this.wavesurfer.playPause(),this.isNowPlaying=!this.isNowPlaying},analyzeAduioParagraph:function(){for(var e=this,t=this.audioPeakData,n=0,i=15,r=[],o=0;o<t.length;o++){var a=Math.abs(t[o]);a<i&&(n<o?(r.push({sp:n,ep:o}),n=o+1):n>=o&&n++)}for(var s=7,u=[],l=0;l<r.length;l++)0==l?u.push(r[0]):r[l].sp-u[u.length-1].ep<s?u[u.length-1].ep=r[l].ep:u.push(r[l]);this.analyzeAduioParagraphResult=u.map((function(t){var n=e.parsePeaKIndexToTimeAsMs(t.sp),i=e.parsePeaKIndexToTimeAsMs(t.ep);return{startTime:n/1e3,endTime:i/1e3,during:(i-n)/1e3}}))},playFromTimeToTime:function(e,t){!this.isNowPlaying&&this.isKeepUpdatePosition&&this.setKeepUpdatePositionInterval();var n=.1;this.wavesurfer.play(e-n,t+n),this.isNowPlaying=!0},parsePeaKIndexToTimeAsMs:function(e){return Math.round(e*this.wavesurfer.backend.buffer.duration*1e3/this.audioPeakData.length)}}},l=u,f=(n("034f"),n("2877")),c=Object(f["a"])(l,r,o,!1,null,null,null),d=c.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(d)}}).$mount("#app")},"64a9":function(e,t,n){}});
//# sourceMappingURL=app.7e393957.js.map