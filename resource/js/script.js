// Getting locomotive through codepen locomotive js code

function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

// make sound on of as well as a cursor button

vid = () => {
  // var p1 = document.querySelector('page1')
  var vid = document.querySelector("#sec video");
  var dot = document.querySelector("#cursor");

  // const transVal = dot.style.transition;

  vid.addEventListener("mouseenter", function () {
    dot.innerHTML = "sound on";
    dot.style.width = "7%";
    dot.style.display = "flex";
    dot.style.alignItems = "center";
    dot.style.justifyContent = "center";
    dot.style.fontSize = "12px";
    dot.style.padding = " 0px 15px";
    dot.style.borderRadius = "50px";
    dot.style.color = "#000";
    // dot.style.transition = '0.3s ease-in'
  });

  vid.addEventListener("click", function () {
    if (vid.muted) {
      vid.muted = false;
      dot.innerHTML = "sound off";
    } else {
      vid.muted = true;
      dot.innerHTML = "";
    }
  });

  vid.addEventListener("mouseleave", function () {
    dot.innerHTML = ""; // Clear the content of the dot element
    dot.style.width = "0"; // Reset the width of the dot element
    dot.style.width = "30px";
    dot.style.display = "block";
    dot.style.fontSize = "0";
    dot.style.padding = " 0";
    dot.style.borderRadius = "50px";
    // dot.style.transition = 'background-image ease 0.5s'
    gsap.to(dot, {
      opacity: 1,
    });
  });
};
vid();

// Making cursor work

var crsr = document.getElementById("cursor");
var main = document.querySelector("#main");

document.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x + 20 + "px";
  crsr.style.top = dets.y + 20 + "px";
});

// Gsap Animations

an = () => {
  var isMobile = window.innerWidth <= 768; // Change this value based on your mobile breakpoint

  var tl = gsap.timeline({
    scrollTrigger: {
      // trigger: '.page1 h1',
      trigger: "#sec h1",
      scroller: "#main",
      // markers: true,
      scrub: 3,
      start: "top 10%",
      end: "top 0",
    },
  });

  if (isMobile) {
    // Mobile animations
    tl.to(
      "#sec h1",
      {
        x: 0, // Change these values as needed
        duration: 1,
      },
      "anim"
    );
    tl.to(
      "#sec h2",
      {
        x: 0, // Change these values as needed
        duration: 1,
      },
      "anim"
    );
    tl.to("#sec video", {
      height: "100vh",
      delay: 0.1,
    });
  } else {
    // Desktop animations
    tl.to(
      "#sec h1",
      {
        x: -100,
        duration: 1,
      },
      "anim"
    );
    tl.to(
      "#sec h2",
      {
        x: 100,
        duration: 1,
      },
      "anim"
    );
    tl.to("#sec video", {
      width: "90%",
      delay: 0.1,
    });
  }

  var tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#sec h1",
      scroller: "#main",
      // markers: true,
      scrub: 3,
      start: isMobile ? "top -50%" : "top -120%", // Adjust these values as needed
      end: isMobile ? "top -60%" : "top -130%", // Adjust these values as needed
    },
  });
  tl2.to("#main", {
    backgroundColor: "#fff",
  });

  var tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: "#sec h1",
      scroller: "#main",
      // markers: true,
      scrub: 3,
      start: isMobile ? "top -140%" : "top -280%", // Adjust these values as needed
      end: isMobile ? "top -150%" : "top -300%", // Adjust these values as needed
    },
  });
  tl3.to("#main", {
    backgroundColor: "#0f0d0d",
    color: "white",
  });
};
an();

// animation of boxes using query Selector

var boxes = document.querySelectorAll(".box");
boxes.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    var att = elem.getAttribute("data-img");
    crsr.style.width = "300px";
    crsr.style.height = "250px";
    crsr.style.borderRadius = "0";
    crsr.style.backgroundImage = `url(${att})`;
  });
  elem.addEventListener("mouseleave", function () {
    crsr.style.width = "20px";
    crsr.style.height = "20px";
    crsr.style.borderRadius = "50%";
    crsr.style.backgroundImage = `none`;
  });
});

// loop function for nav hover + marquee

loop = () => {
  // Select all the h4 tags in the nav tag
  let li = document.querySelectorAll(".navmenu ul li");

  // Loop through each h4 tag
  li.forEach(function (navli) {
    // Add mouseover event listener
    navli.addEventListener("mouseover", function () {
      // Get the h4 content
      let licontent = this.innerHTML;

      // Select all the h1 tags in the div with the elem class and nav id
      let elemH1s = document.querySelectorAll("#navm .marquee h1");

      // Loop through each h1 tag
      elemH1s.forEach(function (elemH1) {
        // Set the h1 content
        elemH1.innerHTML = licontent;
        elemH1.style.fontSize = "10vw";
        elemH1.style.fontWeight = "100";
        elemH1.style.zIndex = "7";
      });
    });
  });

  var nav = document.querySelector("#navm");
  var navi = document.querySelector("#nav");
  var li2 = document.querySelectorAll(".navmenu ul li");
  li2.forEach(function (elem) {
    elem.addEventListener("mousemove", function () {
      nav.style.display = "flex";
      nav.style.opacity = "1";
    });
    navi.addEventListener("mouseleave", function () {
      nav.style.display = "none";
      nav.style.opacity = "0";
    });
  });
};

loop();
