# ModMailBot
A simple ModMail Bot made with the Discord.js library.
# Building and Running
node .
# Building on Ubuntu(16.04)
*  On Ubuntu 16.04, use "curl -lS https://deb.nodesource.com/setup_14.x/ base -" to get the most recent version.
*  Then, run "apt-get install nodejs" to install the most recent version. In this case, 14.x is installed. X being whatever the latest version is. 
## How to Use
* Have a channel with "modmail" in it's name, like one where members make the ticket.
* The command is <prefix>modmail  . This creates a ticket-channel in the specified Category, with the name modmail-<userId>.
* This channel is locked to the @everyone role, only the role given in Client.js has perms to access these tickets.
# Prerequisites
* discord.js
* fs
* node
