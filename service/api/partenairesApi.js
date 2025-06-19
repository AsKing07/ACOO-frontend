import { Partenaire,PartnerRequest } from '../models/Partenaires.js';
import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';

export async function getPartenaires() {
    const res = await fetch(`${API_BASE_URL}/api/partners`);
    if (!res.ok) throw new Error('Erreur lors du chargement des partenaires');
    const data = await res.json();
    return Partenaire.fromApi(data);
}

export async function addPartenaire(partenaire) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;

    if (!tokenData) {
        throw new Error('Vous devez être connecté pour ajouter un partenaire.');
    }
    const partenaireRequest = new PartnerRequest(partenaire.name, partenaire.description, partenaire.url, partenaire.sponsor, partenaire.image).toJson();
    const res = await fetch(`${API_BASE_URL}/api/partners`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            , 'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(partenaireRequest)
    });
    if (!res.ok) throw new Error('Erreur lors de l\'ajout du partenaire');
    const data = await res.json();
    return Partenaire.fromApi(data);
}

export async function updatePartenaire(id, partenaire) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
if (!tokenData) {
    throw new Error('Vous devez être connecté pour modifier un partenaire.');
}
    const partenaireRequest = new PartnerRequest(partenaire.name, partenaire.description, partenaire.url, partenaire.sponsor, partenaire.image).toJson();
    const res = await fetch(`${API_BASE_URL}/api/partners/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(partenaireRequest)
    });
    if (!res.ok) throw new Error('Erreur lors de la mise à jour du partenaire');
    return await res.json();
}
export async function deletePartenaire(id) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
if (!tokenData)
{
    throw new Error('Vous devez être connecté pour supprimer un partenaire.');
}
    const res = await fetch(`${API_BASE_URL}/api/partners/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        }
    });
    if (!res.ok) throw new Error('Erreur lors de la suppression du partenaire');
    return  res.status === 204; // Return true if deletion was successful
}



