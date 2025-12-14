'use client';

import { useRouter } from 'next/navigation';

import BookmarkFill from '@/assets/icons/bookmark-fill.svg';
import Bookmark from '@/assets/icons/bookmark.svg';
import CommentFill from '@/assets/icons/comment-fill.svg';
import Comment from '@/assets/icons/comment.svg';
import HeartFill from '@/assets/icons/heart-fill.svg';
import Heart from '@/assets/icons/heart.svg';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import SolidTag from '@/components/atoms/SolidTag/SolidTag';
import Thumbnail from '@/components/atoms/Thumbnail/Thumbnail';
import { POST_CATEGORY_LABELS, POST_CATEGORY_META, PostCategory } from '@/constants/common';
import { DEFAULT_THUMBNAIL } from '@/constants/image';
import { useLikePost } from '@/hooks/api/post/useLikePost';
import { useSavePost } from '@/hooks/api/post/useSavePost';
import { useAuthStore } from '@/stores/useAuthStore';
import { useAppModalStore } from '@/stores/useModalStore';
import { useMediumModalStore } from '@/stores/useModalStore2';
import { formatRelativeKorean } from '@/utils/date/formatDay';
import { formatCountPlus } from '@/utils/formatText';

import * as S from './PostCardMobile.styled';
import MetaItem from '../MetaItem/MetaItem';
import { PostCardProps } from '../PostCard';

export default function PostCardMobile({ post, isEdit = false, isSelected = false, onToggleSelect }: PostCardProps) {
  const { open: openAppModal } = useAppModalStore();
  const isAuth = useAuthStore((s) => s.isAuth());
  const isFree = useAuthStore((s) => s.isFree());

  const router = useRouter();
  const { open: mediumStoreOpen, close: mediumStoreClose } = useMediumModalStore();

  const {
    postId,
    title,
    thumbnailUrl,
    category,
    myStatus,
    viewCount: viewCountProp,
    likeCount: likeCountProp,
    commentCount,
    saveCount: saveCountProp,
    createdAt,
  } = post;

  const categoryMeta = POST_CATEGORY_META[category.name as PostCategory];

  const isLiked = Boolean(myStatus?.isLiked);
  const isSaved = Boolean(myStatus?.isSaved);
  const likeCount = likeCountProp ?? 0;
  const saveCount = saveCountProp ?? 0;

  const { likePost } = useLikePost();
  const { savePost } = useSavePost();

  const handleCardClick = () => {
    if (
      !isAuth &&
      (category.name === POST_CATEGORY_LABELS.DAILY_SHARE || category.name === POST_CATEGORY_LABELS.COLUMN)
    ) {
      openAppModal('login');
      return;
    }

    if (category.name === POST_CATEGORY_LABELS.COLUMN && isFree) {
      mediumStoreOpen('alert', {
        title: '유료 구독 플랜이 필요해요',
        description: '이 카테고리는 유료 구독자에게만 공개됩니다.',
        buttonColor: 'primary',
        button: {
          label: '구독 플랜 보러가기',
          onClick: () => {
            mediumStoreClose();
            router.push('/subscription');
          },
        },
      });
      return;
    }

    router.push(`/community/post/${postId}`);
  };

  const onToggleLike = () => {
    if (!isAuth) {
      open('login');
      return;
    }
    likePost({ postId: String(postId), isLiked });
  };

  const onToggleSave = () => {
    if (!isAuth) {
      open('login');
      return;
    }
    savePost({ postId: String(postId), isSaved });
  };

  return (
    <S.PostCardMobile onClick={handleCardClick}>
      <Thumbnail
        ratio='16_10'
        src={thumbnailUrl || DEFAULT_THUMBNAIL}
        radius
      />

      <S.Body>
        {isEdit && (
          <Checkbox
            isChecked={!!isSelected}
            onToggle={(checked) => onToggleSelect?.(checked)}
            size='sm'
            interactionVariant='normal'
          />
        )}

        <S.Main>
          {categoryMeta && (
            <SolidTag
              label={categoryMeta.label}
              color={categoryMeta.color}
            />
          )}

          <S.Title>{title}</S.Title>

          <S.MetaRow>
            <MetaItem
              count={likeCount}
              icon={<Heart />}
              fillIcon={<HeartFill />}
              isActive={isLiked}
              onClick={onToggleLike}
              disabled={false}
            />
            <MetaItem
              count={commentCount || 0}
              icon={<Comment />}
              fillIcon={<CommentFill />}
              isActive={false}
            />
            <MetaItem
              count={saveCount}
              icon={<Bookmark />}
              fillIcon={<BookmarkFill />}
              isActive={isSaved}
              onClick={onToggleSave}
              disabled={false}
            />
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaText>조회수 {formatCountPlus(viewCountProp || 0)}</S.MetaText>
            <S.MetaText>{formatRelativeKorean(createdAt)}</S.MetaText>
          </S.MetaRow>
        </S.Main>
      </S.Body>
    </S.PostCardMobile>
  );
}
