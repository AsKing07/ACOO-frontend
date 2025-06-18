import { Staff, StaffRequest } from "../models/Staff.js";
import { User } from '../models/User.js';
import { API_BASE_URL } from '../config.js';

export async function getStaff() {
    const res = await fetch(`${API_BASE_URL}/api/staffs`);
    if (!res.ok) throw new Error('Erreur lors du chargement des membres du personnel');
    const data = await res.json();
    return Staff.fromApi(data);
}
export async function addStaff(staff) {
    const staffRequest = new StaffRequest(staff.name, staff.role, staff.phoneNumber, staff.mail, staff.image, staff.team?? null ).toJSON();
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    const res = await fetch(`${API_BASE_URL}/api/staffs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(staffRequest)
    });
    if (!res.ok) throw new Error('Erreur lors de l\'ajout du membre du personnel');
    const data = await res.json();
    return Staff.fromApi(data);
}

export async function updateStaff(id, staff) {
    const staffRequest = new StaffRequest(staff.name, staff.role, staff.phoneNumber, staff.mail, staff.image, staff.team).toJSON();
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Aucun utilisateur connecté');
    }
    const res = await fetch(`${API_BASE_URL}/api/staffs/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(staffRequest)
    });
    if (!res.ok) throw new Error('Erreur lors de la mise à jour du membre du personnel');
    return await res.json();
    
}

export async function deleteStaff(id) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error('Aucun utilisateur connecté');
    }
    const res = await fetch(`${API_BASE_URL}/api/staffs/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${tokenData.token}`
        }
    });
    if (!res.ok) throw new Error('Erreur lors de la suppression du membre du personnel');
    return await res.status === 204; 
}