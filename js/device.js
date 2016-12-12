$(document).ready(function() {
	refreshStatus('electric-blanket');
	refreshStatus('front-door-light');
	refreshStatus('attic-temperature');

	$('.action').click(function() {
		var url = $(this).attr('data-url');
		var actionLink = this;

		$.getJSON(url, function(data) {
			var statusMessage = data['output'];

			if (data['action'] == 'on') {
				$(actionLink).parent().prev()
					.addClass('positive')
					.removeClass('negative');
			} else {
				$(actionLink).parent().prev()
					.addClass('negative')
					.removeClass('positive');
			}

			refreshStatus($(actionLink).parent().parent().attr('id'));
		});
	});
});

function refreshStatus(device) {
	var $tableRow = $('#' + device);

	// Extract the status URL if it was defined in a data attribute,
	// or use a default one.
	var statusUrl = $tableRow.attr('data-url');

	// Extract the status template if it was defined in a data attribute.
	var statusTemplate = $tableRow.attr('data-status-template');

	if (!statusUrl || !statusTemplate) {
		return false;
	}

	$.getJSON(statusUrl, function(data) {
		var statusMessage = eval('`' + statusTemplate + '`');
		$('#' + device + ' .status').html(statusMessage);
	});
}
