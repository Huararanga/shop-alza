import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import cl from 'classnames';

import type { Product } from 'types/alza';

import css from './ProductItem.module.scss';

const SIZE = 200;

const SELECT_OPTIONS = [
    { value: 'fastBuy', label: 'Koupit zrychleně' },
    { value: 'compare', label: 'Porovnat' },
    { value: 'watchDog', label: 'Hlídat' },
    { value: 'addToList', label: 'Přidat do seznamu' }
  ]

interface Props {
    product: Product;
}

function ProductItemCarosuel({ product }: Props) {
    const { 
        name,
        spec: text,
        img,
        self: { href },
        rating,
        priceInfo: {
            priceWithVat,
        },
    } = product;
    return (
        <a
            className={cl(css.item, css.itemCarousel)}
            href={href}
        >
            <div className={css.imageContainer}>
                <Image
                    className={css.image}
                    src={img}
                    alt={name}
                    width={SIZE}
                    height={SIZE}
                />
            </div>
            <h3 className={css.titleCarousel}>{name}</h3>
            <Rating
                    size={20}
                    initialValue={rating}
                />
            <div className={css.text}>{text}</div>
            <div className={css.priceWithVat}>{priceWithVat}</div>
        </a>
    )
}

export default ProductItemCarosuel;