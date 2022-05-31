import { Helmet } from "react-helmet";

export default function MetaTags({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
    </Helmet>
  );
}
