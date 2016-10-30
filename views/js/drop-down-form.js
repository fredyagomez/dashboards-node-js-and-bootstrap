$(function() {
    var button = $('#dropdownButton');
    var box = $('#dropdownBox');
    var form = $('#dropdownForm');
    button.removeAttr('href');
    button.mouseup(function(dropdown) {
        box.toggle();
        button.toggleClass('active');
    });
    form.mouseup(function() { 
        //return false;
    });
    $(this).mouseup(function(dropdown) {
        if(!($(dropdown.target).parent('#dropdownButton').length > 0)) {
            //button.removeClass('active');
            //box.hide();
        }
    });
});