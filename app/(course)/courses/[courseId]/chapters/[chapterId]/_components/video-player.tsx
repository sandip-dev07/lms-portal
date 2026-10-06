"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

interface VideoPlayerProps {
  courseId: string;
  chapterId: string;
  /** Cloudinary public ID, e.g. "lms_videos/abc123" (stored as muxData.assestId) */
  videoPublicId?: string | null;
  /** Raw file URL (stored as muxData.playbackId) — progressive fallback */
  videoUrl?: string | null;
  title: string;
  nextChapter?: string;
  isLocked: boolean;
  completeOnEnd?: boolean;
}

const VideoPlayer = ({
  courseId,
  chapterId,
  videoPublicId,
  videoUrl,
  nextChapter,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) => {
  // HLS variants are generated async after upload; if adaptive streaming
  // fails (e.g. "Timeout waiting for parallel processing"), fall back to
  // the progressive mp4 so the video still plays.
  const [useFallback, setUseFallback] = useState(false);
  const confetti = useConfettiStore();
  const router = useRouter();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        if (!nextChapter) {
          confetti.onOpen();
          toast.success("Course completed");
          router.refresh();
        } else {
          router.push(`/courses/${courseId}/chapters/${nextChapter}`);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const showAdaptive = !isLocked && videoPublicId && !useFallback;

  return (
    <div className="relative aspect-video w-full h-full overflow-hidden rounded-md bg-slate-900">
      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-800 dark:bg-slate-700 flex-col gap-y-2">
          <Lock className="h-8 w-8 text-slate-300" />
          <p className="text-sm text-slate-300">This video is locked.</p>
        </div>
      )}

      {showAdaptive && (
        <CldVideoPlayer
          id={`chapter-video-${chapterId}`}
          key={`adaptive-${chapterId}`}
          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
          src={videoPublicId}
          sourceTypes={["hls"]}
          transformation={{ streaming_profile: "full_hd" }}
          playbackRates={[0.5, 1, 1.5, 2]}
          colors={{ accent: "#0284c7", base: "#0f172a", text: "#ffffff" }}
          onEnded={onEnd}
          onError={() => setUseFallback(true)}
        />
      )}

      {!isLocked && (!videoPublicId || useFallback) && videoUrl && (
        <video
          className="h-full w-full"
          src={videoUrl}
          controls
          playsInline
          preload="metadata"
          onEnded={onEnd}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
