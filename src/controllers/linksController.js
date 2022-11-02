import dotenv from 'dotenv';
import { linksService } from '../services/linksService.js';
dotenv.config();

export async function getLink(req, res) {
    const { url } = res.locals;
    res.send({
        id: url.id,
        shortUrl: url.shortUrl,
        url: url.url
    });
}

export async function getShortUrl(req, res) {
    const { linkInfo } = res.locals;
    const { id, views, url} = linkInfo;
    const link = await linksService.getShortLink({id, views, url});

    if (link) {
        return res.redirect(link);
    } else {
        res.sendStatus(500);
    }
}

export async function shortLink(req, res) {
    const { userId } = res.locals;
    const { url } = req.body;

    const shortenedUrl = await linksService.shortLink(userId, url);

    if (shortenedUrl) {
        return res.send({shortenedUrl});
    } else {
        return res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    const { url } = res.locals;
    const { id } = url;
    const deletedUrl =  await linksService.deleteUrl(id);

    if (deletedUrl) {
        return res.sendStatus(204);   
    } else {
        return res.sendStatus(500);
    }
}