import Bot from '@base/types/bot';
import BaseEvent from '@base/classes/baseEvent';
import StateManager from '@base/StateManager';
import Embds from '@base/utils/embds';
import EmbdTypes from '@base/types/embdTypes';
import Canvas, { CanvasGradient, Image } from 'canvas';
import Path from 'path';
import { ColorResolvable, EmbedFieldData, MessageAttachment } from 'discord.js';

const enableWelcomeMessageFeatures = new Map<string, boolean>();
const welcomeMessageChannelIds = new Map<string, string>();
const welcomeMessageTitles = new Map<string, string>();
const welcomeMessageBodys = new Map<string, string>();
const welcomeMessageColors = new Map<string, string>();
const welcomeMessageImageEnableds = new Map<string, boolean>();
const welcomeMessageImageUrls = new Map<string, string>();
const welcomeMessageImageAccentColors = new Map<string, string>();

export default class WelcomeHandlerEvent extends BaseEvent {
	constructor() {
		super('guildMemberAdd');
	}

	/* eslint-disable-next-line */
	async execute(bot: Bot, ...args: any[]): Promise<void> {
		const guildId = args[0].guild.id;
		if (!enableWelcomeMessageFeatures.get(guildId) || !welcomeMessageChannelIds.has(guildId)) return;
		const welcomeChannel = args[0].guild.channels.cache.get(welcomeMessageChannelIds.get(guildId));
		if (!welcomeChannel) return;
		const member = args[0];

		const xSize = 1024;
		const ySize = 380;
		const borderSize = 2;
		const rectPadding = 15;
		const welcomeTextSize = 50;
		const avatarSize = 250;
		const cnvs = Canvas.createCanvas(xSize, ySize);
		const ctx = cnvs.getContext('2d');

		let attachment: MessageAttachment;
		let attachmentString: string;




		if (welcomeMessageImageEnableds.get(guildId)) {
			let color: string | CanvasGradient;
			if (welcomeMessageImageAccentColors.get(guildId) == 'rainbow') {
				color = ctx.createLinearGradient(0, 0, xSize, ySize);
				color.addColorStop(0, '#ff0000');
				color.addColorStop(0.1, '#ff8800');
				color.addColorStop(0.2, '#ffe100');
				color.addColorStop(0.3, '#99ff00');
				color.addColorStop(0.4, '#04ff00');
				color.addColorStop(0.5, '#00ffa6');
				color.addColorStop(0.6, '#00aaff');
				color.addColorStop(0.7, '#000dff');
				color.addColorStop(0.8, '#9000ff');
				color.addColorStop(0.9, '#ff00d9');
				color.addColorStop(1, '#ff0000');
			} else {
				color = welcomeMessageImageAccentColors.get(guildId);
			}
			let bg: Image;
			if (welcomeMessageImageUrls.get(guildId) === 'default') {
				bg = await Canvas.loadImage(Path.resolve(__dirname, '../../assets/img/rainbow.jpg'));
			} else {
				try {
					bg = await Canvas.loadImage(welcomeMessageImageUrls.get(guildId));
				} catch (error) {
					console.log(error);
					return;
				}
			}
			ctx.drawImage(bg, 0, 0, cnvs.width, cnvs.height);
			ctx.strokeStyle = color;
			ctx.lineWidth = borderSize;
			ctx.strokeRect(rectPadding, rectPadding, xSize - rectPadding * 2, ySize - rectPadding * 2);
			ctx.font = `${welcomeTextSize}px sans-serif`;
			ctx.fillStyle = color;
			ctx.fillText(`Welcome on ${member.guild}`, (ySize - avatarSize) + avatarSize, (ySize - avatarSize) / 2 + welcomeTextSize / 1.5);
			ctx.font = formatText(cnvs, (ySize - avatarSize) * 1.5 + avatarSize, `${member.displayName}`);
			ctx.fillStyle = color;
			ctx.fillText(`${member.displayName}`, (ySize - avatarSize) + avatarSize, cnvs.height / 1.4);
			ctx.lineWidth = borderSize * 2;
			ctx.beginPath();
			ctx.arc(ySize / 2, ySize / 2, (avatarSize / 2), 0, Math.PI * 2, true);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(ySize / 2, ySize / 2, (avatarSize - borderSize) / 2, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.clip();
			const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 }));
			ctx.drawImage(avatar, (ySize - avatarSize) / 2, ySize / 2 - avatarSize / 2, avatarSize, avatarSize);
			attachment = new MessageAttachment(cnvs.toBuffer(), 'welcome.jpg');
			attachmentString = 'attachment://' + attachment.name;
		}



		const currentGuild = bot.client.guilds.cache.get(guildId);
		const memberCount = currentGuild.memberCount;
		let welcomeTitle = welcomeMessageTitles.get(guildId);
		let welcomeContent = welcomeMessageBodys.get(guildId);
		/* {user} a ping to the new user
		  {server} the name of the server
		  {tag} the tag of the new user
		  {count} the number of members in the server
		*/


		welcomeTitle = welcomeTitle.replace('{user}', `<@!${member.id}>`).replace('{server}', currentGuild.name).replace('{tag}', member.user.tag).replace('{count}', memberCount.toString());
		welcomeContent = welcomeContent.replace('{user}', `<@!${member.id}>`).replace('{server}', currentGuild.name).replace('{tag}', member.user.tag).replace('{count}', memberCount.toString());

		const fields: Array<EmbedFieldData> = [
			{
				name: welcomeTitle,
				value: welcomeContent
			}
		]

		const embd = await Embds.medium(
			EmbdTypes.NORMAL,
			`Welcome on ${currentGuild.name}!`,
			fields,
			null,
			attachmentString,
			true
		);
		embd.setColor(welcomeMessageColors.get(guildId) as ColorResolvable);
		if (attachment) {
			welcomeChannel.send({ embeds: [embd], files: [attachment] });
		} else {
			welcomeChannel.send({ embeds: [embd] });
		}

	}
}

const formatText = (cnvs: Canvas.Canvas, dist: number, text: string) => {
	const ctx = cnvs.getContext('2d');
	let fontSize = 150;
	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > cnvs.width - dist);
	return ctx.font;
};

StateManager.on('enableFeatureWelcomeMessageFetched', (guildId, enabled) => {
	enableWelcomeMessageFeatures.set(guildId, enabled);
});
StateManager.on('welcomeMessageChannelId' + 'Fetched', (guildId: string, welcomeMessageChannelId: string) => {
	welcomeMessageChannelIds.set(guildId, welcomeMessageChannelId);
});
StateManager.on('welcomeMessageTitle' + 'Fetched', (guildId: string, welcomeMessageTitle: string) => {
	welcomeMessageTitles.set(guildId, welcomeMessageTitle);
});
StateManager.on('welcomeMessageBody' + 'Fetched', (guildId: string, welcomeMessageBody: string) => {
	welcomeMessageBodys.set(guildId, welcomeMessageBody);
});
StateManager.on('welcomeMessageColor' + 'Fetched', (guildId: string, welcomeMessageColor: string) => {
	welcomeMessageColors.set(guildId, welcomeMessageColor);
});
StateManager.on('welcomeMessageImageEnabled' + 'Fetched', (guildId: string, welcomeMessageImageEnabled: boolean) => {
	welcomeMessageImageEnableds.set(guildId, welcomeMessageImageEnabled);
});
StateManager.on('welcomeMessageImageUrl' + 'Fetched', (guildId: string, welcomeMessageImageUrl: string) => {
	welcomeMessageImageUrls.set(guildId, welcomeMessageImageUrl);
});
StateManager.on('welcomeMessageImageAccentColor' + 'Fetched', (guildId: string, welcomeMessageImageAccentColor: string) => {
	welcomeMessageImageAccentColors.set(guildId, welcomeMessageImageAccentColor);
});