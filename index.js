var flowers = document.getElementsByClassName('flower');
for (let j = 0; j < flowers.length; j++) {
    var flower = flowers[j];
    for (let i = 0; i < 24; i++) {
        var angle = i * 15;
        flower.insertAdjacentHTML("beforeend", `
        <div class="petal" style="transform: rotate(${angle}deg);">
            <div class="circle"></div>
            <div class="left"></div>
            <div class="right"></div>
        </div>
        `);
    }
}

function startPermanentPetalAnimation() {
    var petals = document.getElementsByClassName('petal');
    for (var i = 0; i < petals.length; i++) {
        var p = petals[i];
        var angle = p.style.transform.replace('rotate(', '').replace('deg)', '');
        angle = parseFloat(angle);
        delay = (i % 2 == 0) ? 0 : 100;
        p.animate(
            [
                {transform: 'rotate(' + angle + 'deg)'},
                {transform: 'rotate(' + (angle + 2) + 'deg)'},
                {transform: 'rotate(' + angle + 'deg)'},
                {transform: 'rotate(' + (angle - 2) + 'deg)'},
                {transform: 'rotate(' + angle + 'deg)'}
            ], {
                duration: 3000,
                iterations: Infinity,
                easing: 'linear',
                direction: 'alternate',
                delay: delay,
            }
        );
    }
}
setTimeout(startPermanentPetalAnimation, 4500);