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
