import Client from '../../base/types/Client';
import BaseEvent from '../../base/classes/BaseEvent';
import { ButtonInteraction } from 'discord.js';

export default class ButtonHandlerEvent extends BaseEvent {
    constructor() {
        super('interactionCreate');
    }

    async execute(client: Client, ...args: any[]): Promise<void> {
        const interaction: ButtonInteraction = args[0];
        if (!interaction.isButton()) return;
        const button = client.buttonInteractions.get(interaction.customId);
        if (!button) return;
        try {
            await button.execute(client, interaction);
        } catch (error) {
            console.log(`[ButtonHandler] error: ${error}`);
        }
    }
}