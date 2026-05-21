function renderFilms(films, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (!films || films.length === 0) {
        container.innerHTML = '<div class="loading">Фильмы не найдены</div>';
        return;
    }

    container.innerHTML = films.map(film => `
        <figure class="main__card" data-film-id="${film.id}">
            <img src="${BASE_URL}/${film.poster_URL}" alt="${film.title}" loading="lazy">
            <figcaption>
                <h3>${film.title}</h3>
                <p>${film.year} | ${film.age_rating ? film.age_rating + '+' : '16+'}</p>
                <p>⭐ ${film.rating || '7.0'}/10</p>
            </figcaption>
        </figure>
    `).join('');

    container.querySelectorAll('.main__card').forEach(card => {
        card.addEventListener('click', () => showFilmModal(card.dataset.filmId));
    });
}

function renderTop25(films) {
    const container = document.getElementById('topGrid');
    if (!container) return;
    
    if (!films || films.length === 0) {
        container.innerHTML = '<div class="loading">Нет данных</div>';
        return;
    }

    container.innerHTML = films.map((film, index) => `
        <figure class="main__card" data-film-id="${film.id}">
            <img src="${BASE_URL}/${film.poster_URL}" alt="${film.title}" loading="lazy">
            <figcaption>
                <h3>#${index + 1} ${film.title}</h3>
                <p>${film.year} | ${Math.floor(film.duration / 60)}ч ${film.duration % 60}м</p>
                <p>⭐ ${film.rating}/10</p>
            </figcaption>
        </figure>
    `).join('');

    container.querySelectorAll('.main__card').forEach(card => {
        card.addEventListener('click', () => showFilmModal(card.dataset.filmId));
    });
}

function renderActors(actors) {
    const container = document.getElementById('actorsGrid');
    if (!container) return;
    
    if (!actors || actors.length === 0) {
        container.innerHTML = '<div class="loading">Актёры не найдены</div>';
        return;
    }

    container.innerHTML = actors.map(actor => `
        <figure class="main__card" data-actor-id="${actor.id}">
            <img src="${BASE_URL}/${actor.image_URL}" alt="${actor.name}" loading="lazy">
            <figcaption>
                <h3>${actor.name} ${actor.surname || ''}</h3>
                <p>Фильмов: ${actor.films ? actor.films.length : '—'}</p>
            </figcaption>
        </figure>
    `).join('');

    container.querySelectorAll('.main__card').forEach(card => {
        if (card.dataset.actorId) {
            card.addEventListener('click', () => showActorModal(card.dataset.actorId));
        }
    });
}

async function showFilmModal(filmId) {
    const film = await fetchFilmById(filmId);
    if (!film) return;
    
    const duration = `${Math.floor(film.duration / 60)}ч ${film.duration % 60}м`;
    const genres = film.genres ? film.genres.map(g => g.name).join(', ') : 'Разное';
    
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-film">
            <img src="${BASE_URL}/${film.poster_URL}" alt="${film.title}">
            <div class="modal-film-info">
                <h2>${film.title}</h2>
                <p><strong>Год:</strong> ${film.year}</p>
                <p><strong>Длительность:</strong> ${duration}</p>
                <p><strong>Жанр:</strong> ${genres}</p>
                <p><strong>Рейтинг:</strong> ⭐ ${film.rating}/10</p>
                <p><strong>Возраст:</strong> ${film.age_rating ? film.age_rating + '+' : '16+'}</p>
                <p><strong>Описание:</strong> ${film.desc || 'Описание скоро появится...'}</p>
            </div>
        </div>
    `;
    document.getElementById('modal').classList.add('active');
}

async function showActorModal(actorId) {
    const actor = await fetchActorById(actorId);
    if (!actor) return;
    
    const filmsList = actor.films ? actor.films.map(f => f.title).join(', ') : 'Нет данных';
    
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-film">
            <img src="${BASE_URL}/${actor.image_URL}" alt="${actor.name}">
            <div class="modal-film-info">
                <h2>${actor.name} ${actor.surname || ''}</h2>
                <p><strong>Биография:</strong> ${actor.Biography || 'Информация отсутствует'}</p>
                <p><strong>Фильмы:</strong> ${filmsList}</p>
            </div>
        </div>
    `;
    document.getElementById('modal').classList.add('active');
}

async function initData() {
    await Promise.all([
        fetchFilms().then(films => renderFilms(films, 'filmsGrid')),
        fetchTop25().then(films => renderTop25(films)),
        fetchActors().then(actors => renderActors(actors))
    ]);
}