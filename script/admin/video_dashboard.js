import { getVideos, addVideo, updateVideo, deleteVideo } from "../../service/api/videoApi.js";
import { showNotification } from "../showNotification.js";

export function initVideos() {
    const videoList = document.getElementById('video-list');
    const addVideoButton = document.getElementById('add-video-btn');
    const videoModal = document.getElementById('video-modal');
    const deleteVideoModal = document.getElementById('delete-video-modal');
    const closeVideoModalButton = document.getElementById('close-video-modal');
    const closeDeleteVideoModalButton = document.getElementById('close-delete-video-modal');
    const videoForm = document.getElementById('video-form');
    const videoModalTitle = document.getElementById('video-modal-title');
    const videoIdInput = document.getElementById('video-id');
    const videoNameInput = document.getElementById('video-name');
    const videoUrlInput = document.getElementById('video-url');
    const videoSubmitButton = document.getElementById('video-submit-btn');
    const confirmDeleteVideoButton = document.getElementById('confirm-delete-video-btn');
    const cancelDeleteVideoButton = document.getElementById('cancel-delete-video-btn');
    const loader = document.getElementById('loader');

    let videos = [];
    let videoToDelete = null;

    async function renderVideos() {
        loader.style.display = 'block';
        videoList.innerHTML = '';
        try {
            videos = await getVideos();
            videos.forEach(item => {
                const videoEl = document.createElement('div');
                videoEl.className = 'editing-img-wording-container newItem';
                // Aperçu vidéo
                const preview = document.createElement('div');
                preview.className = 'edit-img';
                preview.innerHTML = `<iframe width="180" height="100" src="https://www.youtube.com/embed/${extractYoutubeId(item.videoUrl)}" frameborder="0" allowfullscreen></iframe>`;
                // Description
                const descContainer = document.createElement('div');
                descContainer.className = 'edit-description';
                const title = document.createElement('h2');
                title.textContent = item.name || '';
                // Boutons
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
                // Radio highlighting
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'highlighting';
                radio.checked = !!item.highlighting;
                radio.className = 'highlighting-radio';
                radio.title = 'Mettre en avant';
                radio.style.marginRight = '8px';
                radio.addEventListener('change', async () => {
                    // Trouver l'ancienne vidéo mise en avant
                    const old = videos.find(v => v.highlighting);
                    if (old && old.id !== item.id) {
                        await updateVideo(old.id, { ...old, highlighting: false });
                    }
                    await updateVideo(item.id, { ...item, highlighting: true });
                    showNotification('Vidéo mise en avant !', 'success');
                    renderVideos();
                });
                // Assemble description
                descContainer.appendChild(radio);
                descContainer.appendChild(title);
                descContainer.appendChild(btnContainer);
                // Assemble main container
                videoEl.appendChild(preview);
                videoEl.appendChild(descContainer);
                videoList.appendChild(videoEl);
            });
            attachVideoEventListeners();
        } catch (err) {
            showNotification(err.message || "Erreur lors du chargement des vidéos.", 'error');
        } finally {
            loader.style.display = 'none';
        }
    }
    function attachVideoEventListeners() {
        const editButtons = document.querySelectorAll('.btn-edit');
        const deleteButtons = document.querySelectorAll('.btn-delete');
        editButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                openEditVideoModal(e.target.dataset.id);
            });
        });
        deleteButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                openDeleteVideoModal(e.target.dataset.id);
            });
        });
    }
    function openEditVideoModal(id) {
        const videoItem = videos.find(v => v.id == id);
        if (!videoItem) return;
        videoModalTitle.textContent = "Modifier une vidéo";
        videoIdInput.value = videoItem.id;
        videoNameInput.value = videoItem.name;
        videoUrlInput.value = videoItem.videoUrl;
        videoSubmitButton.textContent = "Modifier la vidéo";
        videoModal.style.display = 'flex';
    }
    function openDeleteVideoModal(id) {
        videoToDelete = id;
        deleteVideoModal.style.display = 'flex';
    }
    if (addVideoButton) {
        addVideoButton.addEventListener('click', () => {
            videoModalTitle.textContent = "Ajouter une vidéo";
            videoForm.reset();
            videoIdInput.value = '';
            videoSubmitButton.textContent = "Ajouter la vidéo";
            videoModal.style.display = 'flex';
        });
    }
    if (closeVideoModalButton) closeVideoModalButton.onclick = () => videoModal.style.display = 'none';
    if (closeDeleteVideoModalButton) closeDeleteVideoModalButton.onclick = () => deleteVideoModal.style.display = 'none';
    if (cancelDeleteVideoButton) cancelDeleteVideoButton.onclick = () => deleteVideoModal.style.display = 'none';
    if (videoForm) {
        videoForm.onsubmit = async (e) => {
            e.preventDefault();
            videoSubmitButton.disabled = true;
            const oldBtnContent = videoSubmitButton.innerHTML;
            videoSubmitButton.innerHTML = `<span class="loader" style="width:18px;height:18px;border-width:3px;vertical-align:middle;"></span>`;
            const videoData = {
                id: videoIdInput.value ? parseInt(videoIdInput.value) : null,
                name: videoNameInput.value,
                videoUrl: videoUrlInput.value,
                highlighting: false
            };
            try {
                if (videoIdInput.value) {
                    await updateVideo(videoIdInput.value, videoData);
                } else {
                    await addVideo(videoData);
                }
                videoModal.style.display = 'none';
                renderVideos();
                showNotification('Vidéo enregistrée avec succès.', 'success');
            } catch (err) {
                showNotification(err.message || "Erreur lors de l'enregistrement de la vidéo.", 'error');
            } finally {
                videoSubmitButton.disabled = false;
                videoSubmitButton.innerHTML = oldBtnContent;
            }
        };
    }
    if (confirmDeleteVideoButton) {
        confirmDeleteVideoButton.onclick = async () => {
            try {
                await deleteVideo(videoToDelete);
                deleteVideoModal.style.display = 'none';
                renderVideos();
                showNotification('Vidéo supprimée avec succès.', 'success');
            } catch (err) {
                showNotification(err.message || "Erreur lors de la suppression de la vidéo.", 'error');
            }
        };
    }
    renderVideos();
}
function extractYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}
