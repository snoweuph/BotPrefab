import { EmbedFieldData, MessageEmbed } from "discord.js";
import EmbedType from "../types/EmbedTypes";

class Embeds {
    static async short(type: EmbedType, title: string, message: string): Promise<MessageEmbed> {
        return new MessageEmbed()
            .setColor(type)
            .setTitle(title)
            .setDescription(message);
    }
    static async medium(type: EmbedType, title: string, fields: Array<EmbedFieldData>, thumbnail?: string, img?: string, timestamp?: boolean): Promise<MessageEmbed> {
        const Embed = new MessageEmbed()
            .setColor(type)
            .setTitle(title)
            .addFields(fields)
        if (thumbnail) Embed.setThumbnail(thumbnail)
        if (img) Embed.setImage(img)
        if (timestamp) Embed.setTimestamp()
        return Embed;
    }
}

export default Embeds;