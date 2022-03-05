import { Post } from "API"
import React from "react"
import styled from "styled-components"
import Downvote from "assets/icons/downvote.svg"
import Upvote from "assets/icons/upvote.svg"
import { formatDate } from "helpers/formatDate"

interface Props {
  post: Post
}

export const PostPreview: React.FC<Props> = ({ post }) => {
  return (
    <Container>
      <VoteSection>
        <UpvoteWrapper>
          <Upvote />
        </UpvoteWrapper>
        <p>{post.votes?.items ? post.votes?.items?.length : "vote"}</p>
        <DownvoteWrapper>
          <Downvote />
        </DownvoteWrapper>
      </VoteSection>
      <InfoSection>
        <SmallText>
          Posted by <b>{post.owner}</b> {formatDate(post.createdAt)} hours ago.
        </SmallText>
        <Title>{post.title}</Title>
        <Text>{post.content}</Text>
      </InfoSection>
    </Container>
  )
}

const Container = styled.article`
  display: flex;
  min-width: 600px;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  margin-bottom: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;

  :hover {
    outline: ${({ theme }) => theme.palette.grey[500]} 1px solid;
  }
`

const VoteSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-right: 15px;

  p {
    font-weight: 500;
  }
`

const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`

const Text = styled.p`
  font-size: 14px;
`

const SmallText = styled.p`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 12px;
  margin-bottom: 10px;
`

const UpvoteWrapper = styled.div`
  border-radius: 2px;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.palette.warning.main};
    background-color: ${({ theme }) => theme.palette.grey[300]};
  }
`

const DownvoteWrapper = styled(UpvoteWrapper)`
  margin-top: 2px;

  :hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`
