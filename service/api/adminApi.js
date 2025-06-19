import { Admin, AdminRequest } from "../models/Admin";
import { User } from '../models/User';
import { API_BASE_URL } from '../config.js';
import { login, register } from "./auth.js";

export async function getAdmins() {
    const res = await fetch(`${API_BASE_URL}/api/admins`);
    if (!res.ok) throw new Error('Erreur lors du chargement des administrateurs');
    const data = await res.json();
    return Admin.fromApi(data);
}

export async function addAdmin(admin) {
    const adminRequest = new AdminRequest(admin.username, admin.email, admin.password).toJSON();
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    const token = tokenData ? tokenData.token : null;
    if (!token) {
        throw new Error('Vous devez être connecté pour ajouter un administrateur.');
    }
try{
    await register(adminRequest.username, adminRequest.email, admin.password);

    return true ;

}
catch(error)
{
    throw new Error(error.message);
    
}
}

export async function updateAdmin(id, admin) {
    const adminRequest = new AdminRequest(admin.username, admin.email, admin.password).toJSON();
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    const token = tokenData ? tokenData.token : null;
    if (!token) {
        throw new Error('Vous devez être connecté pour modifier un administrateur.');
    }

    if(adminRequest.password && user.id!=id )
    {

        
    }


    const res = await fetch(`${API_BASE_URL}/api/admins/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(adminRequest)
    });

    if(!res.ok) throw new Error('Erreur lors de la mise à jour de l\'administrateur');
    const data = await res.json();
    return Admin.fromApi(data);
}

export async function deleteAdmin(id) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    const token = tokenData ? tokenData.token : null;
    if (!token) {
        throw new Error('Vous devez être connecté pour supprimer un administrateur.');
    }
    const res = await fetch(`${API_BASE_URL}/api/admins/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if(!res.ok) throw new Error('Erreur lors de la suppression de l\'administrateur');
    return res.status === 204;
}