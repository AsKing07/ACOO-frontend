import { SocialMedias, SocialMediaRequest } from "../models/SocialMedias.js";
import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';
import { ensureAuthenticated } from './auth.js';

export async function getSocialMedias() {
  const res = await fetch(`${API_BASE_URL}/api/social-media`);
  if (!res.ok) throw new Error('Erreur lors du chargement des réseaux sociaux');
  const data = await res.json();
  return SocialMedias.fromApi(data);
}
export async function addSocialMedia(socialMedia) {
    await ensureAuthenticated();

  const socialMediaRequest = new SocialMediaRequest(
    socialMedia.platform,
    socialMedia.url,
    socialMedia.iconUrl,
    socialMedia.image
  ).toJSON();
    const user = User.getCurrentUser(); 
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
      throw new Error('Utilisateur non authentifié');
    }
    const res = await fetch(`${API_BASE_URL}/api/social-media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.token}`
      },
      body: JSON.stringify(socialMediaRequest)
    });
    if (!res.ok) throw new Error('Erreur lors de l\'ajout du réseau social');
    const data = await res.json();
    return SocialMedias.fromApi(data);
  }

export async function updateSocialMedia(id, socialMedia) {
    await ensureAuthenticated();

  const socialMediaRequest = new SocialMediaRequest(
    socialMedia.platform,
    socialMedia.url,
    socialMedia.iconUrl,
    socialMedia.image
  ).toJSON();
    const user = User.getCurrentUser(); 
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Utilisateur non authentifié');
    }
    const res = await fetch(`${API_BASE_URL}/api/social-media/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(socialMediaRequest)
    });
    if (!res.ok) throw new Error('Erreur lors de la mise à jour du réseau social');
    const data = await res.json();
    return SocialMedias.fromApi(data);
}

export async function deleteSocialMedia(id) {
    await ensureAuthenticated();

    const user = User.getCurrentUser(); 
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Utilisateur non authentifié');
    }
    const res = await fetch(`${API_BASE_URL}/api/social-media/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        }
    });
    if (!res.ok) throw new Error('Erreur lors de la suppression du réseau social');
    return await res.json();
}
