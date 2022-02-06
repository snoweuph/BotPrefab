import { Client as DiscordClient, Collection } from "discord.js";
import BaseCommand from "../base/classes/BaseCommand";
export default class Client {
    client: DiscordClient<boolean>;
    commands: Collection<string, BaseCommand>;
    commadCategories: Array<string>;
    constructor(client: DiscordClient<boolean>, commands: Collection<string, BaseCommand>, commandCategories: Array<string>) {
        this.client = client;
        this.commands = commands;
        this.commadCategories = commandCategories;
    };
}