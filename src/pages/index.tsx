import { ListPostsQuery, Post } from "API"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { API } from "aws-amplify"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { listPosts } from "graphql/queries"
import { PostPreview } from "components"

export default function Home() {
  const [posts, setPosts] = useState<Post[]>()

  useEffect(() => {
    const getAllPosts = async () => {
      const allPosts = (await API.graphql({
        query: listPosts,
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as {
        data: ListPostsQuery
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errors: any[]
      }
      if (allPosts) {
        setPosts(allPosts.data.listPosts?.items as Post[])
      } else {
        throw new Error("Something went wrong.")
      }
    }

    getAllPosts()
  }, [])
  return posts ? (
    <Container>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </Container>
  ) : (
    <p>Loading...</p>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
`
