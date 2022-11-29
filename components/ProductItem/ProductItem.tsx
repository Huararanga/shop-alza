import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import Select from 'react-select';
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

function ProductItem({ product }: Props) {
    const { 
        name,
        spec: text,
        img,
        self: { href },
        rating,
        priceInfo: {
            priceWithVat,
            priceWithoutVat
        },
        avail,
    } = product;
    return (
        <a
            className={cl(css.item, css.itemGrid)}
            href={href}
        >
            <div>
                <h3 className={css.title}>{name}</h3>
                <div className={css.text}>{text}</div>
            </div>
            <div>
                <div className={css.imageContainer}>
                    <Image
                        className={css.image}
                        src={img}
                        alt={name}
                        width={SIZE}
                        height={SIZE}
                    />
                    <div className={css.ratingStars}>
                        <Rating
                            size={20}
                            initialValue={rating}
                        />
                    </div>
                </div>
                <div className={css.bottomRow}>
                    <span>
                        <div className={css.priceWithVat}>{priceWithVat}</div>
                        <div>{priceWithoutVat}</div>
                    </span>
                    {/*
                        Select ma hodne requirementu, ktere je treba dospecifikovat napr.:
                            - chceme aby krom select byla cela karta klikatelna (hlavne na mobilu)?
                            - design je maly. Kam zobrazovat, kdyz je dlouhy text?
                            - jak zobrazovat na mobilu (mozna overlay)?
                            => papalo by hodne casu, neresim
                    */}
                    <Select
                        options={SELECT_OPTIONS}
                        // handle onChange
                        menuPlacement='top'
                    />
                </div>
                <div className={css.stock}>{avail}</div>
            </div>
        </a>
    )
}

export default ProductItem;