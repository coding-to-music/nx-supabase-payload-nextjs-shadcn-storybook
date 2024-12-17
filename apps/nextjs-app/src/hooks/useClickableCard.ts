"use client";
import {useRouter} from "next/navigation";
import React from "react";

interface UseClickableCardType<T extends HTMLElement> {
    card: {
        ref: React.RefObject<T | null>;
    };
    link: {
        ref: React.RefObject<HTMLAnchorElement | null>;
    };
}

interface Props {
    external?: boolean;
    newTab?: boolean;
    scroll?: boolean;
}

export const useClickableCard = <T extends HTMLElement>({
    external = false,
    newTab = false,
    scroll = true,
}: Props): UseClickableCardType<T> => {
    const router = useRouter();
    const card = React.useRef<T>(null);
    const link = React.useRef<HTMLAnchorElement>(null);
    const timeDown = React.useRef<number>(0);
    const hasActiveParent = React.useRef<boolean>(false);
    const pressedButton = React.useRef<number>(0);

    const handleMouseDown = React.useCallback(
        (event: MouseEvent) => {
            if (event.target) {
                const target = event.target as Element;

                const timeNow = Date.now();
                const parent = target?.closest("a");

                pressedButton.current = event.button;

                if (parent) {
                    hasActiveParent.current = true;
                } else {
                    hasActiveParent.current = false;
                    timeDown.current = timeNow;
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router, card, link, timeDown],
    );

    const handleMouseUp = React.useCallback(
        (event: MouseEvent) => {
            if (link.current?.href) {
                const timeNow = Date.now();
                const difference = timeNow - timeDown.current;

                if (
                    link.current?.href &&
                    difference <= 250 &&
                    !hasActiveParent.current &&
                    pressedButton.current === 0 &&
                    !event.ctrlKey
                ) {
                    if (external) {
                        const target = newTab ? "_blank" : "_self";
                        window.open(link.current.href, target);
                    } else {
                        router.push(link.current.href, {scroll});
                    }
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router, card, link, timeDown],
    );

    React.useEffect(() => {
        const cardNode = card.current;

        if (cardNode) {
            cardNode.addEventListener("mousedown", handleMouseDown);
            cardNode.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            if (cardNode && cardNode) {
                cardNode?.removeEventListener("mousedown", handleMouseDown);
                cardNode?.removeEventListener("mouseup", handleMouseUp);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [card, link, router]);

    return {
        card: {
            ref: card,
        },
        link: {
            ref: link,
        },
    };
};
