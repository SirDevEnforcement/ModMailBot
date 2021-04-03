const Client = require('../structures/Client');
const {Message, MessageFlags} = require('discord.js');
module.exports = {
    name: `modmail`,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(client.threads.has(`${message.author.id}`)) return message.channel.send('You already have a ticket opened at the moment.');
        const Channel = message.guild.channels.cache.find(ch => ch.name.toLowerCase().includes("modmail"))
        if(!Channel) return message.channel.send('There is no modmail channel.');
        const newChannel = await message.guild.channels.create(`ModMail-${message.author.id}`, {
            type: `text`,
            parent: client.category,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: [`VIEW_CHANNEL`]
                },
                {
                    id: client.role,
                    allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`, `ADD_REACTIONS`, `ATTACH_FILES`]
                }
            ]

        })
        Channel.send(client.embed({
            description:  `The User ${message.author.tag} (${message.author.id}) is creating a ModMail thread. Created in ${newChannel}`

        }, message))
        client.threads.set(message.author.id, {
            channel: newChannel
        });
        const ChannelCollector = newChannel.createMessageCollector((msg) => msg.channel.id == newChannel.id);
        const DMCollector = await (await message.author.send('This is the beginning of your conversation.').then(async(msg) => await msg.channel.createMessageCollector((msg) => msg.author.id == message.author.id)));
        ChannelCollector.on('collect', async(m) => {
            if(m.author.bot) return;
            if(m.content.toLowerCase() == `${client.prefix}close`) return ChannelCollector.stop('closed');
            console.log("closed.");
            message.author.send(`${m.content}`);
        });
        DMCollector.on('collect', async(m) => {
            if(m.author.bot) return;
            if(m.content.toLowerCase() == `${client.prefix}close`) return m.channel.send('You channel\'t run this command.');
            newChannel.send(`${m.author.username}: ${m.content}`);
        });
        ChannelCollector.on('end', async(collected, reason) => {
            if(reason == 'closed') {
                DMCollector.stop();
                message.author.send('Ticket closed.');
                setTimeout(async() => {
                    await newChannel.delete();
                    await client.threads.delete(message.author.id);
                }, 5000)
            }
        });
    }

}
