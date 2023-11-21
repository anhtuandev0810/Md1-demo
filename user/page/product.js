let person = JSON.parse(localStorage.getItem("person"));
let users = JSON.parse(localStorage.getItem("array"));
const loggedIn = person ? true : false;

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
                <div onclick="signOut()">Đăng xuất</div>
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

function signOut() {
  document.getElementsByClassName("img-bar")[0].style.display = "none";
  const result = confirm("Xác nhận đăng xuất ?");
  if (result) {
    localStorage.removeItem("person");
    window.location.reload();
  }
}

let mainDetail = document.getElementById("main-detail");
console.log(mainDetail);
let str1 = "";
let productDetail = JSON.parse(localStorage.getItem("product-detail"));
console.log(productDetail);
let products = JSON.parse(localStorage.getItem("products"));
console.log(products);


str1 += `
<section id="product-detail" class="section-p1">
<div class="single-pro-img">
  <img src="${productDetail.imgSrc}" width="100%" id="main-img" alt="" />
</div>

<div class="single-pro-details">
  <h1>${productDetail.title.toUpperCase()}</h1>
  <h3>Men's Fashion T-Shirt</h3>
  <h4>${productDetail.price}</h4>
  <input type="number"  id="numberProduct" value=1 onchange="handleChange()" />
  <button class="normal" onclick="addToCart(productDetail.code)">Add to Cart</button>
  <h4>Product Detail</h4>
  <span
    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum unde non
    accusamus voluptatibus corrupti, repellendus molestiae iure pariatur
    fugit voluptatum perspiciatis necessitatibus, minus hic sed dicta
    alias, dolor nesciunt dolorum.</span
  >
</div>
</section>
`;

mainDetail.innerHTML = str1;

let inputValue;
function handleChange() {
  inputValue = document.getElementById("numberProduct").value;
}

function addToCart(props) {
  console.log(typeof props );
  // let numValue = document.getElementById('numberProduct').value;
  console.log('kkkk');
    if (!loggedIn) {
        notification("Chưa đăng nhập, vui lòng đăng nhập", "warning");
    } else {
        let index = products.findIndex((e) => e.code == props);
        if (index != -1) {
            let existInCart = person.cart.findIndex(e => e.code == props);
            if (existInCart !== -1) {
                person.cart[existInCart].quantity++;
            } else {
                person.cart.push({
                    id: products[index].code,
                    name: products[index].name,
                    price: products[index].price,
                    img: products[index].image,
                    category: products[index].category,
                    quantity: Number(inputValue),
                });
            }
            notification("Thêm sản phẩm thành công", "success");
            localStorage.setItem("person", JSON.stringify(person));
            document.getElementsByClassName("user-cart-quantity")[0].style.display = "block";
            document.getElementsByClassName("user-cart-quantity")[0].innerHTML = person.cart.length;
        }
    }
}
if (loggedIn && person.cart.length > 0) {
    document.getElementsByClassName("user-cart-quantity")[0].style.display = "block";
    document.getElementsByClassName("user-cart-quantity")[0].innerHTML = person.cart.length;
}


function notification(text, type) {
  var x = document.getElementById("snackbar");
  x.innerHTML = text;
  x.className = `show ${type}`;
  setTimeout(() => { x.className = x.className.replace("show", ""); }, 1500);
}

function handleReloadProduct() {
    location.href = './index.html';
}


