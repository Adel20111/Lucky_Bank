let players = [
    { id: 1, name: 'لاعب 1', cash: 10000, color: '#e11d48' },
    { id: 2, name: 'لاعب 2', cash: 8500, color: '#2563eb' },
    { id: 3, name: 'لاعب 3', cash: 6200, color: '#16a34a' },
    { id: 4, name: 'لاعب 4', cash: 4100, color: '#d97706' }
];

let secondsElapsed = 0;
let timerInterval = null;

document.addEventListener('DOMContentLoaded', () => {
    initTimer();
    renderLeaderboard();
    setupEventListeners();
});

function initTimer() {
    const timerElement = document.getElementById('gameTimer');
    timerInterval = setInterval(() => {
        secondsElapsed++;
        const hrs = String(Math.floor(secondsElapsed / 3600)).padStart(2, '0');
        const mins = String(Math.floor((secondsElapsed % 3600) / 60)).padStart(2, '0');
        const secs = String(secondsElapsed % 60).padStart(2, '0');
        timerElement.textContent = ${hrs}:${mins}:${secs};
    }, 1000);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function renderLeaderboard() {
    const listContainer = document.getElementById('leaderboardList');
    listContainer.innerHTML = '';

    const sortedPlayers = [...players].sort((a, b) => b.cash - a.cash);

    sortedPlayers.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = player-card ${index === 0 ? 'rank-1' : ''};

        let badge = ${index + 1};
        if (index === 0) badge = '';
        else if (index === 1) badge = '';
        else if (index === 2) badge = '';

        card.innerHTML = 
            <div class="player-info">
                <span class="player-badge">${badge}</span>
                <span class="player-dot" style="background-color: ${player.color};"></span>
                <span>${player.name}</span>
            </div>
            <div class="player-cash">${formatNumber(player.cash)} EGP</div>
        ;

        listContainer.appendChild(card);
    });
}
function setupEventListeners() {
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const exitBtn = document.getElementById('exitBtn');
    const exitConfirmModal = document.getElementById('exitConfirmModal');
    const confirmYesBtn = document.getElementById('confirmYesBtn');
    const confirmNoBtn = document.getElementById('confirmNoBtn');
    const rollDiceBtn = document.getElementById('rollDiceBtn');
    const diceResult = document.getElementById('diceResult');

    settingsBtn.addEventListener('click', () => {
        settingsModal.classList.remove('hidden');
    });

    closeSettingsBtn.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
    });

    exitBtn.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
        exitConfirmModal.classList.remove('hidden');
    });

    confirmNoBtn.addEventListener('click', () => {
        exitConfirmModal.classList.add('hidden');
    });

    confirmYesBtn.addEventListener('click', () => {
        alert('تم الخروج من اللعبة');
        window.location.reload();
    });

    rollDiceBtn.addEventListener('click', () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        diceResult.textContent = النتيجة: ${roll};

        players[0].cash += roll * 100;
        document.getElementById('cashValue').textContent = formatNumber(players[0].cash);
        renderLeaderboard();
    });
}