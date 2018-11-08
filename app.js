require('dotenv').config()
const login = require('facebook-chat-api')
const fs = require('fs')


login({email: process.env.FB_EMAIL, password: process.env.FB_PASSWORD }, (err, api) => {
  if(err) return console.error(err);

  // TODO: require('body-parser')

  api.listen((err, message) => {
    let msg = message.body
    console.log(msg);
    console.log(msg.indexOf)

    // if(msg.startswith('/echo')){
    if(0) {
      api.sendMessage(msg.substring(7, msg.length), message.threadID)
    }

    else if(msg.indexOf('!pravin') == 0) {
      let reply = {
        attachment: fs.createReadStream(__dirname + '/pravin.jpg')
      }
      api.sendMessage(reply, message.threadID);
    }
  })
})