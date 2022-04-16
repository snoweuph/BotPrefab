import { Client as DiscordClient, Collection } from 'discord.js';
import BaseCommand from '@classes/baseCommand';
import BaseCommandCategory from '@baseTypes/baseCommandCategory';
import BaseButton from '@classes/baseButton';
import BaseSelectMenu from '@classes/baseSelectMenu';
import { BaseUserContextMenu } from '@classes/baseUserContextMenu';
import { BaseMessageContextMenu } from '@base/classes/baseMessageContextMenu';
import BaseAutocompleteInteraction from '@classes/baseAutocompleteInteraction';
/**
 * The base Bot element that stores all the information about the bot.
 * and all the commands, categories, buttons, etc.
 */
export default class Bot {
	client: DiscordClient<boolean>;
	commands: Collection<string, BaseCommand>;
	commandCategories: Array<BaseCommandCategory>;
	categoryCommandsMap: Map<BaseCommandCategory, Array<BaseCommand>>;
	buttons: Collection<string, BaseButton>;
	selectMenus: Collection<string, BaseSelectMenu>;
	userContextMenus: Collection<string, BaseUserContextMenu>;
	messageContextMenus: Collection<string, BaseMessageContextMenu>;
	autocompleteInteractions: Collection<string, BaseAutocompleteInteraction>;
	constructor(client: DiscordClient<boolean>) {
		this.client = client;
		this.commands = new Collection<string, BaseCommand>();
		this.commandCategories = new Array<BaseCommandCategory>();
		this.categoryCommandsMap = new Map<BaseCommandCategory, Array<BaseCommand>>();
		this.buttons = new Collection<string, BaseButton>();
		this.selectMenus = new Collection<string, BaseSelectMenu>();
		this.userContextMenus = new Collection<string, BaseUserContextMenu>();
		this.messageContextMenus = new Collection<string, BaseMessageContextMenu>();
		this.autocompleteInteractions = new Collection<string, BaseAutocompleteInteraction>();
	}
}