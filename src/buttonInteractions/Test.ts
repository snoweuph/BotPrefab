import { ButtonInteraction, CacheType, MessageActionRow } from 'discord.js';
import BaseButtonInteraction from '../base/classes/BaseButtonInteraction';
import { run } from '../modules/PingModule';
import Client from '../base/types/Client';

export default class TestButtonInteraction extends BaseButtonInteraction {
    constructor() {
        super('test-id');
    }

    async execute(client: Client, interaction: ButtonInteraction<CacheType>): Promise<void> {
        await run(client.client, interaction);
    }
}