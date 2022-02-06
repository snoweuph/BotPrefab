import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, MessageComponentInteraction, Options } from 'discord.js';

export default abstract class BaseCommand {
    data: SlashCommandBuilder;
    category: string;

    constructor(data: SlashCommandBuilder, category: string) {
        this.data = data;
        this.category = category;
    }

    abstract execute(client: Client<boolean>, interaction: MessageComponentInteraction, options: Options): Promise<void>;
}