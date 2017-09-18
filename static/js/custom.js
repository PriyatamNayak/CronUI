$(document).ready(function(){
    $( ".add-entry-btn" ).click(function() {
	$( '<a href="#" class="list-group-item list-group-item-danger cron-entry">#* * * * * root ... Empty line</a>' ).insertBefore( this );
	$( '<input type="text" class="cron-edit" style="display:none"/>' ).insertBefore( this );
	$( '<button class="cron-edit cron-delete btn btn-sm btn-warning" style="display:none">Delete entry</button>' ).insertBefore( this );
        console.log($( this ));
    });

    $(document).on( "click", '.cron-entry', function(){
        $(this).hide().next(".cron-edit").show().val($.trim($(this).text())).focus();
	$(this).next().next(".cron-edit").show();
    });

    $(document).on( "click", ".cron-delete", function(){
	console.log($(this));
	$(this).prev().prev(".cron-entry").remove();
	$(this).prev().remove();
	$(this).remove();
    });

    $(".list-group").on('focusout', '.cron-edit', function(){
        console.log($(this));
        $(this).hide().prev(".cron-entry").show().text($(this).val());
	window.setTimeout(function() { $(this).next('.cron-edit').hide() }, 100);
    });


    $(function() {
        $('.save-entry-btn').click(function() {
	    var cronEntries = [];
	    $( this ).prevAll(".cron-entry").each( function( index, element ) {
		cronEntries.push($.trim($(this).text()))
	    });
	    var cronTitle = $( this ).closest(".list-group").find("h3").text();
	    cronEntries.push(cronTitle);
            $.ajax({
                url: Flask.url_for('crontabsave'),
		data: JSON.stringify(cronEntries),
                contentType: 'application/json;charset=UTF-8',
                type: 'POST',
                success: function(response) {
                    console.log(response);
		    alert("Crontab "+cronTitle+" saved.");
                },
                error: function(error) {
                    console.log(error);
		    alert("Crontab "+cronTitle+" save failed!");
                }
            });
        });
    });

    $(function() {
        $('nav a[href^="' + location.pathname.split("/")[1] + '"]').addClass('active');
    });
    

});
