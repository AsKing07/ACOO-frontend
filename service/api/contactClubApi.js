import {ContactClub, ContactClubRequest} from '../models/ContactClub.js';
import {User} from '../models/User.js';
import {API_BASE_URL} from '../config.js';

export async function getContactClub() {
  const response = await fetch(`${API_BASE_URL}/api/contact_clubs`);
  if (!response.ok) throw new Error('Erreur API');
  const data = await response.json();
  console.log('ContactClub data:', data);
  return ContactClub.fromApi(data);
}

export async function addContactClub(contactClub) {
  const contactClubRequest = new ContactClubRequest(
    contactClub.phoneNumber,
    contactClub.mail, 
    contactClub.address
  );
  
  const user = User.getCurrentUser();
  const tokenData = user ? user.tokenData : null;
  if (!tokenData) {
    throw new Error('Vous devez être connecté pour ajouter un contact club.');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/contact_clubs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenData.token}`
    },
    body: JSON.stringify(contactClubRequest.toJSON())
  });
  
  if (!response.ok) throw new Error('Erreur lors de l\'ajout');
  const data = await response.json();
  return ContactClub.fromApi(data);
}

export async function updateContactClub(id, data) {
  const user = User.getCurrentUser();
  const tokenData = user ? user.tokenData : null; // Correction: cohérence avec les autres
  if (!tokenData) {
    throw new Error('Vous devez être connecté pour modifier les informations de contact du club.');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/contact_clubs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenData.token}` // Correction: cohérence avec les autres
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) throw new Error('Erreur API');
  const updatedData = await response.json();
  return ContactClub.fromApi(updatedData);
}

export async function deleteContactClub(id) {
  const user = User.getCurrentUser();
  const tokenData = user ? user.tokenData : null;
  if (!tokenData) {
    throw new Error('Vous devez être connecté pour supprimer un contact club.');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/contact_clubs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenData.token}`
    }
  });
  
  if (!response.ok) throw new Error('Erreur lors de la suppression');
  return response.status === 204;
}
