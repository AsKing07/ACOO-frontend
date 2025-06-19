import { Palmares, PalmaresRequest } from "../models/Palmares.js";
import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';

export async function getPalmares() {
  const res = await fetch(`${API_BASE_URL}/api/prize-list`);
  if (!res.ok) throw new Error('Erreur lors du chargement des palmarès');
  const data = await res.json();
  return Palmares.fromApi(data);
}

export async function addPalmares(palmares) {
  const palmaresRequest = new PalmaresRequest(
    palmares.athleteName,
    palmares.competition,
    palmares.category,
    palmares.sport,
    palmares.gender,
    palmares.result,
    palmares.year,
    palmares.images
  ).toJSON();
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
      throw new Error('Vous devez être connecté pour ajouter un palmarès');
    }
    const token = tokenData.token; 
    const res = await fetch(`${API_BASE_URL}/api/prize-list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(palmaresRequest)
  });
    if (!res.ok) throw new Error("Erreur lors de l'ajout du palmarès");
  const data = await res.json();
  return Palmares.fromApi(data);
}

export async function updatePalmares(id, palmares) {
  const palmaresRequest = new PalmaresRequest(
    palmares.athleteName,
    palmares.competition,
    palmares.category,
    palmares.sport,
    palmares.gender,
    palmares.result,
    palmares.year,
    palmares.images
  ).toJSON();
  const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
      throw new Error('Vous devez être connecté pour modifier un palmarès');
    }
    const token = tokenData.token;
    const res = await fetch(`${API_BASE_URL}/api/prize-list/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/merge-patch+json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(palmaresRequest)
  });
    if (!res.ok) throw new Error('Erreur lors de la mise à jour du palmarès');
    const data = await res.json();
  return Palmares.fromApi(data);
}

export async function deletePalmares(id) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour supprimer un palmarès');
    }
    const token = tokenData.token;
  const res = await fetch(`${API_BASE_URL}/api/prize-list/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression du palmarès');
  return res.status === 204; // Retourne true si la suppression a réussi
}

export async function getPalmaresById(id) {
  const res = await fetch(`${API_BASE_URL}/api/prize-list/${id}`);
  if (!res.ok) throw new Error('Erreur lors du chargement du palmarès');
  const data = await res.json();
  return Palmares.fromApi(data);
}