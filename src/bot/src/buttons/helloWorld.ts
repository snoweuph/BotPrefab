import { MessageButton } from "discord.js";

export default new MessageButton()
    .setCustomId('hello-world')
    .setLabel('Get a Hello World!')
    .setStyle('PRIMARY')