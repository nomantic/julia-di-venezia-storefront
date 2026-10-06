'use server';

import {mutate} from '@/platform/vendure/api';
import {RemoveFromCartMutation, AdjustCartItemMutation, ApplyPromotionCodeMutation, RemovePromotionCodeMutation} from '@/features/cart/graphql';
import {TransitionOrderToStateMutation} from '@/features/checkout/graphql';
import {getActiveCurrencyCode} from '@/features/currency/currency-server';
import {updateTag} from 'next/cache';

export async function removeFromCart(lineId: string) {
    const currencyCode = await getActiveCurrencyCode();
    const result = await mutate(RemoveFromCartMutation, {lineId}, {useAuthToken: true, currencyCode});
    if (result.data.removeOrderLine.__typename === 'OrderModificationError') {
        await mutate(TransitionOrderToStateMutation, {state: 'AddingItems'}, {useAuthToken: true});
        await mutate(RemoveFromCartMutation, {lineId}, {useAuthToken: true, currencyCode});
    }
    updateTag('cart');
    updateTag('active-order');
}

export async function adjustQuantity(lineId: string, quantity: number) {
    const currencyCode = await getActiveCurrencyCode();
    const result = await mutate(AdjustCartItemMutation, {lineId, quantity}, {useAuthToken: true, currencyCode});
    if (result.data.adjustOrderLine.__typename === 'OrderModificationError') {
        await mutate(TransitionOrderToStateMutation, {state: 'AddingItems'}, {useAuthToken: true});
        await mutate(AdjustCartItemMutation, {lineId, quantity}, {useAuthToken: true, currencyCode});
    }
    updateTag('cart');
    updateTag('active-order');
}

export async function applyPromotionCode(formData: FormData) {
    const code = formData.get('code') as string;
    if (!code) return;

    const currencyCode = await getActiveCurrencyCode();
    await mutate(ApplyPromotionCodeMutation, {couponCode: code}, {useAuthToken: true, currencyCode});
    updateTag('cart');
}

export async function removePromotionCode(formData: FormData) {
    const code = formData.get('code') as string;
    if (!code) return;

    const currencyCode = await getActiveCurrencyCode();
    await mutate(RemovePromotionCodeMutation, {couponCode: code}, {useAuthToken: true, currencyCode});
    updateTag('cart');
}
