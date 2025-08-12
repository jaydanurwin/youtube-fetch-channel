import Layout from "../layouts/Layout.js";
import SaplingLogo from "../components/SaplingLogo.js";
import { Counter } from "../components/Counter.js";
import { VideoCard } from "../components/VideoCard.js";
import { fetchYouTubeVideos } from "../fetchYouTubeVideos.js";

export async function Home() {
  const videos = await fetchYouTubeVideos(6);

  return (
    <Layout>
      {/* Hero Section with Gradient Background */}
      <div class="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 @dark:from-gray-900 @dark:via-blue-900/20 @dark:to-purple-900/20">
        <div class="absolute inset-0 bg-white/70 @dark:bg-gray-900/70 backdrop-blur-sm"></div>
        <div class="relative max-w-screen-xl mx-auto px-6 py-20 lg:py-28">
          <div class="text-center">
            <div class="mb-8">
              <SaplingLogo width={240} height={58} />
            </div>
            <h1 class="text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 @dark:from-white @dark:via-blue-200 @dark:to-purple-200 bg-clip-text text-transparent leading-tight">
              Latest YouTube Videos
            </h1>
            <p class="text-xl text-gray-600 @dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover our latest content, tutorials, and insights from the channel
            </p>
            
            {/* Stats or CTA could go here */}
            <div class="mt-10 flex justify-center">
              <div class="inline-flex items-center px-6 py-3 bg-white/80 @dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 @dark:border-gray-700/50">
                <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span class="text-sm font-medium text-gray-700 @dark:text-gray-300">{videos.length} Latest Videos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid Section */}
      <main class="max-w-screen-xl mx-auto px-6 py-16 lg:py-20">
        {videos.length > 0 ? (
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {videos.map((video, index) => (
              <VideoCard key={video.id} {...video} index={index} />
            ))}
          </div>
        ) : (
          <div class="text-center py-20">
            <div class="max-w-md mx-auto">
              <div class="w-16 h-16 mx-auto mb-6 bg-gray-100 @dark:bg-gray-800 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 @dark:text-white mb-2">
                No Videos Available
              </h3>
              <p class="text-gray-600 @dark:text-gray-400 leading-relaxed">
                Unable to load videos at the moment. Please try again later or check back soon for new content.
              </p>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}
