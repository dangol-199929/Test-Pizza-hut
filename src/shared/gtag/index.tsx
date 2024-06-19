import { getConfig } from "@/services/home.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const GoogleTagManager = ({ googleTagManagerId }:any) => {
  const { data: config } = useQuery({
    queryKey: ["getConfig"],
    queryFn: getConfig,
  });
  
  return (
    <>
      <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleTagManagerId}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleTagManagerId}');
            `,
          }}
        />
    </>
  );
};

export default GoogleTagManager;