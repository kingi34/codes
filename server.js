// server.js
// where your node app sta
const Discord = require('discord.js');
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

const bot = new Discord.Client()
const {prefix, config} = require("./config.json")
const fs = require("fs");




bot.commands = new Discord.Collection();

bot.on("ready", async () => {
console.log(`${bot.user.tag} is now online`)


fs.readdir("./commands/", (err, files) => {
    console.log(`Loading a total of ${files.length} commands.`);

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("message", (message) => {
  
  if(message.author.bot) return;
  if(message.channel.type === "dm") return 

 let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
6
if(cmd == `${prefix}ping`) {
message.channel.send(`Pong!`)
} 
 
  
  

  if(!message.content.startsWith(prefix)) return;

let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
});
bot.login(process.env.TOKEN)
