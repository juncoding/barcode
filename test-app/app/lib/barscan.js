
var self = {
	EVENT: {
		// --- listen ---
		
		// --- fire ---
		scanned: 'barscan.scanned'
	},
	RESULT: {
		success		: 1,
		failed		: -1,
		cancelled	: 0
	},
	barScanner: require('com.test.barscan')
};

function open(param){
	param = param || {};
	var isSimulator = Ti.Platform.model === 'Simulator' ? true : false;
	var classType	= isSimulator ? 'ZBarReaderController' : 'ZBarReaderViewController';
	var sourceType	= isSimulator ? 'Album' : 'Camera';
	var cameraMode	= isSimulator ? 'Default' : 'Sampling';
	//Ti.API.error(JSON.stringify(param.barCodes));
	self.barScanner.scan({
		configure: {
	        classType	: classType,
	        sourceType	: sourceType,
	        cameraMode	: cameraMode,
	        barCodes	: param.barCodes || Alloy.CFG.barCodes,
	        config:{
		        'showsZBarControls'		: true,
		        'tracksSymbols'			: true,		// the tracking rectangle that highlights barcodes
		        'showsHelpOnFail'		: false,
		    },
            styles: {
                title: {
                	text: 'Scan',
                	size: '24dp',
                },
                content:{
                	text: '',
                	size: '24dp',
                }
            },
		},
		success: _doSuccess,
		cancel: _doCancel,
		error:	_doError,
	});
}

function _doSuccess(r){
	var barcode = Alloy.CFG.barCodes[r.symbology] || Alloy.CFG.barCodes.unsupported;
	barcode.value = r.barcode;
	Ti.App.fireEvent(self.EVENT.scanned, {
		result	: self.RESULT.success,
		barcode : barcode,
	});
}

function _doCancel(){
	Ti.App.fireEvent(self.EVENT.scanned, {
		result	: self.RESULT.cancelled,
	});	
}

function _doError(err){
	Ti.App.fireEvent(self.EVENT.scanned, {
		result	: self.RESULT.failed,
		error	: err
	});	
}

exports.EVENT = self.EVENT;
exports.RESULT = self.RESULT;
exports.open = open;

