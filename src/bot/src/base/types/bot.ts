import { Client as DiscordClient, Collection } from 'discord.js';
import CommandClass from '../classes/baseCommand';
import ButtonInteractionClass from '../classes/baseButtonInteraction';

export default class Bot {
	client: DiscordClient<boolean>;
	commands: Collection<string, CommandClass>;
	commadCategories: Array<string>;
	buttonInteractions: Collection<string, ButtonInteractionClass>;
	constructor(client: DiscordClient<boolean>, commands: Collection<string, CommandClass>, commandCategories: Array<string>, buttonInteractions: Collection<string, ButtonInteractionClass>) {
		this.client = client;
		this.commands = commands;
		this.commadCategories = commandCategories;
		this.buttonInteractions = buttonInteractions;
	}
}