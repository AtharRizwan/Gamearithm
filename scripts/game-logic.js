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

// Learning Tips
const learningTips = {
    addition: [
        "Try counting on your fingers!",
        "Start with the bigger number and count up",
        "Look for pairs that make 10"
    ],
    subtraction: [
        "Count backwards",
        "Use objects to help you count",
        "Think of it as counting up from the smaller number"
    ],
    multiplication: [
        "Think of it as repeated addition",
        "Use the visual groups to help you",
        "Remember: 5 × 2 is the same as 2 × 5"
    ],
    division: [
        "Think of it as sharing equally",
        "Count how many groups you can make",
        "Use the visual groups to help you count"
    ]
};

// Character Personalities (extended traits for game logic)
const characterTraits = {
    wizard: {
        name: 'Professor Arithmus',
        emoji: '🧙‍♂️',
        style: 'magical',
        tips: {
            addition: [
                "Magic trick: Start with the bigger number in your mind, then count up!",
                "Remember, adding numbers is like gathering magical ingredients - one by one",
                "Look for special pairs that add up to 10 - they're like magical combinations!"
            ],
            subtraction: [
                "Wave your wand and count backwards - that's subtraction magic!",
                "Think of subtraction as making things disappear, one at a time",
                "Imagine you're removing stars from your magic wand"
            ],
            multiplication: [
                "Multiplication is like casting the same spell multiple times",
                "Think of it as magical duplication - one group repeated many times",
                "Every time you multiply, you're creating magical copies!"
            ],
            division: [
                "Division is like fairly sharing your magical potions",
                "Imagine sorting your spell books into equal piles",
                "Think of it as distributing magical treats equally to friends"
            ]
        },
        encouragement: [
            "Magnificent spell-casting! ✨",
            "Your mathematical magic is growing stronger! 🌟",
            "By the power of mathematics, you've done it! 🎯",
            "A true mathematical wizard in training! 🧙‍♂️"
        ]
    },
    alien: {
        name: 'Cosmo',
        emoji: '👽',
        style: 'scientific',
        tips: {
            addition: [
                "On my planet, we combine numbers using advanced technology!",
                "Think of addition like collecting space crystals",
                "Earthling tip: Count forward in your space calculator"
            ],
            subtraction: [
                "Imagine launching space rocks away from your ship",
                "In space, we remove meteors one by one",
                "Calculate the remaining stars in your galaxy"
            ],
            multiplication: [
                "Like creating identical space stations",
                "Think of it as cloning space creatures",
                "Multiply like expanding universes!"
            ],
            division: [
                "Share your space rations equally among crew members",
                "Division is like organizing aliens into equal teams",
                "Split your asteroid collection into equal groups"
            ]
        },
        encouragement: [
            "Intergalactic intelligence detected! 🚀",
            "Your Earth mathematics skills are out of this world! 🌎",
            "Cosmic calculations complete! ⭐",
            "Space-tacular work, Earth friend! 🛸"
        ]
    },
    robot: {
        name: 'Calculator-3000',
        emoji: '🤖',
        style: 'mechanical',
        tips: {
            addition: [
                "Input numbers sequentially for optimal addition",
                "Activate counting protocol: start with larger number",
                "System tip: Group numbers efficiently for faster processing"
            ],
            subtraction: [
                "Initialize reverse counting sequence",
                "Processing tip: Count backwards for accurate results",
                "Subtract units systematically for precise output"
            ],
            multiplication: [
                "Execute repeated addition protocol",
                "System analyzing: Groups of equal quantities detected",
                "Multiply using efficient grouping algorithms"
            ],
            division: [
                "Initiate equal distribution protocol",
                "System tip: Create equal subgroups for division",
                "Process objects through division algorithm"
            ]
        },
        encouragement: [
            "Calculation accuracy: 100%! 🔧",
            "Mathematical functions executing perfectly! ⚡",
            "All systems operational - great work! 🤖",
            "Computational excellence achieved! 💻"
        ]
    }
};

// Make character traits globally available
window.gameCharacterTraits = characterTraits;

// Streak Tracking
let currentStreak = 0;
const streakThreshold = 3;

// Update references to state
const state = window.gameState;

// Update Problem Generation based on Level
function getNumbersForLevel(topic) {
    const level = state.currentPlayer.level;
    const difficulty = difficultyLevels[Math.min(level, 3)][topic];
    
    const num1 = Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) + difficulty.min;
    const num2 = Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) + difficulty.min;
    
    return { num1, num2 };
}

// Show Learning Tip with Character Personality
function showLearningTip() {
    const character = characterTraits[state.currentPlayer.character];
    const tips = character.tips[state.currentTopic];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    const tipElement = document.createElement('div');
    tipElement.classList.add('learning-tip');
    tipElement.classList.add(`tip-style-${character.style}`);
    
    tipElement.innerHTML = `
        <div class="tip-content">
            <span class="tip-icon">${character.emoji}</span>
            <div class="tip-text">
                <p class="character-name">${character.name}</p>
                <p>${randomTip}</p>
            </div>
        </div>
    `;
    
    document.querySelector('.problem-container').appendChild(tipElement);
    
    setTimeout(() => {
        tipElement.remove();
    }, 5000);
}

// Show Character-Specific Reward
function showCharacterReward(isCorrect) {
    const character = characterTraits[state.currentPlayer.character];
    
    if (isCorrect) {
        const encouragement = character.encouragement[Math.floor(Math.random() * character.encouragement.length)];
        const rewardAnimation = document.querySelector('.reward-animation');
        const rewardMessage = document.querySelector('.reward-message');
        
        rewardAnimation.textContent = character.emoji;
        rewardMessage.textContent = encouragement;
    }
}

// Update the existing updateReward function
function updateReward(isCorrect) {
    if (isCorrect) {
        currentStreak++;
        
        if (currentStreak >= streakThreshold) {
            const bonusPoints = Math.floor(currentStreak / streakThreshold) * 5;
            state.currentPlayer.score += bonusPoints;
            showStreakReward(currentStreak, bonusPoints);
        }
        
        showCharacterReward(true);
    } else {
        currentStreak = 0;
        showCharacterReward(false);
    }
}

function showStreakReward(streak, bonus) {
    const streakReward = document.createElement('div');
    streakReward.classList.add('streak-reward');
    streakReward.innerHTML = `
        <span class="streak-icon">🔥</span>
        <span class="streak-text">${streak} in a row!</span>
        <span class="bonus-points">+${bonus} bonus points</span>
    `;
    
    document.querySelector('.score-container').appendChild(streakReward);
    
    setTimeout(() => {
        streakReward.remove();
    }, 2000);
}

// Add Keyboard Support
document.addEventListener('keydown', (e) => {
    const answerInput = document.querySelector('.answer-input');
    
    if (document.activeElement !== answerInput) {
        if (e.key >= '0' && e.key <= '9') {
            answerInput.focus();
            answerInput.value = e.key;
        }
    }
});

// Add Touch Support for Mobile/Tablet
document.addEventListener('touchstart', (e) => {
    if (e.target.classList.contains('character')) {
        e.target.classList.add('touch-active');
    }
});

document.addEventListener('touchend', (e) => {
    if (e.target.classList.contains('character')) {
        e.target.classList.remove('touch-active');
    }
});

// Add character-specific styles
const characterStyle = document.createElement('style');
characterStyle.textContent = `
    .tip-style-magical {
        background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
        color: white;
    }
    
    .tip-style-scientific {
        background: linear-gradient(135deg, #1a2980 0%, #26d0ce 100%);
        color: white;
    }
    
    .tip-style-mechanical {
        background: linear-gradient(135deg, #243949 0%, #517fa4 100%);
        color: white;
    }
    
    .character-name {
        font-weight: bold;
        margin-bottom: 5px;
    }
    
    .tip-text {
        display: flex;
        flex-direction: column;
    }
`;
document.head.appendChild(characterStyle);

// Initialize Game Logic
function initializeGameLogic() {
    // Show initial learning tip
    setTimeout(showLearningTip, 1000);
    
    // Add touch-specific styles
    const touchStyle = document.createElement('style');
    touchStyle.textContent = `
        .touch-active {
            transform: scale(0.95);
            opacity: 0.8;
        }
        
        .streak-reward {
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--secondary-color);
            padding: 5px 15px;
            border-radius: 20px;
            animation: slideUp 0.3s ease forwards;
        }
        
        @keyframes slideUp {
            from { transform: translate(-50%, 0); opacity: 0; }
            to { transform: translate(-50%, -20px); opacity: 1; }
        }
        
        .learning-tip {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: white;
            padding: 10px 20px;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            animation: fadeIn 0.3s ease forwards;
        }
        
        .tip-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .tip-icon {
            font-size: 1.5rem;
        }
    `;
    document.head.appendChild(touchStyle);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGameLogic);

// Character Companion Elements
const characterAvatar = document.querySelector('.character-avatar');
const speechBubble = document.querySelector('.character-speech-bubble');

// Initialize Character Companion
function initializeCharacterCompanion() {
    const character = characterTraits[state.currentPlayer.character];
    characterAvatar.textContent = character.emoji;
    speechBubble.classList.add(character.style);
    
    // Welcome message
    showCharacterMessage(`Hi! I'm ${character.name}! I'll help you learn math in my own special way!`, 4000);
    
    // Show first tip after welcome
    setTimeout(() => {
        showRandomTip();
    }, 4500);
}

// Show Character Message
function showCharacterMessage(message, duration = 3000) {
    const speechBubble = document.querySelector('.character-speech-bubble');
    const characterAvatar = document.querySelector('.character-avatar');
    
    // Clear any existing timeouts
    if (window.messageTimeout) {
        clearTimeout(window.messageTimeout);
    }
    
    // Show new message
    speechBubble.textContent = message;
    speechBubble.classList.add('show');
    characterAvatar.classList.add('bounce');
    
    // Hide message after duration
    window.messageTimeout = setTimeout(() => {
        speechBubble.classList.remove('show');
        characterAvatar.classList.remove('bounce');
    }, duration);
}

// Show Random Tip
function showRandomTip() {
    const character = characterTraits[state.currentPlayer.character];
    const tips = character.tips[state.currentTopic];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    showCharacterMessage(randomTip);
}

// Handle Correct Answer
function handleCorrectAnswer() {
    audioManager.playSound('correct');
    const character = characterTraits[state.currentPlayer.character];
    const encouragement = character.encouragement[Math.floor(Math.random() * character.encouragement.length)];
    
    showCharacterMessage(encouragement, 2000);
    
    state.currentPlayer.score += 10;
    state.progress += 10;
    updateScore();
    updateProgress();
    
    if (state.progress >= 100) {
        setTimeout(() => {
            audioManager.playSound('levelUp');
            state.currentPlayer.level++;
            state.progress = 0;
            updateProgress();
            showCharacterMessage(`Amazing! You've reached level ${state.currentPlayer.level}! 🎉`, 3000);
        }, 2500);
    }
    
    setTimeout(generateProblem, 2500);
}

// Handle Incorrect Answer
function handleIncorrectAnswer() {
    audioManager.playSound('wrong');
    const character = characterTraits[state.currentPlayer.character];
    const encouragingResponses = {
        wizard: [
            "Not quite right, but keep that magical spirit up! ✨",
            "Even the greatest wizards make mistakes. Let's try again! 🌟",
            "Your magic is strong, just needs a bit more focus! 🧙‍♂️"
        ],
        alien: [
            "Earth math can be tricky! Let's give it another shot! 🚀",
            "Don't worry, we'll solve this cosmic puzzle together! 🌎",
            "Calculating... that's not it, but you're getting closer! 👽"
        ],
        robot: [
            "Error detected, but that's how we learn! Let's recalculate! 🤖",
            "Adjusting parameters... Ready for another attempt! ⚡",
            "Processing... Solution not found, but we'll debug this together! 💻"
        ]
    };

    const responses = encouragingResponses[character.name.toLowerCase()] || encouragingResponses.wizard;
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    showCharacterMessage(response, 3000);
    
    const answerInput = document.querySelector('.answer-input');
    answerInput.classList.add('gentle-shake');
    setTimeout(() => answerInput.classList.remove('gentle-shake'), 500);
}

// Add gentle shake animation style
const gentleShakeStyle = document.createElement('style');
gentleShakeStyle.textContent = `
    @keyframes gentle-shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-3px); }
        75% { transform: translateX(3px); }
    }
    
    .gentle-shake {
        animation: gentle-shake 0.3s ease-in-out;
    }
`;
document.head.appendChild(gentleShakeStyle);

// Update checkAnswer function
function checkAnswer() {
    const userAnswer = parseInt(document.querySelector('.answer-input').value);
    
    if (isNaN(userAnswer)) {
        showCharacterMessage("Please enter a number!", 2000);
        return;
    }

    if (userAnswer === state.currentProblem.answer) {
        handleCorrectAnswer();
    } else {
        handleIncorrectAnswer();
    }
}

// Update the existing selectTopic function
function selectTopic(topic) {
    audioManager.playSound('click');
    state.currentTopic = topic;
    topicBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.topic === topic);
    });
    
    const character = characterTraits[state.currentPlayer.character];
    const messages = {
        addition: "Let's practice adding numbers!",
        subtraction: "Time to learn about taking away!",
        multiplication: "Ready to multiply some numbers?",
        division: "Let's share numbers into equal groups!"
    };
    
    showCharacterMessage(messages[topic]);
    setTimeout(generateProblem, 1500);
}

// Add hint button elements
const hintBtn = document.querySelector('.hint-btn');
const hintTimer = document.querySelector('.hint-timer');

// Initialize hint button
function initializeHintButton() {
    hintBtn.addEventListener('click', showHint);
    resetHintButton();
}

// Reset hint button state
function resetHintButton() {
    hintBtn.disabled = true;
    hintBtn.classList.remove('show');
    clearInterval(hintTimerInterval);
    hintTimer.textContent = '';
}

let hintTimerInterval;

// Start hint button timer
function startHintTimer() {
    resetHintButton();
    hintBtn.classList.add('show');
    
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

// Show hint
function showHint() {
    if (!state.currentProblem) return;
    
    audioManager.playSound('hint');
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
    
    showCharacterMessage(hintMessage, 4000);
    hintBtn.disabled = true;
    
    // Highlight visual aid
    const visualAid = document.querySelector('.visual-aid');
    visualAid.classList.add('highlight');
    setTimeout(() => visualAid.classList.remove('highlight'), 2000);
    
    // Update visual aid to show hint state
    updateVisualAid(true);
}

// Update generateProblem to include hint button reset
function generateProblem() {
    let num1, num2, operator, answer;

    switch (state.currentTopic) {
        case 'addition':
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            operator = '+';
            answer = num1 + num2;
            break;
        case 'subtraction':
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * num1) + 1;
            operator = '-';
            answer = num1 - num2;
            break;
        case 'multiplication':
            num1 = Math.floor(Math.random() * 5) + 1;
            num2 = Math.floor(Math.random() * 5) + 1;
            operator = '×';
            answer = num1 * num2;
            break;
        case 'division':
            num2 = Math.floor(Math.random() * 5) + 1;
            answer = Math.floor(Math.random() * 5) + 1;
            num1 = num2 * answer;
            operator = '÷';
            break;
    }

    state.currentProblem = { num1, num2, operator, answer };
    state.isAnswerChecked = false; // Reset the answer checked state
    displayProblem();
    updateVisualAid(false); // Reset visual aid
    startHintTimer(); // Start the hint timer
}

// Update startGame to initialize hint button
function startGame() {
    if (!state.currentPlayer.character) {
        alert('Please select a character first!');
        return;
    }

    welcomeScreen.style.display = 'none';
    gameContainer.style.display = 'grid';
    gameContainer.classList.add('fade-in');
    
    initializeCharacterCompanion();
    initializeHintButton();
    
    // Select the first topic by default after the welcome message
    setTimeout(() => {
        selectTopic('addition');
    }, 5000);
}

// Add idle animations and random encouragement
let idleMessageTimer;

function startIdleMessages() {
    idleMessageTimer = setInterval(() => {
        const idleTime = Date.now() - lastInteractionTime;
        if (idleTime > 15000) { // 15 seconds of inactivity
            const messages = [
                "Need any help?",
                "Take your time!",
                "You can do this!",
                "Want a hint?",
                "I'm here if you need me!"
            ];
            showCharacterMessage(messages[Math.floor(Math.random() * messages.length)]);
        }
    }, 15000);
}

let lastInteractionTime = Date.now();

// Track user interaction
document.addEventListener('mousemove', () => {
    lastInteractionTime = Date.now();
});

document.addEventListener('keypress', () => {
    lastInteractionTime = Date.now();
});

// Start idle messages when game starts
document.addEventListener('DOMContentLoaded', () => {
    audioManager.preloadSounds();
    startIdleMessages();
});

// Add highlight animation for visual aid
const highlightStyle = document.createElement('style');
highlightStyle.textContent = `
    .visual-aid.highlight {
        animation: highlight 2s ease;
    }
    
    @keyframes highlight {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(highlightStyle);

// Display Problem
function displayProblem() {
    const { num1, num2, operator } = state.currentProblem;
    
    const num1Element = document.querySelector('.num1');
    const num2Element = document.querySelector('.num2');
    const operatorElement = document.querySelector('.operator');
    const answerInput = document.querySelector('.answer-input');
    
    if (num1Element) num1Element.textContent = num1;
    if (num2Element) num2Element.textContent = num2;
    if (operatorElement) operatorElement.textContent = operator;
    if (answerInput) answerInput.value = '';
}

// Add sound button functionality
const soundBtn = document.querySelector('.sound-btn');
soundBtn.addEventListener('click', () => {
    const isMuted = audioManager.toggleMute();
    soundBtn.textContent = isMuted ? '🔈' : '🔊';
    soundBtn.classList.toggle('muted', isMuted);
    audioManager.playSound('click');
});

// Update character selection
function selectCharacter(characterElement) {
    const characterType = characterElement.dataset.character;
    if (!characterTraits[characterType]) {
        console.error('Character type not found:', characterType);
        return;
    }

    characters.forEach(c => c.classList.remove('selected'));
    characterElement.classList.add('selected');
    state.currentPlayer.character = characterType;
    
    audioManager.playSound('characterSelect');
    characterElement.textContent = characterTraits[characterType].emoji;
}

// Update topic selection
function selectTopic(topic) {
    audioManager.playSound('click');
    state.currentTopic = topic;
    topicBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.topic === topic);
    });
    
    const character = characterTraits[state.currentPlayer.character];
    const messages = {
        addition: "Let's practice adding numbers!",
        subtraction: "Time to learn about taking away!",
        multiplication: "Ready to multiply some numbers?",
        division: "Let's share numbers into equal groups!"
    };
    
    showCharacterMessage(messages[topic]);
    setTimeout(generateProblem, 1500);
}

// Initialize game with sound preloading
document.addEventListener('DOMContentLoaded', () => {
    audioManager.preloadSounds();
    startIdleMessages();
}); 