<template>
  <div>
    <div class="container">
      <div class="top-header">
        <div class="heading">
          HogWatch
        </div>
      </div>

      <div class="nano">
        <div class="nano-content">
          <div class="logs">
            <ul>
              <transition-group name="flip-list" tag="ul">
              <li v-for="log in orderedLogs" :key="log.uid" v-on:click="toggleActiveLog(log)">
                  <div class="log" v-bind:class="{ 'active': log.isActive }">
                    {{log.process}}
                  </div>
              </li>
              </transition-group>
            </ul>
          </div>
        </div>
      </div>

      <div id="charts"></div>
    </div>
    <!--container end-->

    <div class="info-bar">
      <div class="transfer-total down">

        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 63.001 63.001">
          <g>
            <g id="group-23svg">
              <path id="path-1_16_" d="M31.5,51.219c-0.67,0-1.301-0.261-1.774-0.736L0.44,21.198c-0.586-0.586-0.586-1.535,0-2.121     s1.535-0.586,2.121,0L31.5,48.015l28.94-28.938c0.586-0.586,1.535-0.586,2.121,0s0.586,1.535,0,2.121L33.276,50.483     C32.8,50.958,32.17,51.219,31.5,51.219z"
                fill="#2980B9" />
              <path id="path-2_14_" d="M31.5,37.993c-0.384,0-0.767-0.147-1.06-0.44L7.228,14.342c-0.586-0.586-0.586-1.536,0-2.122     c0.586-0.585,1.535-0.585,2.121,0L31.5,34.372L53.653,12.22c0.586-0.585,1.535-0.585,2.121,0c0.586,0.586,0.586,1.536,0,2.122     L32.562,37.553C32.269,37.846,31.885,37.993,31.5,37.993z"
                fill="#2980B9" />
            </g>
          </g>
        </svg>
        <div class="rate">{{total_kbps_in_formatted}} </div>
        <div class="amount recieved">
          {{transferIn}}
        </div>
      </div>
      <div class="transfer-total up">

        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 63 63">
          <g>
            <g id="group-22svg">
              <path id="path-1_15_" d="M61.5,44.44c-0.384,0-0.767-0.146-1.06-0.439L31.5,15.061L2.561,44.001     c-0.586,0.586-1.535,0.586-2.121,0s-0.586-1.535,0-2.121l29.286-29.364c0.473-0.474,1.104-0.812,1.774-0.812     c0.001,0,0.001,0,0.002,0c0.671,0,1.301,0.339,1.774,0.813l29.285,29.324c0.586,0.586,0.586,1.555,0,2.14     C62.268,44.275,61.882,44.44,61.5,44.44z"
                fill="#E74C3C" />
              <path id="path-2_13_" d="M54.712,51.296c-0.384,0-0.767-0.147-1.06-0.44L31.5,28.706L9.349,50.856     c-0.586,0.586-1.535,0.586-2.121,0s-0.586-1.535,0-2.121L30.44,25.524c0.586-0.586,1.535-0.586,2.121,0l23.212,23.211     c0.586,0.586,0.586,1.535,0,2.121C55.479,51.149,55.096,51.296,54.712,51.296z"
                fill="#E74C3C" />
            </g>
          </g>
        </svg>
        <div class="rate">{{total_kbps_out_formatted}}</div>
        <div class="amount sent">
          {{transferOut}}
        </div>
      </div>
    </div>

    <div class="window-range-selector">
      <div class="state" v-on:click="toggleWindowState" v-bind:class="{'active': paused}">

        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512 512"
          v-if="paused">
          <g>
            <g fill="#231F20">
              <path d="m354.2,247.4l-135.1-92.4c-4.2-3.1-15.4-3.1-16.3,8.6v184.8c1,11.7 12.4,11.9 16.3,8.6l135.1-92.4c3.5-2.1 8.3-10.7 0-17.2zm-130.5,81.3v-145.4l106.1,72.7-106.1,72.7z"
                fill="#FFFFFF" />
              <path d="M256,11C120.9,11,11,120.9,11,256s109.9,245,245,245s245-109.9,245-245S391.1,11,256,11z M256,480.1    C132.4,480.1,31.9,379.6,31.9,256S132.4,31.9,256,31.9S480.1,132.4,480.1,256S379.6,480.1,256,480.1z"
                fill="#FFFFFF" />
            </g>
          </g>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px"
          y="0px" viewBox="0 0 235.592 235.592" xml:space="preserve" v-else>
          <g>
            <path d="M117.795,0.002C52.843,0.002,0,52.844,0,117.795C0,182.747,52.843,235.59,117.795,235.59   c64.953,0,117.797-52.843,117.797-117.795C235.592,52.844,182.748,0.002,117.795,0.002z M117.795,220.59   C61.113,220.59,15,174.477,15,117.795C15,61.114,61.113,15.002,117.795,15.002c56.683,0,102.797,46.112,102.797,102.793   C220.592,174.477,174.477,220.59,117.795,220.59z"
              fill="#FFFFFF" />
            <path d="M139.834,68.258c-4.143,0-7.5,3.357-7.5,7.5v84.076c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5V75.758   C147.334,71.615,143.977,68.258,139.834,68.258z"
              fill="#FFFFFF" />
            <path d="M95.758,68.258c-4.143,0-7.5,3.357-7.5,7.5v84.076c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5V75.758   C103.258,71.615,99.9,68.258,95.758,68.258z"
              fill="#FFFFFF" />
          </g>
        </svg>


      </div>
      <div class="divider"></div>
      <div id="range-0" v-on:click="windowLength(0)" class="range"> [ ]</div>
      <div id="range-5" v-on:click="windowLength(5)" class="range"> 5m </div>
      <div id="range-30" v-on:click="windowLength(30)" class="range"> 30m </div>
    </div>
  </div>
</template>

<script>
import component from './component';
// ide features don't work in .vue files.  ¯\_(ツ)_/¯
export default component;
</script>


<style lang="scss">
/* oxygen-300 - latin */
@font-face {
    font-family: 'Oxygen';
    font-style: normal;
    font-weight: 300;
    src: url('/static/fonts/oxygen/oxygen-v5-latin-300.eot'); /* IE9 Compat Modes */
    src: local('Oxygen Light'), local('Oxygen-Light'),
        url('/static/fonts/oxygen/oxygen-v5-latin-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/static/fonts/oxygen/oxygen-v5-latin-300.woff2') format('woff2'), /* Super Modern Browsers */
        url('/static/fonts/oxygen/oxygen-v5-latin-300.woff') format('woff'), /* Modern Browsers */
        url('/static/fonts/oxygen/oxygen-v5-latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/static/fonts/oxygen/oxygen-v5-latin-300.svg#Oxygen') format('svg'); /* Legacy iOS */
}
/* oxygen-regular - latin */
@font-face {
    font-family: 'Oxygen';
    font-style: normal;
    font-weight: 400;
    src: url('/static/fonts/oxygen/oxygen-v5-latin-regular.eot'); /* IE9 Compat Modes */
    src: local('Oxygen'), local('Oxygen-Regular'),
        url('/static/fonts/oxygen/oxygen-v5-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/static/fonts/oxygen/oxygen-v5-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
        url('/static/fonts/oxygen/oxygen-v5-latin-regular.woff') format('woff'), /* Modern Browsers */
        url('/static/fonts/oxygen/oxygen-v5-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/static/fonts/oxygen/oxygen-v5-latin-regular.svg#Oxygen') format('svg'); /* Legacy iOS */
}
/* oxygen-700 - latin */
@font-face {
    font-family: 'Oxygen';
    font-style: normal;
    font-weight: 700;
    src: url('/static/fonts/oxygen/oxygen-v5-latin-700.eot'); /* IE9 Compat Modes */
    src: local('Oxygen Bold'), local('Oxygen-Bold'),
        url('/static/fonts/oxygen/oxygen-v5-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/static/fonts/oxygen/oxygen-v5-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
        url('/static/fonts/oxygen/oxygen-v5-latin-700.woff') format('woff'), /* Modern Browsers */
        url('/static/fonts/oxygen/oxygen-v5-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/static/fonts/oxygen/oxygen-v5-latin-700.svg#Oxygen') format('svg'); /* Legacy iOS */
}

$header-height: 30px;

*{
    box-sizing: border-box;
    font-family:"Avenir Next","Oxygen","Helvetica", Verdana, Geneva, sans-serif !important;
}

body {
    background-color:whitesmoke;
    height: 100vh;
    width: 100%;
    overflow: hidden;
}

.nano {
    line-height: 1.3em;
    font-size: 22px;
    color: darkslategrey;
    border-radius: 10px;
    width: 98%;
    margin: 5px auto;
    margin-top: 18px;
    height: calc(30% - 30px) !important;

}

.nano > .nano-content { width:99%; margin:0 auto;}
.nano > .nano-pane   { background: #888; }
.nano > .nano-pane > .nano-slider { background: #111; }





#charts {
    margin: 10px;
    margin-bottom: 0;
    height: calc(70% - 65px);
    min-width: 320px;

    div{
        border-top-left-radius: 8px !important;
        border-top-right-radius: 8px !important;
    }
}

.container {
   height: 100vh;
}

.top-header {

    position: relative;
    height: $header-height;
    width: 96%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    color: #2c3e50;

    div{
        top:5px;
        position: absolute;
        display: inline;
        height: $header-height;
    }

    .heading{
        left: 5px;
        font-size: 1.2em;
        width: 40%;
    }
}

#highcharts-0 > svg > text{
    visibility: hidden;
}

.log {
    font-size: 0.7em;
    cursor: pointer;
    background-color: slategray;
    color: white;
    border-radius: 3px;
    margin-top: 1px;
    margin-bottom: 1px;
    height: 30px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    transition: all 0.2s ease-out;

    &.active {
        background-color: white;
        color: #2c3e50;
     /*   box-shadow: 0 0 5px 2px #fff;
        border: 1px solid #ababab;
        border-radius: 5px;
        outline: none;*/
        border: 1px solid #ababab;
        box-shadow:  -1px 1px #ababab,
            -2px 2px #ababab,
            -3px 3px #ababab,
            -4px 4px #ababab,
            -5px 5px #ababab;

    };
    margin-top: 1px;
    margin-bottom: 6px;

}


.info-bar {

    position: absolute;
    bottom: 0px;
    left: 2%;
    margin: 5px auto;
    width: 96%;
    height: 40px;
    color: #2c3e50;

    div{
        position: absolute;
        height: 100%;
        display: inline;
    }

    .transfer-total{
        width: 50%;
        svg{
            width: 28px;
            position: absolute;
            top: 5px;
            left: 5px;
        }

        .rate{
            font-size: 1.1em;
            margin-left: 40px;
            margin-top: 6px;
            width: 70%;
        }

        .amount{
                color: grey;
                text-align: right;
                position: absolute;
                height: 32px;
                top:-5px;
                margin-top: 12px;
                right: 5px;
                width: calc(50% - 40px);
               // background-color: #2c3e50;
                border-radius: 5px;
            }
    }
    .up{
        top:0;
        right: 0;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
       background-color: cornsilk;
    }
    .down{
        top:0;
        right: 50%;
        background-color: honeydew;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
}

.app {
    position: absolute;
    top:0;
    width: 100%;
    height: 100vh;
}

.window-range-selector {
    position: absolute;
    top: 0;
    right: 3%;
    width: 180px;
    height: 40px;
    user-select: none;

    div{
        cursor: pointer;
        display: inline;
        position: absolute;
        height: 45px;
        width: 40px;
        top: -5px;
        border: none;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        color: white;
        padding-top: 15px;
        text-align: center;
        background-color: #6496c8;
        box-shadow: 0 5px #27496d;

        &.active{
            background-color: #417cb8;
            box-shadow: 0 5px #27496d;
            transform: translateY(5px);
        }
    }

    div:hover{
        background-color: #417cb8;
    }

    .state{

        left: 0;

        svg{
            position: absolute;
            width: 90%;
            top:calc(5% + 5px);
            left: 5%;
        }
    }

    .divider{
        left: 40px;
        width: 20px;
        display: none;
    }

    #range-0{
        left: 60px;
    }

    #range-5{
        left: 100px;
    }

    #range-30{
        left: 140px;
    }

}
.flip-list-move {
  transition: transform 1s;
}
</style>
