import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import { linksRepository } from '../repositories/linksRepository.js';
dotenv.config();

async function getShortLink(urlInfo) {
    const addView = urlInfo.views + 1;

    try {
        await linksRepository.updateViews(addView, urlInfo.id);
        return urlInfo.url;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function shortLink(userId, url) {
    const shortUrl = nanoid();

    try {
        await linksRepository.postShortLink(url, shortUrl, userId);
        return shortUrl;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function deleteUrl(id) {
    try {
        await linksRepository.deleteLink(id);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const linksService = {
    getShortLink,
    shortLink,
    deleteUrl
}