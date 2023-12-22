"use client"
import { useState, useEffect } from "react"
import Promptcard from "./Promptcard"
const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <Promptcard key={post._id} post={post} PromptCardList={handleTagClick}/>
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchText,setSearchText] = useState('');
  const [posts, setPosts] = useState([])
  const [searchedTimeout, setSearchedTimeout] = useState(null)
  const [searchedResult, setSearchedResult] = useState([])

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch("/api/prompt")
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i")
    return posts.filter(item => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt))
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchedTimeout)
    setSearchText(e.target.value)
    // debounce method

    setSearchedTimeout(setTimeout(() => {
      const searchResult = filterPrompts(e.target.value)
      setSearchedResult(searchResult)
    }, 500))
  }

  const handleTagClick = (tagname) => {
    setSearchText(tagname)
    const searchResult = filterPrompts(tagname)
    setSearchedResult(searchResult)

  }



 

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type='text' placeholder="Search for prompts" className="search_input peer" value={searchText} onChange={handleSearchChange} required/>
      </form>

   
       {searchText ? (
        <PromptCardList
          data={searchedResult}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}

    </section>
  )
}

export default Feed
