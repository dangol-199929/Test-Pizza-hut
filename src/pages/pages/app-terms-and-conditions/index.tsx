import Loader from '@/components/Loading'
import { getPageData } from '@/services/page.service'
import Breadcrumb from '@/shared/components/breadcrumb'
import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { NextPageWithLayout } from '../../_app'
import MainLayout from '@/shared/main-layout'

const AppTermsAndCondition: NextPageWithLayout = () => {
    const router = useRouter();
    const { asPath } = router;
    const [descriptionContent, setDescriptionContent] = useState<string>("");
    const path = asPath.split("/");
    const slug = asPath.replace("/page/app-", "");
    const { data: termsAndCondition, isInitialLoading: fetchLoading } = useQuery({
        queryKey: ["getPageData", slug],
        queryFn: async () => {
            if (slug) {
                const response = await getPageData(slug);
                return response;
            }
        },
        enabled: !!slug,
    });

    useEffect(() => {
        if (termsAndCondition) {
            setDescriptionContent(termsAndCondition?.data?.content || "");
        }
    }, [termsAndCondition]);
    return (
        <>
            <Head>
                <title>Terms and Condition</title>
            </Head>
            {
                fetchLoading ? (
                    <Loader />
                ) : (
                    <>
                        <Breadcrumb title={termsAndCondition?.data?.title} />
                        <div
                            className="py-8 main-wrapper-block"
                            dangerouslySetInnerHTML={{ __html: descriptionContent }}
                        />
                    </>
                )
            }
        </>
    )
}

export default AppTermsAndCondition