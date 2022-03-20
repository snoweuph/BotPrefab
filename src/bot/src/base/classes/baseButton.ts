import { ButtonInteraction, CacheType, MessageButton, PermissionResolvable } from 'discord.js';
import Bot from '../types/bot';

export default abstract class BaseButton {
	button: MessageButton;
	id: string;
	cooldown: number;
	permissions: Array<PermissionResolvable>;

	constructor(button: MessageButton, cooldown?: number, permissions?: Array<PermissionResolvable>) {
		this.button = button;
		this.id = button.customId;
		this.cooldown = cooldown || 0;
		this.permissions = permissions || [];
	}

	abstract execute(bot: Bot, interaction: ButtonInteraction<CacheType>): Promise<void>;
}