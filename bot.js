const { RTMClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;

function slack() {
  const rtm = new RTMClient(token);
  rtm.start();

  rtm.on('message', (message) => {

    if ( (message.subtype && message.subtype === 'bot_message') ||
    (!message.subtype && message.user === rtm.activeUserId) ) {
      return;
    }

    const words = message.text.split(' ')

    if (words[0].toLowerCase() === 'remind'){
      rtm.sendMessage('ok', message.channel)
      .then((res) => {
        console.log('Message sent: ', res.ts);
      })
      .catch(console.error);
    }

    console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
  });
  return {
    summary: subject,
    start: {
      date: (new Date()).toISOString().split('T')[0]
    },
    end: {
      date: (new Date()).toISOString().split('T')[0]
    }
  }
}

module.exports = {slack};
