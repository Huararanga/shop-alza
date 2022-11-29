export interface Product {
    id: number;
    self: { // viewerProductInfo vedl na 404, radej pouzivam self, je i lepsi na dev
        href: string; // nechci odchazet na celou stranku
    };
    priceInfo: {
        priceWithoutVat: string;
        priceWithVat: string;
    };
    priceNoCurrency: number;
    name: string;
    spec: string;
    avail: string;
    rating: number;
    img: string;
}

export interface AlzaData {
    data: Product[];
}