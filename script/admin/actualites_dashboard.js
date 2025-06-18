import { getNews, updateNews, addNews, deleteNews } from "../../service/api/newsApi.js";
import { fileToBase64 } from "../../service/imageFormatter.js";
import { showNotification } from "../showNotification.js";

export function initActualites() {
//Elements DOM pour les actualités
    const newsList = document.getElementById('news-list');
    const addNewsButton = document.getElementById('add-news-btn');
    const newsModal = document.getElementById('news-modal');
    const deleteNewsModal = document.getElementById('delete-news-modal');
    const closeNewsModalButton = document.getElementById('close-news-modal');
    const closeDeleteNewsModalButton = document.getElementById('close-delete-news-modal');
    const newsForm = document.getElementById('news-form');
    const newsModalTitle = document.getElementById('news-modal-title');
    const newIdInput = document.getElementById('news-id');
    const newTitleInput = document.getElementById('news-title');
    const newDescriptionInput = document.getElementById('news-content');
    const newImageInput = document.getElementById('news-image');
    const newSubmitButton = document.getElementById('news-submit-btn');

 
 const confirmDeleteNewsButton = document.getElementById('confirm-delete-news-btn');
 const cancelDeleteNewsButton = document.getElementById('cancel-delete-news-btn');
 const loader = document.getElementById('loader');


 //Variables pour stocker les données
 let news = [];
 let newsToDelete = null;

 // Fonctions pour les actualités

 async function renderNews() {
    loader.style.display = 'block';
    newsList.innerHTML = '';

    try{
        news = await getNews();
        news.forEach(item =>{
            const newsEl = document.createElement('div');
            newsEl.className = 'editing-img-wording-container newItem';

            // Image container
            const imgContainer = document.createElement('div');
            imgContainer.className = 'edit-img';
            const img = document.createElement('img');
            img.src = item.image || '';
            img.alt = 'actualité';
            imgContainer.appendChild(img);

            // Description container
            const descContainer = document.createElement('div');
            descContainer.className = 'edit-description';

            // Title
            const title = document.createElement('h2');
            title.textContent = item.title || '';

            // Wording
            const descWording = document.createElement('div');
            descWording.className = 'desc-wording';
            const desc = document.createElement('p');
            desc.textContent = item.content || '';
            descWording.appendChild(desc);

            // Buttons
            const btnContainer = document.createElement('div');
            btnContainer.className = 'edit-btnS';

            const editBtn = document.createElement('button');
            editBtn.className = 'btn-primary btn-edit';
            editBtn.textContent = 'Modifier';
            editBtn.dataset.id = item.id;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-danger btn-delete';
            deleteBtn.textContent = 'Supprimer';
            deleteBtn.dataset.id = item.id;

            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(deleteBtn);

            // Assemble description
            descContainer.appendChild(title);
            descContainer.appendChild(descWording);
            descContainer.appendChild(btnContainer);

            // Assemble main container
            newsEl.appendChild(imgContainer);
            newsEl.appendChild(descContainer);

            newsList.appendChild(newsEl);
        });
        attachNewsEventListeners();
    }
    catch (err) {
        showNotification(err.message || "Erreur lors du chargement des actualités.", 'error');
    }
    finally {
        loader.style.display = 'none';
    }

 }

 function attachNewsEventListeners() {
    const editButtons = document.querySelectorAll('.btn-edit');
    const deleteButtons = document.querySelectorAll('.btn-delete');
    editButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            openEditNewsModal(e.target.dataset.id);
        });
    });
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            openDeleteNewsModal(e.target.dataset.id);
        });
 });
 }

 function openEditNewsModal(id)
 {
    const newsItem = news.find(n => n.id == id);
    if (!newsItem) return;

    newsModalTitle.textContent = "Modifier une actualité";
    newIdInput.value = newsItem.id;
    newTitleInput.value = newsItem.title ;
    newDescriptionInput.value = newsItem.content;
    newImageInput.value = newsItem.image;
    newSubmitButton.textContent = "Modifier l'actualité";
    newsModal.style.display = 'flex';

 }

 function openDeleteNewsModal(id) {
    newsToDelete =id;
    deleteNewsModal.style.display = 'flex';
 }

   // Event listeners pour les boutons et modals
   if(addNewsButton)
   {
    addNewsButton.addEventListener('click', () => {
        newsModalTitle.textContent = "Ajouter une actualité";
        newsForm.reset();
        newIdInput.value = '';
        newSubmitButton.textContent = "Ajouter l'actualité";
        newsModal.style.display = 'flex';

    })
        
   }

   //Fermeture des modals
   if(closeNewsModalButton) closeNewsModalButton.onclick =() => newsModal.style.display = 'none';
   if(closeDeleteNewsModalButton) closeDeleteNewsModalButton.onclick =() => deleteNewsModal.style.display = 'none';
   if(cancelDeleteNewsButton) cancelDeleteNewsButton.onclick = () => deleteNewsModal.style.display = 'none';

    //Soumission du formulaire d'actualités
    if(newsForm)
    {
        newsForm.onsubmit = async (e) => {
            e.preventDefault();
            newSubmitButton.disabled = true;
            const oldBtnContent = newSubmitButton.innerHTML;
      newSubmitButton.innerHTML = `<span class="loader" style="width:18px;height:18px;border-width:3px;vertical-align:middle;"></span>`;

      // Logique pour gérer l'upload de la photo
      let photoBase64 = '/assets/images/profile-default.jpg';
      if (newImageInput.files.length > 0) {
        photoBase64 = await fileToBase64(newImageInput.files[0]);
      }
      const newsData = {
                id: newIdInput.value ? parseInt(newIdInput.value) : null,
                title: newTitleInput.value,
                description: newDescriptionInput.value,
                images: [photoBase64]
            };

            try{
                if(newIdInput.value)
                {
                    await updateNews(newIdInput.value, newsData);
                }
                else{
                    await addNews(newsData);
                }

                newsModal.style.display = 'none';
                renderNews();
                showNotification('Actualité enregistrée avec succès.', 'success');
            }
            catch (err) {
                showNotification(err.message || "Erreur lors de l'enregistrement de l'actualité.", 'error');
            }
            finally{
                newSubmitButton.disabled = false;
                newSubmitButton.innerHTML = oldBtnContent;
            }

        }
    }

    //Confirmation de suppression d'actualité
    if(confirmDeleteNewsButton)
    {
        confirmDeleteNewsButton.onclick = async () => {
            if(!newsToDelete) return;

            confirmDeleteNewsButton.disabled = true;
            const oldBtnContent = confirmDeleteNewsButton.innerHTML;
            confirmDeleteNewsButton.innerHTML = `<span class="loader" style="width:18px;height:18px;border-width:3px;vertical-align:middle;"></span>`;

            try{
                await deleteNews(newsToDelete);
                newsToDelete = null;
                deleteNewsModal.style.display = 'none';
                renderNews();
                showNotification('Actualité supprimée avec succès.', 'success');
            } catch (err) {
                showNotification(err.message || "Erreur lors de la suppression de l'actualité.", 'error');
            }
            finally{
                confirmDeleteNewsButton.disabled = false;
                confirmDeleteNewsButton.innerHTML = oldBtnContent;
            }
        }


            
    }

    renderNews();

}

// Lancement de l'initialisation
// initActualites();