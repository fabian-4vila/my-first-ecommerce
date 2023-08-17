import cart from "./components/cart.js";
import darkMode from "./components/darkMode.js";
import loader from "./components/loader.js";
import products from "./components/products.js";
import showCart from "./components/showCart.js";
import showMenu from "./components/showMenu.js";
import getProducts from "./helpers/getProducts.js";
import navbar from "./components/navbar.js";

/* UI Elements */

// hidden loader 
loader()
// show menu 
showMenu()
// show cart 
showCart()
// dark Mode
darkMode()
// animation navbar
navbar()

/* End UI Elements */

// Products 
const { db, printProducts } = products(await getProducts())

// Cart 
cart(db, printProducts)