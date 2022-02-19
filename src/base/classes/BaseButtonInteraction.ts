import { ButtonInteraction, CacheType } from "discord.js";
import Client from "../types/Client";

export default abstract class BaseButtonInteraction {
    id: string;
    constructor(id: string) {
        this.id = id;
    }
    abstract execute(client: Client, interaction: ButtonInteraction<CacheType>): Promise<void>;
}