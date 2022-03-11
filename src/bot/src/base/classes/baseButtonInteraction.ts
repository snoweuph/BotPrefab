import { ButtonInteraction, CacheType } from 'discord.js';
import Bot from '../types/bot';

export default abstract class BaseButtonInteraction {
	id: string;
	constructor(id: string) {
		this.id = id;
	}
	abstract execute(bot: Bot, interaction: ButtonInteraction<CacheType>): Promise<void>;
}