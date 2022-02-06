import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, MessageComponentInteraction, CacheType, Options } from 'discord.js';
import BaseCommand from '../base/classes/BaseCommand';

export default class TestCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('test'),
            'default'
        );
    }

    async execute(client: Client<boolean>, interaction: MessageComponentInteraction<CacheType>, options: Options): Promise<void> {
        //TODO: Write your code here
    }
}