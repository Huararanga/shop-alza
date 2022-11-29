import React, {
        useEffect,
        useRef,
    } from 'react';
import {
    observe,
    unobserve,
} from '@seznam/visibility-observer';

import css from './Carousel.module.scss';

// Carousel komponenta dokaze byt pekne slozita, zalezi na pozadavcich
// Vyrabim jen neco jednoducheho rychleho

export interface Intersection {
    isIntersecting: boolean;
    left: number;
    width: number;
}

interface Props {
    child: React.ReactNode;
    onIntersection: (intersection: Intersection) => void;
}

function CarouselItemWrapper({ child, onIntersection }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const callback = (visibilityEntry: IntersectionObserverEntry) => {
            onIntersection({
                isIntersecting: visibilityEntry.isIntersecting,
                left: visibilityEntry.boundingClientRect.left,
                width: visibilityEntry.boundingClientRect.width,
            });
        }
        const element = ref.current;
        if (element) {
            observe(element, callback)
        }

        return () => {
            if (element) {
                unobserve(element, callback)
            }
        }
    }, [onIntersection])

    return (
        <div
            ref={ref}
            className={css.itemWrapper}
        >
            {child}
        </div>
    )
}

export default CarouselItemWrapper;