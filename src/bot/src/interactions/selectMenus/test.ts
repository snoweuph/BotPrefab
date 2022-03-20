import { SelectMenuInteraction, CacheType, MessageSelectMenu } from "discord.js";
import BaseSelectMenu from "../../base/classes/baseSelectMenu";
import bot from "../../base/types/bot";

export default class TestSelectMenu extends BaseSelectMenu {

    constructor() {
        super(
            new MessageSelectMenu()
                .setCustomId('testselectmenu')
                .setPlaceholder('Select something')
                .addOptions([
                    {
                        label: 'Option 1',
                        description: 'This is the first option',
                        value: 'option1',
                    },
                    {
                        label: 'Option 2',
                        description: 'This is the second option',
                        value: 'option2',
                    },
                    {
                        label: 'Option 3',
                        description: 'This is the third option',
                        value: 'option3',
                    }
                ])
                .setMaxValues(3),
        )
    }

    async execute(bot: bot, interaction: SelectMenuInteraction<CacheType>, values: string[]): Promise<void> {
        console.log(values);
        interaction.deferUpdate();
    }
}