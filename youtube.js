const fetch = require('node-fetch');


const YOUTUBE_BASE_URL="https://youtube.googleapis.com/youtube/v3";
const youtube_token = process.env.YOUTUBE_TOKEN;

const fetchYoutube = async (entity, playlistId) => {
	const res = await fetch(
		`${YOUTUBE_BASE_URL}/${entity}?key=${youtube_token}&playlistId=${playlistId}&part=contentDetails`
	);

	if (res.status == 200) {
		const resJson = await res.json();
		console.log("success");

		return resJson;
	} else {
		console.error(res);
	}

	return null;
};

module.exports = { fetchYoutube };
