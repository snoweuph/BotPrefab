import axios from "axios";
import { DISCORD_API_URL } from "../../utils/Constants";

export async function getBotGuildsService() {
    return axios.get(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${process.env.BOT_TOKEN}` }
    })
}