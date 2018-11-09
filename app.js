require('dotenv').config()
const login = require('facebook-chat-api')
const fs = require('fs')


login({email: process.env.FB_EMAIL, password: process.env.FB_PASSWORD }, (err, api) => {
  if(err) return console.error(err);

  // TODO: require('body-parser')

  api.listen((err, message) => {
    const msg = message.body

    if(msg.indexOf('/echo') == 0){
      api.sendMessage(msg.substring(6, msg.length), message.threadID)
    }

    else if(msg.indexOf('/pravin') == 0) {
      let reply = {
        body: msg.substring(7, msg.length),
        attachment: fs.createReadStream(__dirname + '/pravin.jpg')
      }
      api.sendMessage(reply, message.threadID);
    }
  })
})