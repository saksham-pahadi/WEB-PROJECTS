

export async function GET(res) {
    try {

        const response = await fetch("https://dummyjson.com/products?limit=194");
        const data = await response.json();
        const products = data.products;
        // console.dir(products.reviews, { depth: null });
        // console.log(products[0].discountPercentage);
        // console.log(Object.keys(products));






        return new Response(JSON.stringify({ products }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}