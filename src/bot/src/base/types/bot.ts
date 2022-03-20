import { Client as DiscordClient, Collection } from 'discord.js';
import BaseCommand from '../classes/baseCommand';
import BaseCommandCategory from './baseCommandCategory';
import BaseButton from '../classes/baseButton';
import BaseSelectMenu from '../classes/baseSelectMenu';
import BaseAutocompleteInteraction from '../classes/baseAutocompleteInteraction';

export default class Bot {
	client: DiscordClient<boolean>;
	commands: Collection<string, BaseCommand>;
	commandCategories: Array<BaseCommandCategory>;
	categoryCommandsMap: Map<BaseCommandCategory, Array<BaseCommand>>;
	buttons: Collection<string, BaseButton>;
	selectMenus: Collection<string, BaseSelectMenu>;
	autocompleteInteractions: Collection<string, BaseAutocompleteInteraction>;
	constructor(client: DiscordClient<boolean>) {
		this.client = client;
		this.commands = new Collection<string, BaseCommand>();
		this.commandCategories = new Array<BaseCommandCategory>();
		this.categoryCommandsMap = new Map<BaseCommandCategory, Array<BaseCommand>>();
		this.buttons = new Collection<string, BaseButton>();
		this.selectMenus = new Collection<string, BaseSelectMenu>();
		this.autocompleteInteractions = new Collection<string, BaseAutocompleteInteraction>();
	}
}