import { Client as DiscordClient, Collection } from "discord.js";
import BaseCommand from "../base/classes/BaseCommand";
import BaseButtonInteraction from "../base/classes/BaseButtonInteraction";

export default class Client {
    client: DiscordClient<boolean>;
    commands: Collection<string, BaseCommand>;
    commadCategories: Array<string>;
    buttonInteractions: Collection<string, BaseButtonInteraction>;
    constructor(client: DiscordClient<boolean>, commands: Collection<string, BaseCommand>, commandCategories: Array<string>, buttonInteractions: Collection<string, BaseButtonInteraction>) {
        this.client = client;
        this.commands = commands;
        this.commadCategories = commandCategories;
        this.buttonInteractions = buttonInteractions;
    };
}