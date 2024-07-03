import { FallBackImg } from "@/shared/lib/image-config";
import Image from "next/image";
import { useEffect, useState } from "react";

const CustomImage = ({ alt, src, ...props }: any) => {
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setError(null);
  }, [src]);
  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? FallBackImg : src}
      {...props}
    />
  );
};
export default CustomImage;
