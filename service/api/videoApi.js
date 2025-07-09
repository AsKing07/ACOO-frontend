import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';
import { Video } from '../models/video.js';

export async function getVideos() {
    const res = await fetch(`${API_BASE_URL}/api/videos`);
    if (!res.ok) throw new Error('Erreur lors du chargement des vidéos');
    const data = await res.json();
    return Video.fromApi(data);
}

export async function addVideo(video) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    const res = await fetch(`${API_BASE_URL}/api/videos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(video)
    });
    if (!res.ok) throw new Error('Erreur lors de l\'ajout de la vidéo');
    const data = await res.json();
    return new Video(data);
}

export async function updateVideo(id, video) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) throw new Error('Aucun utilisateur connecté');
    const res = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(video)
    });
    if (!res.ok) throw new Error('Erreur lors de la mise à jour de la vidéo');
    const data = await res.json();
    return new Video(data);
}

export async function deleteVideo(id) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) throw new Error('Aucun utilisateur connecté');
    const res = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        }
    });
    if (!res.ok) throw new Error('Erreur lors de la suppression de la vidéo');
    return res.status === 204;
}
