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
    });

    // Check hash
function checkIfRedirected(key, value, brand) {
    if (location.hash != "") {
        var split = location.hash.split("-");
        return filterProducts(split[1], split[2]);
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
            if (needToReloadSpecs == false) {
                // Create new line between specs
                id.getElementsByTagName("p")[0].innerHTML += "- " + filteredCards[card].specs[i] + "\n";

                // If you have re-filtered or sorted the products, this will remove the previous specs and replace them with the new ones
            } else if (needToReloadSpecs == true) {
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
    var id = "#" + id;
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImg");
    var name = document.getElementById("name");
    var price = document.getElementById("price");
    var specs = document.getElementById("specs");
    
    modal.style.display = "block";

    // Load content from the card into the modal
    modalImg.src = document.querySelector(id + " img").src
    name.textContent = document.querySelector(id + " h4").textContent
    price.textContent = document.querySelector(id + " h5").textContent
    specs.textContent = document.querySelector(id + " p").textContent

    // search bar is causing problems when modal is active: hide it
    var searchBar = document.querySelector(".input-group");
    searchBar.style.visibility = "hidden";
}

function hideModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";

    // Show search bar
    var searchBar = document.querySelector(".input-group");
    searchBar.style.visibility = "visible"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        hideModal();
    }
}


// TODO: clicking a brand from index.html will redirect to products.html and change onload to specific parameters

function redirectAndFilter(key, value) {
    keyVariable = key;
    valueVariable = value;
    location.hash = "-" + key + "-" + value;
    locationHash = location.hash;
    window.location.assign("products.html" + locationHash);
    
    // body = document.getElementById("productsBody");
    // var onLoadAttribute = document.createAttribute("onload");
    // onLoadAttribute.value = `filterProducts('${key}', '${value}')`
    // body.setAttributeNode(onLoadAttribute);
}