# ModMailBot
A simple ModMail Bot made with the Discord.js library.
# Building and Running
node .
## How to Use
* Have a channel with "modmail" in it's name, like one where members make the ticket.
* The command is <prefix>modmail  . This creates a ticket-channel in the specified Category, with the name modmail-<userId>.
* This channel is locked to the @everyone role, only the role given in Client.js has perms to access these tickets.
