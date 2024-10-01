// Função para criar posts com interações de curtida, repost e comentário
function createPost(username, message) {
    const feed = document.getElementById('post-feed');
    
    // Cria o container do post
    const postContainer = document.createElement('div');
    postContainer.classList.add('post');

    // Insere o conteúdo do post
    postContainer.innerHTML = `
        <div class="post-header">
            <strong>${username}</strong>
        </div>
        <p>${message}</p>
        <div class="post-actions">
            <span class="like-count">0 curtidas</span>
            <span class="repost-count">0 reposts</span>
            <span class="comment-count">0 comentários</span>
        </div>
        <div class="interaction-buttons">
            <button class="like-button">
                <img src="images/like-icon.png" alt="Curtir" class="interaction-icon">
            </button>
            <button class="repost-button">
                <img src="images/repost-icon.png" alt="Repostar" class="interaction-icon">
            </button>
            <button class="comment-button">
                <img src="images/comment-icon.png" alt="Comentar" class="interaction-icon">
            </button>
        </div>
    `;

    feed.appendChild(postContainer);

    // Lógica de curtidas
    let likeCount = 0;
    const likeButton = postContainer.querySelector('.like-button');
    const likeCountSpan = postContainer.querySelector('.like-count');
    likeButton.addEventListener('click', function() {
        likeCount++;
        likeCountSpan.textContent = `${likeCount} curtida${likeCount > 1 ? 's' : ''}`;
    });

    // Lógica de repost
    let repostCount = 0;
    const repostButton = postContainer.querySelector('.repost-button');
    const repostCountSpan = postContainer.querySelector('.repost-count');
    repostButton.addEventListener('click', function() {
        repostCount++;
        repostCountSpan.textContent = `${repostCount} repost${repostCount > 1 ? 's' : ''}`;
    });

    // Lógica de comentários
    const commentButton = postContainer.querySelector('.comment-button');
    const commentCountSpan = postContainer.querySelector('.comment-count');
    commentButton.addEventListener('click', function() {
        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');
        commentSection.innerHTML = `
            <textarea placeholder="Escreva um comentário..."></textarea>
            <button class="submit-comment">Comentar</button>
        `;
        postContainer.appendChild(commentSection);

        const submitCommentButton = commentSection.querySelector('.submit-comment');
        let commentCount = 0;

        submitCommentButton.addEventListener('click', function() {
            commentCount++;
            commentCountSpan.textContent = `${commentCount} comentário${commentCount > 1 ? 's' : ''}`;
            commentSection.remove();  // Remove a área de comentário após submeter
        });
    });
}

// Lógica para lidar com a criação de um novo post
document.getElementById("post-button").addEventListener("click", function () {
    // Exibe o modal
    const modal = document.getElementById("post-name-modal");
    modal.style.display = "flex";  // Torna o modal visível

    // Lógica para confirmar o post
    document.getElementById("confirm-post").onclick = function () {
        const postContent = document.getElementById("post-content").value.trim();
        const username = document.getElementById("username-input").value.trim();

        // Verifica se o conteúdo do post está vazio
        if (postContent === "") {
            alert("O conteúdo do post não pode estar vazio.");
            return;
        }

        // Verifica se o usuário inseriu um nome
        if (username === "") {
            alert("Por favor, insira um nome de usuário.");
            return;
        }

        // Cria o post
        createPost(username, postContent);
        
        // Limpa o campo de texto e esconde o modal
        document.getElementById("post-content").value = "";
        document.getElementById("username-input").value = "";
        modal.style.display = "none";
    };
});
