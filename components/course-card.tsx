import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/formate";
import CourseProgress from "./course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chapterLength: number;
  price: number;
  category: string;
  progress: number;
}

const CourseCard = ({
  id,
  title,
  imageUrl,
  chapterLength,
  price,
  category,
  progress,
}: CourseCardProps) => {
  return (
    <div>
      <Link href={`/courses/${id}`}>
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image src={imageUrl} alt={title} fill />
          </div>

          <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium group-hover:text-sky-700 dark:group-hover:text-sky-400 transition line-clamp-2">
              {title}
            </div>
            <p className="text-sm text-muted-foreground">{category}</p>
            <div className="my-3 flex items-center gap-x-3 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500 dark:text-slate-400">
                <IconBadge size={"sm"} icon={BookOpen} />
                <span className="pl-2">
                  {chapterLength} {chapterLength === 1 ? "chapter" : "chapters"}
                </span>
              </div>
            </div>
            {progress !== null ? (
              <div>
                <CourseProgress
                  size="sm"
                  varient={progress === 100 ? "success" : "default"}
                  progressCount={progress}
                />
              </div>
            ) : !price ? (
              <p className="text-md md:text-sm font-semibold text-sky-700 dark:text-sky-400">
                Free
              </p>
            ) : (
              <p className="text-md md:text-sm font-medium text-slate-700 dark:text-slate-400">
                {formatPrice(price)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
