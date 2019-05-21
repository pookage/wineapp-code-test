function convertToSafeString(string){
	return string.toLowerCase().replace(/ /g,"_").replace(/\W/g, '');
}//convertToSafeString

function getAssetUrl(public_id, options = {}){

	const {
		w, h, // (number) 'width' / 'height' of the image in pixels
		c,    // (string) type of crop to apply to the image when 
	} = options;

	if(w && h && !c){
		console.warn("WARNING: You are changing the requested assets dimensions without specifiying a crop; this may result in a distorted final image.");
	}

	const transformations = Object.keys(options).map(key => `${key}_${options[key]}`).join(",");
	const url             = `//res.cloudinary.com/wineapp/image/upload/${transformations}/${public_id}`;

	return url;
}//getAssetUrl

function detectBrowser(userAgent){
	
	userAgent  = userAgent.toLowerCase();

	//detect the browser based on the userAgent
	const isChrome   = userAgent.indexOf("chrome") > -1;
	const isChromium = userAgent.indexOf("chromium") > -1;
	const isFirefox  = userAgent.indexOf("firefox") > -1;
	const isSafari   = userAgent.indexOf("safari") > -1 && !isChrome && !isChromium;
	const isOpera    = userAgent.indexOf("opera") > -1 || userAgent.indexOf("opr") > -1;
	const isIE       = userAgent.indexOf("msie") > -1 || userAgent.indexOf("trident") > -1;
	const isEdge     = userAgent.indexOf("edge") > -1;

	//assign based on flags
	let browser            = "unknown";
	if(isChrome)   browser = "chrome";
	if(isChromium) browser = "chromium";
	if(isFirefox)  browser = "firefox";
	if(isSafari)   browser = "safari";
	if(isOpera)    browser = "opera";
	if(isIE)       browser = "ie";
	if(isEdge)     browser = "edge";

	return browser;
}//getBrowserName

function detectOrientation(window){

	const {
		innerWidth,
		innerHeight
	} = window;

	const orientation = innerWidth > innerHeight ? "landscape" : "portrait";

	return orientation;
}//detectOrientation

function detectSizeBucket(window, orientation){

	const {
		innerWidth,
		innerHeight
	} = window;

	const width = orientation == "portrait" ? innerWidth : innerHeight;

	let sizeBucket;
	if(width < 768)       sizeBucket = 0; // MOBILE
	else if(width < 1025) sizeBucket = 1; // TABLET
	else if(width < 1921) sizeBucket = 2; // 1080P DESKTOP
	else if(width < 2561) sizeBucket = 3; // 1440P DESKTOP
	else                  sizeBucket = 4; // 4K DESKTOP

	return sizeBucket;
}//detectSizeBucket

function detectOS(appVersion){

	appVersion = appVersion.toLowerCase();

	//detect the os based on the appVersion
	const isWindows = appVersion.indexOf("win") > -1;
	const isMac     = appVersion.indexOf("mac") > -1;
	const isUnix    = appVersion.indexOf("x11") > -1;
	const isLinux   = appVersion.indexOf("linux") > -1;
	const isAndroid = appVersion.indexOf("android") > -1;
	const isIOS     = appVersion.indexOf("iphone") > -1 || appVersion.indexOf("ipad") > -1 || appVersion.indexOf("ipod") > -1;

	//assign based on above flags
	let os           = "unknown";
	if(isWindows) os = "windows";
	if(isMac)     os = "mac";
	if(isUnix)    os = "unix";
	if(isLinux)   os = "linux";
	if(isAndroid) os = "android";
	if(isIOS)     os = "ios";

	return os;
}//detectOS


export {
	convertToSafeString,
	getAssetUrl,
	detectBrowser,
	detectOrientation,
	detectSizeBucket,
	detectOS
};