import { ButtonInteraction, CacheType, Message, MessageActionRow, MessageButton } from 'discord.js';
import BaseButtonInteraction from '../base/classes/BaseButtonInteraction';
import { run } from '../modules/PingModule';
import Client from '../base/types/Client';

export default class TestButtonInteraction extends BaseButtonInteraction {
    constructor() {
        super('test-id');
    }

    async execute(client: Client, interaction: ButtonInteraction<CacheType>): Promise<void> {
        await run(client.client, interaction);
        const messageActionRow = interaction.message.components[0] as MessageActionRow;
        messageActionRow.components[0].disabled = true;
        (messageActionRow.components[0] as MessageButton).label = 'was Used';
        (interaction.message as Message).edit({ components: [messageActionRow] })
    }
}