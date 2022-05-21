"use strict";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Désactivation ancre URL

const url = document.querySelector(".scroll");

if(url){
    url.addEventListener("click", removeAnchor);
}

function removeAnchor() {
    setTimeout(() => {
        history.replaceState('', document.title, window.location.origin + window.location.pathname + window.location.search);
    }, 5);
}

// Burger menu

let menuButton = document.querySelector(".btn--menu");
menuButton.addEventListener("click", toggleNavigation);
let menuImage = document.querySelector(".menu__img");
function toggleNavigation(){
    if(document.body.hasAttribute("data-menu")){
        document.body.removeAttribute("data-menu");
        menuImage.setAttribute("src", "assets/images/burger-menu.svg");
    }else{
        document.body.setAttribute("data-menu", true);
        menuImage.setAttribute("src", "assets/images/croix.svg");
    }
}

// Tabs SVG

const content = [
    {
        nom: "Mastcam-Z",
        nombre: "01 ",
        liste: ["4 kg", "17.4 W", "18,5 Mo"],
        description: "Le système de caméra principale possède deux objectifs capables de faire des photos panoramiques et des vidéos 3D pour capter une vue d’ensemble du paysage martien. Ses yeux aident à comprendre le terrain autour du rover pour identifier d’anciens lacs, ruisseaux mais aussi observer les phénomènes astronomiques, météorologiques et les déplacements du&nbsp;rover.",
    },
    {
        nom: "MEDA",
        nombre: "02 ",
        liste: ["5.5 kg", "17 W", "11 Mo"],
        description: "Comme une station météorologique, il enregistre les différents paramètres atmosphériques de Mars à l’aide de capteurs répartis sur l’ensemble de l’astromobile. Il mesure entre autres la température, la vitesse et la direction du vent, la pression, l’humidité et surveille aussi la quantité de poussière dans l’air qui pourrait endommager les instruments du&nbsp;véhicule.",
    },
    {
        nom: "PIXL",
        nombre: "03 ",
        liste: ["6.9 kg", "25 W", "2 Mo"],
        description: "Le spectromètre à rayons X analyse et identifie les divers éléments chimiques que compose la roche sur Mars. Il dispose également d’un appareil photo capable de prendre des photos très détaillées des textures de la roche. Ces deux outils réunis recherchent de possibles signes de vie passée, laissées par les bactéries sur les&nbsp;minéraux.",
    },
    {
        nom: "RIMFAX",
        nombre: "04 ",
        liste: ["3 kg", "7.5 W", "10 Mo"],
        description: "Le géoradar sonde les couches géologiques jusqu’à 10 mètres de profondeur. Grâce aux ondes réfléchies dans le sol, il peut détecter la présence de glace, de roche, de sable ou même de l’eau à l’état liquide. Il sert à associer les informations sur la stratigraphie que compose le sous-sol de la planète rouge aux échantillons prélevés dans une même&nbsp;zone.",
    },
    {
        nom: "SHERLOC",
        nombre: "05 ",
        liste: ["4.7 kg", "48.8 W", "10 Mo"],
        description: "Les spectromètres et le laser identifient les minéraux, les matières organiques et les biosignatures, une trace physique ou chimique qui sont des indices potentiels d’une forme de vie passée. Il est aussi équipé de la caméra WATSON et transporte de petits échantillons de combinaison spatiale (prévue pour une future exploration humaine) afin de tester leur résistance dans le dur environnement&nbsp;martien.",
    },
    {
        nom: "SuperCam",
        nombre: "06 ",
        liste: ["10.6 kg", "17.9 W", "0.5 Mo"],
        description: "Les spectromètres et le laser examinent le sol et les roches pour obtenir leur composition chimique, moléculaire et atomique. Sa super vision lui permet de distinguer les éléments de la poussière qui pourraient être nocifs pour les humains et trouver des éléments qui se sont altérés ou érodés dans l’eau. Il dispose aussi d’un microphone pour pouvoir écouter l’environnement martien et améliorer leur analyse en fonction du son émis par le&nbsp;laser.",
    },
    {
        nom: "MOXIE",
        nombre: "07 ",
        liste: ["17.1 kg", "300 W", "10g d'oxygène"],
        description: "Le prototype produit de l’oxygène à partir de l’atmosphère martienne composé principalement de dioxyde de carbone. Il doit pouvoir démontrer un moyen de produire de l’oxygène de manière autonome pour la respiration et le propulseur afin de se préparer dans le futur à l’exploration humaine de&nbsp;Mars.",
    }
];

const nom = document.querySelector(".tabs .title--small");
const nombre = document.querySelector(".currentNumber");
const description = document.querySelector(".tabs p");
const poids = document.querySelector(".poids");
const consommation = document.querySelector(".consommation");
const données = document.querySelector(".données");

const loadContent = (content) => {
    nom.innerHTML = content.nom;
    nombre.innerHTML = content.nombre;
    poids.innerHTML = content.liste[0];
    consommation.innerHTML = content.liste[1];
    données.innerHTML = content.liste[2];
    description.innerHTML = content.description;
}

let instrument = document.querySelectorAll(".btn--instrument");
for(let i = 0; i < instrument.length; i++){
    instrument[i].addEventListener("click", buttonCallback);
}

function buttonCallback(event){
    let id = event.currentTarget.getAttribute("data-tab");
    let number = Array.prototype.indexOf.call(instrument, this);
    loadContent(content[number]);

    let tabs = document.querySelectorAll(".instrument");
    for(let i = 0; i < tabs.length; i++){
        tabs[i].classList.remove("actif");
    }

    let currentTab = document.querySelector("#"+id);
    currentTab.classList.add("actif");
}

// Annee copyright

let currentYear = (new Date).getFullYear(),
year = document.querySelector(".annee");
year.innerHTML = "Tanguy Hellin ©" + currentYear;

// Slider

const counter = document.querySelector(".slider__counter");
let sliderIndex = 0;

const btnPrev=document.querySelector(".btn--prev");
const btnNext=document.querySelector(".btn--next");

if(btnNext){
    btnNext.addEventListener("click", sliderNext);
    btnPrev.addEventListener("click", sliderPrev);
}

function sliderNext(){
    sliderIndex = (sliderIndex + 1) % 3;
    counter.innerHTML = "0"+ (sliderIndex + 1);
    let elShow = document.querySelector(".slider__element--show"),
    elNext=elShow.nextElementSibling;
    elShow.classList.remove("slider__element--show");
    if(elNext){
        elNext.classList.add("slider__element--show");
    }else{
        let elFirst=elShow.parentNode.firstElementChild;
        elFirst.classList.add("slider__element--show");
    }
}

function sliderPrev(){
    sliderIndex = (sliderIndex - 1 + 3) % 3;
    counter.innerHTML = "0"+ (sliderIndex + 1);
    let elShow = document.querySelector(".slider__element--show"),
    elPrev=elShow.previousElementSibling;
    elShow.classList.remove("slider__element--show");
    if(elPrev){
        elPrev.classList.add("slider__element--show");
    }else{
        let elLast=elShow.parentNode.lastElementChild;
        elLast.classList.add("slider__element--show");
    }
}

// Audio Visualizer

const lecteur = document.querySelector(".audio");

const audio = document.querySelector(".audio__fichier");
const titre = document.querySelector(".audio__content .title--small");
const date = document.querySelector(".date");
const imgPlay = document.querySelector(".btn--play");

let isPlaying = false;
let audioIndex = 0;

const auPrev = document.querySelector(".btn--prev");
const auPlay = document.querySelector(".btn--play");
const auNext = document.querySelector(".btn--next");

const playlist = [
    {
        fichier: "premier",
        titre: "Premier son de Mars",
        date: "19 Février 2021"
    },
    {
        fichier: "vent",
        titre: "Vent sur Mars",
        date: "22 Février 2021"
    },
    {
        fichier: "laser",
        titre: "Laser frappant un rocher",
        date: "2 Mars 2021"
    },
    {
        fichier: "rover",
        titre: "Rover se déplacant sur Mars",
        date: "7 Mars 2021"
    },
    {
        fichier: "helicoptere",
        titre: "Hélicoptère volant sur Mars",
        date: "30 Avril 2021"
    },
];

const loadAudio = (playlist) => {
    titre.innerHTML = playlist.titre;
    date.innerHTML = playlist.date;
    audio.setAttribute("src", "assets/audio/"+playlist.fichier+".mp3");
}

function play(){
    audio.volume = 0.7;
    isPlaying = true;
    imgPlay.classList.replace("icon__play", "icon__pause");
    audio.play();
}

function pause(){
    isPlaying = false;
    audio.pause();
    imgPlay.classList.replace("icon__pause", "icon__play");
}

function audioPlay(){
    if(isPlaying){
        pause();
    }else{
        play();
    }
}

function audioNext(){
    audioIndex = (audioIndex + 1) % playlist.length;
    loadAudio(playlist[audioIndex]);
    play();
}

function audioPrev(){
    audioIndex = (audioIndex - 1 + playlist.length) % playlist.length;
    loadAudio(playlist[audioIndex]);
    play();
}

function duration(){
    const duration = audio.duration;
    let time = audio.currentTime;
    if(time >= duration){
        audioNext();
    }
}

if(lecteur){
    auNext.addEventListener("click", audioNext);
    auPlay.addEventListener("click", audioPlay);
    auPrev.addEventListener("click", audioPrev);

    loadAudio(playlist[audioIndex]);
    audio.addEventListener("timeupdate", duration);
}

// GSAP

const tl = gsap.timeline();
tl.set(".img", {
    x: "-30%",
    scale: 1.6,
    opacity: 0
});

tl.fromTo(".img", 
{
    y: "85%",
    rotation: 10,
    transformOrigin: "50% 50%"
},
{
    y: "70%",
    rotation: 0,
    transformOrigin: "0% 50%",
    ease: "circ.out",
    opacity: 1,
    duration: 2.4
});

tl.to(".img", {
    x: "0%",
    scale: 1,
    ease: "power2.out",
    duration: 1.2,
    delay: 0.6
});

tl.to(".img", {
    y: 0,
    ease: "power1.out",
    duration: 1.8,
    delay: -1.2
});

tl.from(".section--intro .title--extralarge", {
    opacity: 0,
    y: "-50%",
    duration: 1.2
})

const intro = document.querySelector(".section--intro");

if(intro){
    document.addEventListener("mousemove", function(e){
        parallax(e, ".section--intro", -20);
    });
}
  
function parallax(e, target, movement) {
    let intro = document.querySelector(".section--intro");
    let offsetX = intro.offsetWidth;
    let offsetY = intro.offsetHeight;
    let posX = e.clientX;
    let posY = e.clientY;
  
    gsap.to(target, 1, {
      backgroundPositionX: ((posX - offsetX / 2) / offsetX * movement) + 50,
      backgroundPositionY: ((posY - offsetY / 2) / offsetY * movement) + 50
    });
}

const deimos = document.querySelector(".deimos");
const phobos = document.querySelector(".phobos");
const lune = document.querySelector(".lune");

if(deimos){
    deimos.addEventListener("mouseenter", enterDeimos);
    phobos.addEventListener("mouseenter", enterPhobos);
    lune.addEventListener("mouseenter", enterLune);

    deimos.addEventListener("mouseleave", leaveDeimos);
    phobos.addEventListener("mouseleave", leavePhobos);
    lune.addEventListener("mouseleave", leaveLune);
}

function enterDeimos(){
    phobos.style.opacity="0.25";
}

function leaveDeimos(){
    phobos.style.opacity="1";
}

function enterPhobos(){
    deimos.style.opacity="0.25";
}

function leavePhobos(){
    deimos.style.opacity="1";
}

function enterLune(){

}

function leaveLune(){
    
}

gsap.to(".deimos", {
    duration: 160,
	ease: "none",
	repeat: -1,
    rotate: 360,
    transformOrigin: "50% 50%"
});

gsap.to(".phobos", {
    duration: 40,
	ease: "none",
	repeat: -1,
    rotate: 360,
    transformOrigin: "50% 50%"
});

gsap.to(".lune", {
    duration: 120,
	ease: "none",
	repeat: -1,
    rotate: 360,
    transformOrigin: "50% 50%"
});

let paragraphs = document.querySelectorAll('p');

let masks = document.querySelectorAll(".image__mask");

paragraphs.forEach( paragraph => {
    gsap.from(paragraph, {
        scrollTrigger: {
            trigger: paragraph,
            start: "top 85%",
            markers: true
        },
        duration: 0.6,
        opacity: 0
    });
})

masks.forEach( mask => {
    let content = mask.querySelector(".image__content");

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: mask,
            start: "top 75%"
        }
    });

    tl.set(mask, {autoAlpha: 1});

    tl.fromTo(mask,
        {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"
        },
        {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 0.6,
            ease: "Power3.out"
        }
    );

    tl.from(content, {
        scale: 1.2,
        ease: "Power4.out",
        duration: 1.2,
        delay: -0.6
    });
})

/*gsap.set(".hero__bg--fusee, .hero__bg--rover", {clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)"});

gsap.to(".hero__bg--fusee, .hero__bg--rover", {
    duration: 1.2,
    ease: "slow(0.5, 0.7, false)",
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transformOrigin: "50% 50%"
});*/

let pinIntro = gsap.timeline();

pinIntro.from(".hidden span", {
    ease: "power4.out",
    y: "100%",
    stagger: 0.2,
    duration: 0.6,
    scrollTrigger: ".hidden span"
});

pinIntro.fromTo(".hero__hidden", 
{ 
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
}, 
{
    scrollTrigger: {
        trigger: ".section--hero",
        scrub: 0.6,
        pin: ".section--hero .container",
        start: "top top",
        end: "bottom bottom"
    },
    clipPath: "polygon(39% 0, 61% 0, 61% 100%, 39% 100%)"
})

gsap.to(".hero__bg--fusee", {
    scrollTrigger: {
        trigger: ".hero__hidden",
        scrub: 1.2
    },
    scale: 1.2,
    transformOrigin: "30% 0"
});

gsap.to(".hero__bg--rover", {
    scrollTrigger: {
        trigger: ".hero__hidden",
        scrub: 1.2
    },
    scale: 1.2,
    transformOrigin: "100% 0"
});

gsap.to(".hero__bg--paysage", {
    scrollTrigger: {
        trigger: ".hero__hidden",
        scrub: 1.2
    },
    scale: 1.2,
    transformOrigin: "10% 50%"
});

let sections = gsap.utils.toArray(".timeline");

gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".wrapper",
        pin: true,
        scrub: 0.3,
        start: "top top",
        end: "+=300%"
    }
});

const burger = gsap.timeline({paused:true, reversed:true});

burger.from(".nav__element--lien", {
    y: "100%",
    delay: 0.3,
    stagger: 0.15,
    duration: 0.3,
})

if(burger){
    menuButton.addEventListener('click', () => {
        burger.reversed() ? burger.play() : burger.reverse();
    })
}

let items = document.querySelectorAll(".nav__element--lien"),
    actif = Array.prototype.indexOf.call(items, document.querySelector(".nav__element--actif")),
    index;

if(items){
    for(let i = 0; i < items.length; i++){
        items[i].addEventListener("mouseenter", enter);
        items[i].addEventListener("mouseleave", leave);
    }
}

gsap.set(".number__element",{
    yPercent: actif * -100
});

function enter(){
    index = Array.prototype.indexOf.call(items, this);

    gsap.to(".number__element",{
        yPercent: index * -100,
        ease: "power2.out"
    });
}

function leave(){
    gsap.to(".number__element",{
        yPercent: actif * -100,
        ease: "power2.out"
    });
}

if(btnNext){
    btnNext.addEventListener("click", counters);
    btnPrev.addEventListener("click", counters);

    counters();
}

function counters(){
    let counters = document.querySelectorAll(".slider__element--show .caracteristique__number");

    counters.forEach(function(count) {
        let target = { val:0 },
            num = count.dataset.number,
            split = (num + "").split("."),
            decimals = split.length > 1 ? split[1].length : 0;
        
        gsap.to(target, {
            scrollTrigger: ".section--mars",
            duration: 1.2,
            val: num,
            ease: 'power4.out',
            onUpdate: () => {
                count.innerText = Number(target.val).toFixed(decimals);
            }
        })
    });
}