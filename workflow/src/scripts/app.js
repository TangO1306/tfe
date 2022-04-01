"use strict";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.from(".img", {x:150, opacity: 0, duration:1.5})

/*const cursorInner = document.querySelector(".cursor-inner");
const cursorOuter = document.querySelector(".cursor-outer");
document.addEventListener("mousemove", e=>{
    cursorInner.style.top = e.pageY + "px";
    cursorInner.style.left = e.pageX + "px";

    cursorOuter.style.top = e.pageY + "px";
    cursorOuter.style.left = e.pageX + "px";
});

const text = document.querySelector(".text p");
text.innerHTML = text.innerText.split("").map(
    (char, i) =>
    `<span style="transform: rotate(${i * 8.2}deg)">${char}</span>`
).join("");*/

// Désactivation ancre URL

const url = document.querySelector(".scroll");

url.addEventListener("click", removeAnchor);

function removeAnchor() {
    setTimeout(() => {
        history.replaceState('', document.title, window.location.origin + window.location.pathname + window.location.search);
    }, 5);
}

// GSAP

let paragraphs = document.querySelectorAll('p');

let masks = document.querySelectorAll('.card');

paragraphs.forEach( paragraph => {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: paragraph,
        }
    });

    tl.from(paragraph, 1, {
        y: 50,
        opacity: 0
    })
})

masks.forEach( mask => {
    let content = mask.querySelector('.card__content');

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: mask,
            start: "top 50%",
            end: "50% 0%",
            toggleActions: "restart none none reset",
            scrub: 1,
            markers: true
        }
    });

    tl.set(mask, {autoAlpha: 1});

    tl.fromTo(
        mask,
        {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"
        },
        {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 0.8,
            ease: "Power4.out"
        }
    );

    tl.from(content, 2.4, {
    scale: 1.1,
    ease: "Power4.out",
    delay: -0.8
    });

    /*tl.from(mask, 1.5, {
        xPercent: -100,
        ease: Power2.out
    });
    tl.from(content, 1.5, {
        xPercent: 100,
        scale: 1.6,
        delay: -1.5,
        ease: Power2.out
    });*/
})

// Tabs SVG

let instrument = document.querySelectorAll(".btn--instrument");
for(let i = 0; i < instrument.length; i++){
    instrument[i].addEventListener("click", buttonCallback);
}

function buttonCallback(event){
    let id = event.currentTarget.getAttribute("data-tab");

    let tabs = document.querySelectorAll(".instrument");
    for(let i = 0; i < tabs.length; i++){
        tabs[i].classList.remove("actif");
    }

    let currentTab = document.querySelector("#"+id);
    currentTab.classList.add("actif");
}

// Audio Visualizer

document.querySelector('button').addEventListener('click', function() {
    audio.resume().then(() => {
      console.log('Playback resumed successfully');
    });
  });

const play = document.querySelector(".play");
play.addEventListener("click", playSound);

const canvas = document.querySelector(".canvas"),
      ctx = canvas.getContext("2d"),
      w = window.innerWidth,
      h = window.innerHeight,
      dpr = window.devicePixelRatio;

const canvasSetup = () => {
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';
  ctx.lineCap = 'round';
};

canvasSetup();

function playSound(){
    let audio = new Audio();
    audio.src = "assets/audio/fg13.mp3";
    audio.play();
    audio.volume = 0.5;
    const audioContext = new (window.AudioContext || window.webkitAudioContext),
      analyser = audioContext.createAnalyser(),
      source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 64;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let barWidth;
    let barHeight, offsetX;
    let x, y;

    function animate(){
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for(let i = 0; i < bufferLength; i++){

            offsetX = 12;
            barHeight = 3 * dataArray[i] + 48;
            barWidth = (canvas.width/bufferLength) - offsetX;
            
            y = (canvas.height - barHeight)/2;

            ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.fillRect( x, y, barWidth, barHeight);
            ctx.closePath();

            x += barWidth + offsetX;
        }
        requestAnimationFrame(animate);
    }
    animate();
}