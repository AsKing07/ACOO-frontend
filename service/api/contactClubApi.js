import {ContactClub} from '../models/ContactClub.js';

import {API_BASE_URL} from '../config.js';

export async function getContactClub() {
  const response = await fetch(`${API_BASE_URL}/api/contact_clubs`);
  if (!response.ok) throw new Error('Erreur API');
  const data = await response.json();
  console.log('ContactClub data:', data);
  return ContactClub.fromApi(data);
}

export async function updateContactClub(data) {
const token = localStorage.getItem('token');
if (!token)
{
    throw new Error('Vous devez être connecté pour modifier les informations de contact du club.');
}
  const response = await fetch(`${API_BASE_URL}/api/contact_clubs`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Erreur API');
  const updatedData = await response.json();
  return ContactClub.fromApi(updatedData);
}