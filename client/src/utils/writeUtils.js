function getFileIdFromUrl(secureUrl) {
	// Find the position of '/upload/' in the URL
	const uploadIndex = secureUrl.indexOf("/upload/");

	// Get everything after '/upload/' and split by '/' to get uuid + public_id (latter we want!)
	const afterUpload = secureUrl.substring(uploadIndex + 8); // 8 = length of '/upload/'
	const parts = afterUpload.split("/");

	// Join all parts after the version (index 1) to reconstruct the full public_id
	const publicIdWithExtension = parts.slice(1).join("/");
	console.log(`publicId with extension: ${publicIdWithExtension}`);

	// Remove file extension by finding the last dot
	const lastDotIndex = publicIdWithExtension.lastIndexOf(".");
	const publicId = publicIdWithExtension.substring(0, lastDotIndex);

	console.log(`publicId is: ${publicId}`);
	return publicId;
}

export { getFileIdFromUrl };
