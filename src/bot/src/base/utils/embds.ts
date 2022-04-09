import { EmbedFieldData, MessageEmbed } from 'discord.js';
import EmbdTypes from '@baseTypes/embdTypes';

class Embds {
	/**
	 * This will build a basic short embed.
	 * @param type - a enum of the {@link EmbdTypes | embed types} that are used to get a equal color pallet with embeds. 
	 * @param title - the title of the embed.
	 * @param message - the message of the embed.
	 * @returns A Basic {@link MessageEmbed}.
	 */
	static async short(type: EmbdTypes, title: string, message: string): Promise<MessageEmbed> {
		return new MessageEmbed()
			.setColor(type)
			.setTitle(title)
			.setDescription(message);
	}
	/**
	 * This will build a medium sized embed with the exact same structure as the {@link short short embed.}.
	 * @param type - a enum of the {@link EmbdTypes | embed types} that are used to get a equal color pallet with embeds. 
	 * @param title - the title of the embed.
	 * @param fields - an array of {@link EmbedFieldData | embed fields} that will be added to the embed.
	 * @param thumbnail - the thumbnail of the embed.
	 * @param img - the image of the embed.
	 * @param timestamp - whether or not the embed should have a timestamp.
	 * @returns A Basic Medium sized {@link MessageEmbed}.
	 */
	static async medium(type: EmbdTypes, title: string, fields: Array<EmbedFieldData>, thumbnail?: string, img?: string, timestamp?: boolean): Promise<MessageEmbed> {
		const Embed = new MessageEmbed()
			.setColor(type)
			.setTitle(title)
			.addFields(fields);
		if (thumbnail) Embed.setThumbnail(thumbnail);
		if (img) Embed.setImage(img);
		if (timestamp) Embed.setTimestamp();
		return Embed;
	}
}

export default Embds;