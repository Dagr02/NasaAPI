import { useEffect, useState } from "react"


type Star = {
    id: number,
    size: number,
    x: number,
    y: number,
    opacity: number,
    animationDuration: number,
}

type Meteor = {
    id: number,
    size: number,
    x: number,
    y: number,
    delay: number,
    animationDuration: number,
}

const StarBackground = () => {
    const [stars, setStars] = useState<Star[]>([])
    const [meteors, setMeteors] = useState<Meteor[]>([])
    useEffect(() => {
        generateStars();
        generateMeteors();

        const handleResize = () => {
            generateStars();
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const generateStars = () => {
        const numberOfStars = Math.floor(
            (window.innerWidth * window.innerHeight) / 10000
        );

        const newStars = [];

        for (let i = 0; i < numberOfStars; i++) {
            newStars.push({
                id: i,
                size: Math.random() * 3 + 1,
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: Math.random() * 0.5 + 0.5,
                animationDuration: Math.random() * 4 + 2,
            });
        }

        setStars(newStars);
    };

    const generateMeteors = () => {
        const numberOfMeteors = 4;
        const newMeteors = [];

        for (let i = 0; i < numberOfMeteors; i++) {
            newMeteors.push({
                id: i,
                size: Math.random() * 2 + 1,
                x: Math.random() * 100,
                y: Math.random() * 20,
                delay: Math.random() * 15,
                animationDuration: Math.random() * 3 + 3,
            });
        }

        setMeteors(newMeteors);
    };

    return (
        <div data-testid="star-background" className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {stars.map((star) => (
                <div data-testid={`star-test-id-${star.id}`} key={star.id} className="star animate-pulse-subtle" style={{
                    width: star.size + "px",
                    height: star.size + "px",
                    left: star.x + "%",
                    top: star.y + "%",
                    opacity: star.opacity,
                    animationDuration: star.animationDuration + "s",
                }} />
            ))}

            {meteors.map((meteor) => (
                <div
                    data-testid={`meteor-test-id-${meteor.id}`}
                    key={meteor.id}
                    className="meteor animate-meteor"
                    style={{
                        width: meteor.size * 50 + "px",
                        height: meteor.size * 1 + "px",
                        left: meteor.x + "%",
                        top: meteor.y + "%",
                        visibility: "hidden",
                        animationDelay: meteor.delay + "s",
                        animationDuration: meteor.animationDuration + "s",
                        animationFillMode: "forwards",
                    }}
                />
            ))}
        </div>
    )
}

export default StarBackground