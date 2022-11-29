import Head from 'next/head'
import { GetServerSideProps } from 'next'

import type { Product } from 'types/alza'
import { getProducts } from '@/api/products';

import VerticalSpacer from '../components/Layout/VerticalSpacer'
import Categories from 'components/Categories';
import TopSales from 'components/TopSales';
import ProductList from 'components/ProductList';

import styles from '../styles/Home.module.scss'

interface Props {
    products: Product[],
    category: string,
    categories: string[],
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const products = await getProducts();
    return {
        props: {
            products,
            // v datech bylo malo kategorii, pridavam nejake rucne
            category: 'Notebooky',
            categories: ['Macbook', 'Herní', 'Kancelářské', 'Profesionalní', 'Stylové', 'Základní',  'Dotykové', 'Na splátky']
        }
    }
    // v pripade padu next sam vraci error page https://nextjs.org/docs/advanced-features/error-handling neni treba try-catch
}

export default function Home({
    products,
    category,
    categories
}: Props) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Alza domaci ukol</title>
            </Head>

            <main className={styles.main}>
                <Categories title={category} categories={categories} />
                <TopSales products={products}/>
                <VerticalSpacer />
                <ProductList products={products}/>
            </main>
        </div>
    )
}
