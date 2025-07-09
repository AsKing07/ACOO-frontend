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
        const header = document.createElement('div');
        header.className = 'video-header';
        header.innerHTML = `
          <div class="video-header-preview"></div>
          <div class="video-header-name">Nom</div>
          <div class="video-header-featured">Vidéo mise en avant</div>
          <div class="video-header-btns"></div>
        `;
        videoList.appendChild(header);
        try {
            videos = await getVideos();
            videos.forEach(item => {
                const videoEl = document.createElement('div');
                videoEl.className = 'video-item';
                
                const preview = document.createElement('div');
                preview.className = 'video-preview';
                preview.innerHTML = `<iframe width="180" height="100" src="https://www.youtube.com/embed/${extractYoutubeId(item.videoUrl)}" frameborder="0" allowfullscreen></iframe>`;
                
                const infoContainer = document.createElement('div');
                infoContainer.className = 'video-info';
                
                const nameRow = document.createElement('div');
                nameRow.className = 'video-name-row';
                const nameLabel = document.createElement('span');
                nameLabel.className = 'video-name-label';
                nameLabel.textContent = 'Nom:';
                const name = document.createElement('span');
                name.className = 'video-name';
                name.textContent = item.name || '';
                nameRow.appendChild(nameLabel);
                nameRow.appendChild(name);
                infoContainer.appendChild(nameRow);
                
                const featuredRow = document.createElement('div');
                featuredRow.className = 'video-featured-row';
                const featuredLabel = document.createElement('span');
                featuredLabel.className = 'video-featured-label';
                featuredLabel.textContent = 'Vidéo mise en avant:';
                const featuredContainer = document.createElement('div');
                featuredContainer.className = 'video-featured';
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'highlighting';
                radio.checked = !!item.highlighting;
                radio.className = 'highlighting-radio';
                radio.title = 'Sélectionner la vidéo mise en avant';
                radio.addEventListener('change', async () => {
                    const old = videos.find(v => v.highlighting);
                    if (old && old.id !== item.id) {
                        await updateVideo(old.id, { ...old, highlighting: false });
                    }
                    await updateVideo(item.id, { ...item, highlighting: true });
                    showNotification('Vidéo mise en avant !', 'success');
                    renderVideos();
                });
                featuredContainer.appendChild(radio);
                featuredRow.appendChild(featuredLabel);
                featuredRow.appendChild(featuredContainer);
                infoContainer.appendChild(featuredRow);
                
                const nameDesktop = document.createElement('span');
                nameDesktop.className = 'video-name';
                nameDesktop.textContent = item.name || '';
                
                const featuredDesktop = document.createElement('div');
                featuredDesktop.className = 'video-featured';
                const radioDesktop = document.createElement('input');
                radioDesktop.type = 'radio';
                radioDesktop.name = 'highlighting';
                radioDesktop.checked = !!item.highlighting;
                radioDesktop.className = 'highlighting-radio';
                radioDesktop.title = 'Sélectionner la vidéo mise en avant';
                radioDesktop.addEventListener('change', async () => {
                    const old = videos.find(v => v.highlighting);
                    if (old && old.id !== item.id) {
                        await updateVideo(old.id, { ...old, highlighting: false });
                    }
                    await updateVideo(item.id, { ...item, highlighting: true });
                    showNotification('Vidéo mise en avant !', 'success');
                    renderVideos();
                });
                featuredDesktop.appendChild(radioDesktop);
                
                const btnContainer = document.createElement('div');
                btnContainer.className = 'edit-btnS';
                const editBtn = document.createElement('button');
                editBtn.className = 'btn-primary btn-edit';
                editBtn.innerHTML = '<i class="fas fa-edit" aria-hidden="true"></i>';
                editBtn.dataset.id = item.id;
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'btn-danger btn-delete';
                deleteBtn.innerHTML = '<i class="fas fa-trash" aria-hidden="true"></i>';
                deleteBtn.dataset.id = item.id;
                btnContainer.appendChild(editBtn);
                btnContainer.appendChild(deleteBtn);
                
                videoEl.appendChild(preview);
                videoEl.appendChild(infoContainer);
                videoEl.appendChild(nameDesktop);
                videoEl.appendChild(featuredDesktop);
                videoEl.appendChild(btnContainer);
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
