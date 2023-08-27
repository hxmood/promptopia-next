"use client";

import { useEffect,  useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const EditPrompts = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get("id")
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = await response.json()
        console.log(data);
        setPost({
            prompt: data.prompt,
            tag: data.tag
        })
        console.log(post);
    }
    if(promptId) getPromptDetails()
  }, [promptId])

  const EditPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true)

    if(!promptId) alert('prompt not found')

    try {
      const response = await fetch(`/api/prompt/${promptId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      if(response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false)
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSumbit={EditPrompt}
    />
  );
};
export default EditPrompts;
