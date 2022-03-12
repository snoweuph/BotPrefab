import { ButtonInteraction, CacheType, MessageActionRow } from "discord.js";
import BaseButtonInteraction from "../../base/classes/baseButtonInteraction";
import Bot from "../../base/types/bot";

export default class HelloWorldButtonInteraction extends BaseButtonInteraction {
    constructor() {
        super('hello-world', 3);
    }

    async execute(bot: Bot, interaction: ButtonInteraction<CacheType>): Promise<void> {
        interaction.reply('Hello World!');
    }

}