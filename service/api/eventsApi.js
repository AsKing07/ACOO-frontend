import { Event, EventRequest } from "../models/Events.js";
import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';
import { ensureAuthenticated } from './auth.js';

export async function getEvents() {
    const res = await fetch(`${API_BASE_URL}/api/events`);
    if (!res.ok) throw new Error('Erreur lors du chargement des événements');
    const data = await res.json();
    return Event.fromApi(data);
}

export async function addEvent(event) {
    await ensureAuthenticated();
    
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour ajouter un événement.');
    }
    
    const eventRequest = new EventRequest(
        event.title,
        event.content,
        event.eventType,
        event.location,
        event.isCancelled,
        event.startDatetime,
        event.endDatetime,
        event.sport,
        event.teams,
        event.images
    ).toJSON();
    
    const res = await fetch(`${API_BASE_URL}/api/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(eventRequest)
    });
    
    if (!res.ok) throw new Error('Erreur lors de l\'ajout de l\'événement');
    const data = await res.json();
    return Event.fromApi(data);
}

export async function updateEvent(id, event) {
    await ensureAuthenticated();
    
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour modifier un événement.');
    }
    
    const eventRequest = new EventRequest(
        event.title,
        event.content,
        event.eventType,
        event.location,
        event.isCancelled,
        event.startDatetime,
        event.endDatetime,
        event.sport,
        event.teams,
        event.images
    ).toJSON();
    
    const res = await fetch(`${API_BASE_URL}/api/events/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(eventRequest)
    });
    
    if (!res.ok) throw new Error('Erreur lors de la modification de l\'événement');
    const data = await res.json();
    return Event.fromApi(data);
}

export async function deleteEvent(id) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour supprimer un événement.');
    }
    
    const res = await fetch(`${API_BASE_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        }
    });
    
    if (!res.ok) throw new Error('Erreur lors de la suppression de l\'événement');
    return res.status === 204;
}

export async function getEventById(id) {
    const res = await fetch(`${API_BASE_URL}/api/events/${id}`);
    if (!res.ok) throw new Error('Erreur lors du chargement de l\'événement');
    const data = await res.json();
    return Event.fromApi(data);
}
