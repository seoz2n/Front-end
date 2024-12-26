$(document).ready(function () {
    $("#selectable li").on("click", function () {
        $(".page").hide();
        const pageId = $(this).attr("id") + "-page";
        $("#" + pageId).show();
        $("#selectable li").removeClass("ui-selected").css("background", "");
        $(this).addClass("ui-selected").css("background", "#2e4b1b");
    });

    $("#admin_btn").on("click", function () {
        $("#selectable li").css("background", "");
        $(".ui-selected").removeClass("ui-selected");
        $(this).addClass("ui-selected").css("background", "#2e4b1b");
    });

    let $menu = $(".menu"),
        $cart = $("#cart"),
        menuData = {};  // Track menu item and quantity

    // Set up the draggable behavior for menu items
    $menu.draggable({
        revert: "invalid", // 드래그할 때 원위치로 돌아가도록 설정
        cursor: "move",
        helper: function (event) {
            let $this = $(this);
            return $('<div class="menu-helper"></div>') 
                .html('<img src="' + $this.attr('src') + '" height="50" width="50">') // Create small image for helper
                .css({ "z-index": 1000, "position": "absolute" });
        },
        start: function(event, ui) {
            ui.helper.css({
                height: "50px", 
                width: "50px", 
                "z-index": "1000"
            });
        },
        stop: function(event, ui) {
            ui.helper.css({
                height: "", 
                width: "", 
                "z-index": ""
            });
        },
        scroll: false
    });

    // Set up the droppable area for the cart (not nav)
    $cart.droppable({
        accept: ".menu", // 메뉴 아이템만 수락
        classes: {
            "ui-droppable-active": "custom-state-active"
        },
        drop: function(event, ui) {
            let droppedItem = ui.helper.clone(); // Clone the dragged item
            let menuName = ui.helper.attr("menuname");

            // Add the item to the cart area
            droppedItem.css({
                height: "50px", 
                width: "50px", 
                position: "relative", 
                top: "auto", 
                left: "auto"
            });

            // Add item to cart data (menuData)
            if (!menuData[menuName]) {
                menuData[menuName] = { quantity: 0, price: 5000 };  // Example price
            }

            menuData[menuName].quantity += 1;

            $(this).append(droppedItem); // Add the image to the cart area

            // Create and add the item card to cart (not the nav area)
            let itemCard = $('<div class="item-card"></div>');
            let infoFood = $('<div class="info-this-food"></div>').text(menuName);
            let infoSum = $('<div class="info-this-sum"></div>')
                .html(`수량: <button class="decrease">-</button> <span class="quantity">${menuData[menuName].quantity}</span> <button class="increase">+</button>`);
            itemCard.append(infoFood, infoSum);

            // Add to cart area (keep track of added items)
            $("#cart").append(itemCard);

            // Update total quantity and price
            updateTotal();

            ui.helper.remove(); // Remove the helper image from the nav

            // Add event listeners for quantity buttons
            itemCard.find(".increase").on("click", function () {
                menuData[menuName].quantity += 1;
                updateTotal();
                $(this).siblings(".quantity").text(menuData[menuName].quantity);
            });

            itemCard.find(".decrease").on("click", function () {
                if (menuData[menuName].quantity > 0) {
                    menuData[menuName].quantity -= 1;
                    updateTotal();
                    $(this).siblings(".quantity").text(menuData[menuName].quantity);
                }
            });
        }
    });

    // Function to update the total quantity and price
    function updateTotal() {
        let totalQuantity = 0;
        let totalPrice = 0;
        $.each(menuData, function(menuName, data) {
            totalQuantity += data.quantity;
            totalPrice += data.quantity * data.price;
        });
        $("#total-quantity").text(totalQuantity);
        $("#total-price").text(totalPrice);
    }

    // Payment button functionality
    $("#pay-btn").on("click", function () {
        let receipt = "영수증:\n";
        $.each(menuData, function(menuName, data) {
            if (data.quantity > 0) {
                receipt += `${menuName}: ${data.quantity}개, ${data.quantity * data.price} 원\n`;
            }
        });
        receipt += `총 금액: ${$("#total-price").text()} 원`;
        alert(receipt);

        // Reset everything after payment
        menuData = {};
        $(".item-cart").empty();
        updateTotal();
    });
});
