import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CacheType, Options, CommandInteraction } from 'discord.js';
import BaseCommand from '../base/classes/BaseCommand';

export default class TestCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('test')
                .setDescription('Test command'),
            'default'
        );
    }

    async execute(client: Client<boolean>, interaction: CommandInteraction<CacheType>, options: Options): Promise<void> {
        //TODO: Write your code here
        console.log('[TestCommand] Executed');
    }
}