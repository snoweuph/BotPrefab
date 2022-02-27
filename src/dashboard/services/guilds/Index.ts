import axios from "axios";
import { ObjectId } from "mongoose";
import { DISCORD_API_URL } from "../../utils/Constants";
import { PartialGuild } from "../../utils/types";
import User from '../../../base/schemas/User';

export function getBotGuildsService() {
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${process.env.BOT_TOKEN}` }
    })
}

export async function getUserGuildsService(id: ObjectId) {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${user.accesToken}` }
    })
}