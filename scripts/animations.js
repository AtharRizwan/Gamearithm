// Visual Aid Animations
function updateVisualAid(isHintMode = false) {
    const objectsContainer = document.querySelector('.objects-container');
    objectsContainer.innerHTML = '';
    
    const { num1, num2, operator } = window.gameState.currentProblem;
    let objects = [];
    
    switch (operator) {
        case '+':
            objects = generateAdditionVisuals(num1, num2, isHintMode);
            break;
        case '-':
            objects = generateSubtractionVisuals(num1, num2, isHintMode);
            break;
        case '×':
            objects = generateMultiplicationVisuals(num1, num2, isHintMode);
            break;
        case '÷':
            objects = generateDivisionVisuals(num1, num2, isHintMode);
            break;
    }
    
    objects.forEach(obj => objectsContainer.appendChild(obj));
}

// Generate Visual Elements
function generateAdditionVisuals(num1, num2, isHintMode) {
    const objects = [];
    const emojis = ['🍎', '🍕', '🎈', '🎯', '⭐'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    for (let i = 0; i < num1 + num2; i++) {
        const obj = document.createElement('span');
        obj.textContent = randomEmoji;
        obj.classList.add('visual-object');
        obj.style.fontSize = '2rem';
        obj.style.opacity = '0';
        
        // Add animation delay
        setTimeout(() => {
            obj.style.opacity = '1';
            if (isHintMode) {
                if (i < num1) {
                    obj.style.color = '#2196F3'; // First number in blue
                } else {
                    obj.style.color = '#4CAF50'; // Second number in green
                }
            }
            obj.classList.add('bounce');
        }, i * 100);
        
        objects.push(obj);
    }
    
    if (isHintMode) {
        const separator = document.createElement('div');
        separator.style.width = '100%';
        separator.style.textAlign = 'center';
        separator.style.margin = '10px 0';
        separator.textContent = `${num1} + ${num2}`;
        separator.style.fontSize = '1.5rem';
        objects.splice(num1, 0, separator);
    }
    
    return objects;
}

function generateSubtractionVisuals(num1, num2, isHintMode) {
    const objects = [];
    const emojis = ['🍎', '🍕', '🎈', '🎯', '⭐'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    for (let i = 0; i < num1; i++) {
        const obj = document.createElement('span');
        obj.textContent = randomEmoji;
        obj.classList.add('visual-object');
        obj.style.fontSize = '2rem';
        
        if (isHintMode) {
            obj.style.opacity = i < num2 ? '0.3' : '1';
            obj.style.color = i < num2 ? '#F44336' : '#4CAF50'; // Red for subtracted, green for remaining
        } else {
            obj.style.opacity = i < num2 ? '0.3' : '1';
        }
        
        if (i >= num1 - num2) {
            obj.classList.add('fade-out');
        }
        
        objects.push(obj);
    }
    
    if (isHintMode) {
        const explanation = document.createElement('div');
        explanation.style.width = '100%';
        explanation.style.textAlign = 'center';
        explanation.style.margin = '10px 0';
        explanation.textContent = `Start with ${num1}, take away ${num2}`;
        explanation.style.fontSize = '1.5rem';
        objects.unshift(explanation);
    }
    
    return objects;
}

function generateMultiplicationVisuals(num1, num2, isHintMode) {
    const objects = [];
    const emojis = ['🍎', '🍕', '🎈', '🎯', '⭐'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    for (let i = 0; i < num1; i++) {
        const group = document.createElement('div');
        group.style.display = 'flex';
        group.style.gap = '10px';
        group.style.margin = '5px 0';
        
        if (isHintMode) {
            const groupLabel = document.createElement('span');
            groupLabel.textContent = `Group ${i + 1}:`;
            groupLabel.style.marginRight = '10px';
            group.appendChild(groupLabel);
        }
        
        for (let j = 0; j < num2; j++) {
            const obj = document.createElement('span');
            obj.textContent = randomEmoji;
            obj.classList.add('visual-object');
            obj.style.fontSize = '2rem';
            obj.style.opacity = '0';
            
            setTimeout(() => {
                obj.style.opacity = '1';
                if (isHintMode) {
                    obj.style.color = `hsl(${(i * 360/num1)}, 70%, 50%)`; // Different color for each group
                }
                obj.classList.add('bounce');
            }, (i * num2 + j) * 100);
            
            group.appendChild(obj);
        }
        
        objects.push(group);
    }
    
    if (isHintMode) {
        const explanation = document.createElement('div');
        explanation.style.width = '100%';
        explanation.style.textAlign = 'center';
        explanation.style.margin = '10px 0';
        explanation.textContent = `${num1} groups of ${num2}`;
        explanation.style.fontSize = '1.5rem';
        objects.unshift(explanation);
    }
    
    return objects;
}

function generateDivisionVisuals(num1, num2, isHintMode) {
    const objects = [];
    const emojis = ['🍎', '🍕', '🎈', '🎯', '⭐'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    for (let i = 0; i < num2; i++) {
        const group = document.createElement('div');
        group.style.display = 'flex';
        group.style.gap = '10px';
        group.style.margin = '5px 0';
        group.style.padding = '5px';
        
        if (isHintMode) {
            group.style.border = '2px dashed #2196F3';
            group.style.borderRadius = '10px';
            const groupLabel = document.createElement('span');
            groupLabel.textContent = `Group ${i + 1}:`;
            groupLabel.style.marginRight = '10px';
            group.appendChild(groupLabel);
        }
        
        objects.push(group);
    }
    
    for (let i = 0; i < num1; i++) {
        const obj = document.createElement('span');
        obj.textContent = randomEmoji;
        obj.classList.add('visual-object');
        obj.style.fontSize = '2rem';
        
        if (isHintMode) {
            obj.style.color = '#4CAF50';
        }
        
        objects[i % num2].appendChild(obj);
    }
    
    if (isHintMode) {
        const explanation = document.createElement('div');
        explanation.style.width = '100%';
        explanation.style.textAlign = 'center';
        explanation.style.margin = '10px 0';
        explanation.textContent = `Share ${num1} items into ${num2} equal groups`;
        explanation.style.fontSize = '1.5rem';
        objects.unshift(explanation);
    }
    
    return objects;
}

// Add animations for visual objects
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .shake {
        animation: shake 0.3s ease-in-out;
    }
    
    .visual-object {
        transition: all 0.3s ease;
    }
    
    .fade-out {
        opacity: 0.3;
        transition: opacity 0.3s ease;
    }
    
    .highlight {
        animation: highlight 2s ease;
    }
    
    @keyframes highlight {
        0%, 100% { transform: scale(1); box-shadow: none; }
        50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(33, 150, 243, 0.3); }
    }
`;
document.head.appendChild(style); 