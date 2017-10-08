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
});

function refreshStatus(device) {
	var $tableRow = $('#' + device);

	// Extract the status URL if it was defined in a data attribute,
	// or use a default one.
	var statusUrl = $tableRow.attr('data-url');

	// Extract the status template if it was defined in a data attribute.
	var statusTemplate = $tableRow.attr('data-status-template');
	if (!statusTemplate) {
		statusTemplate = 'Turned ${data.lastCommand} ${formatTime(data.lastCommandTime)}';
	}

	if (!statusUrl || !statusTemplate) {
		return false;
	}

	$.getJSON(statusUrl, function(data) {
		var statusMessage = eval('`' + statusTemplate + '`');
		$('#' + device + ' .status').html(statusMessage);
	});
}
