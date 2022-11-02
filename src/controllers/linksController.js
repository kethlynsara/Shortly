import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { linksRepository } from '../repositories/linksRepository.js';
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
    const addView = views + 1;

    try {
        await linksRepository.updateViews(addView, id);
        return res.redirect(url);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}

export async function shortLink(req, res) {
    const { token } = res.locals;
    const { url } = req.body;
    const shortUrl = nanoid();
    const jwtKey = process.env.SECRET_KEY;

    try {
        const { userId } = jwt.verify(token, jwtKey);

        await linksRepository.postShortLink(url, shortUrl, userId);

        res.status(201).send({ shortUrl });
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    const { url } = res.locals;
    const { id } = url;
    
    try {
        await linksRepository.deleteLink(id);
        res.sendStatus(204);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}