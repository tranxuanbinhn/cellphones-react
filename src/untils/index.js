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
    export const isAdmin = () => {
        // Đoạn mã này có thể làm phức tạp hơn nếu bạn lưu trữ vai trò một cách chi tiết hơn
        const role = localStorage.getItem('role'); // Lấy vai trò từ local storage (hoặc nơi lưu trữ khác)
        console.log('roles issss', role);
        return role === 'admin'; // Kiểm tra nếu vai trò là admin
      };
    export const formatDateOrderPaypal = (timestamp) => {
        const d = new Date( timestamp );
        const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
        return date
    } 
    