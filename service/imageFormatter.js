// Fonction utilitaire pour convertir un fichier en base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // reader.result contient la string base64
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Fonction utilitaire pour récupérer l'image depuis la base64
function getImageFromBase64(base64) {
  if (!base64) return '/assets/images/profile-default.jpg'; // Retourne une image par défaut si aucune image n'est fournie
  return base64.startsWith('data:image/') ? base64 : `data:image/jpeg;base64,${base64}`; 

}


async function imageUrlToBase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// Utilisation :


export { fileToBase64, getImageFromBase64 , imageUrlToBase64 };