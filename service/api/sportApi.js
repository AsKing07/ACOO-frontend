import { Sport, SportRequest } from "../models/Sport.js";
import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';
import { ensureAuthenticated } from './auth.js';

export async function getSports() {
    const res = await fetch(`${API_BASE_URL}/api/sports`);
    if (!res.ok) throw new Error('Erreur lors du chargement des sports');
    const data = await res.json();
    return Sport.fromApi(data);
}

export async function addSport(sport) {
    await ensureAuthenticated();

    const sportRequest = new SportRequest(sport.name, sport.description, sport.contact, sport.image).toJson();
  
    const user = User.getCurrentUser();
const tokenData = user ? user.tokenData : null;
if (!tokenData)
{
    throw new Error('Vous devez être connecté pour ajouter un sport.');
}
  
    const res = await fetch(`${API_BASE_URL}/api/sports`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(sportRequest)
    });
    if (!res.ok) throw new Error('Erreur lors de l\'ajout du sport');
    const data = await res.json();
    return Sport.fromApi(data);
}

export async function updateSport(id, sport) {
    await ensureAuthenticated();

    const sportRequest = new SportRequest(sport.name, sport.description, sport.contact, sport.image).toJson();
    
      const user = User.getCurrentUser();
const tokenData = user ? user.tokenData : null;
if (!tokenData)
{
    throw new Error('Vous devez être connecté pour modifier un sport.');
}
    const res = await fetch(`${API_BASE_URL}/api/sports/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(sportRequest)
    });
    if (!res.ok) throw new Error('Erreur lors de la mise à jour du sport');
    return await res.json();
}

export async function deleteSport(id) {
    await ensureAuthenticated();

    const user = User.getCurrentUser();
    
const tokenData = user ? user.tokenData : null;
if (!tokenData)
{
    throw new Error('Vous devez être connecté pour supprimer un sport.');
}
    const res = await fetch(`${API_BASE_URL}/api/sports/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${tokenData.token}`
        }
    });
    if (!res.ok) throw new Error('Erreur lors de la suppression du sport');
    return await res.status === 204; // Retourne true si la suppression a réussi
}
