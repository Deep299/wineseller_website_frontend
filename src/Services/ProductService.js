import products from '../assets/JesonSet/Product.json';
  
  class ProductService {


    static async getProducts() {
       // const response = await fetch(`${config.apiBaseUrl}/product/get`);
    //const products = await response.json();
    if (JSON.stringify(products) !== JSON.stringify(JSON.parse(localStorage.getItem('products')))) {
      localStorage.setItem('products', JSON.stringify(products));
    }
        const productsFromLocal = localStorage.getItem('products');
        return productsFromLocal ? JSON.parse(productsFromLocal) : [];
    }

    static handleAddToCart(product, firstInventory) {
      if (!firstInventory) {
        return; 
      }
  
      const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
      const existingProductIndex = cartProducts.findIndex(cartProduct => cartProduct.SKU === firstInventory.SKU);
  
      if (existingProductIndex !== -1) {
        cartProducts[existingProductIndex].quantity += 1;
      } else {
        cartProducts.push({ 
          id: product.ProductId,
          name: product.name,
          img: product.img,
          description: product.description,
          SKU: firstInventory.SKU,
          price: firstInventory.price,
          size: firstInventory.size,
          quantity: 1 
        });
      }
  
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      this.notifyCartChange();
    }


    static handleChangeQuantity(SKU, quantity) {
      const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
      const existingProductIndex = cartProducts.findIndex(cartProduct => cartProduct.SKU === SKU);
  
      if (existingProductIndex !== -1) {
        if (quantity > 0) {
          cartProducts[existingProductIndex].quantity = quantity;
        } else {
          cartProducts.splice(existingProductIndex, 1);
        }
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        this.notifyCartChange();
      }
  
      return cartProducts;
    }
    static notifyCartChange() {
    const event = new Event('cartChange');
    window.dispatchEvent(event);
  }   

  static notifyWishlistChange() {
    const event = new Event('WishlistChange');
    window.dispatchEvent(event);
  }   

    static handleAddToWishlist(product,Inventory) {
      const wishlistProducts = JSON.parse(localStorage.getItem('wishlistProducts')) || [];
      const existingProductIndex = wishlistProducts.findIndex( wishlistProduct => wishlistProduct.SKU === Inventory.SKU);
  
      if (existingProductIndex === -1) {
        wishlistProducts.push({ 
          id: product.ProductId,
          name: product.name,
          img: product.img,
          description: product.description,
          SKU: Inventory.SKU,
          price: Inventory.price,
          size: Inventory.size,
        });
        localStorage.setItem('wishlistProducts', JSON.stringify(wishlistProducts));
        this.notifyWishlistChange();
      }
      else{
        wishlistProducts.splice(existingProductIndex, 1);
        localStorage.setItem('wishlistProducts', JSON.stringify(wishlistProducts));
        this.notifyWishlistChange();
      }
    }
  }
  
  

  export default ProductService;