const cart = document.querySelector("nav .cart")
const cartSideBar = document.querySelector(".cart-sidebar")
const closeCart = document.querySelector("close-cart")
const burger = document.querySelector("burger")
const menuSidebar = document.querySelector(".menu-sidebar")
const closeMenu = document.querySelector(".close-menu")
const cartItemsTotal = document.querySelector("noi")
const cartPriceTotal = document.querySelector(".total-amount")
const cartUi = document.querySelector("cart-sidebar.cart")
const totalDiv = document.querySelector(".total-sum")
const clearBtn = document.querySelector(".clear-cart-btn")
const cartContent = document.querySelector(".cart-content")

let Cart=[];
let buttonsDOM = [];

cart.addEventListener("click",function(){
    cartSideBar.style.transform = "translate(0%)"
    const bodyOverlay = document.createElement("div")
    bodyOverlay.classList.add("overlay");
    setTimeout(function(){
        document.querySelector("body").append(bodyOverlay)
    },300)
})

closeCart.addEventListener("click",function(){
    cartSideBar.style.transform = "translate(100%)"
    const bodyOverlay = document.querySelector(".overlay")
    document.querySelector("body").removeChild(bodyOverlay)
})

burger.addEventListener("click",function(){
    menuSidebar.style.transform= "translate(0%)"
})

closeMenu.addEventListener("click",function(){
    menuSidebar.style.transform= "translate(-100%)"
})

class Product{
    async getProduct(){
        const response = await fetch("products.json");
        const data = await response.json();
        let products = data.items;
        products = products.map(item=>{
            const{title,price} = item.fields;
            const{id} = item.sys;
            const image = item.fields.image.fields.file.url;
            return {title,price,id,image};
        })
        return products;
    }
}

class UI{
    displayProducts(products){
        let result = "";
        products.forEach(products=>{
            const productDiv = document.createElement("div")
            productDiv.innerHTML =`<div class = "product-cart">
                                    <img src="${product.image}"alt="product">
                                    <span class= "add-to-cart" data-id=${product.id}">
                                    <i class = "fa fa-cart--plus fa-1x"
                        style ="margin-right:0.1em; font-size: 1em;"></i>
                                    Add to Cart
                                    </span>
                                    <div class = "product-name">${product.title}</div>
                                    <div class = "product-pricing">${product.price}</div>
                                    </div>`
            const p = document.querySelector(".product")
            p.append(productDiv)
        })
    }
}

getButtons(){
    const btns = document.querySelectorAll(".add-to-cart")
    Array.from(btns)
    buttonsDOM = btns;
    btns.forEach((btn)=>{
        let id = btn.dataset.id
        let inCart = Cart.find((item)=>item.id===id);
        if(inCart)
        {
            btn.innerHTML = "In Cart"
            btn.dissabled = true 

        }
        btn.addEventListener("click",(e)=>{
            e.currentTarget.innerHTML = "In Cart"
            e.currentTarget.style.color = "white"
            e.currentTarget.style.pointerEvents = "none"
            let cartItem = {...Storage.getStorageProducts(id),'amount':1}
            Cart.push(cartItem)
            Storage.saveCart(Cart)
            this.setCartValues(Cart)
            this.addCartItem(cartItem)
        })
    })
}
setCartValues(cart){
    let tempTotal = 0;
    let itemsTotal = 0;
    Cart.map((item)=> {
        tempTotal += (item.price*item.amount);
        itemTotal += item.amount;
        parseFloat(tempTotal.toFixed(2))
    })
    cartItemsTotal.innerHTML = itemsTotal
    cartPriceTotal.innerHTML = parseFloat(tempTotal.toFixed(2))
}
addCartItem(cartItem){
    let cartItemUi = document.createElement("div")
    cartItemUi.innerHTML = `<div class = "cart-product">
                            <div class = "product-image">
                                <img src = "${cartItem.image} alt="product">
                                <div class = "cart-product-content">
                                div class`
}