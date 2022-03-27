import { ButtonInteraction, CacheType, MessageButton } from 'discord.js';
import BaseButton from '@base/classes/baseButton';
import Bot from '@base/types/bot';

export default class HelloWorldButton extends BaseButton {
	constructor() {
		super(
			new MessageButton()
				.setCustomId('hello-world')
				.setLabel('Get a Hello World!')
				.setStyle('PRIMARY'),
			3 * 1000
		);
	}

	async execute(bot: Bot, interaction: ButtonInteraction<CacheType>): Promise<void> {
		interaction.reply('Hello World!');
	}

}