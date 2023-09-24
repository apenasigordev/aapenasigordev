// const audio = new Audio()
export default class Module {
  constructor() {
    
  }
  spotify(user) {
    $("#ActivityName").html("Listening to <span class='font-bold'>Spotify</span>")
    $("#ActivityDetails").text(user.spotify.song)
    $("#ActivityState").html(`by <span class="font-bold">${user.spotify.artist}</span>`)
    $('#ActivityLargeImage').attr('src', user.spotify.album_art_url)
    /*audio.src = ``
    audio.load()
    audio.play()*/
    $("#ActivityAudio").attr("src", `https://spotifytracks.figueiredoigor3.repl.co/track/${user.spotify.track_id}/preview`)
  }
  async presence(user) {
    const activity = user.activities[0]
    if(!activity) return;
    const activityType = {
      0: "Playing",
      1: "Streaming",
      2: "Listening to",
      3: "Watching",
      4: "Custom Status:",
      5: "Competing in"
    }
    $("#ActivityName").html(`${activityType[activity.type]} <span class='font-bold'>${activity.name}</span>`)
    $("#ActivityDetails").text(`${activity.details ? activity.details : activity.name}`)
    $("#ActivityState").html(`${activity.state ? activity.state: ""}`)
    const req = await fetch("https://japi.rest/discord/v1/application/"+activity.application_id)
    const {data} = await req.json();
    console.log(user)
    $('#ActivityLargeImage').attr('src', activity.large_image?activity.large_image:data.application.iconURL)
  }
}
