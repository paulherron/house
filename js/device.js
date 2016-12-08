$(document).ready(function() {
	refreshStatus('electric-blanket', false);

	$('.action').click(function() {
		var url = $(this).attr('data-url');
		var actionLink = this;

		$.getJSON(url, function(data) {
			var statusMessage = data['output'];
			$('.secondary-status').html(statusMessage);

			if (data['action'] == 'on') {
				$(actionLink).parent().prev()
					.addClass('positive')
					.removeClass('negative');
			} else {
				$(actionLink).parent().prev()
					.addClass('negative')
					.removeClass('positive');
			}

			refreshStatus($(actionLink).parent().parent().attr('id'), true);
		});
	});
});

function refreshStatus(device, fade) {
	$.getJSON('device.php?device=' + device, function(data) {
		var statusMessage = 'Turned ' + data['lastCommand'] + ' at ' + data['lastCommandTime'];
		$('#' + device + ' .status').html(statusMessage);
	});
}
