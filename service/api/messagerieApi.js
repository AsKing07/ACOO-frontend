import { Messagerie, MessagerieRequest } from "../models/Messagerie.js";
import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';
import { ensureAuthenticated } from './auth.js';

export async function getMessagerie() {
    await ensureAuthenticated();
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour voir les messages.');
    }
    
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
        headers: {
            'Authorization': `Bearer ${tokenData.token}`
        }
    });
    if (!res.ok) throw new Error('Erreur lors du chargement des messages');
    const data = await res.json();
    return Messagerie.fromApi(data);
}

export async function addMessagerie(messagerie) {
    const messagerieRequest = new MessagerieRequest(messagerie.name, messagerie.mail, messagerie.subject, messagerie.description).toJSON();

    const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messagerieRequest)
    });
    if (!res.ok) throw new Error('Erreur lors de l\'envoi du message');
    const data = await res.json();
    return Messagerie.fromApi(data);
}

export async function getMessagerieById(id) {
    await ensureAuthenticated();
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour voir les détails du message.');
    }
    const res = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
        headers: {
            'Authorization': `Bearer ${tokenData.token}`
        }
    });
    if (!res.ok) throw new Error('Erreur lors du chargement du message');
    const data = await res.json();
}

export async function deleteMessagerie(id) {
    await ensureAuthenticated();
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour supprimer un message.');
    }
    const res = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        }
    });
    if (!res.ok) throw new Error('Erreur lors de la suppression du message');
    return res.status === 204;
}