let isDraggingCheese = false;
let offsetX, offsetY;
let currentCheese = null;



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
                    currentCheese.style.display = 'none';
                }, 300);
            } else {
                console.log('Not close enough');
            }

            currentCheese.style.cursor = 'grab';
            isDraggingCheese = false;
            currentCheese = null;
        }
    });
});
