$(document).ready(function() {
    let $menu = $('.menu'),
        $cart = $('#cart');

    $menu.draggable({
        revert: "invalid",
        cursor: "move",
        start: function(event, ui) {  
            ui.helper.css({
                height: "50px", 
                width: "50px", 
                "z-index": 2000
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

    $cart.droppable({
        accept: ".menu",
        classes: {
            "ui-droppable-active": "ui-state-highlight"
        },
        drop: function(event, ui) {
            $(this).text("Dropped!");

            let droppedItem = ui.helper.clone();
            droppedItem.css({
                height: "50px",
                width: "50px",
                position: "relative",
                top: "auto",
                left: "auto"
            });

            $(this).append(droppedItem);

            ui.helper.remove();
        }
    });
});
