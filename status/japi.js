import 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js'
export default class Api {
  api='https://japi.rest/discord/v1/user/407859300527243275'
  constructor() {
    
  }
  async show() {
    const request = await fetch(this.api)
    const { data, presence } = await request.json()
    $('#avatar').attr('src', data.avatarURL + "?size=4096")
    $('#avatar2').attr('src', data.avatarURL + "?size=4096")
    console.log({data, presence})
  }
}