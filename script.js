const word = document.querySelector('#word');
const text = document.querySelector('#text');
const scoreEl = document.querySelector('#score');
const timeEl = document.querySelector('#time');
const endGameEl = document.querySelector('#end-game-container');
const settingsBtn = document.querySelector('#settings-btn');
const settings = document.querySelector('#settings');
const settingsForm = document.querySelector('#settings-form');
const difficultyForm = document.querySelector('#difficulty');

const words = [
    'sign',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

let randomWord;

let score = 0;

let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultyForm.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';


// Focus on text input
text.focus();

function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)]
}

const timeInterval = setInterval(updateTime,1000);

function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver(){
    endGameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick='location.reload()'>Reload</button>
    `;

    endGameEl.style.display = 'flex';
}

addWordToDOM();

text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if(insertedText === randomWord){
        addWordToDOM();
        updateScore();

        e.target.value = '';

        if(difficulty === 'hard'){
            time += 2;
        }else if(difficulty === 'medium'){
            time += 3
        }else{
            time += 5
        }

        updateTime();
    }
});


// Settings
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty)
})