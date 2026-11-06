let players = [
    { id: 1, name: 'لاعب 1', cash: 10000, debt: 1500, color: '#e11d48' },
    { id: 2, name: 'لاعب 2', cash: 8500, debt: 500, color: '#2563eb' },
    { id: 3, name: 'لاعب 3', cash: 6200, debt: 0, color: '#16a34a' },
    { id: 4, name: 'لاعب 4', cash: 4100, debt: 2000, color: '#d97706' }
];

let currentPlayerIndex = 0;
let secondsElapsed = 0;

document.addEventListener('DOMContentLoaded', () => {
    initTimer();
    updateHUD();
    renderLeaderboard();
    setupEventListeners();
});

function initTimer() {
    const timerElement = document.getElementById('gameTimer');
    setInterval(() => {
        secondsElapsed++;
        const hrs = String(Math.floor(secondsElapsed / 3600)).padStart(2, '0');
        const mins = String(Math.floor((secondsElapsed % 3600) / 60)).padStart(2, '0');
        const secs = String(secondsElapsed % 60).padStart(2, '0');
        timerElement.textContent = `${hrs}:${mins}:${secs}`;
    }, 1000);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function updateHUD() {
    const currentPlayer = players[currentPlayerIndex];
    document.getElementById('cashValue').textContent = formatNumber(currentPlayer.cash);
    document.getElementById('debtValue').textContent = formatNumber(currentPlayer.debt);
}

function renderLeaderboard() {
    const listContainer = document.getElementById('leaderboardList');
    listContainer.innerHTML = '';
    const sortedPlayers = [...players].sort((a, b) => (b.cash - b.debt) - (a.cash - a.debt));

    sortedPlayers.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = `player-card ${index === 0 ? 'rank-1' : ''}`;
        let badge = index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;

        card.innerHTML = `
            <div class="player-info">
                <span class="player-badge">${badge}</span>
                <span class="player-dot" style="background-color: ${player.color};"></span>
                <span>${player.name}</span>
            </div>
            <div class="player-cash">${formatNumber(player.cash)} EGP</div>
        `;
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

    // فتح نافذة الإعدادات فقط عند الضغط
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
        diceResult.textContent = `النتيجة: ${roll}`;

        let player = players[currentPlayerIndex];
        player.cash += roll * 150;
        if (player.debt > 0) player.debt = Math.max(0, player.debt - 100);

        updateHUD();
        renderLeaderboard();
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    });
}
