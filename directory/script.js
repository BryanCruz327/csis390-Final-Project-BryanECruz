let isDraggingCheese = false;
let offsetX, offsetY;
let currentCheese = null;

let noseHitBox = document.getElementById("noseHitBox");

noseHitBox.addEventListener("click", boop);

function boop(){
    document.getElementById("eyesImage").src = "projectAssets/eyesClosed.png";
    console.log("Clicked Eyes");
    
    setTimeout(()=>{
        document.getElementById("eyesImage").src = "projectAssets/eyesOpened.png";
    }, 2500);
};



let rightEyeHitBox = document.getElementById("eyesHitboxR");
let leftEyeHitBox = document.getElementById("eyesHitboxL");

rightEyeHitBox.addEventListener("click", rightWink);
leftEyeHitBox.addEventListener("click", leftWink);

function rightWink(){
    document.getElementById("eyesImage").src = "projectAssets/eyesRightWink.png";
    console.log("Clicked Eyes");
    
    setTimeout(()=>{
        document.getElementById("eyesImage").src = "projectAssets/eyesOpened.png";
    }, 1500);
};

function leftWink(){
    document.getElementById("eyesImage").src = "projectAssets/eyesLeftWink.png";
    console.log("Clicked Eyes");
    
    setTimeout(()=>{
        document.getElementById("eyesImage").src = "projectAssets/eyesOpened.png";
    }, 1500);
};



function blinking(){
    document.getElementById("eyesImage").src = "projectAssets/eyesClosed.png";

    setTimeout(()=>{
        document.getElementById("eyesImage").src = "projectAssets/eyesOpened.png";
    }, 200)
};

setInterval(blinking, 3500);

document.addEventListener('DOMContentLoaded', () => {
    const cheese1 = document.getElementById('cheese1');
    const cheese2 = document.getElementById('cheese2');
    const cheese3 = document.getElementById('cheese3');
    const cheese4 = document.getElementById('cheese4');
    const mouthSpan = document.getElementById('mouth');

    const cheeses = [cheese1, cheese2, cheese3, cheese4];

    cheeses.forEach((cheese) => {
        cheese.style.position = 'absolute';
        cheese.style.cursor = 'grab';

        cheese.addEventListener('mousedown', (e) => {
            if (!isDraggingCheese) {
                isDraggingCheese = true;
                currentCheese = cheese;
                offsetX = e.clientX - cheese.offsetLeft;
                offsetY = e.clientY - cheese.offsetTop;
                cheese.style.cursor = 'grabbing';            }
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (isDraggingCheese && currentCheese) {
            currentCheese.style.left = (e.clientX - offsetX) + 'px';
            currentCheese.style.top = (e.clientY - offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (isDraggingCheese && currentCheese) {
            const mouthRect = mouthSpan.getBoundingClientRect();
            const cheeseRect = currentCheese.getBoundingClientRect();

            const mouthCenterX = mouthRect.left + (mouthRect.width / 2);
            const mouthCenterY = mouthRect.top + (mouthRect.height / 2);
            const cheeseCenterX = cheeseRect.left + (cheeseRect.width / 2);
            const cheeseCenterY = cheeseRect.top + (cheeseRect.height / 2);

            const distance = Math.sqrt(
                Math.pow(mouthCenterX - cheeseCenterX, 2) +
                Math.pow(mouthCenterY - cheeseCenterY, 2)
            );

            if (distance <= 500 && distance >= 400) {
                currentCheese.style.transition = 'opacity 0.3s';
                currentCheese.style.opacity = '0';
                setTimeout(() => {
                    currentCheese.style.visibility = 'hidden';

                }, 300);

                document.getElementById("RShoulder").style.animation="eatingRS 2s";
                document.getElementById("LShoulder").style.animation="eatingLS 2s";
                document.getElementById("RHand").style.animation="eatingRH 2s";
                document.getElementById("LHand").style.animation="eatingLH 2s";

            } 
            
            else {
                console.log('Not close enough');
            }

            currentCheese.style.cursor = 'grab';
            isDraggingCheese = false;
            currentCheese = null;

            
        }
    });
    
        document.getElementById("RShoulder").style.animation="neutralRArm 5s infinite";
        document.getElementById("LShoulder").style.animation="neutralLArm 5s infinite";
        document.getElementById("RHand").style.animation="neutralRArm 5s infinite";
        document.getElementById("LHand").style.animation="neutralLArm 5s infinite";
});
