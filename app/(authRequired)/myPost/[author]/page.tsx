"use client"
import { useEffect, useState } from "react"
import MyPostCard from "@/app/component/MyPostCard"

export default function MyPost({ author }: { author: string }) {
  const [authorPost, setAuthorPost] = useState([])
  const [message,setMessage]  = useState(true)

  useEffect(() => {
    const getUserPost = async () => {
      try {
        const authorName = localStorage.getItem('author')
        if (authorName) {
          const req = await fetch(`/api/myPost/${authorName}`)
          const data = await req.json()
          setAuthorPost(data.posts)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getUserPost()
  }, [message])

  const handleDeletePost = async (postId : string)=> {

    const req = await fetch(`/api/posts/${postId}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const data = await req.json()

    if(data.message)
      setMessage(!message)

  }

  return (
    <div className="flex flex-row h-full">
      {authorPost && authorPost.length > 0 ? (
        authorPost.map((data) => (
            <MyPostCard post={data} key={data['_id']} handleDeletePost={handleDeletePost} />
        ))
      ) : (
        <p>No Post found.</p>
      )}
    </div>
  )
}
