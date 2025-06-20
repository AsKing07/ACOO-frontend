import { Introduction, IntroductionRequest } from "../models/Introduction.js";
import { User } from "../models/User.js";
import { API_BASE_URL } from "../config.js";

export async function getIntroductions() {
    const response = await fetch(`${API_BASE_URL}/api/introduction`);
    if (!response.ok) throw new Error("Erreur API");
    const data = await response.json();
    console.log("Introduction data:", data);
    return Introduction.fromApi(data);
}

export async function updateIntroduction(id, data) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null; // Correction: cohérence
    if (!tokenData) {
        throw new Error("Vous devez être connecté pour modifier l'introduction.");
    }
    
    const response = await fetch(`${API_BASE_URL}/api/introduction/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenData.token}`, // Correction: cohérence
        },
        body: JSON.stringify(data),
    });
    
    if (!response.ok) throw new Error("Erreur API");
    const updatedData = await response.json();
    return Introduction.fromApi(updatedData);
}

export async function addIntroduction(introduction) {
    const introductionRequest = new IntroductionRequest(
        introduction.title,
        introduction.images,
        introduction.description
    );
    
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error("Vous devez être connecté pour ajouter une introduction.");
    }
    
    const response = await fetch(`${API_BASE_URL}/api/introduction`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(introductionRequest.toJSON()),
    });
    
    if (!response.ok) throw new Error("Erreur lors de l'ajout");
    const data = await response.json();
    return Introduction.fromApi(data);
}

export async function deleteIntroduction(id) {
    const user = User.getCurrentUser();
    const tokenData = user ? user.tokenData : null;
    if (!tokenData) {
        throw new Error("Vous devez être connecté pour supprimer une introduction.");
    }
    
    const response = await fetch(`${API_BASE_URL}/api/introduction/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenData.token}`,
        },
    });
    
    if (!response.ok) throw new Error("Erreur lors de la suppression");
    return response.status === 204;
}

export async function getIntroductionById(id) {
    const response = await fetch(`${API_BASE_URL}/api/introduction/${id}`);
    if (!response.ok) throw new Error("Erreur API");
    const data = await response.json();
    console.log("Introduction by ID data:", data);
    return Introduction.fromApi(data);
}

export async function getIntroductionByTitle(title) {
    const introductions = await getIntroductions();
    const introArray = Array.isArray(introductions) ? introductions : [introductions];
    return introArray.filter(intro => intro.title.trim().toLowerCase() === title.trim().toLowerCase());
}
