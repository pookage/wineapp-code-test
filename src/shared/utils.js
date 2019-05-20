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

export {
	convertToSafeString,
	getAssetUrl
};