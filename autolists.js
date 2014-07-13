/*
Title       : Automated Lists Plug-in
Description : Fills the children of a ul/ol elements with records from a json data source that contains one array of objects
Author      : Thomas Sarmis ( thomas.sarmis@gmail.com / http://sarmis.gr )
Requirements: jquery

Inspired by : http://lea.verou.me/2013/12/simple-script-automatic-talks-list/

*/


function CreateSpan(Key, Data, ClassesPrefix) {
    
	var span = jQuery("<span></span>");
	
    span.addClass(ClassesPrefix + Key).addClass(Key);

    if (typeof Data === 'object') {

        if (Data.url) {
            jQuery("<a></a>").attr("href", Data.url).text(Data.text).appendTo(span);
        } else {
            span.text(Data.text);
        }
    } else {
        span.text(Data);
    }

    return span;
}

// Creates the auto-list on the <aListElement>
function CreateAutoList(ListElement, ClassesPrefix, ItemsToRender ) {
    
	ListElement.addClass('al-list'); 
    
    jQuery.getJSON(ListElement.attr("data-source"), function (data) {
        for (var i = 0; i < data.length; i++) {

            var listItem = jQuery("<li></li>").addClass('al-item');

            if (ItemsToRender) {
                for (var iKey = 0; iKey < ItemsToRender.length; iKey++) {
                    var Key = ItemsToRender[iKey];
                    CreateSpan(Key, data[i][Key], ClassesPrefix).appendTo(listItem);
					listItem.html(listItem.html() + " ");
                }
            } else {
                for (var Key in data[i]) {
                    CreateSpan(Key, data[i][Key], ClassesPrefix).appendTo(listItem);                
					listItem.html(listItem.html() + " ");
				}
            }
            listItem.appendTo(ListElement);
        }
    });
}

