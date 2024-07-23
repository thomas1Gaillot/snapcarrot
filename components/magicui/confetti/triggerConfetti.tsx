import confetti from "canvas-confetti";
const triggerSideCannonConfetti = () => {
    const end = Date.now() + 1 * 1000; // 3 seconds
    const colors = ["#000000", "#ff9c00", "#ffffff", "#fdefd9"];

    const frame = () => {
        if (Date.now() > end) return;

        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: {x: 0, y: 0.5},
            colors: colors,
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: {x: 1, y: 0.5},
            colors: colors,
        });

        requestAnimationFrame(frame);
    };

    frame();
};

export default triggerSideCannonConfetti;