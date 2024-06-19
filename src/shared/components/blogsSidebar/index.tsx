import { IBlogItem } from "@/interface/blog.interface";
import { getBlogs } from "@/services/blog.service";
import SearchIcon from "@/shared/icons/common/SearchIcon";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { parseISO, format } from "date-fns";
import { useRouter } from "next/router";
import CategorySidebar from "../categorySidebar";
import TagSidebar from "../tagSidebar";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const BlogSidebar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  }

  const handleSearch = () => {
    const query = {
      type: "product",
      keyword: searchQuery,
    }
    const queryString = new URLSearchParams(query).toString();
    router.push(`/search?${queryString}`);
  }

  const { data: featuredBlog } = useQuery({
    queryKey: ["getBlogs",],
    queryFn: async () => getBlogs()
  })

  const triggerSearch = (event: any) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }
  const changeDateFormat = (dateString: string) => {
    const date = parseISO(dateString);
    return <span>{format(date, 'd LLLL yyyy')}</span>
  }

  return (
    <div className="order-last col-span-12 md:order-first md:col-span-3 right-sidebar">
      <div className="mb-[20px]">
        <h3 className="right-sidebar-head">Search</h3>
        <div className="p-0 border border-primary rounded-full !bg-white mb-3 w-full flex items-center justify-between">
          <Input
            placeholder="Search"
            className=" py-0 m-0 pe-0 !bg-transparent max-w-[10.5rem] border-0 h-[30px] flex-grow-1"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={triggerSearch}
          />
          <Button className="p-2 px-4 rounded-l-none rounded-r-full -me-[1px]" onClick={handleSearch} >
            <SearchIcon className="max-h-[0.9rem] max-w-[0.9rem]" />
          </Button>
        </div>
        <h3 className="right-sidebar-head">Categories</h3>
        <CategorySidebar />
        <h3 className="right-sidebar-head">Recent Posts</h3>
        <div>
          {/* recent posts */}
          {
            featuredBlog && featuredBlog?.data.slice(0, 4).map((blog: IBlogItem, index: number) => (
              <div className="relative flex items-center mb-5" key={`featured-blogs-${index}`}>
                <Link href={`/blogs/${blog?.slug}`} className="absolute w-full h-full " aria-label={`blogs-${index}`} />
                <div className="aspect-square w-[90px] h-[90px] shrink-0">
                  <Image
                    width={200}
                    height={200}
                    quality={100}
                    src={blog?.thumbnail}
                    alt="Blog Image"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col p-2 overflow-hidden">
                  <Link href={`/blogs//${blog?.slug}`} className="mb-1 text-sm font-bold truncate transition-all delay-100 duration-150 relative z-[1] hover:text-primary" aria-label={`blog-slug-${blog?.slug}`}>
                    {" "}
                    {blog?.title}
                  </Link>
                  <p className="text-sm">{blog?.createdAt}</p>
                </div>
              </div>
            ))
          }
        </div>
        <h3 className="right-sidebar-head">Tag</h3>
        <TagSidebar />
      </div>
    </div>
  );
};

export default BlogSidebar;
