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

export async function getMenuGuildsService(id: ObjectId) {
    const { data: botGuilds } = await getBotGuildsService();
    const { data: userGuilds } = await getUserGuildsService(id);

    const adminUserGuilds = userGuilds.filter(({ permissions }) => ((parseInt(permissions) & 0x8) === 0x8));
    return adminUserGuilds.filter((botGuild) => botGuilds.some((botGuild) => botGuild.id === botGuild.id));
}