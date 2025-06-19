import { Picture, PictureRequest } from "../models/Pictures.js";
import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';

export async function getPictures() {
    const res = await fetch(`${API_BASE_URL}/api/pictures`);
    if (!res.ok) throw new Error('Erreur lors du chargement des images');
    const data = await res.json();
    return Picture.fromApi(data);
}


   
export async function addPicture(picture) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour ajouter une image.');
        }
    const token = tokenData.token;
    const pictureRequest = new PictureRequest(picture.description, picture.gallery_id, picture.image).toJson();
    const res = await fetch(`${API_BASE_URL}/api/pictures`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(pictureRequest),
    });
    if (!res.ok) throw new Error('Erreur lors de l\'ajout de l\'image');
    const data = await res.json();
    return Picture.fromApi(data);
}

export async function updatePicture(id, picture) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour modifier une image.');
    }
    const token = tokenData.token;
    const pictureRequest = new PictureRequest(picture.description, picture.gallery_id, picture.image).toJson();
    const res = await fetch(`${API_BASE_URL}/api/pictures/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(pictureRequest),
    });
    if (!res.ok) throw new Error('Erreur lors de la modification de l\'image');
    return await res.json();
}

export async function deletePicture(id)
{
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Vous devez être connecté pour supprimer une image.');
    }  
    const token = tokenData.token;
    const res = await fetch(`${API_BASE_URL}/api/pictures/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error('Erreur lors de la suppression de l\'image');
    return  res.status===204; // Return true if deletion was successful
}