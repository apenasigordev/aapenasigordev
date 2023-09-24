// import 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js'
console.log(location.href);

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("Loaded the page")
  document.getElementById("loading").classList.add("hidden")
  document.getElementById("content").classList.remove("hidden")
});

import Japi from './japi.js'
import "./lanyard.js"
import "./timezone.js"
import "./modules/activityModal.js"
const japi = new Japi()

japi.show()


const audio = document.getElementById("ActivityAudioPlayer")

audio.on("loadeddata", () => {
  if(audio.paused) {
    $("#play").removeClass("hidden");
    $("#pause").addClass("hidden");
  } else {
    $("#pause").removeClass("hidden");
    $("#play").addClass("hidden");
  }
  $("#playerbtn").removeClass("opacity-0")
  $("#playerbtn").addClass("opacity-50")
  setTimeout(() => {
    $("#playerbtn").removeClass("opacity-50")
    $("#playerbtn").addClass("opacity-0")
  }, 1000);
});
