require('dotenv').config();
const Discord = require('discord.js');
const cron = require('node-cron');
const youtube_api = require('./youtube');

const discord_token = process.env.DISCORD_TOKEN;

const ALAZYLEON_CHANNEL_ID = "UUE-f0sqi-H7kuLT0YiW9rcA";
const FIRESPARK81_CHANNEL_ID = "UUL7xE0SkXfNvnkNK7yDIFvQ";
const GRANDVICE8_ID = "UUKn5Myq7CjeXnxw_xKD0eXg";
const BEBE_AUTOCHESS_ID = "UUD1iX4medKbJKbnVQjkoiZA";
const BUNNYMUFFINS_ID = "UUpdmH0EPVKzkJjGIKnuzrxA";
// const squeezie_id = "UUWeg2Pkate69NFdBeuRFTAw";

const YOUTUBE_WATCH_URL="https://www.youtube.com/watch";

const DEV_CHANNEL_ID="774035981258326046"
const YOUTOUPS_CHANNEL = "820262686717247528"
const TFT_CHANNEL = "820279081072984067"

const bot = new Discord.Client();

const today_date = new Date();

const yesterday_date = new Date(
	today_date.setDate(today_date.getDate() - 1)
).toLocaleDateString('en-US');

const yesterday_time = new Date(
	today_date.setDate(today_date.getDate() - 1)
).toLocaleTimeString('en-US');

bot.login(discord_token);

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);
	
	cron.schedule('0 0 6 * * *', () => {
		console.info("checking for new videos");
		console.info(`yesterday date - ${yesterday_date}`);
		console.info(`yesterday time - ${yesterday_time}`);
	
		const dev_channel = bot.channels.get(DEV_CHANNEL_ID);

		const youtoups_channel = bot.channels.get(DEV_CHANNEL_ID);
		const tft_channel = bot.channels.get(DEV_CHANNEL_ID);
		
		fetchVideo(ALAZYLEON_CHANNEL_ID).then(result => {
			if (result) youtoups_channel.send(result);
		});
		fetchVideo(FIRESPARK81_CHANNEL_ID).then(result => {
			if (result) youtoups_channel.send(result);
		});
		fetchVideo(GRANDVICE8_ID).then(result => {
			if (result) tft_channel.send(result);
		});
		fetchVideo(BEBE_AUTOCHESS_ID).then(result => {
			if (result) tft_channel.send(result);
		});
		fetchVideo(BUNNYMUFFINS_ID).then(result => {
			if (result) tft_channel.send(result);
		});
	});
});

bot.on('message', msg => {
	if (msg.content.startsWith('!ping')) {
		msg.channel.send('pong');
	}
});

function fetchVideo(channel) {
	return new Promise((resolve, reject) => {
		youtube_api.fetchYoutube('playlistItems', channel).then(result => {
			if (result) {
				const { videoId, videoPublishedAt } = result.items[0].contentDetails;
				const video_date = new Date(videoPublishedAt).toLocaleDateString('en-US');
				const video_time = new Date(videoPublishedAt).toLocaleTimeString('en-US');

				if (video_date < yesterday_date) resolve(false);
				else if (video_date == yesterday_date) {
					if (video_time < yesterday_time) resolve(false);
				}
				resolve(`${YOUTUBE_WATCH_URL}?v=${videoId}`);
			} else reject(false);
		});
	});
}
