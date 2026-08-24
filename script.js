const bagButton = document.getElementById("bagButton");
const bagDrawer = document.getElementById("bagDrawer");
const overlay = document.getElementById("overlay");
const closeBag = document.getElementById("closeBag");
const bagItems = document.getElementById("bagItems");
const bagCount = document.getElementById("bagCount");
const bagTotal = document.getElementById("bagTotal");
const checkout = document.getElementById("checkout");

let cart = [];

function money(n){ return "₹" + n.toLocaleString("en-IN"); }

function renderCart(){
  bagCount.textContent = cart.length;
  if(!cart.length){
    bagItems.innerHTML = '<p class="empty">Your bag is empty.</p>';
  } else {
    bagItems.innerHTML = cart.map((item,i)=>`
      <div class="bag-row">
        <span>${item.name}<br><small>${money(item.price)}</small></span>
        <button class="remove" onclick="removeItem(${i})">REMOVE</button>
      </div>`).join("");
  }
  bagTotal.textContent = money(cart.reduce((s,x)=>s+x.price,0));
}
function openBag(){
  bagDrawer.classList.add("open"); overlay.classList.add("open");
  bagDrawer.setAttribute("aria-hidden","false");
}
function shutBag(){
  bagDrawer.classList.remove("open"); overlay.classList.remove("open");
  bagDrawer.setAttribute("aria-hidden","true");
}
function removeItem(i){ cart.splice(i,1); renderCart(); }

document.querySelectorAll(".add").forEach(btn=>{
  btn.addEventListener("click",()=>{
    cart.push({name:btn.dataset.name,price:Number(btn.dataset.price)});
    renderCart(); openBag();
  });
});
bagButton.addEventListener("click",openBag);
closeBag.addEventListener("click",shutBag);
overlay.addEventListener("click",shutBag);
checkout.addEventListener("click",()=>{
  alert("Checkout is not connected yet. Connect Razorpay/Shopify/WooCommerce when you're ready to accept payments.");
});
renderCart();
