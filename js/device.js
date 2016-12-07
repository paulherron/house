$(document).ready(function() {
	$.getJSON('device.php?device=electric-blanket', function(data) {
		var statusMessage = 'Turned ' + data['lastCommand'] + ' at ' + data['lastCommandTime'];
		$('#electric-blanket').html(statusMessage);
	});
});
