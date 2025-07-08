import { ScheduleException, ScheduleExceptionRequest } from "../models/ScheduleException.js";
import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';

export async function getScheduleExceptions() {
    const res = await fetch(`${API_BASE_URL}/api/schedule-exeptions`);
    if (!res.ok) throw new Error('Erreur lors du chargement des exceptions d\'horaires');
    const data = await res.json();
    return ScheduleException.fromApi(data);
}

export async function addScheduleException(exception) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour ajouter une exception d\'horaire.');
    }
    
    const exceptionRequest = new ScheduleExceptionRequest(
        exception.recurring_schedule,
        exception.date,
        exception.startTime,
        exception.endTime,
        exception.location,
        exception.is_cancelled,
        exception.reason
    ).toJSON();
    
    const res = await fetch(`${API_BASE_URL}/api/schedule-exeptions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(exceptionRequest)
    });
    
    if (!res.ok) throw new Error('Erreur lors de l\'ajout de l\'exception d\'horaire');
    const data = await res.json();
    return ScheduleException.fromApi(data);
}

export async function updateScheduleException(id, exception) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour modifier une exception d\'horaire.');
    }
    
    const exceptionRequest = new ScheduleExceptionRequest(
        exception.recurring_schedule,
        exception.date,
        exception.startTime,
        exception.endTime,
        exception.location,
        exception.is_cancelled,
        exception.reason
    ).toJSON();
    
    const res = await fetch(`${API_BASE_URL}/api/schedule-exeptions/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(exceptionRequest)
    });
    
    if (!res.ok) throw new Error('Erreur lors de la modification de l\'exception d\'horaire');
    const data = await res.json();
    return ScheduleException.fromApi(data);
}

export async function deleteScheduleException(id) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour supprimer une exception d\'horaire.');
    }
    
    const res = await fetch(`${API_BASE_URL}/api/schedule-exeptions/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        }
    });
    
    if (!res.ok) throw new Error('Erreur lors de la suppression de l\'exception d\'horaire');
    return res.status === 204;
}

export async function getScheduleExceptionById(id) {
    const res = await fetch(`${API_BASE_URL}/api/schedule-exeptions/${id}`);
    if (!res.ok) throw new Error('Erreur lors du chargement de l\'exception d\'horaire');
    const data = await res.json();
    return ScheduleException.fromApi(data);
}
