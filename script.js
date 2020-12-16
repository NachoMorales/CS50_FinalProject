    // Sidenav dropdowns
function dropdown(n) {
    x = document.getElementById("dropdown" + n)
    if (x.style.display === 'block') {
        return x.style.display = 'none';
    } else {
        return x.style.display = 'block';
    }
}

// Global variables
var productsFilteredVariable
var keyVariable
var valueVariable
var brandVariable
var sortVariable = 'category'; // Default: Sort products by category

// Load products from json file
var products = new Array()
fetch("./products.json")
    .then(function(resp) {
        return resp.json();
    })
    // This part will run after filterProducts() function, so
    .then(function(data) {
        products = data;
        // We call filterProducts() again with the global variables updated
        filterProducts(keyVariable, valueVariable, brandVariable);
        searchBar(products);
        goToTop();
    });

    // Check hash
function checkIfRedirected(key, value, brand) {
    if (location.hash != "") {
        var split = location.hash.split("-");
        replacedSplit = split[2].replace("%20", " ");
        return filterProducts(split[1], replacedSplit);
    } else {
        return filterProducts(key, value, brand);
    }
}



// This function filters products -onload & -onclick 
function filterProducts(key, value, brand) {
    // Update Breadcrumb
    activeLi = document.querySelector(".breadcrumb .active");
    allProductsLi = document.querySelector(".breadcrumb #allProducts")
    allProductsLiContent = document.querySelector(".breadcrumb #allProducts a")
    categoryLi = document.querySelector(".breadcrumb #category")
    categoryLiContent = document.querySelector(".breadcrumb #category a")

    // Update global variables
    keyVariable = key;
    valueVariable = value;
    brandVariable = brand;

    if (brand == null) {
            // Show all products
        if (key == 'all') {
            productsFilteredVariable = products.filter(item => item.all == value);

            // Updating breadcrumb
            activeLi.innerHTML = "All Products";
            allProductsLi.style.display = "none";
            categoryLi.style.display = "none";

            return sort(sortVariable, productsFilteredVariable);
    
            // Filter by category
        } else if (key == 'category') {
            productsFilteredVariable = products.filter(item => item.category == value);
            
            // Updating breadcrumb
            activeLi.innerHTML = value;
            allProductsLiContent.innerHTML = "All Products"
            allProductsLi.style.removeProperty('display');
            categoryLi.style.display = "none";

            return sort(sortVariable, productsFilteredVariable);

        } else if (key == 'brand') {
            var brandArray = new Array();
            brandArray = value;
            productsFilteredVariable = products.filter(item => item.brand == value);

            // Updating breadcrumb
            activeLi.innerHTML = value;
            allProductsLiContent.innerHTML = "All Products"
            allProductsLi.style.removeProperty('display');
            categoryLi.style.display = "none";

            return sort(sortVariable, productsFilteredVariable)
        }

        // Filter by brand
    } else {
        productsFilteredVariable = products.filter(item => item.category == value);
        productsFilteredVariable = productsFilteredVariable.filter(item => item.brand === brand);
        // Updating breadcrumb
        activeLi.innerHTML = brand;
        allProductsLiContent.innerHTML = "All Products"
        allProductsLi.style.removeProperty('display');
        categoryLiContent.innerHTML = value
        categoryLi.style.removeProperty('display');
        var onClickAttribute = document.createAttribute("onclick");
        onClickAttribute.value = `filterProducts('category', '${value}')`
        categoryLiContent.setAttributeNode(onClickAttribute);


        return sort(sortVariable, productsFilteredVariable);
    }
}

function sort(orderby, productsFiltered) {
    sortVariable = orderby;
    // If function was triggered by button, this will make it work 
    if (productsFiltered == null) {
        productsFiltered = productsFilteredVariable;
    }

    // Does not sort elements
    if (orderby == null) {
        return cards(productsFiltered)
    }
    // Sort by price
    if (orderby == 'price') {
        productsFiltered.sort(function(a, b){return b.price - a.price}); 
        return cards(productsFiltered);
    } else if (orderby == 'price-') {
        productsFiltered.sort(function(a, b){return a.price - b.price}); 
        return cards(productsFiltered)
    }

        // Sort by name
    else if (orderby == 'name') {
    productsFiltered.sort(function(a, b){
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      }); 
      return cards(productsFiltered)

    }   else if (orderby == 'name-') {
        productsFiltered.sort(function(a, b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;
          }); 
          return cards(productsFiltered)

        // Sort by category
    }   else if (orderby == 'category') {
        productsFiltered.sort(function(a, b){
            var x = a.category.toLowerCase();
            var y = b.category.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        }); 
        return cards(productsFiltered);
    }
}


    
var needToReloadSpecs = false;
// This function filters how many cards are going to be shown in the page and then loads the content on them
// NOTE: 'maxCards' value must be equal to the number of total cards in html
function cards(filteredCards) {
    // Filter how many cards are going to be shown
    for (var maxCards = 60; maxCards >= filteredCards.length;) {
        var highestCardId = document.getElementById("card" + maxCards);
        maxCards -= 1;
        highestCardId.style.display = 'none';
    }

    // Load content into the cards
    for (var card = 0; card < filteredCards.length; card += 1) {
        id = document.querySelector("#card" + card)
        id.getElementsByTagName("h4")[0].textContent = filteredCards[card].name;
        id.getElementsByTagName("h5")[0].textContent = "$" + filteredCards[card].price;
        id.getElementsByTagName("img")[0].src = filteredCards[card].image;
        var itemSpecs = filteredCards[card].specs.length

        for (var i = 0; i < itemSpecs;) {
            if (!needToReloadSpecs) {
                // Create new line between specs
                id.getElementsByTagName("p")[0].innerHTML += "- " + filteredCards[card].specs[i] + "\n";

                // If you have re-filtered or sorted the products, this will remove the previous specs and replace them with the new ones
            } else if (needToReloadSpecs) {
                id.getElementsByTagName("p")[0].innerHTML = "";
                needToReloadSpecs = false;
                id.getElementsByTagName("p")[0].innerHTML += "- " + filteredCards[card].specs[i] + "\n";
            }
            i += 1;
        }
        needToReloadSpecs = true;
        
        
        // If you have re-filtered (without reloading the page), this will make sure every valid card is shown
        var lowestCardId = "card" + card;
        if (document.getElementById(lowestCardId).style.display == 'none') {
            document.getElementById(lowestCardId).style.removeProperty('display');
        }
    }
}

// card.onclick => showModal
function showModal(id) {
    
    // search bar is causing problems when modal is active: hide it
    var searchBar = document.querySelector(".input-group");
    searchBar.style.visibility = "hidden";


    if (id == 'cart') {
        var cartModal = document.getElementById("cartModal");
        return cartModal.style.display = "block"    
    }
    
    if (id == 'video') {
        var modal = document.querySelector("#videoModal");
        modal.style.display = "block";
        return;
    }

    var modal = document.querySelector(".modal");
    modal.style.display = "block"; 
    var id = "#" + id;
    var modalImg = document.getElementById("modalImg");
    var name = document.getElementById("name");
    var price = document.getElementById("price");
    var specs = document.getElementById("specs");
    var buyButton = document.getElementById("buyButton");

    // Load content from the card into the modal
    modalImg.src = document.querySelector(id + " img").src
    name.textContent = document.querySelector(id + " h4").textContent
    price.textContent = document.querySelector(id + " h5").textContent
    specs.textContent = document.querySelector(id + " p").textContent
    buyButton.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to cart';
}

function hideModal() {
    var modal = document.querySelector(".modal");
    var videoModal = document.querySelector("#videoModal");
    var cartModal = document.querySelector("#cartModal");
    
    modal.style.display = "none";
    videoModal.style.display = "none";
    cartModal.style.display = "none";
    
    // Show search bar
    var searchBar = document.querySelector(".input-group");
    searchBar.style.visibility = "visible"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.querySelector(".modal");
    var videoModal = document.querySelector("#videoModal");
    var cartModal = document.querySelector("#cartModal");
    var searchBar = document.querySelector(".searchItemsContainer")
    if (event.target == modal || event.target == cartModal || event.target == videoModal) {
        hideModal();
    } else if (event.target != searchBar) {
        searchBar.style.display = "";
    }
}


// Clicking a brand from index.html will redirect to products.html and change onload to specific parameters

function redirectAndFilter(key, value) {
    keyVariable = key;
    valueVariable = value;
    location.hash = "-" + key + "-" + value;
    locationHash = location.hash;
    window.location.assign("products.html" + locationHash);
}


var totalProducts = 0;
var cartItem

// Add item to cart
function addToCart(products) {
    document.getElementById("buyButton").innerHTML = '<i class="fas fa-check-circle fa-lg"></i> Added';
    itemName = document.querySelector("#myModal #name").innerText;
    document.querySelector("#buyCart").style.display = "block"
    if (totalProducts == 0) {
        cartItem = products.filter(item => item.name == itemName);
    } else {
        cartItem2 = products.filter(item => item.name == itemName);
        cartItem.push(...cartItem2);
    }

    document.querySelector("#cartModal .cartItems").innerHTML += `<div id="cartItem` + totalProducts + `"> <img src="" alt="product"> <div class="container"> <h4></h4> <h5></h5> <span class="removeProduct" onclick="removeCartProduct('#cartItem` + totalProducts + `')">&times;</span> </div> </div>`;

    cartItemDiv = document.querySelector("#cartItem" + totalProducts);
    cartItemDiv.getElementsByTagName("img")[0].src = cartItem[totalProducts].image;
    cartItemDiv.getElementsByTagName("h4")[0].textContent = cartItem[totalProducts].name;
    cartItemDiv.getElementsByTagName("h5")[0].textContent = "$" + cartItem[totalProducts].price;

    var totalPrice = 0;
    for (var i = 0; i <= totalProducts; i++) {
        totalPrice += cartItem[i].price;
    }
    document.querySelector(".totalPrice h4").textContent = "Total Price = $";
    document.querySelector(".totalPrice h3").textContent = totalPrice;

    totalProducts++;
}

// Remove items from cart and update total price
function removeCartProduct(id) {
    itemRemoved = document.querySelector(id);
    itemRemovedName = itemRemoved.getElementsByTagName("h4")[0].textContent;

    var itemRemovedArrayPosition = cartItem.map(function(e) {return e.name;}).indexOf(itemRemovedName);

    if (itemRemovedArrayPosition > -1) {
        cartItem.splice(itemRemovedArrayPosition, 1);
        totalProducts -= 1;
    }

    itemRemovedStringPrice = itemRemoved.getElementsByTagName("h5")[0].textContent;
    itemRemovedPrice = itemRemovedStringPrice.split("$");
    
    totalPriceElement = document.querySelector(".totalPrice h3")
    totalPriceElement.textContent -= itemRemovedPrice[1];
    
    if (totalPriceElement.textContent == 0) {
        document.querySelector(".totalPrice h4").textContent = "No items in cart";
        document.querySelector("#buyCart").style.display = "none";
        totalPriceElement.textContent = "";
    }

    itemRemoved.remove();
}


// When searching items, filter
function searchItems() {
    document.querySelector(".searchItemsContainer").style.display = "block";
    var liDiv, txtValue;
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();
    var ul = document.querySelector(".searchItemsContainer");
    var li = ul.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {      
        liDiv = li[i].getElementsByTagName("div")[0];
        itemName = liDiv.getElementsByTagName("h4")[0];
        itemCategory = liDiv.getElementsByTagName("h6")[0];
        txtValue = itemName.textContent || itemName.innerText || itemCategory.textContent || itemCategory.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
    
}

// This function loads the content of the items searched
function searchBar(productsBar) {    
    // Load content into items
    for (var item = 0; item < productsBar.length;) {
        var id = document.querySelector("#item" + item);
        id.getElementsByTagName("img")[0].src = productsBar[item].image;
        id.getElementsByTagName("h4")[0].textContent = productsBar[item].name;
        id.getElementsByTagName("h6")[0].textContent = productsBar[item].category;
        id.getElementsByTagName("h5")[0].textContent = "$" + productsBar[item].price;
        var itemSpecs = productsBar[item].specs.length

        for (var i = 0; i < itemSpecs;) {
            if (!needToReloadSpecs) {
                // Create new line between specs
                id.getElementsByTagName("p")[0].innerHTML += "- " + productsBar[item].specs[i] + "\n";

                // If you have re-filtered or sorted the products, this will remove the previous specs and replace them with the new ones
            } else if (needToReloadSpecs) {
                id.getElementsByTagName("p")[0].innerHTML = "";
                needToReloadSpecs = false;
                id.getElementsByTagName("p")[0].innerHTML += "- " + productsBar[item].specs[i] + "\n";
            }
            i += 1;
        }
        item += 1;
        needToReloadSpecs = true;
        
    }
}

// Scroll to top
function goToTop() {
    var topButton = document.getElementById("btnScrollTop");
    topButton.addEventListener('click', function(){
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }); 
    
    window.addEventListener('scroll', function(){
        if (document.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    });
}
