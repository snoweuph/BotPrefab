import Bot from '../../base/types/bot';
import BaseEvent from '../../base/classes/baseEvent';
import StateManager from '../../base/stateManager';
import { Connection } from 'mysql2/promise';
import loadFromDatabase from '../../base/utils/loadFromDatabase';

export default class LoadGuildsEvent extends BaseEvent {
    connection: Connection;
    constructor() {
        super('ready');
        this.connection = StateManager.connection;
    }
    async execute(bot: Bot, ...args: any[]): Promise<void> {
        //settings to enable/disable specific commands
        loadFromDatabase(bot, 'enableCommandHelp');
        loadFromDatabase(bot, 'enableCommandPing');
        //settings to enable/disable features
        loadFromDatabase(bot, 'enableFeatureWelcomeMessage');
        loadFromDatabase(bot, 'enableFeatureGoodbyeMessage');
        //configuration for channels
        loadFromDatabase(bot, 'welcomeMessageChannelId');
        loadFromDatabase(bot, 'goodbyeMessageChannelId');


        //welcome message
        loadFromDatabase(bot, 'welcomeMessageTitle');
        loadFromDatabase(bot, 'welcomeMessageBody');
        loadFromDatabase(bot, 'welcomeMessageColor');
        loadFromDatabase(bot, 'welcomeMessageImageEnabled');
        loadFromDatabase(bot, 'welcomeMessageImageUrl');
        loadFromDatabase(bot, 'welcomeMessageImageAccentColor');

        //goodbye message
        loadFromDatabase(bot, 'goodbyeMessageTitle');
        loadFromDatabase(bot, 'goodbyeMessageBody');
        loadFromDatabase(bot, 'goodbyeMessageColor');
        loadFromDatabase(bot, 'goodbyeMessageImageEnabled');
        loadFromDatabase(bot, 'goodbyeMessageImageUrl');
        loadFromDatabase(bot, 'goodbyeMessageImageAccentColor');


    }
}