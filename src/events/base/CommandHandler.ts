import Client from '../../types/Client';
import BaseEvent from '../../base/classes/BaseEvent';
import { CommandInteraction } from 'discord.js';

const cooldownMap = new Map<string, Map<string, number>>();

export default class CommandHandlerEvent extends BaseEvent {
    constructor() {
        super('interactionCreate');
    }

    async execute(client: Client, ...args: any[]): Promise<void> {
        const interaction: CommandInteraction = args[0];
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        if (!interaction.memberPermissions.has(command.category.permissions)) return interaction.reply({ ephemeral: true, content: 'You don\'t have the permissions' });
        if (cooldownMap.has(interaction.guildId) && cooldownMap.get(interaction.guildId).has(interaction.user.id)) {
            const cooldownTimestamp = cooldownMap.get(interaction.guildId).get(interaction.user.id);
            if (interaction.createdTimestamp - cooldownTimestamp < command.cooldown) {
                return interaction.reply({ ephemeral: true, content: `You have to wait ${command.cooldown - (interaction.createdTimestamp - cooldownTimestamp)}ms before using this command again` });
            } else {
                cooldownMap.get(interaction.guildId).delete(interaction.user.id);
            }
        }
        try {
            const { options } = interaction;
            await command.execute(client, interaction, options.data);
            if (command.cooldown > 0) {
                if (!cooldownMap.has(interaction.guildId)) {
                    cooldownMap.set(interaction.guildId, new Map<string, number>());
                }
                cooldownMap.get(interaction.guildId).set(interaction.user.id, interaction.createdTimestamp);
            }
        } catch (error) {
            console.log(`[CommandHandler] error: ${error}`);
            interaction.reply({ ephemeral: true, content: 'An error occured while executing this command.' });
        }
    }
}