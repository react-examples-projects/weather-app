import { Helmet } from "react-helmet";

export default function MetaTags({
  title = "Weather App | Ve tu clima en tu zona actual",
  description = "Ve tu clima en tu zona actual con nuestra aplicación.",
  image = "https://i.imgur.com/sOQgHET.png",
  url = "http://www.google.com",
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="meets, call, videocall, friends, calls, video, meeting"
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
