import { ButtonInteraction, CacheType, MessageButton, PermissionResolvable } from 'discord.js';
import Bot from '@baseTypes/bot';

export default abstract class BaseButton {
	button: MessageButton;
	id: string;
	cooldown: number;
	permissions: Array<PermissionResolvable>;
	/**
	 * @constructor BaseButton
	 * @param {MessageButton} button The Button itself, it is a new {@link MessageButton}.
	 * @param {number} cooldown The cooldown of the button in milliseconds.
	 * @param {PermissionResolvable} permissions A Array of permissions that are required to use the button.
	 */
	constructor(button: MessageButton, cooldown?: number, permissions?: Array<PermissionResolvable>) {
		this.button = button;
		this.id = button.customId;
		this.cooldown = cooldown || 0;
		this.permissions = permissions || [];
	}
	/**
	 * Please use Async if possible.
	 * @param {Bot} bot The Bot Object itself {@link Bot} that stores a lot of useful information.
	 * @param {ButtonInteraction<CacheType>} interaction The interaction that is being executed.
	 */
	abstract execute(bot: Bot, interaction: ButtonInteraction<CacheType>): Promise<void>;
}