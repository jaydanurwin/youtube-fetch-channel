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
      class="video-card block min-w-[320px] md:min-w-[360px] lg:min-w-[400px] bg-white @dark:bg-surface shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] flex flex-col relative"
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
        {/* <!-- Play button overlay --> */}
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              class="w-8 h-8"
              style="margin-left: 2px;"
            >
              <path d="M8 5v14l11-7z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col p-5">
        <h3 class="text-[18px] leading-tight font-bold mb-2 text-gray-900 @dark:text-white">
          {video.title}
        </h3>
        
        <div class="flex items-center text-sm text-gray-600 @dark:text-gray-400 mb-3">
          <span>{formattedViews}</span>
          <span class="mx-2">•</span> 
          <span>{formattedDate}</span>
        </div>
        
        
      </div>
    </a>
  );
}
