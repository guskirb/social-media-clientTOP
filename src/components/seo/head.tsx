import { Helmet, HelmetData } from "react-helmet-async";

type HeadProps = {
  title?: string;
  description?: string;
};

const helmetData = new HelmetData({});

export default function Head({ title = "", description = "" }: HeadProps) {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title} | Social Media` : undefined}
    >
      <meta name="description" content={description} />
    </Helmet>
  );
}
