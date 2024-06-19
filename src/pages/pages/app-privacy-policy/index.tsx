import MainLayout from '@/shared/main-layout';
import React, { useEffect, useState } from 'react'
import { NextPageWithLayout } from '../../_app';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getPageData } from '@/services/page.service';
import Loader from '@/components/Loading';
import Breadcrumb from '@/shared/components/breadcrumb';
import Head from 'next/head';

const AppPrivacyPolicy: NextPageWithLayout = () => {
    const router = useRouter();
    const { asPath } = router;
    const [descriptionContent, setDescriptionContent] = useState<string>("");
    const path = asPath.split("/");
    const slug = asPath.replace("/page/app-", "");
    const { data: privacyPolicy, isInitialLoading: fetchLoading } = useQuery({
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
        if (privacyPolicy) {
            setDescriptionContent(privacyPolicy?.data?.content || "");
        }
    }, [privacyPolicy]);

    return (
        <>
            <Head>
                <title>Privacy Policy</title>
            </Head>
            {
                fetchLoading ? (
                    <Loader />
                ) : (
                    <>
                        <Breadcrumb title={privacyPolicy?.data?.title} />
                        <div
                            className="main-wrapper-block"
                            dangerouslySetInnerHTML={{ __html: descriptionContent }}
                        />
                    </>
                )
            }
        </>
    )
}
export default AppPrivacyPolicy
