//get Products list
function getProductsList() {
	document.getElementById('main').innerHTML = "";
	//fetch('http://localhost:3000/products')
	fetch('products.json'
		, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}
	)
		.then(response => {
			if (!response.ok) {
				throw Error("Error");
			}
			return response.json();
		})
		.then(function (data) {
			var productList = data.products;
			createCardsInHtml(productList)
		})
		.catch(error => {
			document.getElementById('main').innerHTML =
				`<div>Sorry No Data Found please run json server to get the data </div>`;
		});
}

//create cards html structure
function createCardsInHtml(productList) {
	let totalRating = 5;
	productList.forEach(function (product) {
		document.getElementById('main').innerHTML += `
				<div class="product-card">
					<img src="./images/${product.img}" class="productImage" onclick="loadImage(${product.id}); openNav('250px')" alt="${product.name}" width="100%" height="230">
					<p class="product-card-name">${product.name}</p>
					<div class="product-card-category">
						<p>${product.category}</p>
						<p>${product.price}</p>
					</div>
					<div class="product-card-category">
						<div class="outer-star">
							<div id="innerStar${product.id}" class="inner-star"></div>
						</div>
						<i class="fa fa-cart-plus" aria-hidden="true" onclick="addToCart(1)"></i>
					</div>
				</div>`
		const ratingPercentage = product.rating / totalRating * 100;
		var ratingRoundFig = Math.round(ratingPercentage / 10) * 10 + '%'
		star = document.getElementById(`innerStar${product.id}`);
		star.style.width = ratingRoundFig;
	});
}

//get Category filter list
function getCategoryList() {
	// fetch('http://localhost:3000/category')
	fetch('products.json'
		, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}
	)
		.then(response => {
			if (!response.ok) {
				throw Error("Error");
			}
			return response.json();
		})
		.then(function (data) {
			const categoryList = data.category;
			//populate category list
			categoryList.forEach(function (category) {
				document.getElementById('categoryList').innerHTML += `
				<div class="list-group" onclick="filterProductByKey('${category.key},${category.type}')">
					<a class="list-group-item list-group-item-action" onclick="openNav('250px')">${category.key}</a>
				</div>`
			});
		})
		.catch(error => {
			document.getElementById('main').innerHTML = `
				<div>Sorry No Data Found please run json server to get the data </div>
			`;
		});
}

//get color filter list
function getColoursList() {
	// fetch('http://localhost:3000/colors')
	fetch('products.json'
		, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}
	)
		.then(response => {
			if (!response.ok) {
				throw Error("Error");
			}
			return response.json();
		})
		.then(function (data) {
			const colorsList = data.colors;
			//populate Colors list
			colorsList.forEach(function (color) {
				document.getElementById('colorList').innerHTML += `
				<div class="list-group" onclick="filterProductByKey('${color.key},${color.type}')">
					<a class="list-group-item list-group-item-action" onclick="openNav('250px')">${color.key}</a>
				</div>`
			});
		})
		.catch(error => {
			document.getElementById('main').innerHTML = `
				<div>Sorry No Data Found please run json server to get the data </div>`;
		});
}

//filter products in FilterBy
function filterProductByKey(filter) {
	let filterData = filter.split(',');
	let filterKey = filterData[0];
	let filterType = filterData[1];
	document.getElementById('main').innerHTML = "";
	// fetch('http://localhost:3000/products')
	fetch('products.json'
		, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}
	)
		.then(response => {
			return response.json();
		})
		.then(function (data) {
			let productList = data.products;
			if (filterType == "color") {
				productList = productList.filter(t => t.color == filterKey);
			} else if (filterType == "category") {
				productList = productList.filter(t => t.category == filterKey);
			}
			createCardsInHtml(productList);
		});
}

//load the selected image
function loadImage(id) {
	document.getElementById('main').innerHTML = "";
	// fetch(`http://localhost:3000/products/${id}`)
	fetch(`products.json`
		, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}
	)
		.then(response => {
			if (!response.ok) {
				throw Error("Error");
			}
			return response.json();
		})
		.then(function (data) {
			const result  = data.products;
			const product = result.find(function(element){
				if (element.id == id){
					return element;
				} else {
					return false;
				}
			});
			document.getElementById('main').innerHTML = `
					<div class="row product-position">
							<div class="col-md-4">
									<img src="./images/${product.img}" class="card-img-top" width="150" height="310" alt="${product.name}">
							</div>
							<div class="col-md-6">
								<p>${product.category}</p>
								<h3>${product.name}</h3>
								<p>${product.description}</p>
								<div class="row">
										<div class="col-md-5"> Price per unit <br> ${product.price}</div>
										<div class="col-md-3"></div>
										<div class="col-md-4 product-style">
												<button class="btn btn-primary buy-now-btn" data-toggle="modal"
												data-target="#buyProduct">Buy Now</button>
												<span class="cart-position">
												<i class="fa fa-cart-plus product-cart-icon" aria-hidden="true" onclick="addToCart(1)"></i>
												</span>
										</div>
								</div>
							</div>
					</div>`
		})
		.catch(error => {
			document.getElementById('main').innerHTML = `
				<div>Sorry No Data Found please run json server to get the data </div>
			`;
		});
}

//get searched text and load data
function filterProduct(searchedText) {
	document.getElementById('main').innerHTML = "";
	// fetch('http://localhost:3000/products')
	fetch(`products.json`
		, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}
	)
		.then(response => {
			return response.json();
		})
		.then(function (data) {
			var productList = data.products;
			if (typeof (searchedText) == "number") {
				var data = searchCardByRange(searchedText, productList);
			} else {
				var data = searchCards(searchedText, productList);
			}
			createCardsInHtml(data);
		});
}

//get searched text and filter from list
function searchCards(searchedText, data) {
	var filterdData = [];
	for (let i = 0; i < data.length; i++) {
		searchedText = searchedText.toLowerCase();
		var name = data[i].name.toLowerCase();
		if (name.includes(searchedText)) {
			filterdData.push(data[i]);
		}
	}
	if (filterdData.length == 0) {
		document.getElementById('main').innerHTML = `
				<div class="error-msg">Sorry no data found with such name... </div>
			`;
	}
	return filterdData;
}

//filter list by price range
function searchCardByRange(searchedText, data) {
	var filterdData = [];
	for (let i = 0; i < data.length; i++) {
		var rating = data[i].rating
		var range = parseFloat(rating);
		var ratingRoundFig = Math.round(range);
		if (searchedText == ratingRoundFig) {
			filterdData.push(data[i]);
		}
	}
	return filterdData;
}

//add product to cart / show count data added to card in nav cart icon
function addToCart(counter) {
	var cartCount = sessionStorage.getItem("CART_COUNT");
	if (cartCount == "NaN" || cartCount == undefined || cartCount == null) {
		cartCount = 0
	}
	counter = parseInt(cartCount) + counter;
	if (counter == 0) {
		emptyCart();
	} else {
		document.getElementById('cartItems').innerHTML =
			`<span class="cart-count">${counter}</span>`
		sessionStorage.setItem("CART_COUNT", counter);
	}
}

//onclick on nav cart icon confirmation to empty cart 
function emptyCart() {
	sessionStorage.removeItem("CART_COUNT");
	document.getElementById('cartItems').innerHTML = ""
}

//function to open cart pop-up based on condition
function OpenCartModal() {
	let count = sessionStorage.getItem("CART_COUNT");
	if (count == undefined) {
		document.getElementById('emptyCart').innerHTML =
			`<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-body">
						<p>Sorry, your cart is empty...</p>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
				</div>
			</div>
		`
	} else {
		document.getElementById('emptyCart').innerHTML =
			`<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-body">
						<p>Are you sure, you wants to empty the Cart?</p>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-footer">
						<input type="hidden" id="RowId" value="">
						<button class="btn btn-default btn-style" data-dismiss="modal" type="button">No</button>
						<button class="btn btn-danger btn-style" data-dismiss="modal" type="submit" onclick="emptyCart()">Yes</button>
					</div>
				</div>
			</div>
		`
	}
}