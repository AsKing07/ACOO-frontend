import { News, NewsRequest } from "../models/News.js";
import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';

export async function getNews() {
    const res = await fetch(`${API_BASE_URL}/api/news`);
    if (!res.ok) throw new Error('Erreur lors du chargement des actualités');
    const data = await res.json();
    return News.fromApi(data);
}

export async function getNewsById(id) {
    const res = await fetch(`${API_BASE_URL}/api/news/${id}`);
    if (!res.ok) throw new Error('Erreur lors du chargement de l\'actualité');
    const data = await res.json();
    return News.fromApi(data);
}

export async function addNews(news) {
    console.log(`dans addNews, news: ${JSON.stringify(news)}`);
      const user = User.getCurrentUser();
    const newsRequest = new NewsRequest(news.title, news.description, news.images, user.id,).toJSON();
  
    const tokenData = user ? user.tokenData : null;
    const res = await fetch(`${API_BASE_URL}/api/news`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(newsRequest)
    });
    if (!res.ok) throw new Error('Erreur lors de l\'ajout de l\'actualité');
    const data = await res.json();
    return News.fromApi(data);
}

export async function updateNews(id, news) {
        const user = User.getCurrentUser();

    const newsRequest = new NewsRequest(news.title, news.description, news.images, user.id).toJSON();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Aucun utilisateur connecté');
    }
    const res = await fetch(`${API_BASE_URL}/api/news/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(newsRequest)
    });
    if (!res.ok) throw new Error('Erreur lors de la mise à jour de l\'actualité');
    return await res.json();
}
export async function deleteNews(id) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Aucun utilisateur connecté');
    }
    const res = await fetch(`${API_BASE_URL}/api/news/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        }
    });
    if (!res.ok) throw new Error('Erreur lors de la suppression de l\'actualité');
    return await res.status === 204; 
}