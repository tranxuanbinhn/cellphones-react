    // export const SortProductByDiscount = (products) => {
    //     products.sort((a,b) => {
    //         return (b.price - b.salePrice) - (a.price - a.salePrice);
    //     })
    //     const newSaleProducts = products.slice(0, 5);
        
    //     return handlePercentDiscount(newSaleProducts);
    // }

   

    export const formatPrice = (price) => {
        const formatter = new Intl.NumberFormat('vi')
        return formatter.format(price)
    }

    export const getFirstCharacterUser = (name) => {
        const arrCharacter = name.split('')[0]
        return arrCharacter
    } 

    export const formatDateOrderPaypal = (timestamp) => {
        const d = new Date( timestamp );
        const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
        return date
    } 
    