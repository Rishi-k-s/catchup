class DPadController {
    constructor() {
        this.createStartButton();
        this.currentDirection = null;
        this.isMobile = window.innerWidth <= 768;
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize);
    }

    handleResize() {
        this.isMobile = window.innerWidth <= 768;
        const dpad = document.querySelector('.d-pad');
        if (dpad) {
            if (this.isMobile) {
                document.body.appendChild(dpad);
            } else {
                const instructions = document.querySelector('.instructions');
                instructions.appendChild(dpad);
            }
        }
    }

    createStartButton() {
        const startButton = document.createElement('button');
        startButton.className = 'start-button';
        startButton.textContent = 'Start Game';
        startButton.addEventListener('click', () => this.startGame());
        
        const instructions = document.querySelector('.instructions');
        instructions.appendChild(startButton);
    }

    startGame() {
        const instructions = document.querySelector('.instructions');
        
        if (this.isMobile) {
            // On mobile, just hide the instructions content
            Array.from(instructions.children).forEach(child => {
                if (!child.classList.contains('d-pad')) {
                    child.style.display = 'none';
                }
            });
        } else {
            // On desktop, clear and add d-pad
            instructions.innerHTML = '';
        }
        
        this.createDPad(this.isMobile ? document.body : instructions);
        this.setupEventListeners();
    }

    createDPad(container) {
        const dpad = document.createElement('div');
        dpad.className = 'd-pad';
        dpad.innerHTML = `
            <button class="d-pad-btn up" data-direction="ArrowUp">↑</button>
            <button class="d-pad-btn right" data-direction="ArrowRight">→</button>
            <button class="d-pad-btn down" data-direction="ArrowDown">↓</button>
            <button class="d-pad-btn left" data-direction="ArrowLeft">←</button>
            <button class="d-pad-btn center" data-direction=" ">⚡</button>
        `;
        container.appendChild(dpad);
    }

    setupEventListeners() {
        const dpad = document.querySelector('.d-pad');
        
        // Mouse events
        dpad.addEventListener('mousedown', (e) => this.handleInput(e));
        document.addEventListener('mouseup', () => this.clearInput());
        
        // Touch events
        dpad.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleInput(e);
        });
        document.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.clearInput();
        });
    }

    handleInput(event) {
        const target = event.target;
        if (target.classList.contains('d-pad-btn')) {
            const direction = target.dataset.direction;
            this.currentDirection = direction;
            
            const keyEvent = new KeyboardEvent('keydown', {
                key: direction,
                code: direction,
                bubbles: true
            });
            document.dispatchEvent(keyEvent);
            
            target.classList.add('active');
        }
    }

    clearInput() {
        document.querySelectorAll('.d-pad-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.currentDirection = null;
    }
}

export default DPadController;