import { Teams, TeamsRequest } from "../models/Teams.js";
import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';
import { ensureAuthenticated } from './auth.js';

export async function getTeams() {
    const res = await fetch(`${API_BASE_URL}/api/teams`);
    if (!res.ok) throw new Error('Erreur lors du chargement des équipes');
    const data = await res.json();
    return Teams.fromApi(data);
}

export async function addTeam(team) {
    await ensureAuthenticated();
    
    const teamRequest = new TeamsRequest(team.sport, team.name, team.role, team.images).toJSON();
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour ajouter une équipe.'); // Correction du message d'erreur
    }
    const res = await fetch(`${API_BASE_URL}/api/teams`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${tokenData.token}` 
        },
        body: JSON.stringify(teamRequest)
    });
    if (!res.ok) throw new Error('Erreur lors de l\'ajout de l\'équipe');
    const data = await res.json();
    return Teams.fromApi(data);
}

export async function updateTeam(id, team) {
    await ensureAuthenticated();
    
    const teamRequest = new TeamsRequest(team.sport, team.name, team.role, team.images).toJSON();
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour modifier cette équipe.'); // Correction du message d'erreur
    }
    const res = await fetch(`${API_BASE_URL}/api/teams/${id}`, {
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/merge-patch+json', 
            'Authorization': `Bearer ${tokenData.token}` 
        },
        body: JSON.stringify(teamRequest)
    });
    if (!res.ok) throw new Error('Erreur lors de la modification de l\'équipe');
    const data = await res.json();
    return Teams.fromApi(data);
}

export async function deleteTeam(id) {
    await ensureAuthenticated();
    
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour supprimer une équipe.');
    }
    const res = await fetch(`${API_BASE_URL}/api/teams/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${tokenData.token}` }
    });
    if (!res.ok) throw new Error('Erreur lors de la suppression');
    return res.status === 204; 
}

export async function getTeamById(id) {
    const res = await fetch(`${API_BASE_URL}/api/teams/${id}`);
    if (!res.ok) throw new Error('Erreur lors du chargement de l\'équipe');
    const data = await res.json();
    return Teams.fromApi(data);
}
