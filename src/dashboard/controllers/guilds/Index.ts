import { Request, Response } from "express";
import { User } from "../../../base/schemas/User";
import { getBotGuildsService, getUserGuildsService } from "../../services/guilds/Index";

export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as User;
    console.log(user);
    try {
        const { data: botGuilds } = await getBotGuildsService();
        const { data: userGuilds } = await getUserGuildsService(user.id);
        res.send({
            botGuilds,
            userGuilds
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(400).sendStatus(200);
    }

}