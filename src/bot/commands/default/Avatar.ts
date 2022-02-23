import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption, EmbedFieldData } from 'discord.js';
import BaseCommand from '../../base/classes/BaseCommand';
import Client from '../../base/types/Client';
import EmbedType from '../../base/types/EmbedTypes';
import Embeds from '../../utils/Embeds';

export default class AvatarCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('avatar')
                .setDescription('description')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('the user to get the avatar of')
                        .setRequired(false)
                )
        );
    }

    async execute(client: Client, interaction: CommandInteraction<CacheType>, options: Readonly<CommandInteractionOption<CacheType>[]>): Promise<void> {
        const user = options[0] ? options[0].user : interaction.member.user;
        const params = '?size=1024';
        const baseURL = 'https://cdn.discordapp.com/avatars/';
        const fields: Array<EmbedFieldData> = [
            {
                name: '**Link as**',
                value: `[png](${baseURL}${user.id}/${user.avatar}.png${params}) | [jpg](${baseURL}${user.id}/${user.avatar}.jpg${params}) | [webp](${baseURL}${user.id}/${user.avatar}.webp${params})`,
            }
        ]
        const embed = await Embeds.medium(
            EmbedType.NORMAL,
            `Avatar of ${user.username}${user.discriminator}`,
            fields,
            `${baseURL}${user.id}/${user.avatar}.png${params}`
        )
        interaction.reply({ embeds: [embed] });
    }
}