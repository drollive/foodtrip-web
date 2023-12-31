var currencySign = "₱";

function separators(num) {
	var num_parts = num.toString().split(".");
	num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return num_parts.join(".");
}

function recalculateCart() {
	var t = 0;
	document.getElementsByClassName("product").forEach(function (e) {
		e.getElementsByClassName("product-line-price").forEach(function (e) {
			t += parseFloat(e.innerHTML);
		});
	});
	(document.getElementById("cart-subtotal").innerHTML =
		currencySign + separators(t.toFixed(2))),
		(document.getElementById("cart-total").innerHTML =
			currencySign + separators(t.toFixed(2)));
}

function updateQuantity(e) {
	var t,
		n,
		c = e.closest(".product");
	(c || c.getElementsByClassName("product-price")) &&
		c.getElementsByClassName("product-price").forEach(function (e) {
			t = parseFloat(e.innerHTML);
		}),
		e.previousElementSibling &&
		e.previousElementSibling.classList.contains("product-quantity")
			? (n = e.previousElementSibling.value)
			: e.nextElementSibling &&
			  e.nextElementSibling.classList.contains("product-quantity") &&
			  (n = e.nextElementSibling.value);
	var r = t * n;
	c.getElementsByClassName("product-line-price").forEach(function (e) {
		(e.innerHTML = r.toFixed(2)), recalculateCart();
	});
}
var removeProduct = document.getElementById("removeItemModal");
removeProduct &&
	removeProduct.addEventListener("show.bs.modal", function (t) {
		document
			.getElementById("remove-product")
			.addEventListener("click", function (e) {
				t.relatedTarget.closest(".product").remove(),
					document.getElementById("close-modal").click(),
					recalculateCart();
			});
	});
