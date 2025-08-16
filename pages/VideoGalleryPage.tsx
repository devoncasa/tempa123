import React, { useState, FormEvent, useMemo } from 'react';
import Seo from '../components/Seo';

interface Video {
    id: number;
    title: string;
    url: string; // YouTube URL
}

const VideoGalleryPage: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([
        { id: 1, title: 'Relaxing Music & Beautiful Nature', url: 'https://www.youtube.com/watch?v=6xKyv_iG_zM' },
        { id: 2, title: 'How to make a website in 10 minutes', url: 'https://www.youtube.com/watch?v=C-ObB_S_qZo' },
        { id: 3, title: 'The Future of Web Development', url: 'https://www.youtube.com/watch?v=d_20X1_1aD0' },
    ]);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const getYoutubeEmbedUrl = (youtubeUrl: string): string | null => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = youtubeUrl.match(regExp);

        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}`;
        } else {
            return null;
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || !url.trim()) {
            setError('Please fill in both title and URL.');
            return;
        }
        
        const embedUrl = getYoutubeEmbedUrl(url);

        if (!embedUrl) {
            setError('Invalid YouTube URL. Please provide a valid link.');
            return;
        }

        const newVideo: Video = {
            id: Date.now(),
            title,
            url
        };

        setVideos(prevVideos => [newVideo, ...prevVideos]);
        setTitle('');
        setUrl('');
    };

    const memoizedVideos = useMemo(() => {
        return videos.map(video => {
            const embedUrl = getYoutubeEmbedUrl(video.url);
            return { ...video, embedUrl };
        }).filter(video => video.embedUrl);
    }, [videos]);

    return (
        <>
            <Seo
                title="Video Showcase | Tempa Web.123"
                description="Display your favorite videos from YouTube directly on our platform."
            />
            <style>{`
                .video-responsive {
                    overflow: hidden;
                    padding-bottom: 56.25%;
                    position: relative;
                    height: 0;
                    border-radius: 0.5rem;
                }
                .video-responsive iframe {
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    border: 0;
                }
            `}</style>
            <section className="bg-bg-section-dark py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-[8vw]">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-text-primary">Video Showcase</h1>
                        <p className="text-lg text-text-secondary mt-4">
                            Have a video you want to share? Paste a YouTube link below to add it to our gallery.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto mt-12 mb-16 bg-white p-8 rounded-xl shadow-lg border border-grey-200">
                        <h2 className="text-2xl font-bold font-poppins mb-6 text-center">Add a New Video</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="video-title" className="block text-sm font-medium text-grey-900 mb-1">Video Title</label>
                                <input
                                    type="text"
                                    id="video-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., My Awesome Product Demo"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div>
                                <label htmlFor="video-url" className="block text-sm font-medium text-grey-900 mb-1">YouTube Video URL</label>
                                <input
                                    type="url"
                                    id="video-url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <div>
                                <button type="submit" className="w-full btn btn-primary-gradient">
                                    Add Video to Gallery
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {memoizedVideos.map((video) => (
                            <div key={video.id} className="bg-white p-4 rounded-xl shadow-lg border border-grey-200">
                                <h3 className="text-lg font-bold font-poppins text-text-primary mb-3 truncate">{video.title}</h3>
                                <div className="video-responsive">
                                    <iframe
                                        src={video.embedUrl as string}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default VideoGalleryPage;