// Character traits
const characterTraits = {
    wizard: {
        name: 'Professor Arithmus',
        emoji: '🧙‍♂️',
        style: 'magical',
        tips: {
            addition: ["Magic trick: Start with the bigger number in your mind, then count up!"],
            subtraction: ["Wave your wand and count backwards - that's subtraction magic!"],
            multiplication: ["Multiplication is like casting the same spell multiple times"],
            division: ["Division is like fairly sharing your magical potions"]
        },
        encouragement: ["Magnificent spell-casting! ✨", "Your mathematical magic is growing stronger! 🌟"]
    },
    alien: {
        name: 'Cosmo',
        emoji: '👽',
        style: 'scientific',
        tips: {
            addition: ["On my planet, we combine numbers using advanced technology!"],
            subtraction: ["Imagine launching space rocks away from your ship"],
            multiplication: ["Like creating identical space stations"],
            division: ["Share your space rations equally among crew members"]
        },
        encouragement: ["Intergalactic intelligence detected! 🚀", "Your Earth mathematics skills are out of this world! 🌎"]
    },
    robot: {
        name: 'Calculator-3000',
        emoji: '🤖',
        style: 'mechanical',
        tips: {
            addition: ["Input numbers sequentially for optimal addition"],
            subtraction: ["Initialize reverse counting sequence"],
            multiplication: ["Execute repeated addition protocol"],
            division: ["Initiate equal distribution protocol"]
        },
        encouragement: ["Calculation accuracy: 100%! 🔧", "Mathematical functions executing perfectly! ⚡"]
    }
};

// Difficulty Levels
const difficultyLevels = {
    1: {
        addition: { max: 10, min: 1 },
        subtraction: { max: 10, min: 1 },
        multiplication: { max: 5, min: 1 },
        division: { max: 5, min: 1 }
    },
    2: {
        addition: { max: 20, min: 5 },
        subtraction: { max: 20, min: 5 },
        multiplication: { max: 10, min: 2 },
        division: { max: 10, min: 2 }
    },
    3: {
        addition: { max: 50, min: 10 },
        subtraction: { max: 50, min: 10 },
        multiplication: { max: 12, min: 2 },
        division: { max: 12, min: 2 }
    }
};

// Make character traits globally available
window.gameCharacterTraits = characterTraits;

// Game state
const state = {
    currentPlayer: {
        name: 'Player',
        character: null,
        score: 0,
        level: 1
    },
    currentTopic: null,
    currentProblem: null,
    progress: 0,
    isAnswerChecked: false
};

// Export state for other modules
window.gameState = state;

// Initialize audio manager
window.audioManager = new AudioManager();

// DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const gameContainer = document.getElementById('gameContainer');
const rewardScreen = document.getElementById('rewardScreen');
const characters = document.querySelectorAll('.character');
const startBtn = document.querySelector('.start-btn');
const topicBtns = document.querySelectorAll('.topic-btn');
const problemContainer = document.querySelector('.problem-container');
const visualAid = document.querySelector('.visual-aid');
const scoreElement = document.querySelector('.score');
const progressBar = document.querySelector('.progress');
const backBtn = document.querySelector('.back-btn');
const soundBtn = document.querySelector('.sound-btn');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize character selection
    characters.forEach(character => {
        character.addEventListener('click', () => selectCharacter(character));
    });

    // Initialize sound button
    soundBtn.addEventListener('click', () => {
        const isMuted = window.audioManager.toggleMute();
        soundBtn.textContent = isMuted ? '🔈' : '🔊';
        soundBtn.classList.toggle('muted', isMuted);
        window.audioManager.playSound('click');
    });

    // Initialize start button
    startBtn.addEventListener('click', startGame);
    
    // Initialize back button
    backBtn.addEventListener('click', backToMenu);
    
    // Initialize topic buttons
    topicBtns.forEach(btn => {
        btn.addEventListener('click', () => selectTopic(btn.dataset.topic));
    });

    // Preload sounds
    window.audioManager.preloadSounds();
});

// Character Selection
function selectCharacter(characterElement) {
    const characterType = characterElement.dataset.character;
    
    // Reset all characters
    characters.forEach(c => {
        c.classList.remove('selected');
        const type = c.dataset.character;
        c.textContent = `${characterTraits[type].emoji} ${characterTraits[type].name}`;
    });
    
    // Select the clicked character
    characterElement.classList.add('selected');
    state.currentPlayer.character = characterType;
    
    // Play sound effect
    window.audioManager.playSound('characterSelect');
}

// Start Game
function startGame() {
    if (!state.currentPlayer.character) {
        alert('Please select a character first!');
        return;
    }

    welcomeScreen.style.display = 'none';
    gameContainer.style.display = 'grid';
    gameContainer.classList.add('fade-in');
    backBtn.style.display = 'inline-block';

    // Initialize character avatar
    const characterAvatar = document.querySelector('.character-avatar');
    const selectedCharacter = characterTraits[state.currentPlayer.character];
    characterAvatar.textContent = selectedCharacter.emoji;
    characterAvatar.setAttribute('data-character', state.currentPlayer.character);

    // Initialize hint button
    initializeHintButton();

    // Select the first topic by default
    selectTopic('addition');
}

// Topic Selection
function selectTopic(topic) {
    state.currentTopic = topic;
    topicBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.topic === topic);
    });
    generateProblem();
}

// Problem Generation
function generateProblem() {
    let num1, num2, operator, answer;
    const level = state.currentPlayer.level;
    const difficulty = difficultyLevels[Math.min(level, 3)][state.currentTopic];

    switch (state.currentTopic) {
        case 'addition':
            num1 = Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) + difficulty.min;
            num2 = Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) + difficulty.min;
            operator = '+';
            answer = num1 + num2;
            break;
        case 'subtraction':
            num1 = Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) + difficulty.min;
            num2 = Math.floor(Math.random() * (num1 - difficulty.min + 1)) + difficulty.min;
            operator = '-';
            answer = num1 - num2;
            break;
        case 'multiplication':
            num1 = Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) + difficulty.min;
            num2 = Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) + difficulty.min;
            operator = '×';
            answer = num1 * num2;
            break;
        case 'division':
            num2 = Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) + difficulty.min;
            answer = Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) + difficulty.min;
            num1 = num2 * answer;
            operator = '÷';
            break;
    }

    state.currentProblem = { num1, num2, operator, answer };
    state.isAnswerChecked = false;
    displayProblem();
    updateVisualAid();
}

// Display Problem
function displayProblem() {
    const { num1, num2, operator } = state.currentProblem;
    
    document.querySelector('.num1').textContent = num1;
    document.querySelector('.num2').textContent = num2;
    document.querySelector('.operator').textContent = operator;
    document.querySelector('.answer-input').value = '';
}

// Check Answer
document.querySelector('.check-btn').addEventListener('click', checkAnswer);
document.querySelector('.answer-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
});

function checkAnswer() {
    const userAnswer = parseInt(document.querySelector('.answer-input').value);
    
    if (isNaN(userAnswer)) {
        showCharacterMessage("Please enter a number!");
        return;
    }

    if (state.isAnswerChecked) {
        return;
    }

    state.isAnswerChecked = true;
    
    if (userAnswer === state.currentProblem.answer) {
        handleCorrectAnswer();
    } else {
        handleIncorrectAnswer();
    }
}

// Handle Correct Answer
function handleCorrectAnswer() {
    state.currentPlayer.score += 10;
    state.progress += 10;
    
    updateScore();
    updateProgress();

    // Disable check button and input
    const checkBtn = document.querySelector('.check-btn');
    const answerInput = document.querySelector('.answer-input');
    checkBtn.disabled = true;
    answerInput.disabled = true;

    // Show character encouragement
    const character = characterTraits[state.currentPlayer.character];
    const messages = character.encouragement;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showCharacterMessage(randomMessage, true);
    
    // Play success sound
    window.audioManager.playSound('correct');
    
    // Check for level up
    if (state.progress >= 100) {
        state.currentPlayer.level++;
        state.progress = 0;
        updateProgress();
        showCharacterMessage(`Level Up! You're now level ${state.currentPlayer.level}! 🎉`, true);
        window.audioManager.playSound('levelUp');
    }
    
    // Generate new problem after delay
    setTimeout(() => {
        generateProblem();
        checkBtn.disabled = false;
        answerInput.disabled = false;
        answerInput.value = '';
        answerInput.focus();
        state.isAnswerChecked = false;
    }, 2000);
}

// Handle Incorrect Answer
function handleIncorrectAnswer() {
    // Disable check button and input
    const checkBtn = document.querySelector('.check-btn');
    const answerInput = document.querySelector('.answer-input');
    checkBtn.disabled = true;
    answerInput.disabled = true;
    
    // Show encouraging message based on character
    const character = characterTraits[state.currentPlayer.character];
    let message;
    
    switch(state.currentPlayer.character) {
        case 'wizard':
            message = "Not quite, but remember: every mistake is a step toward mastery! Try again! 🧙‍♂️";
            break;
        case 'alien':
            message = "On my planet, we learn from every attempt! Let's try another one! 👽";
            break;
        case 'robot':
            message = "Error detected! But don't worry, even robots make mistakes. Try again! 🤖";
            break;
        default:
            message = "Not quite right, but you're getting closer! Try again! 💪";
    }
    
    showCharacterMessage(message, false);
    
    // Play error sound
    window.audioManager.playSound('wrong');
    
    // Re-enable input and button after delay
    setTimeout(() => {
        checkBtn.disabled = false;
        answerInput.disabled = false;
        answerInput.value = '';
        answerInput.focus();
        state.isAnswerChecked = false;
    }, 2000);
}

// Show Character Message
function showCharacterMessage(message, isCorrect = true) {
    const speechBubble = document.querySelector('.character-speech-bubble');
    speechBubble.textContent = message;
    speechBubble.classList.add('show');
    
    // Remove the show class after animation completes
    setTimeout(() => {
        speechBubble.classList.remove('show');
    }, 3000);
}

// Update Score
function updateScore() {
    scoreElement.textContent = state.currentPlayer.score;
}

// Update Progress
function updateProgress() {
    progressBar.style.width = `${state.progress}%`;
}

// Show/Hide Reward
function showReward() {
    const rewardScreen = document.getElementById('rewardScreen');
    const rewardAnimation = document.querySelector('.reward-animation');
    const rewardMessage = document.querySelector('.reward-message');
    
    rewardScreen.style.display = 'flex';
    rewardAnimation.textContent = '🎉';
    rewardMessage.textContent = 'Great job! Keep going!';
}

function hideReward() {
    const rewardScreen = document.getElementById('rewardScreen');
    rewardScreen.style.display = 'none';
}

// Level Up Reward
function showLevelUpReward() {
    rewardScreen.style.display = 'block';
    rewardScreen.classList.add('fade-in');
    
    const rewardAnimation = document.querySelector('.reward-animation');
    const rewardMessage = document.querySelector('.reward-message');
    
    rewardAnimation.textContent = '🏆';
    rewardMessage.textContent = `Level Up! You're now level ${state.currentPlayer.level}!`;
}

// Back to Menu
function backToMenu() {
    // Reset game state
    state.currentPlayer = {
        name: 'Player',
        character: null,
        score: 0,
        level: 1
    };
    state.currentTopic = null;
    state.currentProblem = null;
    state.progress = 0;
    
    // Reset UI
    welcomeScreen.style.display = 'block';
    gameContainer.style.display = 'none';
    rewardScreen.style.display = 'none';
    backBtn.style.display = 'none';
    
    // Reset character selection
    characters.forEach(c => c.classList.remove('selected'));
    
    // Reset progress and score display
    updateScore();
    updateProgress();
    
    // Reset topic selection
    topicBtns.forEach(btn => btn.classList.remove('active'));
}

// Initialize hint button
function initializeHintButton() {
    const hintBtn = document.querySelector('.hint-btn');
    const hintTimer = document.querySelector('.hint-timer');
    let hintTimerInterval;

    function resetHintButton() {
        hintBtn.disabled = true;
        clearInterval(hintTimerInterval);
        hintTimer.textContent = '';
    }

    function startHintTimer() {
        resetHintButton();
        
        let timeLeft = 5;
        hintTimer.textContent = `(${timeLeft}s)`;
        
        hintTimerInterval = setInterval(() => {
            timeLeft--;
            hintTimer.textContent = `(${timeLeft}s)`;
            
            if (timeLeft <= 0) {
                clearInterval(hintTimerInterval);
                hintBtn.disabled = false;
                hintTimer.textContent = '';
            }
        }, 1000);
    }

    function showHint() {
        if (!state.currentProblem) return;
        
        window.audioManager.playSound('hint');
        const character = characterTraits[state.currentPlayer.character];
        const { num1, num2, operator } = state.currentProblem;
        
        let hintMessage;
        switch (operator) {
            case '+':
                hintMessage = `Try counting up ${num2} more from ${num1}!`;
                break;
            case '-':
                hintMessage = `Start at ${num1} and count backwards ${num2} times!`;
                break;
            case '×':
                hintMessage = `Think of it as adding ${num1} ${num2} times!`;
                break;
            case '÷':
                hintMessage = `Try making ${num2} equal groups from ${num1} items!`;
                break;
        }
        
        // Show hint in speech bubble
        const speechBubble = document.querySelector('.character-speech-bubble');
        speechBubble.textContent = hintMessage;
        speechBubble.classList.add('show');
        
        // Hide hint after 4 seconds
        setTimeout(() => {
            speechBubble.classList.remove('show');
        }, 4000);
        
        // Disable hint button
        hintBtn.disabled = true;
    }

    // Add click event listener to hint button
    hintBtn.addEventListener('click', showHint);
    
    // Start hint timer
    startHintTimer();
    
    // Start hint timer when generating new problem
    const originalGenerateProblem = generateProblem;
    generateProblem = function() {
        originalGenerateProblem();
        startHintTimer();
    };
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    updateScore();
    updateProgress();
}); 