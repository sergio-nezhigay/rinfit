 /******** This apps Stack Builder was built without any third party apps installed from this store.
 ******** Philip Diaz ===> Senior Shopify Developer/Javascript Developer/API Storefront Developer/Backend Developer/Script Editor Developer for Shopify Plus
 ******** Website: https://make8.digital
 ******** Email: philip.diaz@make8.digital | diazphi@gmail.com
 ********/
    // Tab List
var Total_Amount_Price = Number(0);
 $(document).on("click", ".tab-item", function() {
    var a = $(this).attr("id");
    var b = document.getElementById(a);
    var c = b.getAttribute("data-handle");
    var d = document.getElementById("stack-products-slider-" + c);
    var elems = document.querySelectorAll(".tab-item");
         [].forEach.call(elems, function(el) {
             el.classList.remove("active");
         });
    var tab = document.querySelectorAll(".stack-products-slider");
         [].forEach.call(tab, function(el) {
            el.style.display = "none";
          });
    b.classList.add("active"); 
    d.style.display = "flex";
});
// Get Total Price
function Sum_Total_Price() {
var withitemprice = document.querySelectorAll("#dropzoneitem .has-item");
var totalcartamount = document.getElementById("totalcartamount");
var stackbuttontocart = document.getElementById("stack-button-to-cart");
[].forEach.call(withitemprice, function(el){
    Total_Amount_Price = Total_Amount_Price + Number(el.getAttribute("variant-price"));
});
totalcartamount.innerHTML = stack_total_zero + Total_Amount_Price.toFixed(2);
    if (Total_Amount_Price>0) {
        stackbuttontocart.classList.remove("disabled");
        stackbuttontocart.removeAttribute("disabled");
        stackbuttontocart.innerHTML = "Add stack(" + withitemprice.length + " items) to cart";
    }else{
        stackbuttontocart.innerHTML = "Add stack(0 item) to cart";
        stackbuttontocart.classList.add("disabled");
        stackbuttontocart.setAttribute("disabled","");    
    }
}
// Product Add to Stack
$(document).on("mouseout", ".add-ring-to-left", function() {
    this.innerHTML = "ADD RING";
});
$(document).on("click", ".add-ring-to-left", function() {
var btn = this;
var a = document.getElementById("dropzoneitem");
var b = document.createElement("div");
var c = document.createElement("div");
var d = document.createElement("div");
var e = document.createElement("span");
var f = document.createElement("div");
var g = document.createElement("li");
var h = document.createElement("li");
var i = document.createElement("ul");
var j = document.createElement("div");
var k = document.createElement("img");
var l = document.createElement("span");
var m = document.createElement("img");
var n = document.createElement("div");
var o = document.createElement("img");
var p = document.createElement("span");
var q = document.createElement("li");
var img = document.createElement("img");
var noitem = document.querySelectorAll("#dropzoneitem .has-no-item");
var withitem = document.querySelectorAll("#dropzoneitem .has-item");
var variant_selected = document.querySelectorAll(".product-variants-color-select-" + this.getAttribute("data-id"));
var variant_selected_id, add_this_variant = true;
if(variant_selected.length>0) {
    var option1 = this.getAttribute("data-option1-value");
    var option2 = this.getAttribute("data-option2-value");
    var variant;
    if(option1.includes("Men Size")){
        option1 = option1.replace("Men Size","");
        option1 = option1.replace(/\s/g, '');
    }
    if(option2.includes("Women Size")){
        option2 = option2.replace("Women Size","");
        option2 = option2.replace(/\s/g, '');
    }
    if(option1.includes("Size")){
        option1 = option1.replace("Size","Size ");
    }
    if(option2.includes("Size")){
        option2 = option2.replace("Size","Size ");
    }
    console.log(option1);
    console.log(option2);
    variant = option1 + " / " + option2;
    [].forEach.call(variant_selected,function(el){
        console.log(variant);
        console.log(el.getAttribute("data-variant"));
        if(variant === el.getAttribute("data-variant")){
            variant_selected_id = el.value;
        }
    })
}
if(noitem.length == 2) {
a.innerHTML = '';
b.classList.add("droppable-container");
b.classList.add("has-item");
b.setAttribute("variant-id", variant_selected_id);
b.setAttribute("variant-price", this.getAttribute("data-price"));
b.appendChild(j);
j.classList.add("item-reorder");
j.appendChild(k);
k.setAttribute("src",stack_arrow_down);
k.setAttribute("width","18px");
k.setAttribute("height","18px");
k.setAttribute("onclick","itemmovedown(this)");
k.setAttribute("data-js-tooltip","");
k.setAttribute("data-tippy-content","Click, to move this item down.");
k.setAttribute("data-tippy-placement","top");
k.setAttribute("data-tippy-distance","6");
j.appendChild(l);
l.innerHTML = "REORDER";
j.appendChild(m);
m.setAttribute("src",stack_arrow_up);
m.setAttribute("width","18px");
m.setAttribute("height","18px");
m.setAttribute("onclick","itemmoveup(this)");
m.setAttribute("data-js-tooltip","");
m.setAttribute("data-tippy-content","Click, to move this item up.");
m.setAttribute("data-tippy-placement","top");
m.setAttribute("data-tippy-distance","6");
img.src = this.getAttribute("data-color");
f.classList.add("ring-stack");
f.classList.add("droppable");
f.appendChild(img);
g.innerHTML = option1;
i.classList.add("droppable-variant-placeholder");
i.appendChild(g);
h.innerHTML = option2;
i.appendChild(h);
q.innerHTML = stack_total_zero + this.getAttribute("data-price");
i.appendChild(q);
f.appendChild(i);
n.classList.add("item-delete");
n.setAttribute("stack-selected", "selected-" + variant_selected_id);
n.setAttribute("stack-selected-label", "selected-label-" + variant_selected_id);
n.setAttribute("stack-selected-parent", "selected-parent-" + variant_selected_id);
n.appendChild(o);
o.setAttribute("src",stack_delete_icon);
o.setAttribute("width","18px");
o.setAttribute("height","18px");
o.setAttribute("data-js-tooltip","");
o.setAttribute("data-tippy-content","Click, to remove this item.");
o.setAttribute("data-tippy-placement","top");
o.setAttribute("data-tippy-distance","6");
n.appendChild(p);
p.innerHTML = "DELETE";
b.appendChild(f);
b.appendChild(n);
c.classList.add("droppable-container");
c.classList.add("has-no-item");
d.classList.add("ring-stack");
d.classList.add("droppable");
c.appendChild(d);
e.classList.add("droppable-placeholder");
e.innerHTML = "ADD RING";
d.appendChild(e);
a.appendChild(b);
a.appendChild(c);
btn.innerHTML = "ADDED";
} else {
        [].forEach.call(withitem, function(el) {
            if (el.getAttribute("variant-id") === variant_selected_id){
            add_this_variant = false;
            btn.innerHTML = "ALREADY ADDED";
            }
        });
if(add_this_variant == true) {
        [].forEach.call(noitem, function(el) {
            if (el.classList.contains("has-no-item")){
                a.removeChild(a.lastChild);
            }
        });
        b.classList.add("droppable-container");
        b.classList.add("has-item");
        b.setAttribute("variant-id", variant_selected_id);
        b.setAttribute("variant-price", this.getAttribute("data-price"));
        b.appendChild(j);
        j.classList.add("item-reorder");
        j.appendChild(k);
        k.setAttribute("src",stack_arrow_down);
        k.setAttribute("width","18px");
        k.setAttribute("height","18px");
        k.setAttribute("onclick","itemmovedown(this)");
        k.setAttribute("data-js-tooltip","");
        k.setAttribute("data-tippy-content","Click, to move this item down.");
        k.setAttribute("data-tippy-placement","top");
        k.setAttribute("data-tippy-distance","6");
        j.appendChild(l);
        l.innerHTML = "REORDER";
        j.appendChild(m);
        m.setAttribute("src",stack_arrow_up);
        m.setAttribute("width","18px");
        m.setAttribute("height","18px");
        m.setAttribute("onclick","itemmoveup(this)");
        m.setAttribute("data-js-tooltip","");
        m.setAttribute("data-tippy-content","Click, to move this item up.");
        m.setAttribute("data-tippy-placement","top");
        m.setAttribute("data-tippy-distance","6");
        img.src = this.getAttribute("data-color");
        f.classList.add("ring-stack");
        f.classList.add("droppable");
        f.appendChild(img);
        g.innerHTML = option1;
        i.classList.add("droppable-variant-placeholder");
        i.appendChild(g);
        h.innerHTML = option2;
        i.appendChild(h);
        q.innerHTML = stack_total_zero + this.getAttribute("data-price");
        i.appendChild(q);
        f.appendChild(i);
        n.classList.add("item-delete");
        n.setAttribute("stack-selected", "selected-" + variant_selected_id);
        n.setAttribute("stack-selected-label", "selected-label-" + variant_selected_id);
        n.setAttribute("stack-selected-parent", "selected-parent-" + variant_selected_id);
        n.appendChild(o);
        o.setAttribute("width","18px");
        o.setAttribute("height","18px");
        o.setAttribute("src",stack_delete_icon);
        o.setAttribute("data-js-tooltip","");
        o.setAttribute("data-tippy-content","Click, to remove this item.");
        o.setAttribute("data-tippy-placement","top");
        o.setAttribute("data-tippy-distance","6");
        n.appendChild(p);
        p.innerHTML = "DELETE";
        b.appendChild(f);
        b.appendChild(n);
        a.appendChild(b);
        btn.innerHTML = "ADDED";
        }       
}
Total_Amount_Price = Number(0);
Sum_Total_Price();
});
// Item Delete
$(document).on("click", ".item-delete", function() { 
    var a = document.getElementById("dropzoneitem");
    var c = document.createElement("div");
    var d = document.createElement("div");
    var e = document.createElement("span");
    var parentid = this.parentElement;
    var thisnode = parentid;
    thisnode.classList.add("remove");
    thisnode.removeAttribute("variant-price");
    setTimeout(function(){thisnode.remove();},2000);
    if(a.children.length == 1) {
    c.classList.add("droppable-container");
    c.classList.add("has-no-item");
    d.classList.add("ring-stack");
    d.classList.add("droppable");
    c.appendChild(d);
    e.classList.add("droppable-placeholder");
    e.innerHTML = "ADD RING";
    d.appendChild(e);
    a.appendChild(c);
    a.appendChild(c);
    }  
    if(a.children.length == 2) {
        c.classList.add("droppable-container");
        c.classList.add("has-no-item");
        d.classList.add("ring-stack");
        d.classList.add("droppable");
        c.appendChild(d);
        e.classList.add("droppable-placeholder");
        e.innerHTML = "ADD RING";
        d.appendChild(e);
        a.appendChild(c);
    }  
    Total_Amount_Price = Number(0);
    Sum_Total_Price();
});
// Item move down
function itemmovedown(el) {
    var parentid = el.parentElement.parentElement;
    var thisnode = parentid;
    var refnode = parentid.nextSibling;
    var hasnoitem = refnode.classList.contains("has-no-item");
    var hasitem = el.parentElement.nextSibling;
    hasitem.classList.add("moving");
    if(hasnoitem == false) {
    $(thisnode).insertAfter(refnode);      
    }
    setTimeout(function(){hasitem.classList.remove("moving");},2000);
}
// Item move up
function itemmoveup(el) {
    var parentid = el.parentElement.parentElement;
    var thisnode = parentid;
    var refnode = parentid.previousSibling;
    var hasitem = el.parentElement.nextSibling;
    hasitem.classList.add("moving");
    if(refnode){
    $(thisnode).insertBefore(refnode);
    }
    setTimeout(function(){hasitem.classList.remove("moving");},2000);
 }
 //Selected stack item to cart
    function additemtocart(){
        var stackbuttontocart = document.getElementById("stack-button-to-cart");
        var cartcount = document.querySelectorAll(".cart-count");
        var itemObj, cart_item_count;
        var items = document.querySelectorAll("#dropzoneitem .has-item");
        var noitems = document.querySelectorAll("#dropzoneitem .has-no-item");
        var a = document.getElementById("dropzoneitem");
        var c = document.createElement("div");
        var d = document.createElement("div");
        var e = document.createElement("span");
        [].forEach.call(items, function(el,index) {
            if(index === 0) {
                itemObj = [el.getAttribute("variant-id")];
            } else {
                itemObj.push(el.getAttribute("variant-id"));
            }
                
        });
        Shopify.queue = [];
          itemObj.forEach( function(item) {
            Shopify.queue.push({
              variantId: item,
            });
          });
          Shopify.moveAlong = function() {
          // If we still have requests in the queue, let's process the next one.
          if (Shopify.queue.length) {
            var request = Shopify.queue.shift();
            var data = 'id='+ request.variantId + '&quantity=1'
            $.ajax({
              type: 'POST',
                  url: '/cart/add.js',
              dataType: 'json',
              data: data,
              success: function(){
                Shopify.moveAlong();
             },
                 error: function(){
             // if it's not last one Move Along else update the cart number with the current quantity
              if (Shopify.queue.length){
                Shopify.moveAlong()
              }
              }
               });
            }
           };
        Shopify.moveAlong();
        stackbuttontocart.innerHTML = "Your stack successfully added to cart";
        [].forEach.call(items, function(el) {
            el.remove();
        });
        if(noitems.length == 1) {
        c.classList.add("droppable-container");
        c.classList.add("has-no-item");
        d.classList.add("ring-stack");
        d.classList.add("droppable");
        c.appendChild(d);
        e.classList.add("droppable-placeholder");
        e.innerHTML = "ADD RING";
        d.appendChild(e);
        a.appendChild(c);
        }
        if(noitems.length == 0) {
            c.classList.add("droppable-container");
            c.classList.add("has-no-item");
            d.classList.add("ring-stack");
            d.classList.add("droppable");
            c.appendChild(d);
            e.classList.add("droppable-placeholder");
            e.innerHTML = "ADD RING";
            d.appendChild(e);
            a.appendChild(c);
            var a = document.getElementById("dropzoneitem");
            var c = document.createElement("div");
            var d = document.createElement("div");
            var e = document.createElement("span");
            c.classList.add("droppable-container");
            c.classList.add("has-no-item");
            d.classList.add("ring-stack");
            d.classList.add("droppable");
            c.appendChild(d);
            e.classList.add("droppable-placeholder");
            e.innerHTML = "ADD RING";
            d.appendChild(e);
            a.appendChild(c);
        }
        $.ajax({
            type: 'GET',
            url: '/cart.json',
            dataType: 'json',
            success: function(data) {       
               var item_count = data.item_count;
                item_count = Number(item_count) + Number(items.length);
                if(cartcount.length){
                    cartcount[0].setAttribute("data-js-cart-count-desktop",item_count);
                    cartcount[0].innerHTML = item_count;
                    cartcount[1].setAttribute("data-js-cart-count-mobile",item_count);
                    cartcount[1].innerHTML = item_count;
                  }
            }
        });   
        var popup_cart = document.querySelectorAll(".header__btn-cart");  
        if(popup_cart.length>0) {
                var i = 0;
                var bar = document.createElement("div");
                if (i == 0) {
                    i = 1;
                    stackbuttontocart.innerHTML = "";
                    stackbuttontocart.appendChild(bar);
                    bar.classList.add("cartprogressbar");
                    var width = 1;
                    var id = setInterval(frame, items.length * 10);
                    function frame() {
                    if (width >= 100) {
                        clearInterval(id);
                        i = 0;
                        Total_Amount_Price = Number(0);
                        Sum_Total_Price();
                        popup_cart[0].click(); 
                    } else {
                        width++;
                        bar.style.width = width + "%";
                        bar.innerHTML = width + "%";
                        bar.style.textAlign = "center";
                    }
                    }
                }

        } 

}
$(document).on("click",".stack-builder-option-women-size", function(){
    var menid = document.getElementById("stack-builder-popup-size-" + this.getAttribute("data-id"));
    var womenid = document.getElementById("stack-builder-popup-size-women-" + this.getAttribute("data-id"));
    var act = document.querySelectorAll(".ring-size-women-active-" + this.getAttribute("data-id"));
    var actmen = document.querySelectorAll(".ring-size-active-" + this.getAttribute("data-id"));
    if(womenid){womenid.classList.remove("d-none");}
    if(menid){menid.classList.add("d-none");}
    [].forEach.call(act, function(el){
        if(women_size_selected === ""){
            el.classList.remove("active");
        } 
    });
    if(men_size_selected === "" && actmen.length>0){
        actmen[0].classList.add("active");
        actmen[0].style.backgroundColor = "white", "important";
    }else{
        if(actmen>0){actmen[0].removeAttribute("style");}
    };
    });
    $(document).on("click",".stack-builder-option-men-size", function(){
    var menid = document.getElementById("stack-builder-popup-size-" + this.getAttribute("data-id"));
    var womenid = document.getElementById("stack-builder-popup-size-women-" + this.getAttribute("data-id"));
    var act = document.querySelectorAll(".ring-size-active-" + this.getAttribute("data-id"));
    var actwomen = document.querySelectorAll(".ring-size-women-active" + this.getAttribute("data-id"));
    if(menid){menid.classList.remove("d-none");}
    if(womenid){womenid.classList.add("d-none");}
       [].forEach.call(act, function(el){
        if(el.classList.contains("active") && men_size_selected == ""){
            el.classList.remove("active");
        }
    });
    
    if(women_size_selected == "" && actwomen.length>0){
        actwomen[0].classList.add("active");
        actwomen[0].style.backgroundColor = "white", "important";
    }else{
        if(actwomen>0){actwomen[0].removeAttribute("style");}
    };
    });
    $(document).on("click",".stack-builder-product-button-add-to-cart", function(){
        men_size_selected = "";
        women_size_selected = "";
        var size = document.getElementById("stack-builder-selected_size_men_" + this.getAttribute("data-id"));
        var sizew = document.getElementById("stack-builder-selected_size_women_" + this.getAttribute("data-id"));
        var comsize = document.getElementById("stack-builder-selected_size_" + this.getAttribute("data-id"));
        var id = document.getElementById("stack-builder-popup-size-" + this.getAttribute("data-id"));
        var btn = document.getElementById("stack-builder-product-btn-" + this.getAttribute("data-id"));
        var itm = document.getElementById("stack-builder-color-image-clone--" + this.getAttribute("data-id"));
        var itmw = document.getElementById("stack-builder-color-image-women-clone--" + this.getAttribute("data-id"));
        var act = document.querySelectorAll(".product-options__value--circle--" + this.getAttribute("data-id"));
        var color = this.getAttribute("data-selected-color");
        var btnring = document.getElementById("stack-builder-buyringsize-" + this.getAttribute("data-id"));
        var btnfinalcart = document.getElementById("stack-builder-finaladdtocart-" + this.getAttribute("data-id"));
        var btnwomenring = document.getElementById("stack-builder-buyringsize-women-" + this.getAttribute("data-id"));
        var btnwomenfinalcart = document.getElementById("stack-builder-finaladdtocart-women-" + this.getAttribute("data-id"));
        var sizeactive = document.querySelectorAll(".ring-size-active-" + this.getAttribute("data-id"));
        var sizewomenactive = document.querySelectorAll(".ring-size-women-active-" + this.getAttribute("data-id"));
        if(comsize)(comsize.innerHTML = "Size");
        if(size){size.innerHTML = "Size"} 
        if(sizew){sizew.innerHTML = "Size"}
        if (sizeactive.length>0) {
                        [].forEach.call(sizeactive,function(el){
                            if(el.classList.contains("active")){
                                el.classList.remove("active");
                            }
                        })
                    }
        if (sizewomenactive.length>0) {
                       [].forEach.call(sizewomenactive,function(el){
                            if(el.classList.contains("active")){
                                el.classList.remove("active");
                            }
                        })
                    }
    for (i = 0; i < act.length; i++) {
            if(act[i].classList.contains("active")){
                if(color == act[i].getAttribute("data-value")){
                    var a = document.createElement("div");
                    if(itm.children.length>0) {                      
                    itm.removeChild(itm.children[0]);  
                    }    
                    a.classList.add("product-option-color-selected");
                    a.style.backgroundImage = act[i].getAttribute("data-bg");
                    itm.appendChild(a);
                }else if(color == null){
                    if(itm.children.length>0) {                      
                    itm.removeChild(itm.children[0]);  
                    }             
                    var a = document.createElement("div");
                    a.classList.add("product-option-color-selected");
                    a.style.backgroundImage = act[i].getAttribute("data-bg");
                    itm.appendChild(a);  
                }              
            }
        }
        if(act.length <= 3){
            if(itm && itm.children.length>0) {
                    itm.removeChild(itm.children[0]);  
                    var mendiv = document.createElement("div");
                    mendiv.classList.add("product-option-color-selected");      
                    mendiv.style.backgroundImage = act[0].style.backgroundImage;      
                    itm.appendChild(mendiv);               
                } else {
                    var mendiv = document.createElement("div");
                    mendiv.classList.add("product-option-color-selected");      
                    mendiv.style.backgroundImage = act[0].style.backgroundImage;      
                    if(itm){itm.appendChild(mendiv);}                           
            }
            if(itmw && itmw.children.length>0) {
                itmw.removeChild(itmw.children[0]);  
                var womendiv = document.createElement("div");
                womendiv.classList.add("product-option-color-selected");      
                womendiv.style.backgroundImage = act[0].style.backgroundImage;      
                itmw.appendChild(mendiv);                  
            } else {
                var mendiv = document.createElement("div");
                mendiv.classList.add("product-option-color-selected");      
                mendiv.style.backgroundImage = act[0].style.backgroundImage;    
                if(itmw){itmw.appendChild(mendiv);}                     
            }      
    }  
    if(btnring){
    btnring.classList.remove("d-none");
    btnfinalcart.classList.add("d-none");
    }
    if(btnwomenring){
    btnwomenring.classList.remove("d-none");
    btnwomenfinalcart.classList.add("d-none");
    }
    if(id){id.classList.toggle("d-none");}
    if(btn){btn.classList.toggle("d-none");}
    this.classList.toggle("d-none");
    });
    $(document).on("click",".stack-builder-product-options__value--text", function(){
        var id = document.getElementById("stack-builder-product-size-label-" + this.getAttribute("data-id"));
        var label = document.getElementById("stack-builder-sizedroplabel-"  + this.getAttribute("data-id"));
        var btnring = document.getElementById("stack-builder-buyringsize-" + this.getAttribute("data-id"));
        var btncart = document.getElementById("stack-builder-finaladdtocart-" + this.getAttribute("data-id"));
        var available;
        if(this.classList.contains("disabled")) {
            available = false;
            if(btnring){btnring.classList.remove("d-none");}
            if(btncart){btncart.classList.add("d-none");}
        } else {
            available = true;
        }
        if(id){id.innerHTML = "Size " + this.innerHTML;}
        if(label){label.innerHTML = "Size " + this.innerHTML;}
        if(btncart){btncart.setAttribute("data-option2-value", this.getAttribute("data-value"));}
        if(btncart && btncart.classList.contains("d-none") && available){
            if(btnring){btnring.classList.add("d-none");}
            if(btncart){btncart.classList.remove("d-none");}
        }
});
        $(document).on("click",".stack-builder-product-options__value--text--men", function(){
            var id = document.getElementById("stack-builder-product-size-label-women-" + this.getAttribute("data-id"));
            var label = document.getElementById("stack-builder-sizedroplabelwomen-" + this.getAttribute("data-id"));
            var btnring = document.getElementById("stack-builder-buyringsize-" + this.getAttribute("data-id"));
            var btnwomenring = document.getElementById("stack-builder-buyringsize-women-" + this.getAttribute("data-id"));
            var btncart = document.getElementById("stack-builder-finaladdtocart-" + this.getAttribute("data-id"));
            var btnwomencart = document.getElementById("stack-builder-finaladdtocart-women-" + this.getAttribute("data-id"));
            var sizewomenactive = document.querySelectorAll(".ring-size-women-active-" + this.getAttribute("data-id"));
            var sizeactive = document.querySelectorAll(".ring-size-active-" + this.getAttribute("data-id"));
            var sizew = document.getElementById("stack-builder-selected_size_women_" + this.getAttribute("data-id"));
            var size = document.getElementById("stack-builder-selected_size_men_" + this.getAttribute("data-id"));
            men_size_selected = this.getAttribute("data-value");
            var btnpage = document.getElementById("stack-builder-buycartpage-" + this.getAttribute("data-id"));
            var btnpagecart = document.getElementById("stack-builder-addcartpage-" + this.getAttribute("data-id"));
            if (sizewomenactive.length>0) {
                [].forEach.call(sizewomenactive,function(el){
                        el.classList.remove("active");
                })
            };
            if(sizewomenactive.length>0){sizewomenactive[0].removeAttribute("style");}
            if(men_size_selected === ""){
                if(btnpage) {
                    btnpage.innerHTML = "Add to cart";
                    btnpage.classList.add("half_disabled_add_to_cart");
                }
                if(sizeactive.length>0){
                    sizeactive[0].style.backgroundColor = "white", "important";
                }
            };
            this.classList.add("active");
            if(id){id.innerHTML = "Size " + this.innerHTML;}
            if(label){label.innerHTML = "Size " + this.innerHTML;}
            if(btncart) {
                btncart.setAttribute("data-option1-value","Men Size " + men_size_selected);
                btncart.setAttribute("data-option2-value","Women Size " + women_size_selected);
            }
            if(btncart && btncart.classList.contains("d-none") && women_size_selected !== ""){
                btnring.classList.toggle("d-none");
                btncart.classList.toggle("d-none");
            }
            if(btnwomencart) {
                btnwomencart.setAttribute("data-option1-value","Men Size " + men_size_selected);
                btnwomencart.setAttribute("data-option2-value","Women Size " + women_size_selected);
            }
            if(btnwomencart && btnwomencart.classList.contains("d-none") && women_size_selected !== ""){
                btnwomenring.classList.toggle("d-none");
                btnwomencart.classList.toggle("d-none");
            }
            if(sizew && women_size_selected) {
                sizew.innerHTML = "Size " + "/" + women_size_selected.replace("Size","");
                size.innerHTML = "Size " + "/" + women_size_selected.replace("Size","");
            }
            if(sizew && men_size_selected && women_size_selected) {
                sizew.innerHTML = "Size " + men_size_selected.replace("Size","") + "/" + women_size_selected.replace("Size","");
                size.innerHTML = "Size " + men_size_selected.replace("Size","") + "/" + women_size_selected.replace("Size","");
            }
            try {
                if(page_selected_size1 !== "" && page_selected_size2 !== ""){
                    if(btnpage && btnpage.classList.contains("d-none") == false) {
                        btnpage.classList.toggle("d-none");
                        btnpagecart.classList.toggle("d-none");
                      }     
                } 
            } catch(err){ return;}  
            });
        $(document).on("click",".stack-builder-product-options__value--text--women", function(){
            var id = document.getElementById("stack-builder-product-size-label-women-" + this.getAttribute("data-id"));
            var label = document.getElementById("stack-builder-sizedroplabelwomen-" + this.getAttribute("data-id"));
            var btnring = document.getElementById("stack-builder-buyringsize-" + this.getAttribute("data-id"));
            var btnwomenring = document.getElementById("stack-builder-buyringsize-women-" + this.getAttribute("data-id"));
            var btncart = document.getElementById("stack-builder-finaladdtocart-" + this.getAttribute("data-id"));
            var btnwomencart = document.getElementById("stack-builder-finaladdtocart-women-" + this.getAttribute("data-id"));
            var sizewomenactive = document.querySelectorAll(".ring-size-women-active-" + this.getAttribute("data-id"));
            var sizeactive = document.querySelectorAll(".ring-size-active-" + this.getAttribute("data-id"));
            var sizew = document.getElementById("stack-builder-selected_size_women_" + this.getAttribute("data-id"));
            var size = document.getElementById("stack-builder-selected_size_men_" + this.getAttribute("data-id"));
            var btnpage = document.getElementById("stack-builder-buycartpage-" + this.getAttribute("data-id"));
            women_size_selected = this.getAttribute("data-value");
            if (sizewomenactive.length>0) {
                [].forEach.call(sizewomenactive,function(el){
                        el.classList.remove("active");
                })
            };
            if(sizewomenactive.length>0){sizewomenactive[0].removeAttribute("style");}
            if(men_size_selected === ""){
                if(btnpage) {
                    btnpage.innerHTML = "Add to cart";
                    btnpage.classList.add("half_disabled_add_to_cart");
                }
                if(sizeactive.length>0){
                    sizeactive[0].style.backgroundColor = "white", "important";
                }
            };
            this.classList.add("active");
            if(id){id.innerHTML = "Size " + this.innerHTML;}
            if(label){label.innerHTML = "Size " + this.innerHTML;}
            if(btncart) {
                btncart.setAttribute("data-option1-value","Men Size " + men_size_selected);
                btncart.setAttribute("data-option2-value","Women Size " + women_size_selected);
            }
            if(btncart && btncart.classList.contains("d-none") && men_size_selected !== ""){
                btnring.classList.toggle("d-none");
                btncart.classList.toggle("d-none");
            }
            if(btnwomencart) {
                btnwomencart.setAttribute("data-option1-value","Men Size " +  men_size_selected);
                btnwomencart.setAttribute("data-option2-value","Women Size " + women_size_selected);
            }
            if(btnwomencart && btnwomencart.classList.contains("d-none") && men_size_selected !== ""){
                btnwomenring.classList.toggle("d-none");
                btnwomencart.classList.toggle("d-none");
            }
            if(sizew && women_size_selected) {
                sizew.innerHTML = "Size " + "/" + women_size_selected.replace("Size","");
                size.innerHTML = "Size " + "/" + women_size_selected.replace("Size","");
            }
            if(sizew && men_size_selected && women_size_selected) {
                sizew.innerHTML = "Size " + men_size_selected.replace("Size","") + "/" + women_size_selected.replace("Size","");
                size.innerHTML = "Size " + men_size_selected.replace("Size","") + "/" + women_size_selected.replace("Size","");
            }
});
            $(document).on("click",".stack-builder-product-options__value--circle", function(){
                btn = document.getElementById("btn-product-cart-id-" + this.getAttribute("data-id"));
                sbbtn = document.getElementById("stack-builder-finaladdtocart-" + this.getAttribute("data-id"));
                imgsrc = this.style.backgroundImage;
                imgsrc = imgsrc.replace('url("','');
                imgsrc = imgsrc.replace('")','');
                if(btn){
                btn.setAttribute("data-selected-color",this.getAttribute("data-value"));
                }   
                if(sbbtn){
                sbbtn.setAttribute("data-color",imgsrc);
                sbbtn.setAttribute("data-option1-value",this.innerHTML);                
                }   
            });
//horizontal scroll for tab title
var btnnext = document.getElementById('next-arrow');
btnnext.onclick = function () {
    var container = document.getElementById('stackables-tabs');
    sideScroll(container,'right',25,100,10);
};
var btnprev = document.getElementById('prev-arrow');
btnprev.onclick = function () {
    var container = document.getElementById('stackables-tabs');
    sideScroll(container,'left',25,100,10);
};
function sideScroll(element,direction,speed,distance,step){
    scrollAmount = 0;
    var slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}