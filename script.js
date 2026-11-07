// ===== MILK MART + SUPABASE =====
// 1) Supabase me jao -> New Project -> SQL Editor me supabase.sql chalao
// 2) Project Settings > API me se URL + anon key copy karke neeche daalo:
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co"; // <-- YAHAN APNA URL
const SUPABASE_KEY = "YOUR-ANON-KEY"; // <-- YAHAN APNI ANON KEY
let supabaseClient = null;
if (window.supabase && SUPABASE_URL.includes("supabase.co") && !SUPABASE_URL.includes("YOUR-PROJECT")) {
  try { supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY); document.getElementById("dbStatus").textContent = "🟢 Supabase Connected"; } catch(e){ console.log(e); }
}
// PRODUCTS - image wale products me real pic hai, baki me emoji + color hai. Pic add karni ho to images/ folder me pic daalo aur yahan image:"images/naam.jpg" likh do.
const PRODUCTS = [
{id:1,name:"Olper's Full Cream Milk 1.5 Litre",cat:"Full Cream Milk",emoji:"🥛",image:"images/AQM2k_Css3eTAvDa5zAhy3UTESBNFIcxGgWM2263luP1AQHiKf92hW-W-7StWyWGZ-PAqMWwGeWcx5kejC1jzU9buVI0",real:true,color:"#D6E8FF",size:"1.5 Litre • Super Saver",price:520,old:550,rating:"⭐⭐⭐⭐⭐ (340)"},
{id:2,name:"Olper's Full Cream Milk 250ml",cat:"Full Cream Milk",emoji:"🥛",image:"images/AQO9lF8ZobG0piG4l791-ImGImnYUou4Gg085grzmGix75o5gDVIRAHKvl4rjJ3KAIyeVF5MF2i8_RLSIR_kZSwD4qtg",color:"#FFE8E8",size:"250ml • TBA Pack",price:95,old:100,rating:"⭐⭐⭐⭐⭐ (210)"},
{id:3,name:"Olper's Full Cream Milk 500ml",cat:"Full Cream Milk",emoji:"🥛",image:"images/AQOApTzBCr4NmnTtEAv3cpxTsu91j8bqeLL5F5XHVJ-6JzuYydHxdy3gRVcO_VaN_1OTHHl-CYUjpcBth_r8kJpcy6uR",color:"#FFF3C4",size:"500ml • Edge Pack",price:185,old:196,rating:"⭐⭐⭐⭐⭐ (180)"},
{id:4,name:"Olper's Full Cream Milk 1000ml",cat:"Full Cream Milk",emoji:"🥛",image:"images/AQPEIDvyr_Il366DL27hiwz65Sxf3SIMxDtO6DYSQhEBK8TMEFQ7car1YHd1X2osZm06_Q_OGNRtAMBzbfWoafUy4d1C",color:"#D6FFD6",size:"1000ml • Edge Pack",price:360,old:381,rating:"⭐⭐⭐⭐⭐ (340)"},
{id:5,name:"Olper's Full Cream Milk 375ml",cat:"Full Cream Milk",emoji:"🥛",image:"images/AQPYU0n0cCeLhVtiVOp--RZItWCxTzKbM6uQZRivzLWhGLqNXg2vu0aV1qmsJPgFxISncBzlrSYdcE8o1_QLye7v_mRY",color:"#E8D9FF",size:"375ml • Elecster",price:140,old:148,rating:"⭐⭐⭐⭐ (90)"},
{id:6,name:"Olper's ProCal High Calcium 200ml",cat:"High Calcium Low Fat",emoji:"💪",image:"images/3",real:true,color:"#D6FFD6",size:"200ml • High Calcium + Protein",price:105,old:110,rating:"⭐⭐⭐⭐⭐ (230)"},
{id:7,name:"Olper's ProCal 1000ml",cat:"High Calcium Low Fat",emoji:"💪",image:"images/1",color:"#E8FFE8",size:"1000ml • High Calcium",price:430,old:455,rating:"⭐⭐⭐⭐⭐ (170)"},
{id:8,name:"Olper's Full Cream Milk Powder 800g",cat:"Milk Powder",emoji:"🍼",image:"images/2",real:true,color:"#FFF3D6",size:"800g • Full Cream Powder",price:1850,old:2005,rating:"⭐⭐⭐⭐⭐ (160)"},
{id:9,name:"Olper's Milk Powder 390g",cat:"Milk Powder",emoji:"🍼",image:"images/4",color:"#FFE9A8",size:"390g • Powder",price:950,old:1030,rating:"⭐⭐⭐⭐⭐ (200)"},
{id:10,name:"Olper's Chocolate Milk 180ml",cat:"Flavoured Milk",emoji:"🍫",image:"images/5",real:true,color:"#E8C9A0",size:"180ml • Chocolate Flavoured",price:110,old:118,rating:"⭐⭐⭐⭐⭐ (510)"},
{id:11,name:"Olper's Chocolate Milk 110ml",cat:"Flavoured Milk",emoji:"🍫",image:"images/6",color:"#D9B48F",size:"110ml • Kids Pack",price:75,old:81,rating:"⭐⭐⭐⭐⭐ (420)"},
{id:12,name:"Olper's Mango Milk 180ml",cat:"Flavoured Milk",emoji:"🥭",image:"images/7",real:false,color:"#FFE9A8",size:"180ml • Mango Flavoured",price:110,old:118,rating:"⭐⭐⭐⭐⭐ (390)"},
{id:13,name:"Olper's Strawberry Milk 180ml",cat:"Flavoured Milk",emoji:"🍓",image:"images/8",real:true,color:"#FFD1DC",size:"180ml • Strawberry Flavoured",price:110,old:118,rating:"⭐⭐⭐⭐ (280)"},
{id:14,name:"Olper's Badam Zafran Milk 180ml",cat:"Flavoured Milk",emoji:"🌰",image:"images/9",real:true,color:"#FFE0B2",size:"180ml • Badam Zafran",price:125,old:134,rating:"⭐⭐⭐⭐⭐ (260)"},
{id:15,name:"Olper's Dairy Cream 200ml",cat:"Dairy Cream",emoji:"🍦",image:"images/10",real:true,color:"#FFF3D6",size:"200ml • Dairy Cream",price:280,old:304,rating:"⭐⭐⭐⭐⭐ (480)"},
{id:16,name:"Olper's Dairy Cream Carton 24 Pcs",cat:"Dairy Cream",emoji:"📦",image:"images/11",color:"#FFF3D6",size:"24 x 200ml",price:6400,old:6950,rating:"⭐⭐⭐⭐ (70)"},
{id:17,name:"Double Malai Cream 200g",cat:"Dairy Cream",emoji:"🍦",image:"images/12",color:"#FFFFFF",size:"200g • Extra Malai",price:350,old:375,rating:"⭐⭐⭐⭐⭐ (190)"},
{id:18,name:"Desi Ghee 500g",cat:"Desi Ghee",emoji:"🧈",image:"images/13",color:"#FFF3C4",size:"500g • Pure Desi",price:1150,old:1240,rating:"⭐⭐⭐⭐⭐ (310)"},
{id:19,name:"Desi Ghee 1kg",cat:"Desi Ghee",emoji:"🧈",image:"images/14",color:"#FFE9A8",size:"1kg • Pure Desi",price:2250,old:2440,rating:"⭐⭐⭐⭐⭐ (290)"},
{id:20,name:"Tarka Ghee 500g",cat:"Desi Ghee",emoji:"🍳",image:"images/15",color:"#FFE0B2",size:"500g • Tarka Special",price:980,old:1050,rating:"⭐⭐⭐⭐ (160)"},
{id:21,name:"Economy Low Fat Milk 225ml",cat:"Economy Milk",emoji:"🥛",image:"images/16",color:"#D6E8FF",size:"225ml • Low Fat",price:65,old:69,rating:"⭐⭐⭐⭐ (220)"},
{id:22,name:"Economy Low Fat Milk 1000ml",cat:"Economy Milk",emoji:"🥛",image:"images/17",color:"#E0F0FF",size:"1000ml • Low Fat",price:260,old:275,rating:"⭐⭐⭐⭐ (180)"},
{id:23,name:"Tarang Tea Creamer 170ml",cat:"Tea Creamer",emoji:"☕",image:"images/18",color:"#FFD1DC",size:"170ml • Ultra Slim",price:55,old:57,rating:"⭐⭐⭐⭐ (300)"},
{id:24,name:"Tarang Tea Creamer 220ml",cat:"Tea Creamer",emoji:"☕",image:"images/19",color:"#FFE8E8",size:"220ml • Tea Creamer",price:70,old:74,rating:"⭐⭐⭐⭐⭐ (350)"},
{id:25,name:"Tea Creamer Powder 800g",cat:"Tea Creamer",emoji:"☕",image:"images/20",color:"#FFE0B2",size:"800g • Chai Creamer",price:1550,old:1680,rating:"⭐⭐⭐⭐ (120)"},
{id:26,name:"Makhan Butter 200g",cat:"Butter & Cheese",emoji:"🧈",image:"images/21",color:"#FFF3C4",size:"200g • Salted Butter",price:450,old:490,rating:"⭐⭐⭐⭐⭐ (210)"},
{id:27,name:"Cheddar Cheese 400g",cat:"Butter & Cheese",emoji:"🧀",image:"images/22",color:"#FFE9A8",size:"400g • Cheddar",price:890,old:960,rating:"⭐⭐⭐⭐⭐ (180)"},
{id:28,name:"Mozzarella Cheese 500g",cat:"Butter & Cheese",emoji:"🧀",image:"images/23",color:"#FFF3D6",size:"500g • Pizza Cheese",price:1150,old:1250,rating:"⭐⭐⭐⭐⭐ (240)"},
{id:29,name:"Fresh Dahi 500g",cat:"Dahi & Lassi",emoji:"🍶",image:"images/24",color:"#E0F0FF",size:"500g • Fresh Dahi",price:220,old:240,rating:"⭐⭐⭐⭐⭐ (400)"},
{id:30,name:"Meethi Lassi 250ml",cat:"Dahi & Lassi",emoji:"🥤",image:"images/25",color:"#FFF3D6",size:"250ml • Sweet Lassi",price:130,old:145,rating:"⭐⭐⭐⭐⭐ (260)"},
{id:31,name:"Cadbury Dairy Milk Chocolate",cat:"Chocolate",emoji:"🍫",image:"images/1111",real:true,color:"#E8D9FF",size:"Classic Creamy Taste • Bar",price:320,old:360,rating:"⭐⭐⭐⭐⭐ (620)"},
{id:32,name:"Cadbury Dairy Milk Bubbly",cat:"Chocolate",emoji:"🍫",image:"images/1112",color:"#E8D9FF",size:"Bubbly • Bar",price:350,old:390,rating:"⭐⭐⭐⭐⭐ (310)"},
{id:33,name:"KitKat Chocolate 4 Finger",cat:"Chocolate",emoji:"🍫",image:"images/1113",color:"#FFE8E8",size:"4 Finger • Wafer",price:280,old:310,rating:"⭐⭐⭐⭐⭐ (440)"},
{id:34,name:"Snickers Chocolate Bar",cat:"Chocolate",emoji:"🍫",image:"images/1114.jpg",color:"#E8C9A0",size:"Peanut + Caramel",price:300,old:340,rating:"⭐⭐⭐⭐⭐ (380)"},
{id:35,name:"Mars Chocolate Bar",cat:"Chocolate",emoji:"🍫",image:"images/1115",color:"#D9B48F",size:"Caramel + Nougat",price:290,old:320,rating:"⭐⭐⭐⭐ (260)"},
{id:36,name:"Nestle Mineral Water 500ml",cat:"Pani",emoji:"💧",image:"images/1116",color:"#D6E8FF",size:"500ml • Bottle",price:70,old:80,rating:"⭐⭐⭐⭐⭐ (500)"},
{id:37,name:"Nestle Mineral Water 1.5 Litre",cat:"Pani",emoji:"💧",image:"images/1117",color:"#E0F0FF",size:"1.5 Litre • Bottle",price:140,old:160,rating:"⭐⭐⭐⭐⭐ (420)"},
{id:38,name:"Aquafina Water 500ml",cat:"Pani",emoji:"💧",image:"images/1118",color:"#D6E8FF",size:"500ml • Bottle",price:60,old:70,rating:"⭐⭐⭐⭐ (380)"},
{id:39,name:"Kinley Water 1 Litre",cat:"Pani",emoji:"💧",image:"images/1119",color:"#E0F0FF",size:"1 Litre • Bottle",price:110,old:125,rating:"⭐⭐⭐⭐ (240)"},
{id:40,name:"Pani Carton 12 x 500ml",cat:"Pani",emoji:"📦",image:"images/2221",color:"#D6E8FF",size:"12 Bottles • Carton",price:720,old:840,rating:"⭐⭐⭐⭐⭐ (190)"},
{id:41,name:"【entity-Pepsi¦canonical_name=Pepsi】 500ml Bottle",cat:"Cold Drinks",emoji:"🥤",image:"images/2222",color:"#0B3D91",size:"500ml • 【entity-Pepsi¦canonical_name=Pepsi】",price:110,old:125,rating:"⭐⭐⭐⭐⭐ (600)"},
{id:42,name:"【entity-Pepsi¦canonical_name=Pepsi】 1.5 Litre Family",cat:"Cold Drinks",emoji:"🥤",image:"images/2223",color:"#0B3D91",size:"1.5 Litre • 【entity-Pepsi¦canonical_name=Pepsi】",price:240,old:270,rating:"⭐⭐⭐⭐⭐ (520)"},
{id:43,name:"【entity-Pepsi¦canonical_name=Pepsi】 Can 330ml",cat:"Cold Drinks",emoji:"🥫",image:"images/2224",color:"#0B3D91",size:"330ml • Can",price:130,old:145,rating:"⭐⭐⭐⭐⭐ (410)"},
{id:44,name:"【entity-Coca Cola¦canonical_name=Coca Cola】 500ml",cat:"Cold Drinks",emoji:"🥤",image:"images/2225",color:"#FFE8E8",size:"500ml • 【entity-Coke¦canonical_name=Coke】",price:115,old:130,rating:"⭐⭐⭐⭐⭐ (480)"},
{id:45,name:"【entity-Coca Cola¦canonical_name=Coca Cola】 1.5 Litre",cat:"Cold Drinks",emoji:"🥤",image:"images/2226",color:"#FFE8E8",size:"1.5 Litre • 【entity-Coke¦canonical_name=Coke】",price:250,old:280,rating:"⭐⭐⭐⭐⭐ (390)"},
{id:46,name:"String Energy Drink 500ml",cat:"Cold Drinks",emoji:"⚡",image:"images/2227",color:"#FFE9A8",size:"500ml • String",price:140,old:160,rating:"⭐⭐⭐⭐⭐ (550)"},
{id:47,name:"String Energy Drink 250ml",cat:"Cold Drinks",emoji:"⚡",image:"images/2228",color:"#FFF3C4",size:"250ml • String",price:90,old:105,rating:"⭐⭐⭐⭐⭐ (470)"},
{id:48,name:"7UP 500ml",cat:"Cold Drinks",emoji:"🍋",image:"images/2229",color:"#D6FFD6",size:"500ml • Lemon Lime",price:110,old:125,rating:"⭐⭐⭐⭐⭐ (430)"},
{id:49,name:"7UP 1.5 Litre",cat:"Cold Drinks",emoji:"🍋",image:"images/3330",color:"#E8FFE8",size:"1.5 Litre • Lemon Lime",price:240,old:270,rating:"⭐⭐⭐⭐ (320)"},
{id:50,name:"【entity-Sprite¦canonical_name=Sprite】 500ml",cat:"Cold Drinks",emoji:"🍋",image:"images/3331",color:"#D6FFD6",size:"500ml • 【entity-Sprite¦canonical_name=Sprite】",price:110,old:125,rating:"⭐⭐⭐⭐⭐ (360)"},
{id:51,name:"Mirinda Orange 500ml",cat:"Cold Drinks",emoji:"🍊",image:"images/3332",color:"#FFE0B2",size:"500ml • Orange",price:110,old:125,rating:"⭐⭐⭐⭐ (280)"},
{id:52,name:"Dew Mountain 500ml",cat:"Cold Drinks",emoji:"🍏",image:"images/3333",color:"#D6FFD6",size:"500ml • Dew",price:120,old:135,rating:"⭐⭐⭐⭐⭐ (340)"},
{id:53,name:"Fanta Orange 500ml",cat:"Cold Drinks",emoji:"🍊",image:"images/3334",color:"#FFE0B2",size:"500ml • Fanta",price:110,old:125,rating:"⭐⭐⭐⭐ (250)"},
{id:54,name:"Family Doodh + Drinks Bundle",cat:"Bundle Offers",emoji:"🎁",image:"images/3335",color:"#FFD1DC",size:"6x Milk + 2x Cream + 【entity-Pepsi¦canonical_name=Pepsi】 + String",price:5499,old:7300,rating:"⭐⭐⭐⭐⭐ (150)"},
{id:55,name:"Party Drinks Bundle",cat:"Bundle Offers",emoji:"🎁",image:"images/3336",color:"#E8D9FF",size:"2x 【entity-Pepsi¦canonical_name=Pepsi】 1.5L + 2x String + 12x Pani",price:2999,old:3850,rating:"⭐⭐⭐⭐⭐ (180)"},
];
const CATS=["All","Full Cream Milk","Flavoured Milk","Dairy Cream","Desi Ghee","Economy Milk","High Calcium Low Fat","Milk Powder","Tea Creamer","Butter & Cheese","Dahi & Lassi","Chocolate","Pani","Cold Drinks","Bundle Offers"];
let activeCat="All", cart=JSON.parse(localStorage.getItem("milk_cart")||"[]"), wishlist=new Set(JSON.parse(localStorage.getItem("milk_wish")||"[]")), discount=0;
function money(n){return "Rs "+n.toLocaleString("en-PK")} function disc(p){return Math.round((1-p.price/p.old)*100)}
function saveLocal(){ localStorage.setItem("milk_cart",JSON.stringify(cart)); localStorage.setItem("milk_wish",JSON.stringify([...wishlist])); }
function renderPills(){ document.getElementById("catPills").innerHTML=CATS.map(c=>`<button class="${c===activeCat?'active':''}" onclick="setCat('${c}')">${c}</button>`).join(""); }
function setCat(c){ activeCat=c; renderPills(); renderProducts(); document.getElementById('shop').scrollIntoView({behavior:'smooth'}); }
function visualHTML(p){ if(p.image) return `<img src="${p.image}" alt="${p.name}" onerror="this.style.display='none';this.parentElement.innerHTML='${p.emoji}'">`; return p.emoji; }
function renderProducts(){
  renderPills(); const q=document.getElementById("searchInput").value.toLowerCase(); const sort=document.getElementById("sortSelect").value;
  let list=PRODUCTS.filter(p=>(activeCat==="All"||p.cat===activeCat)&&(p.name.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q)));
  if(sort==="low") list.sort((a,b)=>a.price-b.price); if(sort==="high") list.sort((a,b)=>b.price-a.price); if(sort==="discount") list.sort((a,b)=>disc(b)-disc(a));
  document.getElementById("resultCount").textContent=`(${list.length} products)`; document.getElementById("emptyState").style.display=list.length?"none":"block";
  document.getElementById("productGrid").innerHTML=list.map(p=>`<article class="card"><div class="card-visual" style="background:${p.color}">${visualHTML(p)}<span class="badge">-${disc(p)}% OFF</span>${p.real?'<span class="real-badge">⭐ REAL PIC</span>':''}<button class="heart ${wishlist.has(p.id)?'on':''}" onclick="toggleWish(${p.id},this)">❤️</button></div><div class="card-body"><span class="cat">${p.cat}</span><h3>${p.name}</h3><div class="stars">${p.rating}</div><div class="size">${p.size} • ✅ In Stock</div><div class="price"><b>${money(p.price)}</b><del>${money(p.old)}</del></div><div class="qty-row"><span>Qty:</span><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span id="qty-${p.id}">${p.qty||1}</span><button onclick="changeQty(${p.id},1)">+</button></div></div><button class="add-btn" onclick="addToCart(${p.id})">🛒 Add to Cart</button><button class="view-btn" onclick="openQuick(${p.id})">👁️ Quick View</button></div></article>`).join("");
}
function changeQty(id,d){ const p=PRODUCTS.find(x=>x.id===id); p.qty=Math.max(1,(p.qty||1)+d); document.getElementById("qty-"+id).textContent=p.qty; }
function toggleWish(id,btn){ wishlist.has(id)?wishlist.delete(id):wishlist.add(id); btn.classList.toggle("on"); document.getElementById("wishCount").textContent=wishlist.size; saveLocal(); showToast(wishlist.has(id)?"Wishlist me add ❤️":"Wishlist se hata diya"); }
function addToCart(id){ const p=PRODUCTS.find(x=>x.id===id); const q=p.qty||1; const ex=cart.find(x=>x.id===id); if(ex) ex.qty+=q; else cart.push({...p,qty:q}); p.qty=1; saveLocal(); updateCart(); showToast(p.name+" Cart me add ✅"); openCart(); }
function addBundle(price,name){ const ex=cart.find(x=>x.name===name); if(ex) ex.qty++; else cart.push({id:1000+Date.now(),name,emoji:"🎁",image:"",color:"#FFD1DC",size:"Bundle Offer",price,old:price,qty:1}); saveLocal(); updateCart(); showToast(name+" add ✅"); openCart(); }
function updateCart(){ const count=cart.reduce((s,x)=>s+x.qty,0); const sub=cart.reduce((s,x)=>s+x.qty*x.price,0); document.getElementById("cartCount").textContent=count; document.getElementById("cartTotalTop").textContent=money(sub); const discAmt=Math.round(sub*discount); const del=sub===0?0:(sub-discAmt>=5000?0:250); const total=sub-discAmt+del;
document.getElementById("cartItems").innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-item"><div class="ci-img" style="background:${x.color}">${x.image?`<img src="${x.image}" style="width:100%;height:100%;object-fit:cover;border-radius:10px">`:x.emoji}</div><div><b>${x.name}</b><br><small>${money(x.price)} x ${x.qty} = ${money(x.price*x.qty)}</small><div class="ci-qty"><button onclick="cartQty(${i},-1)">−</button><span>${x.qty}</span><button onclick="cartQty(${i},1)">+</button></div></div><button class="remove" onclick="removeItem(${i})">🗑️</button></div>`).join(""):`<p style="text-align:center;padding:30px">🛒 Cart khaali hai.<br>Product add karo!</p>`;
document.getElementById("subTotal").textContent=money(sub); document.getElementById("discTotal").textContent="- "+money(discAmt); document.getElementById("delTotal").textContent=sub===0?money(0):money(del); document.getElementById("grandTotal").textContent=money(total); document.getElementById("freeMsg").textContent=sub-discAmt>=5000?"🎉 Free Delivery mil gayi!":(sub?`Free delivery ke liye ${money(5000-(sub-discAmt))} aur add karo`:""); }
function cartQty(i,d){ cart[i].qty+=d; if(cart[i].qty<=0) cart.splice(i,1); saveLocal(); updateCart(); }
function removeItem(i){ cart.splice(i,1); saveLocal(); updateCart(); showToast("Item hata diya"); }
function applyPromo(){ const v=document.getElementById("promoInput").value.trim().toUpperCase(); if(v==="MILK10") discount=.10; else if(v==="FRESH20") discount=.20; else if(v==="DRINK15") discount=.15; else {discount=0; document.getElementById("promoMsg").textContent="❌ Galat code. MILK10 / FRESH20 / DRINK15 try karo"; document.getElementById("promoMsg").style.color="red"; updateCart(); return;} document.getElementById("promoMsg").textContent=`✅ ${v} apply! ${discount*100}% OFF`; document.getElementById("promoMsg").style.color="green"; updateCart(); }
function openCart(){ document.getElementById("cartDrawer").classList.add("open"); document.getElementById("cartOverlay").classList.add("show"); }
function closeCart(){ document.getElementById("cartDrawer").classList.remove("open"); document.getElementById("cartOverlay").classList.remove("show"); }
function openQuick(id){ const p=PRODUCTS.find(x=>x.id===id); document.getElementById("quickContent").innerHTML=`<div class="quick-visual" style="background:${p.color}">${p.image?`<img src="${p.image}">`:p.emoji}</div><span class="cat">${p.cat}</span><h2>${p.name}</h2><p class="stars">${p.rating}</p><p>${p.size} • 100% Fresh • 72-96 Hours Delivery</p><div class="price"><b style="font-size:24px">${money(p.price)}</b><del>${money(p.old)}</del> <span style="background:#E31E24;color:#fff;padding:4px 10px;border-radius:999px;font-size:12px">-${disc(p)}% OFF</span></div><p style="color:#666;font-size:14px">Taza / Thanda / Fresh — ghar pe chai, kheer, lassi ya party — sab isi se bane ga best.</p><button class="add-btn" onclick="addToCart(${p.id});closeQuick()">🛒 Add to Cart — ${money(p.price)}</button>`; document.getElementById("quickModal").classList.add("show"); }
function closeQuick(){ document.getElementById("quickModal").classList.remove("show"); }
function openCheckout(){ if(!cart.length){ showToast("Pehle cart me kuch add karo!"); return; } closeCart(); const sub=cart.reduce((s,x)=>s+x.qty*x.price,0); const discAmt=Math.round(sub*discount); const del=sub-discAmt>=5000?0:250; document.getElementById("checkoutSummary").innerHTML=cart.map(x=>`<p style="display:flex;justify-content:space-between"><span>${x.emoji||"🛒"} ${x.name} x ${x.qty}</span><b>${money(x.price*x.qty)}</b></p>`).join(""); document.getElementById("checkoutTotal").textContent="Total: "+money(sub-discAmt+del); document.getElementById("orderSuccess").style.display="none"; document.getElementById("checkoutModal").classList.add("show"); }
function closeCheckout(){ document.getElementById("checkoutModal").classList.remove("show"); }
async function placeOrder(){
  const name=document.getElementById("fName").value.trim(), phone=document.getElementById("fPhone").value.trim(), addr=document.getElementById("fAddress").value.trim();
  if(!name||!phone||!addr){ alert("Bhai, Name + Phone + Address zaroori hai!"); return; }
  const pay=document.querySelector('input[name="pay"]:checked').value; const wallet=document.getElementById("fWallet").value.trim(); const city=document.getElementById("fCity").value;
  const sub=cart.reduce((s,x)=>s+x.qty*x.price,0); const discAmt=Math.round(sub*discount); const del=sub-discAmt>=5000?0:250; const total=sub-discAmt+del;
  const orderId="MM-"+Math.floor(1000+Math.random()*9000);
  const orderData={order_id:orderId,customer_name:name,phone:phone,address:addr,city:city,payment_method:pay,wallet_number:wallet,items:cart,subtotal:sub,discount:discAmt,delivery:del,total:total,status:"pending"};
  let saved="⚠️ Supabase connect nahi tha, order local + WhatsApp pe gaya.";
  if(supabaseClient){ try{ const {error}=await supabaseClient.from("orders").insert([orderData]); if(!error) saved="✅ Order Supabase ke orders table me SAVE ho gaya!"; else saved="⚠️ Supabase error: "+error.message; }catch(e){ saved="⚠️ Supabase error, WhatsApp se bhejo."; } }
  localStorage.setItem("last_order",JSON.stringify(orderData));
  document.getElementById("orderIdText").textContent=`Order ID: ${orderId} • Total: ${money(total)} • ${city} • ${pay}`;
  document.getElementById("orderSaveText").textContent=saved;
  const msg=encodeURIComponent(`Assalam-o-Alaikum! Milk Mart Order: ${orderId}\nName: ${name}\nPhone: ${phone}\nAddress: ${addr}\nCity: ${city}\nPayment: ${pay} ${wallet}\nItems: ${cart.map(x=>x.name+" x"+x.qty).join(", ")}\nTotal: ${money(total)}`);
  document.getElementById("waLink").href="https://wa.me/923324978526?text="+msg;
  document.getElementById("orderSuccess").style.display="block"; cart=[]; discount=0; saveLocal(); updateCart();
}
function subscribe(){ const v=document.getElementById("newsInput").value.trim(); document.getElementById("newsMsg").textContent=v?"✅ Shukriya! Offers ab email pe aayenge.":"Email likho pehle!"; }
function showToast(msg){ const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),2200); }
async function loadFromSupabase(){ if(!supabaseClient) return; try{ const {data,error}=await supabaseClient.from("products").select("*"); if(!error && data && data.length){ console.log("Supabase products:",data.length); document.getElementById("dbStatus").textContent="🟢 Supabase: "+data.length+" products loaded"; } }catch(e){} }
document.getElementById("wishCount").textContent=wishlist.size;
renderProducts(); updateCart(); loadFromSupabase();
let heroIndex = 0;
function showSlide(n){
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots .dot');
  if(!slides.length) return;
  heroIndex = n;
  slides.forEach((s,i)=> s.classList.toggle('active', i===n));
  dots.forEach((d,i)=> d.classList.toggle('active', i===n));
}
setInterval(()=>{
  const slides = document.querySelectorAll('.hero-slide');
  if(!slides.length) return;
  heroIndex = (heroIndex + 1) % slides.length;
  showSlide(heroIndex);
}, 3000);