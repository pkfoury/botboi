require('dotenv').config()
const login = require('facebook-chat-api')
const fs = require('fs')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


login({email: process.env.FB_EMAIL, password: process.env.FB_PASSWORD }, (err, api) => {
  if(err) {
  	switch (err.error) {
		case 'login-approval':
			console.log('enter 2fa code:');
			rl.on('line', (line) => {
				err.continue(line);
				rl.close();
			});
			break;
		default:
			console.log(err);
		}
	return;
  }
  

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
