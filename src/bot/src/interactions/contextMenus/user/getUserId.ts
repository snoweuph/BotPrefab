import { UserContextMenuInteraction, CacheType } from 'discord.js';
import { BaseUserContextMenu } from '@base/classes/baseUserContextMenu';
import bot from '@base/types/bot';

export default class GetUserIdUserContextMenu extends BaseUserContextMenu {

	constructor() {
		super(
			'Get User ID',
			3000,
			['ADMINISTRATOR']
		);
	}

	async execute(bot: bot, interaction: UserContextMenuInteraction<CacheType>): Promise<void> {
		interaction.reply({ ephemeral: true, content: `The Id of the User ${interaction.targetUser.username} is ${interaction.targetUser.id}` });
	}

}