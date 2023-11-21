let person = JSON.parse(localStorage.getItem("person"));
let users = JSON.parse(localStorage.getItem("array"));
let categories = JSON.parse(localStorage.getItem("categories"));
let products = JSON.parse(localStorage.getItem("products"));
let renderProduct;
const loggedIn = person ? true : false;
let acc;
let slideArr = [
  "../img/dongiolanh-banner-web_2880x960-.jpg",
  "../img/homewear-top-desktop_2880x960_1.jpg",
];
let i = 0;
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
document
  .getElementsByClassName("icon-main")[0]
  .addEventListener("click", () => {
    location.reload();
  });
function renderSlide() {
  document.slide.src = slideArr[i];
  if (i < slideArr.length - 1) {
    i++;
  } else {
    i = 0;
  }
  setTimeout("renderSlide()", 3000);
}
renderSlide();

console.log(document.getElementById("dropdown"));

function dropdown() {
  let drop = "";
  categories.forEach((e) => {
    drop += `<div style="color: black" onclick="renderProducts(${e.id})">${e.name}</div>`;
  });
  document.getElementById("dropdown").innerHTML = drop;
}
dropdown();

function hiPerson() {
  let hello = document.createElement("div");
  hello.innerHTML = `
        <div class="user-afterLogin">
            Xin chào,&nbsp;  ${acc.username} &nbsp;
            <img class='img-avatar' src="${
              acc.avatar ||
              "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
            }" alt=""> &nbsp; &nbsp;
            <div class="img-bar" style="display: none;">
                <div onclick="window.location.href='./user/user.html'">Thông tin người dùng</div>
                <div data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="signOut()">Đăng xuất</div>
                
            </div>
            <div class="user-cart">
                <i class="fa-solid fa-cart-shopping" onclick="window.location.href='./store/cart.html'"></i>
                <div class="user-cart-quantity" style="display: none"></div>
            </div>
            
            
        </div>
    `;
  document.getElementsByClassName("body-navbar-user")[0].appendChild(hello);
}
if (loggedIn) {
  acc = users.find((e) => e.email == person.user);
  document.getElementsByClassName("lg-rg")[0].style.display = "none";
  hiPerson();
} else {
  document.getElementsByClassName("lg-rg")[0].style.display = "flex";
  document.getElementsByClassName("lg-rg")[0].style.padding = "15px 0";
}
if (loggedIn) {
  document
    .getElementsByClassName("img-avatar")[0]
    .addEventListener("click", () => {
      let userBar = document.getElementsByClassName("img-bar")[0];
      if (userBar.style.display == "none") {
        userBar.style.display = "block";
      } else {
        userBar.style.display = "none";
      }
    });
}

// console.log(mainDetail);
function toDetailProduct(product) {
  console.log(product.children);
  location.href = "./product.html";
  let products = JSON.parse(localStorage.getItem("products"));
  console.log(products);
  let imgSrc = product.children[0].src;
  let cardProduct = product.closest(".card");
  let title = cardProduct.children[1].children[0].innerText;
  let price = cardProduct.children[1].children[1].children[0].innerText;
  let code = products.find((element) => element.name === title).code;
  let productDetail = {
    imgSrc: imgSrc,
    title: title,
    price: price,
    code: code,
  };
  console.log(productDetail);
  localStorage.setItem("product-detail", JSON.stringify(productDetail));
}

function renderProducts(id) {
  let filter_products = products.filter((product) => product.category == id);
  let name = categories.find((e) => e.id == id);
  if (id === 0) {
    renderProduct = products;
    document.getElementsByClassName("category-type")[0].innerHTML =
      "TẤT CẢ SẢN PHẨM";
  } else {
    renderProduct = filter_products;
    document.getElementsByClassName("category-type")[0].innerHTML =
      name.name.toUpperCase();
  }
  let items = "";
  renderProduct.map((e) => {
    items += `
        <div class="card" style="width: 23%;height: 400px">
            <div class="card-img" onclick="toDetailProduct(this)">
                <img src="${e.image}" class="card-img-top" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">${e.name}</h5>
                <div class="card-text">
                    <div class="card-text-1">Giá: <span class="card-price">${VND.format(
                      e.price
                    )}</span></div>
                    <div class="card-text-2">
                        <i onclick="addToCart(${
                          e.code
                        })" class="fa-solid fa-cart-shopping s-2"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
  });
  document.getElementById("items").innerHTML = items;
}

renderProducts(0);
function addToCart(id) {
  if (!loggedIn) {
    notification("Chưa đăng nhập, vui lòng đăng nhập", "warning");
  } else {
    let index = products.findIndex((e) => e.code == id);
    if (index != -1) {
      let existInCart = person.cart.findIndex((e) => e.id == id);
      if (existInCart !== -1) {
        person.cart[existInCart].quantity++;
      } else {
        person.cart.push({
          id: products[index].code,
          name: products[index].name,
          price: products[index].price,
          img: products[index].image,
          category: products[index].category,
          quantity: 1,
        });
      }
      notification("Thêm sản phẩm thành công", "success");
      localStorage.setItem("person", JSON.stringify(person));
      document.getElementsByClassName("user-cart-quantity")[0].style.display =
        "block";
      document.getElementsByClassName("user-cart-quantity")[0].innerHTML =
        person.cart.length;
    }
  }
}
if (loggedIn && person.cart.length > 0) {
  document.getElementsByClassName("user-cart-quantity")[0].style.display =
    "block";
  document.getElementsByClassName("user-cart-quantity")[0].innerHTML =
    person.cart.length;
}
function signOut() {
  document.getElementsByClassName("img-bar")[0].style.display = "none";

  const result = confirm("Xác nhận đăng xuất ?");
  if (result) {
    localStorage.removeItem("person");
    window.location.reload();
  }
}
function notification(text, type) {
  var x = document.getElementById("snackbar");
  x.innerHTML = text;
  x.className = `show ${type}`;
  setTimeout(() => {
    x.className = x.className.replace("show", "");
  }, 1500);
}

function handleReloadProduct() {
  location.href = "./index.html";
}
