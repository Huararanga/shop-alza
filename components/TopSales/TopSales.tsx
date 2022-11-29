import type { Product } from 'types/alza';

import VerticalSpacer from 'components/Layout/VerticalSpacer';
import { ProductItemCarousel } from 'components/ProductItem';
import Carousel from 'components/Layout/Carousel';

import css from './TopSales.module.scss';

interface Props {
    products: Product[];
}

function TopSales({ products }: Props) {
    return (
        <>
            <VerticalSpacer />
            <h3 className={css.title}>Nejprodávanější</h3>
            <Carousel>
                {products.map((product) => {
                    return <ProductItemCarousel
                        key={product.id}
                        product={product}
                    />;
                })}
            </Carousel>
        </>
    )
}

export default TopSales;