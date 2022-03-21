import Bot from '../../base/types/bot';
import BaseEvent from '../../base/classes/baseEvent';
import StateManager from '../../base/StateManager';
import Embds from '../../base/utils/embds';
import EmbdType from '../../base/types/embdTypes';
import Canvas, { CanvasGradient, Image } from 'canvas';
import Path from 'path';
import { ColorResolvable, EmbedFieldData, MessageAttachment } from 'discord.js';

const enableGoodbyeMessageFeatures = new Map<string, boolean>();
const goodbyeMessageChannelIds = new Map<string, string>();
const goodbyeMessageTitles = new Map<string, string>();
const goodbyeMessageBodys = new Map<string, string>();
const goodbyeMessageColors = new Map<string, string>();
const goodbyeMessageImageEnableds = new Map<string, boolean>();
const goodbyeMessageImageUrls = new Map<string, string>();
const goodbyeMessageImageAccentColors = new Map<string, string>();

export default class GoodbyeHandlerEvent extends BaseEvent {
    constructor() {
        super('guildMemberRemove');
    }

    /* eslint-disable-next-line */
    async execute(bot: Bot, ...args: any[]): Promise<void> {
        const guildId = args[0].guild.id;
        if (!enableGoodbyeMessageFeatures.get(guildId) || !goodbyeMessageChannelIds.has(guildId)) return;
        const goodbyeChannel = args[0].guild.channels.cache.get(goodbyeMessageChannelIds.get(guildId));
        if (!goodbyeChannel) return;
        const member = args[0];

        const xSize = 1024;
        const ySize = 380;
        const borderSize = 2;
        const rectPadding = 15;
        const goodbyeTextSize = 50;
        const avatarSize = 250;
        const cnvs = Canvas.createCanvas(xSize, ySize);
        const ctx = cnvs.getContext('2d');

        let attachment: MessageAttachment;
        let attachmentString: string;




        if (goodbyeMessageImageEnableds.get(guildId)) {
            var color: string | CanvasGradient;
            if (goodbyeMessageImageAccentColors.get(guildId) == 'rainbow') {
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
                color = goodbyeMessageImageAccentColors.get(guildId);
            }
            let bg: Image;
            if (goodbyeMessageImageUrls.get(guildId) === 'default') {
                bg = await Canvas.loadImage(Path.resolve(__dirname, '../../assets/img/rainbow.jpg'));
            } else {
                try {
                    bg = await Canvas.loadImage(goodbyeMessageImageUrls.get(guildId));
                } catch (error) {
                    console.log(error);
                    return;
                }
            }
            ctx.drawImage(bg, 0, 0, cnvs.width, cnvs.height);
            ctx.strokeStyle = color;
            ctx.lineWidth = borderSize;
            ctx.strokeRect(rectPadding, rectPadding, xSize - rectPadding * 2, ySize - rectPadding * 2);
            ctx.font = `${goodbyeTextSize}px sans-serif`;
            ctx.fillStyle = color;
            ctx.fillText(`Goodbye on ${member.guild}`, (ySize - avatarSize) + avatarSize, (ySize - avatarSize) / 2 + goodbyeTextSize / 1.5);
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
            attachment = new MessageAttachment(cnvs.toBuffer(), 'goodbye.jpg');
            attachmentString = 'attachment://' + attachment.name;
        }



        const currentGuild = bot.client.guilds.cache.get(guildId);
        const memberCount = currentGuild.memberCount;
        var goodbyeTitle = goodbyeMessageTitles.get(guildId);
        var goodbyeContent = goodbyeMessageBodys.get(guildId);
        /* {user} a ping to the new user
          {server} the name of the server
          {tag} the tag of the new user
          {count} the number of members in the server
        */


        goodbyeTitle = goodbyeTitle.replace('{user}', `<@!${member.id}>`).replace('{server}', currentGuild.name).replace('{tag}', member.user.tag).replace('{count}', memberCount.toString());
        goodbyeContent = goodbyeContent.replace('{user}', `<@!${member.id}>`).replace('{server}', currentGuild.name).replace('{tag}', member.user.tag).replace('{count}', memberCount.toString());

        const fields: Array<EmbedFieldData> = [
            {
                name: goodbyeTitle,
                value: goodbyeContent
            }
        ]

        const embd = await Embds.medium(
            EmbdType.NORMAL,
            `Goodbye!`,
            fields,
            null,
            attachmentString,
            true
        );
        embd.setColor(goodbyeMessageColors.get(guildId) as ColorResolvable);
        if (attachment) {
            goodbyeChannel.send({ embeds: [embd], files: [attachment] });
        } else {
            goodbyeChannel.send({ embeds: [embd] });
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

StateManager.on('enableFeatureGoodbyeMessageFetched', (guildId, enabled) => {
    enableGoodbyeMessageFeatures.set(guildId, enabled);
});
StateManager.on('goodbyeMessageChannelId' + 'Fetched', (guildId: string, goodbyeMessageChannelId: string) => {
    goodbyeMessageChannelIds.set(guildId, goodbyeMessageChannelId);
});
StateManager.on('goodbyeMessageTitle' + 'Fetched', (guildId: string, goodbyeMessageTitle: string) => {
    goodbyeMessageTitles.set(guildId, goodbyeMessageTitle);
});
StateManager.on('goodbyeMessageBody' + 'Fetched', (guildId: string, goodbyeMessageBody: string) => {
    goodbyeMessageBodys.set(guildId, goodbyeMessageBody);
});
StateManager.on('goodbyeMessageColor' + 'Fetched', (guildId: string, goodbyeMessageColor: string) => {
    goodbyeMessageColors.set(guildId, goodbyeMessageColor);
});
StateManager.on('goodbyeMessageImageEnabled' + 'Fetched', (guildId: string, goodbyeMessageImageEnabled: boolean) => {
    goodbyeMessageImageEnableds.set(guildId, goodbyeMessageImageEnabled);
});
StateManager.on('goodbyeMessageImageUrl' + 'Fetched', (guildId: string, goodbyeMessageImageUrl: string) => {
    goodbyeMessageImageUrls.set(guildId, goodbyeMessageImageUrl);
});
StateManager.on('goodbyeMessageImageAccentColor' + 'Fetched', (guildId: string, goodbyeMessageImageAccentColor: string) => {
    goodbyeMessageImageAccentColors.set(guildId, goodbyeMessageImageAccentColor);
});