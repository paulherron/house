$(document).ready(function() {

	$('table#devices tr').each(function() {
		var deviceName = $(this).attr('id');
		if (!deviceName) {
			return;
		}

		refreshStatus(deviceName);
	});

	$('.action').click(function() {
		var url = $(this).attr('data-url');
		var actionLink = this;

		$.getJSON(url, function(data) {
			var statusMessage = data['output'];

			if ($.inArray(data['lastCommand'], ['on', 'up', 'true']) > -1) {
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

		return false;
	});

	Handlebars.registerHelper('relativeTime', function(dateTime, format) {
		return moment(dateTime).fromNow();
	});
});

function refreshStatus(device) {
	var $tableRow = $('#' + device);

	// Extract the status URL if it was defined in a data attribute.
	var statusUrl = $tableRow.attr('data-url');
	if (!statusUrl) {
		return false;
	}

	// Extract the status template if it was defined in a data attribute,
	// or use a default one.
	var statusTemplate = $tableRow.attr('data-status-template');
	if (!statusTemplate) {
		statusTemplate = 'Turned {{lastCommand}} {{ relativeTime lastCommandTime }}';
	}

	$.getJSON(statusUrl, function(data) {
		var template = Handlebars.compile(statusTemplate);
		var statusMessage = template(data);
		$('#' + device + ' .status').html(statusMessage);
	});
}
