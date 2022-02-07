import { ButtonInteraction, CacheType, MessageActionRow } from 'discord.js';
import BaseButtonInteraction from '../base/classes/BaseButtonInteraction';
import Client from '../types/Client';

export default class TestButtonInteraction extends BaseButtonInteraction {
    constructor() {
        super('test-id');
    }

    async execute(client: Client, interaction: ButtonInteraction<CacheType>): Promise<void> {
        interaction.reply('TestButtonInteraction');
    }
}