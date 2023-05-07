import Module from 'status/modules/index.js'
const module = new Module();
const ws = new WebSocket("wss://api.lanyard.rest/socket")

const OPCODES = {
  INFO: 0,
  HELLO: 1,
  INIT: 2,
  HEARTBEAT: 3,
};
var oldColor;
ws.onmessage = ({ data }) => {
  const parsedData = JSON.parse(data);

  if (parsedData.op == OPCODES.HELLO) {
    // Identify
    ws.send(
      JSON.stringify({
        op: OPCODES.INIT,
        d: {
          subscribe_to_id: "407859300527243275",
        }
      })
    );
    setInterval(function() {
      ws.send(
        JSON.stringify({
          op: OPCODES.HEARTBEAT,
        })
      );
    }, parsedData.d.heartbeat_interval);
  } else if(parsedData.op == OPCODES.INFO) {
    const colors = {
      online: "green-500",
      offline: "gray-500",
      idle: "yellow-500",
      dnd: "red-500"
    };
    
    const statuses = {
      online: "Online",
      offline: "Offline",
      idle: "Idle",
      dnd: "Do Not Disturb Me",
    };
    if(parsedData.t == "INIT_STATE") {
      const user = parsedData.d;
      const statusColor = "ring-" + colors[user.discord_status];
      oldColor = statusColor;
      console.log(oldColor)
    }
    if (parsedData.t == "INIT_STATE" || parsedData.t == "PRESENCE_UPDATE") {
      const user = parsedData.d;
      const statusColor = "ring-" + colors[user.discord_status];
     // console.log(oldColor)
      $("#avatar").removeClass(oldColor);
      $('#avatar').addClass(statusColor);
      setTimeout(() => {
        oldColor = statusColor;
       // console.log(oldColor)
      }, 2000)
      if(!user.activities[0]) {
        $("#nowplaying").addClass("hidden")
        $("#nowplayinghr").addClass("hidden")
      } else {
        $("#nowplayinghr").removeClass("hidden")
        $("#nowplaying").removeClass("hidden")
      }
      const activeOn = {
        mobile: user.active_on_discord_mobile,
        web: user.active_on_discord_web,
        desktop: user.active_on_discord_desktop
      }
      if(activeOn.mobile) {
        $("#mobile").addClass("text-green-500");
        $("#web").removeClass("text-green-500");
        $("#computer").removeClass("text-green-500");
      } else if(activeOn.web) {
        $("#mobile").removeClass("text-green-500");
        $("#web").addClass("text-green-500");
        $("#computer").removeClass("text-green-500");
      } else if(activeOn.desktop) {
        $("#mobile").removeClass("text-green-500");
        $("#web").removeClass("text-green-500");
        $("#computer").addClass("text-green-500");
      } else {
        $("#mobile").removeClass("text-green-500");
        $("#web").removeClass("text-green-500");
        $("#computer").removeClass("text-green-500");
      }
      if(user.activities[0] && user.listening_to_spotify) {
        module.spotify(user);
      } else if(user.activities[0]) {
        module.presence(user)
      }
    }
  }
}
