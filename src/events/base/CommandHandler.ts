import Client from '../../types/Client';
import BaseEvent from '../../base/classes/BaseEvent';
import { CommandInteraction } from 'discord.js';

export default class CommandHandlerEvent extends BaseEvent {
    constructor() {
        super('interactionCreate');
    }

    async execute(client: Client, ...args: any[]): Promise<void> {
        const interaction: CommandInteraction = args[0];
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            const { options } = interaction;
            await command.execute(client.client, interaction, options);
        } catch (error) {
            console.log(`[CommandHandler] error: ${error}`);
            interaction.reply({ ephemeral: true, content: 'An error occured while executing this command.' });
        }
    }
}