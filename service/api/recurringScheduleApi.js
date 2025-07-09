import { RecurringSchedule, RecurringScheduleRequest } from "../models/RecurringSchedule.js";
import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';
import { ensureAuthenticated } from './auth.js';

export async function getRecurringSchedules() {
    const res = await fetch(`${API_BASE_URL}/api/recurring-schedules`);
    if (!res.ok) throw new Error('Erreur lors du chargement des horaires récurrents');
    const data = await res.json();
    return RecurringSchedule.fromApi(data);
}

export async function addRecurringSchedule(schedule) {
    await ensureAuthenticated();

    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour ajouter un horaire récurrent.');
    }
    
    const scheduleRequest = new RecurringScheduleRequest(
        schedule.sport,
        schedule.team,
        schedule.title,
        schedule.description,
        schedule.location,
        schedule.start_time,
        schedule.duration,
        schedule.frequency,
        schedule.end_date,
        schedule.day_of_week
    ).toJSON();
    
    const res = await fetch(`${API_BASE_URL}/api/recurring-schedules`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(scheduleRequest)
    });
    
    if (!res.ok) throw new Error('Erreur lors de l\'ajout de l\'horaire récurrent');
    const data = await res.json();
    return RecurringSchedule.fromApi(data);
}

export async function updateRecurringSchedule(id, schedule) {
    await ensureAuthenticated();

    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour modifier un horaire récurrent.');
    }
    
    const scheduleRequest = new RecurringScheduleRequest(
        schedule.sport,
        schedule.team,
        schedule.title,
        schedule.description,
        schedule.location,
        schedule.start_time,
        schedule.duration,
        schedule.frequency,
        schedule.end_date,
        schedule.day_of_week
    ).toJSON();
    
    const res = await fetch(`${API_BASE_URL}/api/recurring-schedules/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(scheduleRequest)
    });
    
    if (!res.ok) throw new Error('Erreur lors de la modification de l\'horaire récurrent');
    const data = await res.json();
    return RecurringSchedule.fromApi(data);
}

export async function deleteRecurringSchedule(id) {
    await ensureAuthenticated();

    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour supprimer un horaire récurrent.');
    }
    
    const res = await fetch(`${API_BASE_URL}/api/recurring-schedules/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        }
    });
    
    if (!res.ok) throw new Error('Erreur lors de la suppression de l\'horaire récurrent');
    return res.status === 204;
}

export async function getRecurringScheduleById(id) {
    const res = await fetch(`${API_BASE_URL}/api/recurring-schedules/${id}`);
    if (!res.ok) throw new Error('Erreur lors du chargement de l\'horaire récurrent');
    const data = await res.json();
    return RecurringSchedule.fromApi(data);
}

