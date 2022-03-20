import { MessageContextMenuInteraction, CacheType } from 'discord.js';
import { BaseMessageContextMenu } from '../../../base/classes/baseMessageContextMenu ';
import bot from '../../../base/types/bot';

export default class GetUserIdUserContextMenu extends BaseMessageContextMenu {

	constructor() {
		super(
			'Get Message ID',
			3000,
			['ADMINISTRATOR']
		);
	}

	async execute(bot: bot, interaction: MessageContextMenuInteraction<CacheType>): Promise<void> {
		interaction.reply({ ephemeral: true, content: `The Id of the message is${interaction.targetMessage.id}` });
	}

}