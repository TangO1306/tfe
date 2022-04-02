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

// Burger menu

let navButton = document.querySelector(".btn--menu");
navButton.addEventListener("click", toggleNavigation);
let meElement = document.querySelector(".burger-menu");
function toggleNavigation(){
    if(document.body.hasAttribute("data-menu")){
        document.body.removeAttribute("data-menu");
        meElement.setAttribute("src", "assets/images/burger-menu.svg");
    }else{
        document.body.setAttribute("data-menu", true);
        meElement.setAttribute("src", "assets/images/croix.svg");
    }
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

const content = [
    {
        titre: "Mastcam-Z",
        nombre: "01 ",
        liste: ["100", "80", "2"],
        description: "Le système de caméra principale possède deux objectifs capables de zoomer, de faire des photos panoramiques et des vidéos 3D à grande vitesse pour capter une vue d’ensemble du paysage martien. Ses yeux aident à comprendre le terrain autour du rover pour identifier d’anciens lacs, ruisseaux mais aussi observer les phénomènes astronomiques, météorologiques comme les tourbillons de poussière et les déplacements du rover.",
    },
    {
        titre: "MEDA",
        nombre: "02 ",
        liste: ["100", "80", "2"],
        description: "Comme une station météorologique, il enregistre les différents paramètres atmosphériques de Mars à l’aide de capteurs répartis sur l’ensemble de l’astromobile. Il mesure entre autres la température, la vitesse et la direction du vent, la pression, l’humidité et surveille aussi la quantité de poussière dans l’air qui pourrait endommager les instruments du véhicule.",
    },
    {
        titre: "PIXL",
        nombre: "03 ",
        liste: ["100", "80", "2"],
        description: "Le spectromètre à rayons X analyse et identifie les divers éléments chimiques que compose la roche sur Mars. Il dispose également d’un appareil photo capable de prendre des photos très détaillées des textures de la roche. Ces deux outils réunis recherchent de possibles signes de vie passée, laissées par les bactéries sur les minéraux.",
    },
    {
        titre: "RIMFAX",
        nombre: "04 ",
        liste: ["100", "80", "2"],
        description: "Le géoradar sonde les couches géologiques jusqu’à 10 mètres de profondeur. Grâce aux ondes réfléchies dans le sol, il peut détecter la présence de glace, de roche, de sable ou même de l’eau à l’état liquide. Il sert à associer les informations sur la stratigraphie que compose le sous-sol de la planète rouge aux échantillons prélevés dans une même zone.",
    },
    {
        titre: "SHERLOC",
        nombre: "05 ",
        liste: ["100", "80", "2"],
        description: "Les spectromètres et le laser identifient les minéraux, les matières organiques et les biosignatures, une trace physique ou chimique qui sont des indices potentiels d’une forme de vie passée. Il est aussi équipé de la caméra WATSON et transporte de petits échantillons de combinaison spatiale (prévue pour une future exploration humaine) afin de tester leur résistance dans le dur environnement martien. La caméra les cible pour étalonner la caméra et les spectromètres.",
    },
    {
        titre: "SuperCam",
        nombre: "06 ",
        liste: ["100", "80", "2"],
        description: "Les spectromètres et le laser examinent le sol et les roches pour obtenir leur composition chimique, moléculaire et atomique. Sa super vision lui permet de distinguer les éléments de la poussière qui pourraient être nocifs pour les humains et trouver des éléments qui se sont altérés ou érodés dans l’eau. Il dispose aussi d’un microphone pour pouvoir écouter l’environnement martien et améliorer leur analyse en fonction du son émis par le laser.",
    },
    {
        titre: "MOXIE",
        nombre: "07 ",
        liste: ["100", "80", "2"],
        description: "Le prototype produit de l’oxygène à partir de l’atmosphère martienne composé principalement de dioxyde de carbone. Il doit pouvoir démontrer un moyen de produire de l’oxygène de manière autonome pour la respiration et le propulseur afin de se préparer dans le futur à l’exploration humaine de Mars.",
    }
];

const titre = document.querySelector(".title--tabs");
const nombre = document.querySelector(".currentNumber");
const description = document.querySelector(".p__instrument");

const loadContent = (content) => {
    titre.innerHTML = content.titre;
    nombre.innerHTML = content.nombre;
    liste.innerHTML = content.liste;
    description.innerHTML = content.description;
}

let instrument = document.querySelectorAll(".btn--instrument");
for(let i = 0; i < instrument.length; i++){
    instrument[i].addEventListener("click", buttonCallback);
}

function buttonCallback(event){
    let id = event.currentTarget.getAttribute("data-tab");
    let number = id.split("instrument");
    let nombre = number[1] - 1;
    loadContent(content[nombre]);

    let tabs = document.querySelectorAll(".instrument");
    for(let i = 0; i < tabs.length; i++){
        tabs[i].classList.remove("actif");
    }

    let currentTab = document.querySelector("#"+id);
    currentTab.classList.add("actif");
}

// Annee copyright

let annee = (new Date).getFullYear(),
date = document.querySelector(".date");
date.innerHTML = "Tanguy Hellin ©" + annee;

// Audio Visualizer

document.querySelector('.play').addEventListener('click', function() {
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