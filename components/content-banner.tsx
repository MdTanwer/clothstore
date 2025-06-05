import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface ContentBannerProps {
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: "light" | "dark";
  layout?: "left" | "center" | "right";
}

export default function ContentBanner({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink,
  backgroundImage,
  backgroundColor = "bg-gray-100",
  textColor = "dark",
  layout = "left",
}: ContentBannerProps) {
  const textColorClass = textColor === "light" ? "text-white" : "text-gray-900";
  const subtitleColorClass =
    textColor === "light" ? "text-gray-200" : "text-gray-600";

  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[layout];

  const contentClass = {
    left: "items-start",
    center: "items-center",
    right: "items-end",
  }[layout];

  return (
    <section className={`relative py-16 ${backgroundColor} overflow-hidden`}>
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex ${contentClass}`}>
            <div className={`max-w-2xl ${alignmentClass}`}>
              {subtitle && (
                <p
                  className={`text-sm font-medium uppercase tracking-wide ${subtitleColorClass} mb-4`}
                >
                  {subtitle}
                </p>
              )}

              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textColorClass} mb-6 leading-tight`}
              >
                {title}
              </h2>

              <p
                className={`text-lg md:text-xl ${subtitleColorClass} mb-8 leading-relaxed`}
              >
                {description}
              </p>

              <Link
                href={buttonLink}
                className={`inline-flex items-center px-8 py-3 ${
                  textColor === "light"
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-black text-white hover:bg-gray-800"
                } font-medium text-lg rounded-lg transition-colors group`}
              >
                {buttonText}
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-10">
        <div className="w-64 h-64 rounded-full border border-current" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 opacity-10">
        <div className="w-32 h-32 rounded-full border border-current" />
      </div>
    </section>
  );
}
