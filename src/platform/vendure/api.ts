import type {TadaDocumentNode} from 'gql.tada';
import {print} from 'graphql';
import {getAuthToken} from './auth-token';

const VENDURE_API_URL = process.env.VENDURE_SHOP_API_URL || process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL;
const VENDURE_CHANNEL_TOKEN = process.env.VENDURE_CHANNEL_TOKEN || process.env.NEXT_PUBLIC_VENDURE_CHANNEL_TOKEN || '__default_channel__';
const VENDURE_AUTH_TOKEN_HEADER = process.env.VENDURE_AUTH_TOKEN_HEADER || 'vendure-auth-token';
const VENDURE_CHANNEL_TOKEN_HEADER = process.env.VENDURE_CHANNEL_TOKEN_HEADER || 'vendure-token';

function isValidUrl(urlString?: string): boolean {
    if (!urlString) return false;
    try {
        const u = new URL(urlString);
        return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
        return false;
    }
}


interface VendureRequestOptions {
    token?: string;
    useAuthToken?: boolean;
    channelToken?: string;
    languageCode?: string;
    currencyCode?: string;
    fetch?: RequestInit;
    tags?: string[];
}

interface VendureResponse<T> {
    data?: T;
    errors?: Array<{ message: string; [key: string]: unknown }>;
}

/**
 * Extract the Vendure auth token from response headers
 */
function extractAuthToken(headers: Headers): string | null {
    return headers.get(VENDURE_AUTH_TOKEN_HEADER);
}


/**
 * Execute a GraphQL query against the Vendure API
 */
export async function query<TResult, TVariables>(
    document: TadaDocumentNode<TResult, TVariables>,
    ...[variables, options]: TVariables extends Record<string, never>
        ? [variables?: TVariables, options?: VendureRequestOptions]
        : [variables: TVariables, options?: VendureRequestOptions]
): Promise<{ data: TResult; token?: string }> {
    const {
        token,
        useAuthToken,
        channelToken,
        languageCode,
        currencyCode,
        fetch: fetchOptions,
        tags,
    } = options || {};

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(fetchOptions?.headers as Record<string, string>),
    };

    // Use the explicitly provided token, or fetch from cookies if useAuthToken is true
    let authToken = token;
    if (useAuthToken && !authToken) {
        authToken = await getAuthToken();
    }

    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    // Set the channel token header (use provided channelToken or default)
    headers[VENDURE_CHANNEL_TOKEN_HEADER] = channelToken || VENDURE_CHANNEL_TOKEN;

    if (!isValidUrl(VENDURE_API_URL)) {
        console.warn(`[Vendure API] VENDURE_API_URL is not a valid HTTP/HTTPS URL (${VENDURE_API_URL}). Returning empty fallback response.`);
        return {
            data: {
                collections: { items: [], totalItems: 0 },
                activeChannel: { defaultCurrencyCode: 'EUR', defaultLanguageCode: 'en', token: '__default_channel__' },
                activeOrder: null,
            } as unknown as TResult,
        };
    }

    const url = new URL(VENDURE_API_URL!);
    if (languageCode) {
        url.searchParams.set('languageCode', languageCode);
    }
    if (currencyCode) {
        url.searchParams.set('currencyCode', currencyCode);
    }

    let response: Response;
    try {
        response = await fetch(url.toString(), {
            ...fetchOptions,
            method: 'POST',
            headers,
            body: JSON.stringify({
                query: print(document),
                variables: variables || {},
            }),
            ...(tags && {next: {tags}}),
        });
    } catch (err) {
        console.warn(`[Vendure API] Network fetch failed to ${url.toString()}:`, err);
        return {
            data: {
                collections: { items: [], totalItems: 0 },
                activeChannel: { defaultCurrencyCode: 'EUR', defaultLanguageCode: 'en', token: '__default_channel__' },
                activeOrder: null,
            } as unknown as TResult,
        };
    }

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: VendureResponse<TResult> = await response.json();

    if (result.errors) {
        throw new Error(result.errors.map(e => e.message).join(', '));
    }

    if (!result.data) {
        throw new Error('No data returned from Vendure API');
    }

    const newToken = extractAuthToken(response.headers);

    return {
        data: result.data,
        ...(newToken && {token: newToken}),
    };
}

/**
 * Execute a GraphQL mutation against the Vendure API
 */
export async function mutate<TResult, TVariables>(
    document: TadaDocumentNode<TResult, TVariables>,
    ...[variables, options]: TVariables extends Record<string, never>
        ? [variables?: TVariables, options?: VendureRequestOptions]
        : [variables: TVariables, options?: VendureRequestOptions]
): Promise<{ data: TResult; token?: string }> {
    // Mutations use the same underlying implementation as queries in GraphQL
    // @ts-expect-error - Complex conditional type inference, runtime behavior is correct
    return query(document, variables, options);
}
