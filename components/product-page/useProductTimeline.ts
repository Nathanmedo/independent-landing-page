"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
    container: React.RefObject<HTMLDivElement>;
}

export function useProductTimeline({ container }: Props) {

    useLayoutEffect(() => {

        if (!container.current) return;

        const ctx = gsap.context(() => {

            const cards = gsap.utils.toArray<HTMLElement>(".product-card");

            const progressBars =
                gsap.utils.toArray<HTMLElement>(".progress-bar");

            // Initial state

            gsap.set(cards, {
                autoAlpha: 0,
                zIndex: 0,
            });

            gsap.set(cards[0], {
                autoAlpha: 1,
                zIndex: 5,
            });

            cards.forEach((card, index) => {

                const image = card.querySelector(".product-image");

                const heading = card.querySelector(".product-title");

                const description =
                    card.querySelector(".product-description");

                const number =
                    card.querySelector(".product-number");

                const button =
                    card.querySelector(".product-button");

                const tl = gsap.timeline({

                    scrollTrigger: {

                        trigger: container.current,

                        start: () =>
                            `top top-=${window.innerHeight * index}`,

                        end: () =>
                            `top top-=${window.innerHeight * (index + 1)}`,

                        scrub: true,

                    }

                });

                tl.fromTo(
                    image,
                    {
                        x: 180,
                        opacity: 0,
                        scale: .8,
                        filter: "blur(10px)"
                    },
                    {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 1
                    },
                    0
                );

                tl.fromTo(
                    heading,
                    {
                        y: 120,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: .7,
                    },
                    0
                );

                tl.fromTo(
                    description,
                    {
                        y: 40,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                    },
                    .15
                );

                tl.fromTo(
                    button,
                    {
                        y: 30,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                    },
                    .3
                );

                tl.fromTo(
                    number,
                    {
                        y: 30,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: .3,
                    },
                    0
                );

                tl.to(
                    progressBars[index],
                    {
                        height: 60,
                        background: "#fff",
                        duration: .4
                    },
                    0
                );

            });

            // Floating animation

            gsap.to(".product-image", {

                y: -18,

                duration: 3,

                ease: "sine.inOut",

                repeat: -1,

                yoyo: true,

                stagger: .15

            });

        }, container);

        return () => ctx.revert();

    }, []);

}