// Reveal.js initialization
Reveal.initialize({
    controls: true,
    progress: true,
    center: true,
    hash: true,
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    slideNumber: true,
    width: '100%',
    height: '100%',
    minScale: 0.6,
    maxScale: 1.5,
    margin: 0.05,
    plugins: [RevealMarkdown, RevealHighlight, RevealNotes, RevealMath]
});

// Background music
const bgMusic = document.getElementById('bgMusic');
const muteButton = document.getElementById('muteButton');
let isPlaying = false;

Reveal.addEventListener('ready', function () {
    bgMusic.play().then(() => {
        isPlaying = true;
        muteButton.textContent = '🔇 Mute Music';
    }).catch(error => {
        console.warn("Autoplay prevented:", error);
        muteButton.textContent = '🔊 Play Music';
    });
});

muteButton.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        muteButton.textContent = '🔊 Play Music';
        isPlaying = false;
    } else {
        bgMusic.play().then(() => {
            muteButton.textContent = '🔇 Mute Music';
            isPlaying = true;
        }).catch(error => console.warn("Playback failed:", error));
    }
});

// Digit animation for title slide
function createDigitAnimation() {
    const container = document.querySelector('.digit-animation');
    if (!container) return;
    setInterval(() => {
        const digit = document.createElement('div');
        digit.className = 'digit';
        digit.textContent = Math.floor(Math.random() * 10);
        digit.style.left = Math.random() * 100 + '%';
        digit.style.setProperty('--x-pos', (Math.random() - 0.5) * 100 + 'px');
        digit.style.animationDuration = Math.random() * 3 + 2 + 's';
        container.appendChild(digit);
        setTimeout(() => digit.remove(), 5000);
    }, 300);
}
createDigitAnimation();

// Divisibility checker
function checkDivisibility() {
    const input = document.getElementById('numberInput');
    const resultDiv = document.getElementById('divisibilityResults');
    if (!input || !resultDiv) return;
    const num = parseInt(input.value);
    if (isNaN(num) || num < 0) {
        resultDiv.textContent = 'Please enter a positive integer.';
        return;
    }
    const rules = {
        2: num % 2 === 0,
        3: String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0) % 3 === 0,
        4: parseInt(String(num).slice(-2)) % 4 === 0,
        5: num % 10 === 0 || num % 10 === 5,
        6: num % 2 === 0 && String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0) % 3 === 0,
        9: String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0) % 9 === 0,
        10: num % 10 === 0
    };
    let result = 'Divisible by: ';
    const divisors = Object.keys(rules).filter(k => rules[k]).join(', ');
    resultDiv.textContent = divisors ? result + divisors : 'Not divisible by 2, 3, 4, 5, 6, 9, or 10.';
}

function showRule(divisor) {
    const explanationDiv = document.getElementById('ruleExplanation');
    if (!explanationDiv) return;
    const rules = {
        2: 'A number is divisible by 2 if its last digit is even (0, 2, 4, 6, 8).',
        3: 'A number is divisible by 3 if the sum of its digits is divisible by 3.',
        4: 'A number is divisible by 4 if the number formed by its last two digits is divisible by 4.',
        5: 'A number is divisible by 5 if its last digit is 0 or 5.',
        6: 'A number is divisible by 6 if it is divisible by both 2 and 3.',
        9: 'A number is divisible by 9 if the sum of its digits is divisible by 9.',
        10: 'A number is divisible by 10 if its last digit is 0.'
    };
    explanationDiv.textContent = rules[divisor] || 'Select a divisor to see its rule.';
}

// Prime number checker
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function checkPrime() {
    const input = document.getElementById('primeQuizInput');
    const resultDiv = document.getElementById('primeQuizResult');
    if (!input || !resultDiv) return;
    const num = parseInt(input.value);
    if (isNaN(num) || num < 0) {
        resultDiv.textContent = 'Please enter a positive integer.';
        return;
    }
    resultDiv.textContent = isPrime(num) ? `${num} is a prime number!` : `${num} is not a prime number.`;
}

// Sieve of Eratosthenes
function startSieve() {
    const grid = document.getElementById('sieveGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
    numbers.forEach(num => {
        const cell = document.createElement('div');
        cell.className = 'sieve-cell';
        cell.textContent = num;
        grid.appendChild(cell);
    });
    let current = 2;
    const cells = document.querySelectorAll('.sieve-cell');
    function step() {
        if (current > Math.sqrt(100)) {
            cells.forEach((cell, index) => {
                if (isPrime(index + 1)) cell.classList.add('prime');
            });
            return;
        }
        cells.forEach((cell, index) => {
            const num = index + 1;
            if (num !== current && num % current === 0 && num > current) {
                cell.classList.add('marked');
            }
        });
        cells[current - 1].classList.add('current');
        current = numbers.find(n => n > current && !cells[n - 1].classList.contains('marked'));
        if (current) setTimeout(step, 500);
        else {
            cells.forEach(cell => cell.classList.remove('current'));
            step();
        }
    }
    step();
}

// GCD Animation
function gcd(a, b) {
    while (b) {
        a = a % b;
        [a, b] = [b, a];
    }
    return a;
}

function animateGCD(a, b) {
    const blocksDiv = document.getElementById('gcdBlocks');
    const explanationDiv = document.getElementById('gcdExplanation');
    if (!blocksDiv || !explanationDiv) return;

    blocksDiv.innerHTML = '';
    explanationDiv.textContent = '';

    let steps = [];
    let tempA = a, tempB = b;

    while (tempB) {
        const quotient = Math.floor(tempA / tempB);
        const remainder = tempA % tempB;
        steps.push(`Divide ${tempA} by ${tempB}: ${tempA} = ${quotient} × ${tempB} + ${remainder}`);
        
        // Update values AFTER computing remainder
        const oldA = tempA;
        tempA = tempB;
        tempB = remainder;
    }

    steps.push(`GCD(${a}, ${b}) = ${tempA}`);

    let i = 0;
    function showStep() {
        if (i >= steps.length) return;
        blocksDiv.innerHTML = `<div class="gcd-block">${steps[i]}</div>`;
        explanationDiv.textContent = steps[i];
        i++;
        setTimeout(showStep, 2500);
    }

    showStep();
}


// Python code simulator
function runPythonCode() {
    const code = document.getElementById('pythonCode').value;
    const outputDiv = document.getElementById('codeOutput');
    if (!outputDiv) return;
    try {
        // Simulated Python execution (simplified)
        const gcdMatch = code.match(/num1\s*=\s*(\d+)\s*num2\s*=\s*(\d+)/);
        if (gcdMatch) {
            const num1 = parseInt(gcdMatch[1]);
            const num2 = parseInt(gcdMatch[2]);
            outputDiv.textContent = `GCD of ${num1} and ${num2} is: ${gcd(num1, num2)}`;
        } else {
            outputDiv.textContent = 'Error: Could not parse numbers from code.';
        }
    } catch (e) {
        outputDiv.textContent = 'Error executing code: ' + e.message;
    }
}

// Prime Factorization Tree
function generateFactorTree() {
    const input = document.getElementById('factorInput');
    const container = document.getElementById('factorTreeContainer');
    if (!input || !container) return;
    const num = parseInt(input.value);
    if (isNaN(num) || num < 2) {
        container.innerHTML = '<p>Please enter a positive integer greater than 1.</p>';
        return;
    }
    container.innerHTML = '';
    function factorize(n) {
        if (isPrime(n)) return [{ value: n, isPrime: true }];
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return [{ value: n, isPrime: false }, ...factorize(i), ...factorize(n / i)];
            }
        }
        return [{ value: n, isPrime: true }];
    }
    const factors = factorize(num);
    let html = `<div class="node">${num}</div>`;
    if (!isPrime(num)) {
        const firstLevel = factors.filter(f => f.value !== num);
        html += '<div class="line"></div><div class="branch">';
        firstLevel.forEach(f => {
            html += `<div class="node ${f.isPrime ? 'prime-factor' : ''}">${f.value}</div>`;
        });
        html += '</div>';
    }
    container.innerHTML = html;
}

// Clock Animation
var lastRotation = 0; // track current rotation angle

function moveClock(hours) {
    var lastRotation = 0
    const hand = document.getElementById('clockHand');
    const resultDiv = document.getElementById('clockResult');
    if (!hand || !resultDiv) return;

    const degrees = hours * 30;
    const isAt12 = (hours % 12 === 0);
    const displayHour = (hours % 12) || 12;
    const rotations = Math.floor(hours / 12);

    const applyRotation = () => {
        hand.style.transform = `rotate(${degrees}deg)`;
        lastRotation = degrees;
        resultDiv.textContent = `In ${hours} hours, the time is ${displayHour} o'clock (completed ${rotations} full rotations).`;
    };

    if (isAt12 && degrees > lastRotation) {
        // Pause before rotating to next 12 multiple
        setTimeout(applyRotation, 250);
    } else {
        applyRotation();
    }
}



// Modular Arithmetic Functions
function calculateModular() {
    const a = parseInt(document.getElementById('modCalcA').value);
    const b = parseInt(document.getElementById('modCalcB').value);
    const n = parseInt(document.getElementById('modCalcN').value);
    const op = document.getElementById('modCalcOp').value;
    const resultDiv = document.getElementById('modCalcResult');
    if (!resultDiv || isNaN(a) || isNaN(b) || isNaN(n) || n <= 0) {
        resultDiv.textContent = 'Please enter valid positive integers.';
        return;
    }
    let result;
    switch (op) {
        case 'add':
            result = (a + b) % n;
            resultDiv.textContent = `${a} + ${b} ≡ ${result} (mod ${n})`;
            break;
        case 'multiply':
            result = (a * b) % n;
            resultDiv.textContent = `${a} × ${b} ≡ ${result} (mod ${n})`;
            break;
        case 'power':
            result = 1;
            let base = ((a % n) + n) % n;
            let exp = b;
            while (exp > 0) {
                if (exp % 2 === 1) result = (result * base) % n;
                base = (base * base) % n;
                exp = Math.floor(exp / 2);
            }
            resultDiv.textContent = `${a}^${b} ≡ ${result} (mod ${n})`;
            break;
        default:
            resultDiv.textContent = 'Invalid operation.';
    }
}

function findModularInverse() {
    const a = parseInt(document.getElementById('invA').value);
    const n = parseInt(document.getElementById('invN').value);
    const resultDiv = document.getElementById('invResult');
    if (!resultDiv || isNaN(a) || isNaN(n) || n <= 0) {
        resultDiv.textContent = 'Please enter valid positive integers.';
        return;
    }
    function extendedGCD(a, n) {
        if (a === 0) return [n, 0, 1];
        const [gcd, x1, y1] = extendedGCD(n % a, a);
        const x = y1 - Math.floor(n / a) * x1;
        return [gcd, x, x1];
    }
    const [gcd, x] = extendedGCD(a, n);
    if (gcd !== 1) {
        resultDiv.textContent = `No modular inverse exists since gcd(${a}, ${n}) ≠ 1.`;
        return;
    }
    const inverse = ((x % n) + n) % n;
    resultDiv.textContent = `The modular inverse of ${a} mod ${n} is ${inverse}.`;
}

function runFLTDemo() {
    const a = parseInt(document.getElementById('fltA').value);
    const p = parseInt(document.getElementById('fltP').value);
    const resultDiv = document.getElementById('fltResult');
    if (!resultDiv || isNaN(a) || isNaN(p) || p <= 0) {
        resultDiv.textContent = 'Please enter valid positive integers.';
        return;
    }
    if (!isPrime(p)) {
        resultDiv.textContent = `${p} is not a prime number.`;
        return;
    }
    if (a % p === 0) {
        resultDiv.textContent = `Fermat's Little Theorem does not apply since ${a} is divisible by ${p}.`;
        return;
    }
    let result = 1;
    let base = ((a % p) + p) % p;
    let exp = p - 1;
    while (exp > 0) {
        if (exp % 2 === 1) result = (result * base) % p;
        base = (base * base) % p;
        exp = Math.floor(exp / 2);
    }
    resultDiv.textContent = `${a}^${p-1} ≡ ${result} (mod ${p})`;
}

function calculatePhi() {
    const n = parseInt(document.getElementById('phiN').value);
    const resultDiv = document.getElementById('phiResult');
    if (!resultDiv || isNaN(n) || n <= 0) {
        resultDiv.textContent = 'Please enter a positive integer.';
        return;
    }
    let phi = n;
    let temp = n;
    for (let i = 2; i * i <= temp; i++) {
        if (temp % i === 0) {
            while (temp % i === 0) temp /= i;
            phi *= (i - 1) / i;
        }
    }
    if (temp > 1) phi *= (temp - 1) / temp;
    resultDiv.textContent = `φ(${n}) = ${phi}`;
}

function solveCRT() {
    const a1 = parseInt(document.getElementById('crtA1').value);
    const n1 = parseInt(document.getElementById('crtN1').value);
    const a2 = parseInt(document.getElementById('crtA2').value);
    const n2 = parseInt(document.getElementById('crtN2').value);
    const resultDiv = document.getElementById('crtResult');
    if (!resultDiv || isNaN(a1) || isNaN(n1) || isNaN(a2) || isNaN(n2) || n1 <= 0 || n2 <= 0) {
        resultDiv.textContent = 'Please enter valid positive integers.';
        return;
    }
    if (gcd(n1, n2) !== 1) {
        resultDiv.textContent = 'Moduli must be coprime.';
        return;
    }
    const [_, m1] = extendedGCD(n2, n1);
    const x = (a1 + n1 * ((a2 - a1) * m1 % n2 + n2) % n2) % (n1 * n2);
    resultDiv.textContent = `x ≡ ${x} (mod ${n1 * n2})`;
}

// Diophantine Grid
function initializeDiophantineGrid() {
    const grid = document.getElementById('diophantineGrid');
    if (!grid) return;
    grid.innerHTML = '';
    for (let x = -10; x <= 10; x++) {
        for (let y = -10; y <= 10; y++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.textContent = `${x},${y}`;
            if (3 * x + 5 * y === 1) cell.classList.add('solution');
            grid.appendChild(cell);
        }
    }
}

function updateDiophantine() {
    const x = parseInt(document.getElementById('xSlider').value);
    const y = parseInt(document.getElementById('ySlider').value);
    const resultDiv = document.getElementById('diophantineResult');
    document.getElementById('xValue').textContent = x;
    document.getElementById('yValue').textContent = y;
    const value = 3 * x + 5 * y;
    resultDiv.textContent = `3(${x}) + 5(${y}) = ${value}`;
    if (value === 1) {
        resultDiv.style.color = '#4CAF50';
        resultDiv.textContent += ' (Solution!)';
    } else {
        resultDiv.style.color = '#F44336';
    }
}
Reveal.addEventListener('ready', initializeDiophantineGrid);

// Olympiad Solutions
function toggleOlympiadSolution(id) {
    const solution = document.getElementById(id);
    if (!solution) return;
    solution.style.display = solution.style.display === 'block' ? 'none' : 'block';
    const steps = solution.querySelectorAll('.step');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.opacity = '1';
        }, index * 500);
    });
}

function tryOlympiadProblem(id) {
    const tryDiv = document.getElementById(id);
    if (!tryDiv) return;
    tryDiv.style.display = tryDiv.style.display === 'block' ? 'none' : 'block';
}

function checkOlympiadAnswer(id, correctAnswer) {
    const input = document.getElementById(`${id}_input`);
    const feedbackDiv = document.getElementById(`${id}_feedback`);
    if (!input || !feedbackDiv) return;
    const answer = input.value.trim();
    feedbackDiv.textContent = answer === correctAnswer ? 'Correct!' : 'Try again!';
    feedbackDiv.style.color = answer === correctAnswer ? '#4CAF50' : '#F44336';
}

// Quiz Logic
const quizQuestions = [
    {
        question: 'Which of these is a prime number?',
        options: ['15', '17', '21', '25'],
        correct: '17',
        fact: 'A prime number has only two divisors: 1 and itself.'
    },
    {
        question: 'What is the GCD of 48 and 36?',
        options: ['6', '12', '18', '24'],
        correct: '12',
        fact: 'The GCD can be found using the Euclidean Algorithm.'
    },
    {
        question: 'What is 15 mod 4?',
        options: ['1', '2', '3', '4'],
        correct: '3',
        fact: 'Modular arithmetic is like clock arithmetic!'
    }
];
let currentQuestion = 0;
let score = 0;

function loadQuiz() {
    const questionDiv = document.getElementById('quizQuestion');
    const optionsDiv = document.getElementById('quizOptions');
    const feedbackDiv = document.getElementById('quizFeedback');
    const scoreDiv = document.getElementById('score');
    const nextButton = document.getElementById('nextQuizButton');
    if (!questionDiv || !optionsDiv || !feedbackDiv || !scoreDiv || !nextButton) return;
    const q = quizQuestions[currentQuestion];
    questionDiv.textContent = q.question;
    optionsDiv.innerHTML = '';
    q.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkQuizAnswer(option, q.correct, q.fact);
        optionsDiv.appendChild(button);
    });
    feedbackDiv.textContent = '';
    scoreDiv.textContent = score;
    nextButton.style.display = 'none';
}

function checkQuizAnswer(answer, correct, fact) {
    const feedbackDiv = document.getElementById('quizFeedback');
    const funFactDiv = document.getElementById('funFact');
    const options = document.querySelectorAll('.quiz-options button');
    const nextButton = document.getElementById('nextQuizButton');
    if (!feedbackDiv || !funFactDiv || !nextButton) return;
    options.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) btn.classList.add('correct');
        else if (btn.textContent === answer && answer !== correct) btn.classList.add('incorrect');
    });
    if (answer === correct) {
        feedbackDiv.textContent = 'Correct!';
        feedbackDiv.style.color = '#4CAF50';
        score += 10;
        document.getElementById('score').textContent = score;
    } else {
        feedbackDiv.textContent = `Incorrect. The correct answer is ${correct}.`;
        feedbackDiv.style.color = '#F44336';
    }
    funFactDiv.textContent = fact;
    funFactDiv.style.display = 'block';
    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        loadQuiz();
    } else {
        const quizContainer = document.querySelector('.quiz-container');
        if (quizContainer) {
            quizContainer.innerHTML = `<h3>Quiz Complete! Your final score: ${score}</h3>`;
        }
    }
}
Reveal.addEventListener('slidechanged', function (event) {
    if (event.currentSlide.querySelector('.quiz-container')) {
        currentQuestion = 0;
        score = 0;
        loadQuiz();
    }
});

// RSA Animation
Reveal.addEventListener('slidechanged', function (event) {
    if (event.currentSlide.querySelector('.rsa-animation-container')) {
        const boxes = document.querySelectorAll('.rsa-box');
        const arrows = document.querySelectorAll('.rsa-arrow');
        boxes.forEach((box, index) => {
            setTimeout(() => {
                box.classList.add('visible');
            }, index * 800);
        });
        arrows.forEach((arrow, index) => {
            setTimeout(() => {
                arrow.style.opacity = '1';
            }, (index + 1) * 800);
        });
    }
});

// Mind Map Animation
Reveal.addEventListener('slidechanged', function (event) {
    if (event.currentSlide.querySelector('.mind-map-container')) {
        const nodes = document.querySelectorAll('.mind-map-node');
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('visible');
            }, index * 500);
        });
    }
});