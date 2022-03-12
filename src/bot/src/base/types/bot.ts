import { Client as DiscordClient, Collection } from 'discord.js';
import BaseCommand from '../classes/baseCommand';
import BaseCommandCategory from './baseCommandCategory';
import BaseButtonInteraction from '../classes/baseButtonInteraction';

export default class Bot {
	client: DiscordClient<boolean>;
	commands: Collection<string, BaseCommand>;
	commandCategories: Array<BaseCommandCategory>;
	CategoryCommandsMap: Map<BaseCommandCategory, Array<BaseCommand>>;
	buttonInteractions: Collection<string, BaseButtonInteraction>;
	constructor(client: DiscordClient<boolean>) {
		this.client = client;
		this.commands = new Collection<string, BaseCommand>();
		this.commandCategories = new Array<BaseCommandCategory>();
		this.CategoryCommandsMap = new Map<BaseCommandCategory, Array<BaseCommand>>();
		this.buttonInteractions = new Collection<string, BaseButtonInteraction>();
	}
}