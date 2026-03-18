import React, { useState, useEffect, useRef } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

// ১. রিভিউ ডেটার জন্য ইন্টারফেস তৈরি
interface TReview {
    id: number | string;
    user: string;
    rating: number;
    date: string;
    comment: string;
    avatar: string;
}

const Review: React.FC = () => {
    // ২. স্টেট টাইপ ডিফাইন করা
    const [visibleReviews, setVisibleReviews] = useState<TReview[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true); // সব ডেটা শেষ হয়েছে কি না চেক করতে

    const loaderRef = useRef<HTMLDivElement | null>(null);

    // ডামি ডেটা সোর্স
    const allReviews: TReview[] = [
        { id: 1, user: "Alex Johnson", rating: 5, date: "2 weeks ago", comment: "The front bumper exceeded my expectations. The turquoise finish is identical to the original VW specs.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
        { id: 2, user: "Sarah Miller", rating: 4, date: "1 month ago", comment: "Great quality product. Installation took a bit longer than expected.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
        { id: 3, user: "Mike Ross", rating: 5, date: "3 weeks ago", comment: "Perfect fit for my car!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
    ];

    // ৩. ডেটা লোড করার সঠিক ইমপ্লিমেন্টেশন
    const loadMore = () => {
        if (loading || !hasMore) return;

        setLoading(true);

        // API কল সিমুলেশন
        setTimeout(() => {
            // যদি আপনার কাছে ২০-৩০ টার বেশি রিভিউ না থাকে তবে hasMore false করে দেবেন
            setVisibleReviews((prev) => [...prev, ...allReviews]);

            // উদাহরণস্বরূপ: ১৫টা রিভিউ হয়ে গেলে আমরা লোডিং বন্ধ করে দেব
            if (visibleReviews.length > 15) {
                setHasMore(false);
            }

            setLoading(false);
        }, 1000);
    };

    // ৪. Intersection Observer ইমপ্লিমেন্টেশন
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // যদি লোডার এলিমেন্টটি স্ক্রিনে দেখা যায় এবং ডেটা লোড না হতে থাকে
                if (entries[0].isIntersecting && !loading && hasMore) {
                    loadMore();
                }
            },
            {
                rootMargin: "100px", // ইউজার পৌঁছানোর ১০০ পিক্সেল আগেই লোড শুরু হবে
                threshold: 0.1
            }
        );

        const currentLoader = loaderRef.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
            observer.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, hasMore]); // dependency তে loading এবং hasMore থাকা জরুরি

    return (
        <div className="w-full ">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-100/20">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">Reviews & Ratings</h2>
            </div>

            <div className="space-y-6 ">
                {visibleReviews.map((review, index) => (
                    <div
                        key={`${review.id}-${index}`}
                        className="relative group bg-white/20 backdrop-blur-xl p-6 rounded-2xl border border-white/30 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:-translate-x-1 overflow-hidden"
                    >
                        {/* Shining Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-full border-2 border-white/50" />
                                    <div>
                                        <h4 className="font-bold text-gray-100 leading-none">{review.user}</h4>
                                        <p className="text-[11px] text-white/60 mt-1">{review.date}</p>
                                    </div>
                                </div>
                                <div className="flex text-amber-400 bg-white/10 backdrop-blur-md px-2 py-1 rounded-md">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                                    ))}
                                </div>
                            </div>

                            <p className="mt-4 text-white/90 text-sm md:text-base leading-relaxed italic">
                                "{review.comment}"
                            </p>

                            <div className="flex gap-6 mt-5 pt-4 border-t border-white/10">
                                <button className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-blue-400 transition-colors">
                                    <ThumbsUp size={15} /> Helpful
                                </button>
                                <button className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-blue-400 transition-colors">
                                    <MessageSquare size={15} /> Reply
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* লোডার রিফারেন্স এলিমেন্ট */}
            <div ref={loaderRef} className="py-12 flex flex-col items-center justify-center">
                {loading && (
                    <>
                        <div className="w-8 h-8 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                        <p className="text-white/50 text-xs mt-3 animate-pulse">Loading more reviews...</p>
                    </>
                )}
                {!hasMore && visibleReviews.length > 0 && (
                    <p className="text-white/30 text-sm italic">You've reached the end of reviews.</p>
                )}
            </div>
        </div>
    );
};

export default Review;