<?php
if (!isset($_GET['device'])) {
	die('No device specified');
}

$device = $_GET['device'];

switch ($device) {
	case 'electric-blanket':
		$response = file_get_contents('http://rasperrypi-b.local');
		break;
	case 'attic-temperature':
		$response = file_get_contents('http://192.168.1.111/');
}

