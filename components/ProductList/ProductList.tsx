import type { Product } from 'types/alza';

import Tabs, { Tab } from './Tabs';
import ProductItem from 'components/ProductItem';
import VerticalSpacer from 'components/Layout/VerticalSpacer';

import css from './ProductList.module.scss';


interface Props {
    products: Product[];
}

function ProductList({ products }: Props) {
    const tabs: Tab[] = [];

    tabs.push({
        title: 'TOP',
        active: true,
        content: (
            <>
                <VerticalSpacer />
                <div className={css.productList}>
                    {products.map((product) => {
                        return <ProductItem
                            key={product.id}
                            product={product}
                        />;
                    })}
                </div>
            </>
        )
    })

    const cheapest = [...products].sort((a, b) => {
        return a.priceNoCurrency - b.priceNoCurrency;
    })
    tabs.push({
        title: 'Od nejlevnějšího',
        active: true,
        content: (
            <>
                <VerticalSpacer />
                <div className={css.productList}>
                    {cheapest.map((product) => {
                        return <ProductItem
                            key={product.id}
                            product={product}
                        />;
                    })}
                </div>
            </>
        )
    })

    const mostExpensive = [...products].sort((a, b) => {
        return b.priceNoCurrency - a.priceNoCurrency;
    })
    tabs.push({
        title: 'Od nejdražšího',
        active: true,
        content: (
            <>
                <VerticalSpacer />
                <div className={css.productList}>
                    {mostExpensive.map((product) => {
                        return <ProductItem
                            key={product.id}
                            product={product}
                        />;
                    })}
                </div>
            </>
        )
    })

    return (
        <Tabs
            tabs={tabs}
        />
    )
}

export default ProductList;