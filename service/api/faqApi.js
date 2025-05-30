import { Faq } from "../models/Faq.js";
import { FaqRequest } from "../models/Faq.js";
import {User} from '../models/User.js';
import { API_BASE_URL } from '../config.js';

export async function getFaqs() {
  const res = await fetch(`${API_BASE_URL}/api/questions`);
  if (!res.ok) throw new Error('Erreur lors du chargement des FAQs');
  const data = await res.json();
  return Faq.fromApi(data);
}

export async function addFaq(faq) {

  const faqRequest = new FaqRequest(faq.question, faq.answer, faq.category).toJSON();

    const user = User.getCurrentUser();
const tokenData = user ? user.tokenData : null;
if (!tokenData)
{
    throw new Error('Vous devez être connecté pour ajouter une FAQ.');
}
  const res = await fetch(`${API_BASE_URL}/api/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'
, 'Authorization': `Bearer ${tokenData.token}`
     },
    body: JSON.stringify(faqRequest)
  });
  if (!res.ok) throw new Error('Erreur lors de l\'ajout');
 const data =await res.json();
 return Faq.fromApi(data);
}

export async function updateFaq(id, faq) {
    const faqRequest = new FaqRequest(faq.question, faq.answer, faq.category).toJSON();

        const user = User.getCurrentUser();
const tokenData = user ? user.tokenData : null;
if (!tokenData)
{
    throw new Error('Vous devez être connecté pour modifier une FAQ.');
}
  const res = await fetch(`${API_BASE_URL}/api/questions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/merge-patch+json',
    'Authorization': `Bearer ${tokenData.token}`
     },
    body: JSON.stringify(faqRequest)
  });
  if (!res.ok) throw new Error('Erreur lors de la modification');
  return await res.json();
}

export async function deleteFaq(id) {
        const user = User.getCurrentUser();
const tokenData = user ? user.tokenData : null;
if (!tokenData)
{
    throw new Error('Vous devez être connecté pour supprimer une FAQ.');
}
  const res = await fetch(`${API_BASE_URL}/api/questions/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokenData.token}`
     }
  });
  if (!res.status === 204) throw new Error('Erreur lors de la suppression');
  return res.status === 204; 
}