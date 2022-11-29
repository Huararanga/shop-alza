import React, {
        useEffect,
        useRef,
        useState,
    } from 'react';
import cl from 'classnames';

import CarouselItemWrapper, { Intersection } from './CarouselItemWrapper';

import css from './Carousel.module.scss';

// Neresim nekonecnou smycku, venoval jsem cas posouvatkum s intersectionObserverem

interface Props {
    children: React.ReactNode;
}

function Carousel({ children }: Props) {
    const [hasArrows, setArrows ] = useState(false);

    useEffect(() => {
        const isTouchScreen = "ontouchstart" in window;
        if (!isTouchScreen) {
            setArrows(true);
        }
    }, [])

    const onLeft = () => {
        if (visibilityRef.current && carouselRef.current) {
            const lastIntersection = [...visibilityRef.current].find((intersection) => intersection.isIntersecting);
            const carouselRect = carouselRef.current.getBoundingClientRect();
            if (lastIntersection) {
                carouselRef.current.scrollTo({
                    left: lastIntersection.left + lastIntersection.width - carouselRect.width - carouselRect.left,
                    top: 0,
                    // TODO: nejak se smooth nechce
                    // behavior: 'smooth',
                });
            }
            
        }
    }

    const onRight = () => {
        if (visibilityRef.current && carouselRef.current) {
            const lastIntersection = [...visibilityRef.current].reverse().find((intersection) => intersection.isIntersecting)
            if (lastIntersection) {
                const carouselRect = carouselRef.current.getBoundingClientRect();
                carouselRef.current.scrollTo({
                    left: lastIntersection.left - carouselRect.left,
                    top: 0,
                });
            }  
        }
        console.log(visibilityRef.current)
    }

    const carouselRef = useRef<HTMLDivElement>(null);
    const visibilityRef = useRef<(Intersection)[] | undefined>(React.Children.map(children, () => {
        return {
            isIntersecting: false,
            left: 0,
            width: 0,
        }
    }));
    return (
        <div className={css.wrapper}>
            <div
                className={css.carousel}
                ref={carouselRef}
            >
                {hasArrows && (
                    <div
                        className={cl(css.arrow, css.arrowLeft)}
                        onClick={onLeft}
                    >
                        &lt;
                    </div>
                )}
                <div className={css.carouselInner}>
                    {React.Children.map(children, (child, index) => (
                        <CarouselItemWrapper
                            child={child}
                            onIntersection={(intersection) => {
                                if (visibilityRef.current && carouselRef.current) {
                                    visibilityRef.current[index] = {
                                        ...intersection,
                                        left: intersection.left + carouselRef.current.scrollLeft,
                                        width: intersection.width,
                                    };
                                }
                            }}
                        />
                    ))}
                </div>
                {hasArrows && (
                    <div
                        className={cl(css.arrow, css.arrowRight)}
                        onClick={onRight}
                    >
                        &gt;
                    </div>
                )}
            </div>
        </div>
    )
}

export default Carousel;