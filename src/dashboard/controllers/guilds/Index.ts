import { Request, Response } from "express";
import { User } from "../../../base/schemas/User";
import { getMenuGuildsService } from "../../services/guilds/Index";

export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as User;
    try {
        const guilds = await getMenuGuildsService(user.id);
        res.send({
            guilds
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(400).sendStatus(200);
    }

}