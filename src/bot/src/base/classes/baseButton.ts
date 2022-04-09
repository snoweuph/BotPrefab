import { ButtonInteraction, CacheType, MessageButton, PermissionResolvable } from 'discord.js';
import Bot from '@baseTypes/bot';

export default abstract class BaseButton {
	button: MessageButton;
	id: string;
	cooldown: number;
	permissions: PermissionResolvable[];
	/**
	 * @param button - The Button itself, it's a new {@link MessageButton}.
	 * @param cooldown - The Cooldown of the Button in Milliseconds.
	 * @param permissions - A Array of Permissions that are required to use the button.
	 */
	constructor(button: MessageButton, cooldown?: number, permissions?: Array<PermissionResolvable>) {
		this.button = button;
		this.id = button.customId;
		this.cooldown = cooldown || 0;
		this.permissions = permissions || [];
	}
	/**
	 * This Function will be called when the Button is pressed.
	 * @remarks Please use Async if possible.
	 * @param bot - The Bot Object itself {@link Bot} that stores a lot of useful information.
	 * @param interaction - The interaction that is being executed.
	 */
	abstract execute(bot: Bot, interaction: ButtonInteraction<CacheType>): Promise<void>;
}