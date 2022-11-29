// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Product, AlzaData } from 'types/alza'

export async function getProducts() {
    const alza = await fetch('https://www.alza.cz/Services/RestService.svc/v2/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "filterParameters": {
                "id": 18855843,
                "isInStockOnly": false,
                "newsOnly": false,
                "wearType": 0,
                "orderBy": 0,
                "page": 1,
                "params": [{
                    "tId": 0,
                    "v": []
                }],
                "producers": [],
                "sendPrices": true,
                "type": "action",
                "typeId": "",
                "branchId": ""
            }
        })
    })
    const alzaData = await alza.json() as AlzaData;
    return alzaData.data;
}

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<Product[]>
) {
    try {
        const alza = await getProducts();
        res.status(200).json(alza)
        return;
    } catch (error) {
        // nevim co tu ma next za magic, ale nedari ze me zde nic zachytit a posila sam 500
    }
}
