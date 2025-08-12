import type { YouTubeVideo } from "../fetchYouTubeVideos.js";

interface VideoCardProps extends YouTubeVideo {
  index: number;
}

// Helper function to get high resolution thumbnail URLs
function getHighResThumbnails(videoId: string) {
  return {
    webp: {
      max: `https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`,
      mq: `https://i.ytimg.com/vi_webp/${videoId}/mqdefault.webp`,
    },
    jpg: {
      max: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      mq: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
    },
  };
}

export function VideoCard({ index, ...video }: VideoCardProps) {
  // Format the published date
  const publishedDate = new Date(video.published);
  const formattedDate = publishedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Format the view count
  const viewCount = parseInt(video.views, 10);
  const formattedViews = viewCount > 999
    ? `${(viewCount / 1000).toFixed(1)}k views`
    : `${viewCount} views`;

  // Get video ID from the thumbnail URL
  const videoIdMatch = video.thumbnail.match(/\/vi(?:_webp)?\/([^/]+)\//);
  const videoId = videoIdMatch ? videoIdMatch[1] : "";
  const thumbnails = getHighResThumbnails(videoId);

  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      class="video-card group block bg-white @dark:bg-gray-800 shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 flex flex-col relative border border-gray-200/50 @dark:border-gray-700/50"
    >
      <div class="relative aspect-video overflow-hidden bg-gray-100 @dark:bg-gray-800">
        <picture>
          <source
            media="(min-width: 640px)"
            srcset={thumbnails.webp.max}
            type="image/webp"
          />
          {/* <!-- Small viewport --> */}
          <source
            srcset={thumbnails.webp.mq}
            type="image/webp"
          />
          {/* <!-- Large viewport fallback --> */}
          <source
            media="(min-width: 640px)"
            srcset={thumbnails.jpg.max}
            type="image/jpeg"
          />
          {/* <!-- Small viewport fallback --> */}
          <source
            srcset={thumbnails.jpg.mq}
            type="image/jpeg"
          />
          <img
            src={thumbnails.jpg.mq}
            alt={video.title}
            class="h-full w-full object-cover object-center"
            width="1280"
            height="720"
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
          />
        </picture>
        {/* Gradient Overlay */}
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Play button overlay */}
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              class="w-9 h-9"
              style="margin-left: 3px;"
            >
              <path d="M8 5v14l11-7z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col p-6 flex-grow">
        <h3 class="text-lg leading-tight font-bold mb-3 text-gray-900 @dark:text-white group-hover:text-blue-600 @dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {video.title}
        </h3>
        
        <div class="flex items-center text-sm text-gray-500 @dark:text-gray-400 mt-auto">
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1.5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            <span>{formattedViews}</span>
          </div>
          <span class="mx-3 text-gray-300">•</span> 
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
