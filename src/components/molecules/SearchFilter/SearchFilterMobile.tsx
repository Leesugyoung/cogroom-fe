'use client';

import type { Control } from 'react-hook-form';

import Filter from '@/assets/icons/filter.svg';
import SolidButton from '@/components/atoms/SolidButton/SolidButton';
import BottomSheet from '@/components/organisms/BottomSheet';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { formatCountPlus } from '@/utils/formatText';

import ActionButton from './Controller/ActionButton';
import DateRangeController from './Controller/DateRangeController';
import MobileSelectController from './Controller/MobileSelectController';
import SearchController from './Controller/SearchController';
import * as S from './SearchFilter.styled';
import { FilterAction, FilterFieldConfig, FilterValues } from './SearchFilter.types';

interface SearchFilterMobileProps {
  totalTitle?: string;
  total?: number;
  className?: string;
  fields: FilterFieldConfig;
  action: FilterAction;
  control: Control<FilterValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function SearchFilterMobile({
  totalTitle,
  total,
  className,
  fields,
  action,
  control,
  onSubmit,
}: SearchFilterMobileProps) {
  const bottomSheet = useBottomSheet();

  return (
    <S.SearchFilter>
      {totalTitle && <S.Title>{`${totalTitle} (${formatCountPlus(total, 10000)})`}</S.Title>}

      <S.FloatingButtonWrapper>
        <SolidButton
          size='lg'
          type='button'
          label='필터 검색'
          iconLeft={<Filter />}
          interactionVariant='normal'
          onClick={bottomSheet.open}
          round
        />
      </S.FloatingButtonWrapper>

      <BottomSheet
        title='필터선택'
        isOpen={bottomSheet.isOpen}
        onClose={bottomSheet.close}
      >
        <S.FilterContainer
          className={className}
          onSubmit={(e) => {
            e.stopPropagation();
            action?.onClick?.();
            onSubmit(e);
            bottomSheet.close();
          }}
        >
          <S.FilterSection>
            {fields.search?.map((f) => (
              <SearchController
                key={f.name}
                control={control}
                name={f.name}
                placeholder={f.placeholder}
                showMobileLabel
              />
            ))}

            {fields.select?.map((f) => (
              <MobileSelectController
                key={f.name}
                control={control}
                name={f.name}
                placeholder={f.placeholder}
                options={f.options}
                isMulti={f.isMulti}
              />
            ))}

            {/* {fields.dateRange && (
              <DateRangeController
                control={control}
                startName={fields.dateRange.startDateName || 'startDate'}
                endName={fields.dateRange.endDateName || 'endDate'}
              />
            )} */}

            <ActionButton action={action} />
          </S.FilterSection>
        </S.FilterContainer>
      </BottomSheet>
    </S.SearchFilter>
  );
}
