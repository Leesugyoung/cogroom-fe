'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';

import InputLabel from '@/components/atoms/InputLabel/InputLabel';
import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import SolidButton from '@/components/atoms/SolidButton/SolidButton';
import Input from '@/components/molecules/Input/Input';
import { Select } from '@/components/molecules/Select/Select';
import SelectDateRange from '@/components/molecules/SelectDateRange/SelectDateRange';
import {
  COUPON_TYPE_OPTIONS,
  COUPON_DISCOUNT_TYPE_OPTIONS,
  COUPON_USAGE_SCOPE_OPTIONS,
  COUPON_TARGETS_OPTIONS,
} from '@/constants/common';
import { useCreateCouponMutation } from '@/hooks/api/admin/useCreateCoupon';
import { useUpdateCouponMutation } from '@/hooks/api/admin/useUpdateCoupon';
import { useAuthStore } from '@/stores/useAuthStore';
import { CouponFormFields } from '@/types/form';

import * as S from './page.styled';

const getDefaultValues = (): CouponFormFields => ({
  couponName: '',
  couponCode: '',
  couponType: '',
  discountValue: '',
  discountType: '',
  applicablePlan: [],
  couponTargets: [] as (string | number)[],
  maxIssuedCount: '',
  startDate: null as Date | null,
  endDate: null as Date | null,
});

export default function CreateCoupon() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const couponId = searchParams.get('couponId');
  const isEditMode = !!couponId;

  const isAdmin = useAuthStore((s) => s.isAdmin());
  const { createCoupon, isLoading: isCreating } = useCreateCouponMutation();
  const { updateCoupon, isLoading: isUpdating } = useUpdateCouponMutation();

  const isLoading = isCreating || isUpdating;

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    if (!isEditMode) return;

    type FieldConfig<T = unknown> = {
      param: string;
      parse: (value: string) => T;
    };

    const fieldSchema: Record<keyof CouponFormFields, FieldConfig> = {
      couponName: { param: 'couponName', parse: (v) => v },
      couponCode: { param: 'couponCode', parse: (v) => v },
      couponType: { param: 'couponType', parse: (v) => v },
      applicablePlan: { param: 'applicablePlan', parse: (v) => [Number(v)] },
      discountValue: { param: 'discountValue', parse: (v) => v },
      discountType: { param: 'discountType', parse: (v) => v },
      maxIssuedCount: { param: 'maxIssuedCount', parse: (v) => v },
      startDate: { param: 'startDate', parse: (v) => new Date(v) },
      endDate: { param: 'endDate', parse: (v) => new Date(v) },
      couponTargets: {
        param: 'couponTargets',
        parse: (v) => {
          try {
            return JSON.parse(v);
          } catch {
            return ['ALL'];
          }
        },
      },
    };

    (Object.keys(fieldSchema) as Array<keyof CouponFormFields>).forEach((fieldName) => {
      const config = fieldSchema[fieldName];
      const rawValue = searchParams.get(config.param);
      if (rawValue) {
        methods.setValue(fieldName, config.parse(rawValue) as CouponFormFields[typeof fieldName]);
      }
    });

    const couponId = searchParams.get('couponId');
    if (couponId) {
      methods.setValue('couponCode', couponId);
    }
  }, [isEditMode, searchParams, methods]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = methods;

  const toYMD = (date: Date | null) => (date ? date.toISOString().slice(0, 10).replace(/-/g, '/') : null);

  const handleCouponTargetsChange = (value: (string | number)[]) => {
    const currentTargets = watch('couponTargets') || [];

    // 수동발급을 새로 선택한 경우
    if (value.includes('NONE') && !currentTargets.includes('NONE')) {
      setValue('couponTargets', ['NONE']);
      return;
    }

    // 전체를 새로 선택한 경우
    if (value.includes('ALL') && !currentTargets.includes('ALL')) {
      const allPlanTypes = ['ALL', 'FREE_PLAN', 'MONTHLY_PREMIUM', 'YEARLY_PREMIUM'];
      setValue('couponTargets', allPlanTypes);
      return;
    }

    // 전체가 선택되어 있는 상태에서 개별 항목을 해제한 경우
    if (currentTargets.includes('ALL') && !value.includes('ALL')) {
      // 전체도 함께 해제
      const filteredValue = value.filter((v) => v !== 'ALL' && v !== 'NONE');
      setValue('couponTargets', filteredValue);
      return;
    }

    // 개별 항목들이 모두 선택되었는지 확인하여 전체 자동 선택
    const planTypes = ['FREE_PLAN', 'MONTHLY_PREMIUM', 'YEARLY_PREMIUM'];
    const hasAllPlanTypes = planTypes.every((plan) => value.includes(plan));

    if (hasAllPlanTypes && !value.includes('ALL') && !value.includes('NONE')) {
      setValue('couponTargets', ['ALL', ...planTypes]);
      return;
    }

    // 수동발급이 아닌 다른 옵션을 선택한 경우, 수동발급 제거
    const filteredValue = value.filter((v) => v !== 'NONE');
    setValue('couponTargets', filteredValue);
  };

  const onSubmit = (formData: CouponFormFields) => {
    if (isEditMode) {
      const updateData = {
        couponId: Number(couponId),
        couponName: formData.couponName,
        maxIssuedCount: Number(formData.maxIssuedCount),
        startDate: toYMD(formData.startDate)!,
        endDate: toYMD(formData.endDate)!,
      };
      updateCoupon(updateData);
    } else {
      const isNoneTarget = formData.couponTargets.includes('NONE');

      const apiData = {
        ...formData,
        discountValue: Number(formData.discountValue),
        maxIssuedCount: Number(formData.maxIssuedCount),
        applicablePlan: Number(formData.applicablePlan[0]),
        couponTargets: [...new Set(formData.couponTargets.map(String))],
        startDate: toYMD(formData.startDate),
        endDate: toYMD(formData.endDate),
        issueType: isAdmin && !isNoneTarget ? 'MANUAL' : 'AUTOMATIC',
      };
      createCoupon(apiData);
    }
  };

  return (
    <FormProvider {...methods}>
      <S.CouponCreateContainerForm onSubmit={handleSubmit(onSubmit)}>
        <S.TitleWrapper>
          <S.PageTitle>쿠폰 등록/수정</S.PageTitle>
          <S.PageSubTitle>신규 쿠폰을 등록하거나, 발행된 쿠폰을 수정할 수 있어요.</S.PageSubTitle>
        </S.TitleWrapper>

        <S.CreateOptionWrapper>
          <S.OptionBox>
            <Input
              label='쿠폰 이름'
              inputSize='md'
              placeholder='Name'
              {...register('couponName')}
              required
            />
            <Input
              label='쿠폰 코드'
              inputSize='md'
              placeholder='Code'
              {...register('couponCode')}
              required
              disabled={isEditMode}
            />
          </S.OptionBox>

          <S.OptionBox>
            <Select
              label='쿠폰 유형'
              options={COUPON_TYPE_OPTIONS}
              value={watch('couponType') ? [watch('couponType')] : []}
              onChange={(value) => setValue('couponType', value[0] as string)}
              placeholder='쿠폰 유형'
              required
              disabled={isEditMode}
            />
            <S.DiscountInputWrapper>
              <InputLabel
                label='할인 내용'
                required
              />
              <S.DiscountInputGroup>
                <Input
                  inputSize='md'
                  placeholder='내용 입력'
                  type='number'
                  {...register('discountValue')}
                  required
                  disabled={isEditMode}
                />
                <Select
                  options={COUPON_DISCOUNT_TYPE_OPTIONS}
                  value={watch('discountType') ? [watch('discountType')] : []}
                  onChange={(value) => setValue('discountType', value[0] as string)}
                  placeholder='단위'
                  required
                  disabled={isEditMode}
                />
              </S.DiscountInputGroup>
            </S.DiscountInputWrapper>
          </S.OptionBox>

          <S.OptionBox>
            <Select
              label='사용범위'
              options={COUPON_USAGE_SCOPE_OPTIONS}
              value={watch('applicablePlan')}
              onChange={(value) => setValue('applicablePlan', value)}
              placeholder='사용범위'
              required
              disabled={isEditMode}
            />

            <Select
              label='발급 대상'
              options={COUPON_TARGETS_OPTIONS}
              value={watch('couponTargets') || []}
              onChange={handleCouponTargetsChange}
              placeholder='대상'
              isMulti={true}
              required
              disabled={isEditMode}
            />
          </S.OptionBox>

          <S.OptionBox>
            <Input
              label='수량'
              inputSize='md'
              placeholder='수량 입력(개)'
              {...register('maxIssuedCount')}
              required
            />

            <S.SeletDayBox>
              <InputLabel
                label='사용 기간'
                required
              />
              <Controller
                name='startDate'
                control={control}
                render={({ field: startField }) => (
                  <Controller
                    name='endDate'
                    control={control}
                    render={({ field: endField }) => (
                      <SelectDateRange
                        selectedStartDate={startField.value}
                        selectedEndDate={endField.value}
                        onStartDateChange={startField.onChange}
                        onEndDateChange={endField.onChange}
                      />
                    )}
                  />
                )}
              />
            </S.SeletDayBox>
          </S.OptionBox>
        </S.CreateOptionWrapper>

        <S.SubmitButtonWrapper>
          <OutlinedButton
            size='sm'
            label={'취소하기'}
            color='primary'
            interactionVariant='normal'
            fillContainer={true}
            onClick={() => router.back()}
          />

          <SolidButton
            type='submit'
            size='sm'
            label={isLoading ? (isEditMode ? '수정 중...' : '등록 중...') : isEditMode ? '수정하기' : '등록하기'}
            color='primary'
            interactionVariant='normal'
            fillContainer={true}
            isDisabled={isLoading}
          />
        </S.SubmitButtonWrapper>
      </S.CouponCreateContainerForm>
    </FormProvider>
  );
}
