var self = {
	scanner : null
};

function _doScanBarcode(e) {
	self.scanner = require('barscan');
	self.scanner.open({
		animate : true
	});

	Ti.App.addEventListener(self.scanner.EVENT.scanned, _doScanned);
	Ti.App.addEventListener(self.scanner.EVENT.cancelled, _doCancelled);
}

function _doCancelled(r) {
	Ti.App.removeEventListener(self.scanner.EVENT.scanned, _doScanned);
	Ti.App.removeEventListener(self.scanner.EVENT.cancelled, _doCancelled);
}

function _doScanned(r) {
	Ti.App.removeEventListener(self.scanner.EVENT.scanned, _doScanned);
	Ti.App.removeEventListener(self.scanner.EVENT.cancelled, _doCancelled);
	switch(r.result) {
	case self.scanner.RESULT.success:
		playSound();
		Ti.API.error(JSON.stringify({
			number : r.barcode.value,
			type : r.barcode.id,
		}));
		$.barcodeType.text = r.barcode.type;
		renderBarcode({
			number : r.barcode.value,
			type : r.barcode.id,
		});

		break;
	case self.scanner.RESULT.failed:
		App.showDialog({
			title : 'No barcode detected',
			message : 'Try cropping image to re-position barcode in the center',
			buttonNames : ['OK'],
		});

		break;
	case self.scanner.RESULT.cancelled:
		break;
	default:
	}
}

function renderBarcode(data) {
	var barcodeModule = require('com.test.barcode');

	var _barcode = {
		id : data.type,
		value : data.number
	};
	_barcode = validateBarcode(_barcode);

	if (_barcode.id > 0) {
		var barstyle = $.createStyle({
			classes : (['aztec', 'qrcode'].indexOf(_barcode.type) > -1 ) ? 'qrcode' : 'barcode'
		});
		$.barcode.applyProperties(barstyle);

		barstyle.type = _barcode.type;
		barstyle.code = _barcode.value;

		var numberstyle = $.createStyle({
			classes : 'barcodeNumber'
		});
		$.barcodeNumber.applyProperties(numberstyle);
		$.barcodeNumber.text = data.number;

		try {
			var img = null;
			img = barcodeModule.encode(barstyle);

		} catch(err) {
			Ti.API.error('>>> Barcode Render ERROR:' + JSON.stringify(_barcode));
		}

		if ( typeof (img) == 'undefined') {
			$.barcode.visible = false;
		} else {
			$.barcode.setImage(img);
			$.barcode.visible = true;
		}

	} else {
		$.barcode.visible = false;
		$.barcodeNumber.text = '';
	}

	return _barcode;
}

function validateBarcode(barcode) {
	if (barcode.type)
		barcode.id = Alloy.CFG.barCodes[barcode.type].id;

	if ((!barcode.value || '' == barcode.value) || (barcode.id <= 0))
		return true;

	var _barcode = _.where(Alloy.CFG.barCodes, {
		id : barcode.id
	});

	if (_barcode) {
		barcode.type = _barcode[0].type;
	} else {
		barcode.id = 0;
		barcode.type = 'unsupported';
	}
	return barcode;
}

function _doShowBarcodeValue(e) {
	App.showAlert(e.source.text, 'Barcode value:');
}

function playSound() {
	Ti.Media.createSound({
		url : '/scan.m4a'
	}).play();
}

$.me.open();
