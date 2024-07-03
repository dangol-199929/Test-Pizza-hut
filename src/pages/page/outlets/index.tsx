import axios from "axios";
import { Map } from "lucide-react";
import dynamic from "next/dynamic";

import { useDeliveryAddressHooks } from "@/hooks/useDeliveryAddress.hooks";
import { IOutlets } from "@/interface/checkout.interface";
import { NextPageWithLayout } from "@/pages/_app";
import { getOutletAddress } from "@/services/checkout.service";
import { Skeleton } from "@/shared/components/ui/skeleton";
import MainLayout from "@/shared/main-layout";
import { useQuery } from "@tanstack/react-query";

import { config } from "../../../../config";

const MultiLeafletMap = dynamic(
  () => import("@/shared/components/multi-leaflet").then((mod) => mod.default),
  {
    ssr: false,
  }
);
const Outlets: NextPageWithLayout = () => {
  const { data: outlets, isLoading: isOutletsLoading } = useQuery<IOutlets[]>(
    ["getOutlets"],
    getOutletAddress
  );

  return (
    <div className="container py-20">
      {isOutletsLoading ? (
        <div className="grid gap-4 grid-cols-4">
          <div className="bg-white p-4 rounded-lg col-span-4 md:col-span-1">
            <Skeleton className="h-[500px] w-full" />
          </div>
          <div className="col-span-3 rounded-lg overflow-hidden min-h-[500px] bg-white p-4">
            <Skeleton className="h-[500px] w-full" />
          </div>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-4">
          <div className="bg-white p-4 rounded-lg col-span-4 md:col-span-1">
            <p className="font-medium text-xl">Outlets ({outlets?.length})</p>
            {outlets?.map((outlets: IOutlets, index: number) => (
              <div key={outlets?.id} className={`py-4 border-b`}>
                <div className="flex items-center space-x-2 mb-1">
                  <Map size={18} />
                  <span className={`text-lg font-medium`}>{outlets?.name}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{outlets?.address}</p>
                <p className="text-sm text-gray-500 mb-1">
                  Store Timing (9:00 AM to 10:00PM)
                </p>
                <p className="text-sm mb-1">{outlets?.phone}</p>
                {outlets?.distance && (
                  <p className="text-sm text-green-600">
                    {outlets?.distance} Km Away
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="col-span-4 md:col-span-3 rounded-lg overflow-hidden min-h-[500px] bg-white p-4">
            <div className="overflow-hidden rounded-lg h-full w-full">
              <MultiLeafletMap
                locations={
                  outlets?.map((outlet) => ({
                    lat: Number(outlet.lat),
                    long: Number(outlet.lng),
                    name: outlet.name,
                  })) || []
                }
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Outlets;

Outlets.getLayout = (page) => {
  const configData = page?.props;
  return <MainLayout configData={configData}>{page}</MainLayout>;
};

export async function getServerSideProps() {
  const baseUrl = config?.gateway?.apiURL;
  const endPoint1 = config?.gateway?.apiEndPoint1;
  const apiUrl = `${baseUrl}/${endPoint1}/configs`;
  const response: any = await axios.get(apiUrl, {
    headers: {
      Accept: "application/json",
      "Api-Key": config.gateway.apiKey,
    },
  });
  return {
    props: response?.data,
  };
}
