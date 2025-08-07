export interface YouTubeVideo {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  published: string;
  description: string;
  views: string;
}

export async function fetchYouTubeVideos(
  limit = 3,
): Promise<YouTubeVideo[]> {
  
  const channelId = "UCtinbF-Q-fVthA0qrFQTgXQ";

  
  try {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    console.log(url);
    const response = await fetch(url);


    if (!response.ok) {
      throw new Error(
        `Failed to fetch YouTube feed: ${response.status} ${response.statusText}`,
      );
    }

    const xml = await response.text();

    // Use regular expressions to extract the data we need
    // This is a fallback approach since we're having issues with the DOM parser
    const videos: YouTubeVideo[] = [];

    // Match each entry block
    const entryMatches = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];

    for (let i = 0; i < Math.min(entryMatches.length, limit); i++) {
      const entry = entryMatches[i];

      // Extract video ID
      const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const id = idMatch ? idMatch[1] : "";

      // Extract title
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1] : "";

      // Extract link
      const linkMatch = entry.match(/<link rel="alternate" href="(.*?)"/);
      const link = linkMatch ? linkMatch[1] : "";

      // Extract thumbnail
      // https://i.ytimg.com/vi/Vm_vzyZYG54/maxresdefault.jpg

      // webp image
      // https://i.ytimg.com/vi_webp/Vm_vzyZYG54/maxresdefault.webp

      // https://i.ytimg.com/vi_webp/Vm_vzyZYG54/hqdefault.webp

      // normal image
      // https://i.ytimg.com/vi/Vm_vzyZYG54/maxresdefault.jpg

      const thumbnailMatch = entry.match(/<media:thumbnail url="(.*?)"/);
      const thumbnail = thumbnailMatch ? thumbnailMatch[1] : "";

      // Extract published date
      const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
      const published = publishedMatch ? publishedMatch[1] : "";

      // Extract description
      const descriptionMatch = entry.match(
        /<media:description>(.*?)<\/media:description>/s,
      );
      let description = descriptionMatch ? descriptionMatch[1] : "";
      // Clean up description - it might contain CDATA sections
      if (description.includes("<![CDATA[")) {
        description = description.replace(/<!\[CDATA\[(.*?)\]\]>/s, "$1");
      }

      // Extract views
      const viewsMatch = entry.match(/views="(\d+)"/);
      const views = viewsMatch ? viewsMatch[1] : "0";

      videos.push({
        id,
        title,
        link,
        thumbnail,
        published,
        description,
        views,
      });
    }

    return videos;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}
