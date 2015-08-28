// Calculate screen size
var DEVICEDP = {
	width: Math.floor(Ti.Platform.displayCaps.platformWidth * 160 / Ti.Platform.displayCaps.dpi),
	height: Math.floor(Ti.Platform.displayCaps.platformHeight * 160 / Ti.Platform.displayCaps.dpi),
	toPx: Ti.Platform.displayCaps.dpi / 160,
};

var devSize = 0;
var sizeScale = 1;
if (DEVICEDP.width >= 960) {
	devSize = 5;
	sizeScale = 2.8;
} else if (DEVICEDP.width >= 750) {
	devSize = 4;
	sizeScale = 2.3;
} else if (DEVICEDP.width >= 640) {
	devSize = 3;
	sizeScale = 2;
} else if (DEVICEDP.width >= 480) {
	devSize = 2;
	sizeScale = 1.5;
} else if (DEVICEDP.width >= 375) {
	devSize = 1;
	sizeScale = 1.16;
}

function calSize(sizeNum, lang) {
	var adjustSize = Math.round(sizeNum * sizeScale);
	return adjustSize;
};

var size = {
	barcodeSize : {
		standard : {
			width : [288, 336, 432, 576, 672, 832],
			height : [180, 210, 280, 360, 420, 520],
		},
		small : {
			width : [72, 80, 112, 144, 168, 208],
			height : [45, 50, 70, 90, 105, 130],
		}
	},

	QRCodeSize : {
		//	height : [180, 210, 280, 360, 420, 520],
		//	width : [288, 336, 432, 576, 672, 832],
		noText : [120, 140, 200, 260, 316, 390],
		withText : [100, 110, 156, 200, 232, 312],
		PerkdID : [136, 160, 240, 320, 372, 464],
	},
};

Alloy.CFG.UI = {
	screen: {
		width: DEVICEDP.width,
		height: DEVICEDP.height,
		heightHalf: Math.round(DEVICEDP.height / 2),
		height35: Math.round(DEVICEDP.height * 0.35),
	},

	fontFamily: 'Melbourne',
	fontSize: {
		m15: calSize(15),
		m34: calSize(34),
	},
	size: {
		m18: calSize(18),
		m20: calSize(20),
	},

	iconFamily: 'picon',
	barcodeSize: {
		standard: {
			width: size.barcodeSize.standard.width[devSize],
			height: size.barcodeSize.standard.height[devSize],
		},
	},
	magstripe: {
		top: Math.floor(size.barcodeSize.standard.height[devSize] * 0.15),
		height: Math.floor(size.barcodeSize.standard.height[devSize] * 0.24),
	},
	barcode: {
		left: calSize(22),
		width: Math.floor(size.barcodeSize.standard.width[devSize] - calSize(22) * 2),
		height: Math.floor(size.barcodeSize.standard.height[devSize] * 0.4),
	},
	QRCodeSize: {
		noText: size.QRCodeSize.noText[devSize],
		noTextLeft: Math.floor((size.barcodeSize.standard.width[devSize] - size.QRCodeSize.noText[devSize]) / 2),
		noTextTop: Math.floor((size.barcodeSize.standard.height[devSize] * 0.84 - size.QRCodeSize.noText[devSize]) / 2),
		withText: size.QRCodeSize.withText[devSize],
		withTextLeft: Math.floor((size.barcodeSize.standard.width[devSize] - size.QRCodeSize.withText[devSize]) / 2),
		withTextTop: Math.floor((size.barcodeSize.standard.height[devSize] * 0.68 - size.QRCodeSize.withText[devSize]) / 2 * 1.2),
	},
	barcodeNumber: {
		top: Math.floor(size.barcodeSize.standard.height[devSize] * 0.61),
		width: Math.floor(size.barcodeSize.standard.width[devSize] - calSize(18) * 2),
		height: Math.floor(size.barcodeSize.standard.height[devSize] * 0.23),
	}
};