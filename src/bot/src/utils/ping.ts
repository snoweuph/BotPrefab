import { ButtonInteraction, Client, CommandInteraction, EmbedFieldData, Interaction, Message } from "discord.js";
import EmbdType from "../base/types/embdTypes";
import Embeds from "../base/utils/embds";

async function run(client: Client, interaction: CommandInteraction | ButtonInteraction) {
    const fields: Array<EmbedFieldData> = [
        {
            name: 'Websocket heartbeat',
            value: '`' + client.ws.ping + '`ms.',
        },
        {
            name: 'Roundtrip latency',
            value: '`calculating`',
        },
    ];
    const embed = await Embeds.medium(
        EmbdType.NORMAL,
        'Pong!',
        fields,
        null,
        null,
        true
    );
    interaction.reply({ embeds: [embed], fetchReply: true }).then((result: Message) => {
        var res = result.embeds[0];
        res.fields[1].value =
            '`' + (result.createdTimestamp - interaction.createdTimestamp) + '`ms.';
        interaction.editReply({ embeds: [res] });
    });
}

export { run };