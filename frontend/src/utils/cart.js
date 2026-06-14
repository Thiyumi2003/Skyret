
const exampleCart = [

    {
        product : {
            productId : "1234567890",
            name : "Example Product",
            image : "https://via.placeholder.com/150",
            labelledPrice : 100,
            price : 80,
        },
        quantity : 2
    },{
        product : {
            productId : "1234567890",
            name : "Example Product",
            image : "https://via.placeholder.com/150",
            labelledPrice : 100,
            price : 80,
        },
        quantity : 1
    }


]

export function getCart(){

    const cartString = localStorage.getItem("cart");

    if(cartString == null){

        localStorage.setItem("cart" , "[]")
        return []

    }else{
        const cart = JSON.parse(cartString);
        return cart;
    }

}

export function addToCart(product , quantity){

    const cart = getCart()

    const existingProductIndex = cart.findIndex(

        (item)=>{
            return item.product.productId == product.productId
        }

    ) // -1 if not found

    if(existingProductIndex == -1){

        if(quantity > 0){
            cart.push(
                {
                    product : {
                        productId : product.productId,
                        name : product.name,
                        image : product.images[0],
                        labelledPrice : product.labelledPrice,
                        price : product.price,
                    },
                    quantity : quantity
                }
            )
        }

    }else{

        const newQty = cart[existingProductIndex].quantity + quantity;

        if(newQty > 0){

            cart[existingProductIndex].quantity = newQty;

        }else{

            cart.splice(existingProductIndex , 1)

        }

    }

    const cartString = JSON.stringify(cart);

    localStorage.setItem("cart" , cartString)    
}

export function getCartTotal(cart){
        
    let total = 0;

    for(let i= 0; i<cart.length; i++){
        
        //total = total + cart[i].product.price * cart[i].quantity

        total += cart[i].product.price * cart[i].quantity

    }

    return total;
    
}