import { Faq } from "../models/Faq.js";
import {User} from '../models/User.js';
import { API_BASE_URL } from '../config.js';

export async function getFaqs() {
  const res = await fetch(`${API_BASE_URL}/api/questions`);
  if (!res.ok) throw new Error('Erreur lors du chargement des FAQs');
  const data = await res.json();
  return Faq.fromApi(data);
}

export async function addFaq(faq) {
    const user = User.getCurrentUser();
const token = user ? user.token : null;
if (!token)
{
    throw new Error('Vous devez être connecté pour ajouter une FAQ.');
}
  const res = await fetch(`${API_BASE_URL}/api/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'
, 'Authorization': `Bearer ${token}`
     },
    body: JSON.stringify(faq)
  });
  if (!res.ok) throw new Error('Erreur lors de l\'ajout');
  return await res.json();
}

export async function updateFaq(id, faq) {
        const user = User.getCurrentUser();
const token = user ? user.token : null;
if (!token)
{
    throw new Error('Vous devez être connecté pour modifier une FAQ.');
}
  const res = await fetch(`${API_BASE_URL}/api/questions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
     },
    body: JSON.stringify(faq)
  });
  if (!res.ok) throw new Error('Erreur lors de la modification');
  return await res.json();
}

export async function deleteFaq(id) {
        const user = User.getCurrentUser();
const token = user ? user.token : null;
if (!token)
{
    throw new Error('Vous devez être connecté pour supprimer une FAQ.');
}
  const res = await fetch(`${API_BASE_URL}/api/questions/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
     }
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression');
  return await res.json();
}