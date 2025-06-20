import { Admin, AdminRequest } from "../models/Admin.js"; // Ajout .js
import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';
import { register } from "./auth.js";

export async function getAdmins() {
    const res = await fetch(`${API_BASE_URL}/api/admin`);
    if (!res.ok) throw new Error('Erreur lors du chargement des administrateurs');
    const data = await res.json();
    return Admin.fromApi(data);
}

export async function addAdmin(admin) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    const token = tokenData ? tokenData.token : null;
    if (!token) {
        throw new Error('Vous devez être connecté pour ajouter un administrateur.');
    }

    try {
        await register(admin.username, admin.email, admin.password);
        return true;
    } catch(error) {
        throw new Error(error.message);
    }
}

export async function updateAdmin(id, admin) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    const token = tokenData ? tokenData.token : null;
    if (!token) {
        throw new Error('Vous devez être connecté pour modifier un administrateur.');
    }

    // Créer l'objet de mise à jour sans le mot de passe si vide
    const updateData = {
        username: admin.username,
        email: admin.email
    };
    
    // Ajouter le mot de passe seulement s'il est fourni
    if (admin.password && admin.password.trim() !== '') {
        updateData.password = admin.password;
    }

    const res = await fetch(`${API_BASE_URL}/api/admin/${id}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
    });

    if (!res.ok) throw new Error('Erreur lors de la mise à jour de l\'administrateur');
    const data = await res.json();

    const updatedAdmin =  Admin.fromApi(data);

    if (updatedAdmin.isCurrentUser()) {
        // Mettre à jour l'utilisateur courant dans le localStorage
        const currentUser = User.getCurrentUser();
        if (currentUser) {
            currentUser.username = updatedAdmin.username;
            currentUser.email = updatedAdmin.email;
            User.setCurrentUser(currentUser);
        }
    }


    return updatedAdmin; 
}

export async function deleteAdmin(id) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    const token = tokenData ? tokenData.token : null;
    if (!token) {
        throw new Error('Vous devez être connecté pour supprimer un administrateur.');
    }

    // Empêcher la suppression de son propre compte
    if (user.id === id) {
        throw new Error('Vous ne pouvez pas supprimer votre propre compte.');
    }

    const res = await fetch(`${API_BASE_URL}/api/admin/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error('Erreur lors de la suppression de l\'administrateur');
    return res.status === 204;
}

export async function getCurrentAdmin() {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    const token = tokenData ? tokenData.token : null;
    if (!token) {
        throw new Error('Vous devez être connecté.');
    }
const admin = new Admin({
    id: user.id,
    username: user.username,
    email: user.email
});
console.log('Récupération de l\'administrateur courant:', user);

console.log('Admin courant:', admin);

    return admin;
}
