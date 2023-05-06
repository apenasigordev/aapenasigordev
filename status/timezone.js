const brt = moment().utcOffset("-03:00");
const tz = moment(brt);

const { log } = console;
const time = {
  hours: tz.hours(),
  minutes: tz.minutes()
}

if(time.hours > 21) {
  log("I should be sleeping rn")
} else if(time.hours < 7) {
  log("At school")
} else {
  log(time.hours, time.minutes)
}