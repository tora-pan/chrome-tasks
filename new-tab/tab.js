console.log('tab.js is running!');
const squares = document.querySelector('.squares');
for (var i = 1; i < 365; i++) {
    const level = Math.floor(Math.random() * 3);
    squares.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`);
}

// function animateRingRipple() {
//     const ripple = document.getElementById('ripple');
//     const duration = 1500; // Animation duration in milliseconds

//     // Set the initial state of the circle
//     ripple.setAttribute('r', '10');
//     ripple.setAttribute('stroke-opacity', '1');

//     // Create and run the animation
//     const animation = ripple.animate(
//         [
//             { r: '10', strokeOpacity: '1' },
//             { r: '30', strokeOpacity: '0' },
//             { r: '10', setOpacitiy: '1' },
//             { r: '30', strokeOpacity: '0' },
//             { r: '10', setOpacitiy: '1' },
//         ],
//         {
//             duration: duration,
//             easing: 'ease-in-out',
//         },
//     );

//     // Reset the circle to its initial state after the animation completes
//     // animation.onfinish = () => {
//     //     ripple.setAttribute('r', '10');
//     //     ripple.setAttribute('stroke-opacity', '1');
//     // };
// }

// Call the function to start the animation
// setInterval(animateRingRipple, 2000);
// animateRingRipple();

// var context = document
//     .createElement('canvas')
//     .getContext('2d', { willReadFrequently: true });
// var start = new Date();
// var lines = 16,
//     cW = 40,
//     cH = 40;

// var start = new Date();

// setInterval(function () {
//     console.log('setInterval');
//     var elapsedSeconds = (new Date() - start) / 1000;
//     var rippleRadius = Math.sin(elapsedSeconds) * 50 + 50; // Adjust amplitude and frequency for the ripple effect

//     context.save();
//     context.clearRect(0, 0, cW, cH);
//     context.translate(cW / 2, cH / 2);

//     context.beginPath();
//     context.arc(0, 0, rippleRadius, 0, 2 * Math.PI);
//     context.lineWidth = cW / 50;
//     context.strokeStyle = 'stroke: rgb(0, 0, 0, 0.5)';
//     context.stroke();

//     var imageData = context.getImageData(10, 10, 19, 19, {
//         willReadFrequently: true,
//     });
//     chrome.action.setIcon({
//         imageData: imageData,
//     });

//     context.restore();
// }, 1000 / 30);
