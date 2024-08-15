import axios from 'axios';

const postToAllPlatforms = async (post) => {
  const { content, image, platforms } = post;
  const requests = [];
  if (platforms.includes('facebook')) {
    requests.push(axios.post('https://graph.facebook.com/me/feed', {
      message: content,
      access_token: process.env.FACEBOOK_ACCESS_TOKEN,
    }));
  }
  // if (platforms.includes('youtube')) {
  //   requests.push(axios.post('https://www.googleapis.com/youtube/v3/videos?part=snippet,status', {
  //     headers: {
  //       Authorization: `Bearer ${process.env.YOUTUBE_ACCESS_TOKEN}`,
  //       'Content-Type': 'application/json',
  //     },
  //     data: {
  //       snippet: {
  //         title: content,
  //         description: content,
  //         thumbnails: { default: { url: image } },
  //       },
  //       status: {
  //         privacyStatus: 'public',
  //       },
  //     },
  //   }));
  // }
  // if (platforms.includes('linkedin')) {
  //   requests.push(axios.post('https://api.linkedin.com/v2/shares', {
  //     headers: {
  //       Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
  //       'Content-Type': 'application/json',
  //     },
  //     data: {
  //       content: {
  //         title: content,
  //         media: [{ status: 'READY', description: { text: content }, originalUrl: image }],
  //       },
  //       distribution: {
  //         linkedInDistributionTarget: {},
  //       },
  //       owner: 'urn:li:person:yourLinkedInID', // Replace with actual LinkedIn ID
  //       text: {
  //         text: content,
  //       },
  //     },
  //   }));
  // }
  // if (platforms.includes('instagram')) {
  //   requests.push(axios.post('https://graph.instagram.com/v1/media', {
  //     image_url: image,
  //     caption: content,
  //     access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
  //   }));
  // }
  // if (platforms.includes('twitter')) {
  //   requests.push(axios.post('https://api.twitter.com/2/tweets', {
  //     headers: {
  //       Authorization: `Bearer ${process.env.TWITTER_ACCESS_TOKEN}`,
  //       'Content-Type': 'application/json',
  //     },
  //     data: {
  //       text: content,
  //     },
  //   }));
  // }

  try {
    await Promise.all(requests);
  } catch (error) {
    console.error('Error posting to social media:', error);
  }
};

export default postToAllPlatforms;
