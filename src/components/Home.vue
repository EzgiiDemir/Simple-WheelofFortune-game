<template>
  <div>
    <h1 class="text-center mt-5">
      10,000 points wins!
    </h1>
    <div class="row justify-content-around">
      <div class="col-md-4">
        <div class="player1">
          <!-- Player 1 Roulette -->
          <h1 class="title text-center">Player 1</h1>

          <div class="box-roulette" ref="boxRoulette1">
            <div class="markers"></div>
            <audio id="spin-sound" src="myinstants.mp3"></audio>

            <div class="button-center">
              <button type="button" @click="startSpinning(1)" class="btn btn-dark btn-start">
                <i class="bi bi-arrow-clockwise"></i>
              </button>
            </div>
            <div class="roulette" ref="roulette1"></div>
          </div>

          <!-- Modal -->
          <div id="myModal1" class="modal" ref="modal1">
            <!-- Modal content -->
            <div class="modal-content" style="text-align:center; font-size:46px">
              <span class="close" @click="closeModal(1)">&times;</span>
              <p v-if="player1Score >= 10000" id="ResultItem1">Tebrikler, Oyuncu 1 Kazandı!</p>
              <p v-else id="ResultItem1">{{ modalText }}</p>
            </div>
          </div>

          <p class="title">Player 1 Puanı: {{ player1Score }}</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="player2">
          <!-- Player 2 Roulette -->
          <h1 class="title text-center">Player 2</h1>

          <div class="box-roulette" ref="boxRoulette2">
            <div class="markers"></div>
            <div class="button-center">
              <button type="button" @click="startSpinning(2)" class="btn btn-dark btn-start">
                <i class="bi bi-arrow-clockwise"></i>
              </button>
            </div>
            <div class="roulette" ref="roulette2"></div>
          </div>

          <!-- Modal -->
          <div id="myModal2" class="modal" ref="modal2">
            <!-- Modal content -->
            <div class="modal-content" style="text-align:center; font-size:46px">
              <span class="close" @click="closeModal(2)">&times;</span>
              <p v-if="player2Score >= 10000" id="ResultItem2">Tebrikler, Oyuncu 2 Kazandı!</p>
              <p v-else id="ResultItem2">{{ modalText }}</p>
            </div>
          </div>

          <p class="title">Player 2 Puanı: {{ player2Score }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalText: '',
      isSpinning: [false, false],
      totalPoints: [0, 0],
      player1Score: 0,
      player2Score: 0
    };
  },
  mounted() {
    this.initRoulette();
  },
  methods: {
    startSpinning(player) {
      if (!this.isSpinning[player - 1]) {
        this.rotation(player);
        this.isSpinning[player - 1] = true;
      }
    },
    closeModal(player) {
      this.$refs['modal' + player].style.display = "none";
    },
    restartGame(player) {
      this.totalPoints[player - 1] = 0;
      this.player1Score = 0;
      this.player2Score = 0;
      this.isSpinning = [false, false];
      this.initRoulette();
    },
    endGame() {
      this.totalPoints = [0, 0];
      this.player1Score = 0;
      this.player2Score = 0;
      this.isSpinning = [false, false];

      if (this.player1Score >= 10000) {
        this.openModal(1);
      } else if (this.player2Score >= 10000) {
        this.openModal(2);
      }
    },
    initRoulette() {
      const data = [
        { color: '#3f297e', text: '200' },
        { color: '#1d61ac', text: '400' },
        { color: '#f7a416', text: '600' },
        { color: '#efe61f', text: 'PASS' },
        { color: '#FF5BAE', text: '800' },
        { color: '#169ed8', text: '1000' },
        { color: '#f7a416', text: 'Unlucky!' },
        { color: '#e6471d', text: '1200' },
        { color: '#60b236', text: '1300' },
        { color: '#efe61f', text: '1400' }
      ];

      const wrappers = [this.$refs.boxRoulette1, this.$refs.boxRoulette2];

      wrappers.forEach((wrapper, index) => {
        const wrapW = wrapper.offsetWidth;
        const itemSize = data.length;
        const angleOffset = -45;

        for (let i = 1; i <= itemSize; i++) {
          const idx = i - 1;
          const rt = i * (360 / itemSize) + angleOffset;
          const itemHTML = document.createElement('div');
          itemHTML.classList.add('item');
          const labelHTML = `<p class="label"><span class="text">${data[idx].text}</span></p>`;

          wrapper.querySelector(".roulette").appendChild(itemHTML);
          wrapper.querySelector(".roulette .item:last-child").innerHTML = labelHTML;
          wrapper.querySelector(".roulette .item:last-child").style.left = wrapW / 2 + 'px';
          wrapper.querySelector(".roulette .item:last-child").style.top = -wrapW / 2 + 'px';
          wrapper.querySelector(".roulette .item:last-child").style.borderTopWidth = wrapW + 'px';
          wrapper.querySelector(".roulette .item:last-child").style.borderRightWidth = this.tanDeg(360 / itemSize) + 'px';
          wrapper.querySelector(".roulette .item:last-child").style.borderTopColor = data[idx].color;
          wrapper.querySelector(".roulette .item:last-child").style.transform = "rotate(" + rt + "deg)";

          const textH = parseInt(((2 * Math.PI * wrapW) / (360 / itemSize)) *0.8);

wrapper.querySelector(".roulette .item:last-child .label").style.height = textH + 'px';
wrapper.querySelector(".roulette .item:last-child .label").style.lineHeight = textH + 'px';
wrapper.querySelector(".roulette .item:last-child .label").style.transform = 'translateX(' + (textH * 1.5) + 'px) translateY(' + (wrapW * -0.4) + 'px) rotateZ(' + (90 + (360 / itemSize) * 0.5) + 'deg)';
}

const buttonHTML = '<button type="button" @click="startSpinning(' + (index + 1) + ')" class="btn btn-dark btn-start rounded-pill"><i class="bi bi-arrow-clockwise"></i></button>';
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-center');
buttonContainer.innerHTML = buttonHTML;
wrapper.appendChild(buttonContainer);

buttonContainer.addEventListener("click", () => {
this.startSpinning(index + 1);
});
});
},
rotation(player) {
const data = [
{ color: '#3f297e', text: '200' },
{ color: '#1d61ac', text: '400' },
{ color: '#f7a416', text: '600' },
{ color: '#efe61f', text: 'PASS' },
{ color: '#FF5BAE', text: '800' },
{ color: '#169ed8', text: '1000' },
{ color: '#f7a416', text: 'Unlucky!' },
{ color: '#e6471d', text: '1200' },
{ color: '#60b236', text: '1300' },
{ color: '#efe61f', text: '1400' }
];

const $roulette = this.$refs['boxRoulette' + player].querySelector(".roulette");
const firstVariable = this.r(5, 10);
const secondVariable = this.r(0, 360);
const completeA = 360 * firstVariable + secondVariable;

$roulette.animate(
[
{ transform: `rotate(0deg)` },
{ transform: `rotate(${completeA}deg)` }
],
{
duration: 5000,
easing: "ease-in-out",
fill: "forwards"
}
).onfinish = () => {
const resultItem = data.length - Math.round(secondVariable / (360 / data.length));

if (resultItem >= 0 && resultItem < data.length) {
if (data[resultItem].text === 'Unlucky!') {
  this.totalPoints[player - 1] = 0; // Unlucky durumunda puanı sıfırla
} else {
  if (data[resultItem].text !== 'PASS') {
    // Unlucky dışındaki durumlarda puanı ekleyerek hesapla
    this.totalPoints[player - 1] += parseInt(data[resultItem].text);
    if (this.totalPoints[player - 1] >= 10000) {
      alert("Tebrikler, 10.000 puana ulaştınız!");
      this.totalPoints[player - 1] = 0
      // Oyunu sıfırla
    }
  }
}

// Oyuncu puanlarını güncelle
if (player === 1) {
  this.player1Score = this.totalPoints[player - 1];
} else if (player === 2) {
  this.player2Score = this.totalPoints[player - 1];
}
} else {
console.error("Hata: Geçersiz sonuç indisine erişildi.");
}

// Her durumda dönüşü sonlandır
this.isSpinning[player - 1] = false;
};
},
r(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
},
tanDeg(deg) {
const rad = deg * Math.PI / 180;
return this.$refs.boxRoulette1.offsetWidth / (1 / Math.tan(rad));
}
}
}
</script>


<style>
html, body, button {
font-family: Arial, "돋움", Dotum, "굴림", Gulim, "Apple SD Gothic Neo", AppleGothic, sans-serif;
background-color:#000000;
}

button { border: 0; margin: 0; padding: 0; }

.title { font-size: 20px; margin-top: 50px; text-align: center; color: #ffffff;}

.box-roulette {
position: relative;
margin: 20px auto;
width: 100%;
max-width: 380px;
height: 380px;
border: 4px solid rgb(255, 166, 0);
border-radius: 50%;
background: #ccc;
overflow: hidden;
}

.box-roulette .markers {
position: absolute;
left: 50%;
top: -15px;
margin-left: 0px !important;
margin-top: 0px;
width: 0;
height: 0;
border: 25px solid #fff;
border-left-color: transparent;
border-right-color: transparent;
border-bottom-color: transparent;
z-index: 9999;
}

.box-roulette .roulette {
position: relative;
width: 100%;
height: 100%;
overflow: hidden;
}

.box-roulette .item {
position: absolute;
top: 0;
width: 0;
height: 0;
border: 0 solid transparent;
transform-origin: 0 100%;
}

.box-roulette .label {
position: absolute;
left: 0;
top: 0;
color: #fff;
white-space: nowrap;
transform-origin: 0 0;
}

.box-roulette .label .text {
display: inline-block;
font-size: 20px;
font-weight: bold;
line-height: 1;
vertical-align: middle;
}

.button-center {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}

.modal {
display: none;
position: fixed;
z-index: 1;
padding-top: 70px;
left: 0;
top: 0;
width: 100%;
height: 100%;
overflow: auto;
background-color: rgba(0,0,0,0.4);
}

.modal-content {
background-color: #fefefe;
margin: auto;
padding: 20px;
border: 1px solid #888;
width: 80%;
font-size: 16px;
}

.modal-message {
position: fixed;
top: 50px; /* İstediğinizyüksekliği ayarlayın */
  right: 20px; /* İstediğiniz yatay konumu ayarlayın */
  background-color: rgba(255, 255, 255, 0.8); /* Arkaplan rengi */
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover, .close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
button{
  border-radius: 50px;
  color:white;
   background-color:transparent ;
  font-size: 30px;
}

h1{
  color: #ffffff !important;
}

.text-body-secondary{
  color:#ffffff!important;
}


</style>


