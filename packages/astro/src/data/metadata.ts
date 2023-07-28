import GitHub from '../components/icons/github.astro';
import Twitter from '../components/icons/twitter.astro';
import Bluesky from '../components/icons/bluesky.astro';
import Mastodon from '../components/icons/mastodon.astro';
import LinkedIn from '../components/icons/linkedin.astro';

export type SocialUsername = {
	id: string;
	name: string;
	handle: string;
	url: string;
	icon: any;
};

export type Metadata = {
	title: string;
	description: string;
	author: string;
	image: string;
	socialUsernames: SocialUsername[];
};

const metadata: Metadata = {
	title: 'Tom VanAntwerp',
	description: "TVA's Digital Garden",
	author: 'Tom VanAntwerp',
	image: '/img/tom_poly-cropped.png',
	socialUsernames: [
		{
			id: 'twitter',
			name: 'Twitter',
			handle: 'tvanantwerp',
			url: 'https://twitter.com/tvanantwerp',
			icon: Twitter,
		},
		{
			id: 'github',
			name: 'GitHub',
			handle: 'tvanantwerp',
			url: 'https://github.com/tvanantwerp',
			icon: GitHub,
		},
		{
			id: 'bluesky',
			name: 'Bluesky',
			handle: 'tomvanantwerp.com',
			url: 'https://bsky.app/profile/tomvanantwerp.com',
			icon: Bluesky,
		},
		{
			id: 'mastodon',
			name: 'Mastodon',
			handle: 'tvanantwerp',
			url: 'https://mastodon.social/@tvanantwerp',
			icon: Mastodon,
		},
		{
			id: 'linkedin',
			name: 'LinkedIn',
			handle: 'tvanantwerp',
			url: 'https://www.linkedin.com/in/tvanantwerp/',
			icon: LinkedIn,
		},
	],
};

export default metadata;
