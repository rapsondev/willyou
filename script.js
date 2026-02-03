 
        // Mobile detection
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Get DOM elements
        const mainTitle = document.getElementById('mainTitle');
        const proposalMessage = document.getElementById('proposalMessage');
        const actionButtons = document.getElementById('actionButtons');
        const yesBtn = document.getElementById('yesBtn');
        const noBtn = document.getElementById('noBtn');
        const confirmationMessage = document.getElementById('confirmationMessage');
        const heartBalloons = document.querySelectorAll('.heart-balloon');
        const container = document.querySelector('.container');
        const audioInstruction = document.getElementById('audioInstruction');
        const audioPlaying = document.getElementById('audioPlaying');
        const valentineAudio = document.getElementById('valentineAudio');
        
        // Audio control variables
        let audioStarted = false;
        let userHasInteracted = false;
        
        // Function to handle YES button click
        function handleYesClick() {
            // Hide original content
            mainTitle.classList.add('hidden');
            proposalMessage.classList.add('hidden');
            actionButtons.classList.add('hidden');
            
            // Show confirmation message
            confirmationMessage.classList.add('show');
            
            // Create more heart balloons for celebration
            for (let i = 0; i < (isMobile ? 8 : 15); i++) {
                createHeartBalloon();
            }
            
            // Add celebration effect to existing balloons
            heartBalloons.forEach(balloon => {
                balloon.style.animationDuration = '1.5s';
                balloon.style.color = getRandomColor();
                balloon.style.fontSize = isMobile ? '2rem' : '2.5rem';
            });
            
            // Add celebration animation to container
            container.style.animation = 'pulse 0.8s 3';
            
            // Scroll to show confirmation message
            confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Vibrate on mobile if supported
            if (isMobile && navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
            
            // Set up audio instructions
            setTimeout(() => {
                audioInstruction.innerHTML = 
                    '<i class="fas fa-music"></i> Our special song is ready! Click anywhere on the page to play it! <i class="fas fa-music"></i>';
            }, 500);
        }
        
        // Function to handle NO button click
        function handleNoClick() {
            // Hide original content
            mainTitle.classList.add('hidden');
            proposalMessage.classList.add('hidden');
            actionButtons.classList.add('hidden');
            
            // Show confirmation message with different text
            confirmationMessage.classList.add('show');
            confirmationMessage.innerHTML = `
                <h2><i class="fas fa-heart heart"></i> Your Heart Said YES! <i class="fas fa-heart heart"></i></h2>
                <p>I saw you trying to click "No" but I knew your heart wanted to say "YES"! <i class="fas fa-grin-wink"></i></p>
                
                <div class="details">
                    <p><i class="fas fa-hotel" style="color: #ffccd5; margin-right: 10px;"></i> <strong>The Grand Plaza Hotel</strong></p>
                    <p><i class="fas fa-clock" style="color: #ffccd5; margin-right: 10px;"></i> <strong>7:00 PM</strong> Tonight</p>
                    <p><i class="fas fa-calendar" style="color: #ffccd5; margin-right: 10px;"></i> <strong>February 14th</strong></p>
                </div>
                
                <p>Our romantic dinner awaits! Can't wait to see you!</p>
                <p>Love you always <i class="fas fa-heart heart"></i></p>
                
                <div class="audio-instruction" id="audioInstruction">
                    <i class="fas fa-music"></i> Click anywhere on the page to play our special song! <i class="fas fa-music"></i>
                </div>
                
                <div class="audio-playing" id="audioPlaying">
                    <i class="fas fa-check-circle"></i> Our song is now playing... Enjoy the music! <i class="fas fa-heart"></i>
                </div>
            `;
            
            // Create celebration hearts
            for (let i = 0; i < (isMobile ? 12 : 20); i++) {
                createHeartBalloon();
            }
            
            // Scroll to show confirmation message
            confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Vibrate on mobile if supported
            if (isMobile && navigator.vibrate) {
                navigator.vibrate([50, 100, 50, 100]);
            }
        }
        
        // Function to move the "No" button
        function moveNoButton() {
            const safeAreaTop = 50;
            const safeAreaBottom = window.innerHeight - noBtn.offsetHeight - 50;
            const safeAreaLeft = 20;
            const safeAreaRight = window.innerWidth - noBtn.offsetWidth - 20;
            
            const x = Math.random() * (safeAreaRight - safeAreaLeft) + safeAreaLeft;
            const y = Math.random() * (safeAreaBottom - safeAreaTop) + safeAreaTop;
            
            if (!isMobile) {
                noBtn.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }
            
            noBtn.style.position = 'fixed';
            noBtn.style.left = `${x}px`;
            noBtn.style.top = `${y}px`;
            
            noBtn.style.animation = 'bounce 0.5s';
            setTimeout(() => {
                noBtn.style.animation = '';
            }, 500);
        }
        
        // Function to start audio playback
        function startAudio() {
            if (!audioStarted && userHasInteracted) {
                valentineAudio.play()
                    .then(() => {
                        console.log('Audio started playing successfully');
                        audioStarted = true;
                        audioInstruction.style.display = 'none';
                        audioPlaying.style.display = 'block';
                        
                        // Add celebration hearts when audio starts
                        for (let i = 0; i < 10; i++) {
                            setTimeout(() => {
                                createHeartBalloon(true);
                            }, i * 200);
                        }
                    })
                    .catch(error => {
                        console.error('Error playing audio:', error);
                        audioInstruction.innerHTML = 
                            '<i class="fas fa-exclamation-circle"></i> Could not play audio. Please click anywhere on the page again to start the song. <i class="fas fa-exclamation-circle"></i>';
                        audioInstruction.style.background = 'rgba(255, 100, 100, 0.3)';
                    });
            }
        }
        
        // Mark user interaction
        function markUserInteraction() {
            if (!userHasInteracted) {
                userHasInteracted = true;
                console.log('User interaction detected, audio can now play');
            }
        }
        
        // Event Listeners
        yesBtn.addEventListener('click', function() {
            markUserInteraction();
            handleYesClick();
        });
        
        noBtn.addEventListener('mouseover', moveNoButton);
        
        noBtn.addEventListener('click', function() {
            markUserInteraction();
            handleNoClick();
        });
        
        // Mobile touch events
        if (isMobile) {
            noBtn.addEventListener('touchstart', function(e) {
                e.preventDefault();
                moveNoButton();
            });
            
            yesBtn.addEventListener('touchend', function(e) {
                e.preventDefault();
                markUserInteraction();
                handleYesClick();
            });
            
            noBtn.addEventListener('touchend', function(e) {
                e.preventDefault();
                markUserInteraction();
                handleNoClick();
            });
            
            // Touch feedback
            document.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('touchstart', function() {
                    this.style.transform = 'translateY(3px)';
                });
                
                btn.addEventListener('touchend', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
        }
        
        // Audio control - click anywhere to play
        document.body.addEventListener('click', function() {
            markUserInteraction();
            
            if (confirmationMessage.classList.contains('show')) {
                startAudio();
            }
        });
        
        // Function to create heart balloons
        function createHeartBalloon() {
            const balloon = document.createElement('div');
            balloon.className = 'heart-balloon';
            balloon.innerHTML = '<i class="fas fa-heart"></i>';
            balloon.setAttribute('aria-label', 'floating heart');
            
            const x = Math.random() * (window.innerWidth - 60);
            const y = Math.random() * (window.innerHeight - 60);
            balloon.style.left = `${x}px`;
            balloon.style.top = `${y}px`;
            
            const size = isMobile ? 
                (Math.random() * 1 + 1.2) : 
                (Math.random() * 2 + 1.5);
            balloon.style.fontSize = `${size}rem`;
            
            balloon.style.color = getRandomColor();
            
            const duration = Math.random() * 25 + 15;
            const delay = Math.random() * -30;
            balloon.style.animation = `float ${duration}s infinite linear`;
            balloon.style.animationDelay = `${delay}s`;
            
            balloon.addEventListener(isMobile ? 'touchstart' : 'click', function(e) {
                if (isMobile) e.preventDefault();
                
                this.style.transform = 'scale(1.8)';
                this.style.opacity = '0';
                this.style.transition = 'all 0.3s';
                
                setTimeout(() => {
                    if (this.parentNode) {
                        this.parentNode.removeChild(this);
                    }
                }, 300);
                
                setTimeout(() => {
                    createHeartBalloon();
                }, 500);
                
                if (isMobile && navigator.vibrate) {
                    navigator.vibrate(50);
                }
            });
            
            document.body.appendChild(balloon);
        }
        
        // Function to get random color
        function getRandomColor() {
            const colors = ['#e63946', '#ff5e8e', '#ff99ac', '#ffccd5', '#ff8fab', '#ffafcc', '#ffc2d1'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        // Initialize
        window.addEventListener('load', function() {
            if (isMobile) {
                for (let i = 0; i < 4; i++) {
                    createHeartBalloon();
                }
            }
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
            
            markUserInteraction();
            
            // Set audio volume
            valentineAudio.volume = 0.7;
        });
        
        // Audio event listeners
        valentineAudio.addEventListener('playing', () => {
            audioInstruction.style.display = 'none';
            audioPlaying.style.display = 'block';
        });
        
        valentineAudio.addEventListener('ended', () => {
            setTimeout(() => {
                valentineAudio.currentTime = 0;
                valentineAudio.play();
            }, 2000);
        });
    