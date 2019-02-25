const Discord = require("discord.js");
const db = require("quick.db")

exports.run = async (client, message, args) => {





let reason = args.join(" ")
if(!reason) reason = "No Subject"

   if(message.guild.channels.find(x => x.topic == message.author.id)) return message.reply(`you already have a ticket, here is your ticket: ${message.guild.channels.filter(channel => channel.topic == message.author.id).map(channel => channel.toString())}`)
let c = await db.fetch(`case_${message.guild.id}`)
if(c == null) c = 0

db.add(`case_${message.guild.id}`, 1)

db.set(`ticket_${message.guild.id}_${message.author.id}`, {
creator: message.author.id,
id: c,
subject: reason
})

   message.guild.createChannel(`ticket-${c}`, "text").then(c=> {

c.setTopic(message.author.id)
message.reply(`Your ticket has been opend at ${c.toString()}`)

        let srole = message.guild.roles.find(n => n.name === "Staff");
        let mrole = message.guild.roles.find(n => n.name === "@everyone");
        let role4 = message.guild.roles.find(x=> x.id == client.config.roles.everyone);

        c.overwritePermissions(srole, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
            EMBED_LINKS: true,
            ATTACH_FILES: true
        });
       c.overwritePermissions(mrole, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false,
            EMBED_LINKS: false,
            ATTACH_FILES: false
        });
        c.overwritePermissions(message.author.id, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
            EMBED_LINKS: true,
            ATTACH_FILES: true
        });
        c.overwritePermissions(client.user.id, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
            EMBED_LINKS: true,
            ATTACH_FILES: true
        });

let embed = new Discord.RichEmbed()
.setAuthor(`${message.author.tag}`)
.setColor("#2eb8c7")
.setDescription(`
${message.author} Opened A Ticket!

Tell Us Why Did You Open This Ticket.`)
.setFooter(`${reason}`)
message.channel.send(embed)
})

}

exports.help = {
  name:"new"
}
