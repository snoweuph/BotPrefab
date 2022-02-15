import { Client as DiscordClient, Collection } from "discord.js";
import BaseCommand from "../base/classes/BaseCommand";
import BaseButtonInteraction from "../base/classes/BaseButtonInteraction";
import BaseCommandCategory from "./BaseCommandCategory";

export default class Client {
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
    };
}