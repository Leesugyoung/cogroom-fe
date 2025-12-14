'use client';

import { useParams, useRouter } from 'next/navigation';

import { HTTPError } from '@/api/axios/errors/HTTPError';
import MessageCircleX from '@/assets/icons/message-circle-x.svg';
import Breadcrumb from '@/components/molecules/Breadcrumb/Breadcrumb';
import EmptyState from '@/components/organisms/EmptyState/EmptyState';
import Loading from '@/components/organisms/Loading/Loading';
import { useGetPost } from '@/hooks/api/post/useGetPost';
import { useAuthStore } from '@/stores/useAuthStore';
import { useAppModalStore } from '@/stores/useModalStore';

import PostAuthor from './_components/PostAuthor/PostAuthor';
import PostComments from './_components/PostComments/PostComments';
import PostContent from './_components/PostContent/PostContent';
import PostHeader from './_components/PostHeader/PostHeader';
import PostLikesSaved from './_components/PostLikesSaved/PostLikesSaved';
import PostSkeleton from './_components/PostSkeleton/PostSkeleton';
import * as S from './page.styled';

const POST_ERROR_MESSAGES: Record<string, string> = {
  POST_ALREADY_DELETED_ERROR: '이미 삭제된 게시물입니다',
  POST_NOT_FOUND_ERROR: '존재하지 않는 게시물입니다',
  POST_HIDDEN_ERROR: '숨김 처리된 게시물입니다',
  GUEST_ACCESS_FORBIDDEN_ERROR: '회원만 열람할 수 있는 게시물입니다. 로그인 후 이용해 주세요.',
  ACCESS_FORBIDDEN_ERROR: '무료 플랜 구독자는 접근 불가능한 카테고리 입니다.',
};

export default function PostPage() {
  const params = useParams();
  const postId = params?.id as string;

  const router = useRouter();
  const { open } = useAppModalStore();
  const { data: post, isLoading, error } = useGetPost(postId);
  const isAdmin = useAuthStore((s) => s.isAdmin());
  const isUnknown = useAuthStore((s) => s.isUnknown());

  if (isUnknown || isLoading) return <PostSkeleton />;

  if (error instanceof HTTPError && error.code) {
    const postErrorMessage = POST_ERROR_MESSAGES[error.code];

    if (postErrorMessage) {
      const isForbidden = error.code === 'GUEST_ACCESS_FORBIDDEN_ERROR' || error.code === 'ACCESS_FORBIDDEN_ERROR';

      return (
        <EmptyState
          description={postErrorMessage}
          icon={<MessageCircleX />}
          buttonLabel={
            isForbidden
              ? error.code === 'GUEST_ACCESS_FORBIDDEN_ERROR'
                ? '로그인 하러 가기'
                : '구독 플랜 보러 가기'
              : '다른 글 보기'
          }
          buttonAction={() => {
            if (error.code === 'GUEST_ACCESS_FORBIDDEN_ERROR') {
              open('login');
            } else if (error.code === 'ACCESS_FORBIDDEN_ERROR') {
              router.push('/subscription');
            } else {
              router.push('/community');
            }
          }}
        />
      );
    }
  }

  return (
    <S.PostPageContainer>
      <Breadcrumb
        items={[
          { name: '홈', href: '/' },
          { name: '커뮤니티', href: '/community' },
        ]}
      />
      <S.PostSectionsWrapper>
        <PostHeader
          title={post?.title}
          createdAt={post?.createdAt}
          viewCount={post?.viewCount}
        />
        <PostAuthor
          author={post?.author}
          postId={postId}
          isMine={post?.isMine}
          isAdmin={isAdmin}
        />
        <PostContent
          content={post?.content}
          daily={post?.daily}
        />
        <PostLikesSaved
          postId={postId}
          likeCount={post?.likeCount}
          isLiked={post?.myStatus?.isLiked}
          saveCount={post?.saveCount}
          isSaved={post?.myStatus?.isSaved}
        />
        <PostComments
          postId={postId}
          commentCount={post?.commentCount}
        />
      </S.PostSectionsWrapper>
    </S.PostPageContainer>
  );
}
