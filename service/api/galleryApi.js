import { Gallery, GalleryRequest } from '../models/Gallery.js';
import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';
import { ensureAuthenticated } from './auth.js';

export async function getGalleries() {
    const res = await fetch(`${API_BASE_URL}/api/gallery`);
    if (!res.ok) throw new Error('Erreur lors du chargement des galeries');
    const data = await res.json();
    return Gallery.fromApi(data);

}
export async function addGallery(gallery) {
    await ensureAuthenticated();

    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour ajouter une galerie.');
    }
    const galleryRequest = new GalleryRequest(gallery.theme).toJson();
    const res = await fetch(`${API_BASE_URL}/api/gallery`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(galleryRequest),
    });
    if (!res.ok) throw new Error('Erreur lors de la création de la galerie');
    const data = await res.json();
    return Gallery.fromApi(data);
}

export async function updateGallery(id, gallery) {
    await ensureAuthenticated();

    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour modifier une galerie.');
    }
    const galleryRequest = new GalleryRequest(gallery.theme).toJson();
    const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(galleryRequest),
    });
    if (!res.ok) throw new Error('Erreur lors de la modification de la galerie');  
    return await res.json();
}
export async function deleteGallery(id) {
    await ensureAuthenticated();

    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour supprimer une galerie.');
    }
    const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`,
        },
    });
    if (!res.ok) throw new Error('Erreur lors de la suppression de la galerie');
    return  res.status === 204; // Return true if deletion was successful
}


export async function getGalleryByName(name) {
  const galleries = await getGalleries();
  
  
  const matched = galleries.filter(gallery =>
    gallery.theme.toLowerCase().includes(name.toLowerCase())
  );

  return matched;
}