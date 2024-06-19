import { getTagList } from "@/services/tag.service"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link";
import { useRouter } from "next/router";

const TagSidebar = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: tags } = useQuery({
        queryKey: ["getTagList"],
        queryFn: getTagList,
    })

    return (
        <>
            {
                tags?.data.length > 0 &&
                <>
                    <h3 className='right-sidebar-head'>
                        Tag
                    </h3>
                    <div className='flex flex-wrap'>
                        {
                            tags?.data?.map((item: any) => (
                                <div key={`categories-${item?.id}`} className='mb-[20px]'>
                                    <Link href={{ pathname: '/tag', query: { id: item?.slug } }}
                                        aria-label={`sidebar-${item?.slug}`}
                                        className={`border border-primary px-[25px] py-[10px] rounded-[30px] capitalize m-1 text-sm leading-[20px] transition-all delay-100 duration-300 hover:bg-red-800 hover:text-white hover:border-primary ${item.slug == id ? 'bg-primary text-white' : 'bg-white text-gray-550'}`}
                                    >
                                        {item?.name}
                                    </Link>
                                </div>
                            ))
                        }

                    </div>
                </>
            }
        </>
    );
}

export default TagSidebar;