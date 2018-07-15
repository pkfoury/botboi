require('dotenv').config()
const login = require('facebook-chat-api')


login({email: process.env.FB_EMAIL, password: process.env.FB_PASSWORD }, (err, api) => {
  if(err) return console.error(err);

  api.listen((err, message) => {
    let msg = message.body
    if(msg.substring(0,1) == '/'){
      api.sendMessage(msg, message.threadID)
    }
  })
})