"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { Chapter, MuxData } from "@prisma/client";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { FileUpload } from "@/components/file-upload";

interface VideoFormProps {
  initialData: Chapter & { muxData: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1, {
    message: "Video is required",
  }),
});

const VideoForm = ({ initialData, courseId, chapterId }: VideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing(!isEditing);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Validate the form values
    const result = formSchema.safeParse(values);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-700 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}

          {!isEditing && !initialData?.videoUrl && (
            <>
              <PlusCircle className="h-3 w-3 mr-2" />
              Add video
            </>
          )}
          {!isEditing && initialData?.videoUrl && (
            <>
              <Pencil className="h-3 w-3 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData?.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2 overflow-hidden rounded-md bg-slate-900">
            {initialData.muxData?.assestId ? (
              <CldVideoPlayer
                id={`chapter-preview-${chapterId}`}
                key={`preview-${chapterId}-${initialData.muxData.assestId}`}
                src={initialData.muxData.assestId}
                sourceTypes={["hls"]}
                transformation={{ streaming_profile: "full_hd" }}
                colors={{ accent: "#0284c7", base: "#0f172a", text: "#ffffff" }}
              />
            ) : (
              <video
                className="h-full w-full"
                src={initialData.videoUrl ?? ""}
                controls
                playsInline
                preload="metadata"
              />
            )}
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />

          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter video
          </div>
        </div>
      )}

      {initialData.videoUrl && !isEditing && (
        <div className="text-[13px] italic text-muted-foreground mt-2">
          Video can take a few minutes to process. Refresh the page if the video
          does not appear.
        </div>
      )}
    </div>
  );
};

export default VideoForm;
