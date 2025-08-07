import Layout from "../layouts/Layout.js";
import SaplingLogo from "../components/SaplingLogo.js";
import { Counter } from "../components/Counter.js";
import { VideoCard } from "../components/VideoCard.js";
import { fetchYouTubeVideos } from "../fetchYouTubeVideos.js";

export async function Home() {
  const videos = await fetchYouTubeVideos(6);

  return (
    <Layout>
      <main class="max-w-screen-xl min-h-screen mx-auto px-4 py-16 font-sans">
        <div class="text-center mb-12">
          <SaplingLogo width={200} height={48} />
          <h1 class="text-4xl font-bold mt-8 mb-4 text-gray-900 @dark:text-white">
            Latest YouTube Videos
          </h1>
          <p class="text-gray-600 @dark:text-gray-400">
            Check out our latest content from the channel
          </p>
        </div>

        {videos.length > 0 ? (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {videos.map((video, index) => (
              <VideoCard key={video.id} {...video} index={index} />
            ))}
          </div>
        ) : (
          <div class="text-center py-12">
            <p class="text-gray-600 @dark:text-gray-400">
              Unable to load videos at the moment. Please try again later.
            </p>
          </div>
        )}
      </main>
    </Layout>
  );
}
