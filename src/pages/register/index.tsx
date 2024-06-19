import { NextPageWithLayout } from '@/pages/_app'
import AuthBody from '@/shared/components/auth-body'
import Breadcrumb from '@/shared/components/breadcrumb'
import MainLayout from '@/shared/main-layout'
import Head from 'next/head'
import React from 'react'
import { config } from '../../../config'
import axios from 'axios'

const Register: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            <Breadcrumb />
            <AuthBody />
        </>
    )
}

export default Register

Register.getLayout = (page) => {
    const configData = page?.props
    return <MainLayout configData={configData}>{page}</MainLayout>;
};

export async function getServerSideProps() {
    const baseUrl = config?.gateway?.apiURL
    const endPoint1 = config?.gateway?.apiEndPoint1
    const apiUrl = `${baseUrl}/${endPoint1}/configs`;
    const response: any = await axios.get(apiUrl, {
        headers: {
            Accept: "application/json",
            "Api-Key": config.gateway.apiKey,
        },
    })
    return {
        props: response?.data
    }
}