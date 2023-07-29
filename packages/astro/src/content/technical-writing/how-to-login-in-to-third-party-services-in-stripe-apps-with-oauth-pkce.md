---
title: How to Login in to Third Party Services in Stripe Apps with OAuth PKCE
date: 2022-06-01
description: One of the benefits of Stripe Apps is that they allow you to connect to third-party services directly from the Stripe Dashboard. There are many ways to implement the OAuth flows to authenticate with a third-party service, but the ideal one for Stripe Apps is PKCE.
canonical: https://labs.thisdot.co/blog/how-to-login-in-to-third-party-services-in-stripe-apps-with-oauth-pkce/
use_canonical_url: true
tags:
  - Technical Writing
  - OAuth
  - Stripe
---

_This article was originally published on the [This Dot blog](https://labs.thisdot.co/blog/how-to-login-in-to-third-party-services-in-stripe-apps-with-oauth-pkce/)._

One of the benefits of Stripe Apps is that they allow you to connect to third-party services directly from the Stripe Dashboard. There are many ways to implement the OAuth flows to authenticate with a third-party service, but the ideal one for Stripe Apps is PKCE. Unlike other OAuth flows, a Stripe app authenticating with a third-party using PKCE does not require any kind of backend. The entire process can take place in the user's browser.

## What is OAuth PKCE

[Proof Code for Key Exchange](https://www.oauth.com/oauth2-servers/pkce/) (PKCE, pronounced "pixie") is an extension of regular OAuth flows. It is designed for when you've got a client where it would be possible to access a secret key, such as a native app, or a single-page app. Because Stripe Apps are very restricted for security purposes, the OAuth PKCE flow is the only OAuth flow that works in Stripe Apps without requiring a separate backend.

Not all third-party services support the PKCE authorization flow. One that does is Dropbox, and we will use that for our code examples.

## Using `createOAuthState` and `oauthContext` to Get an Auth Token

To use the OAuth PKCE flow, you'll use `createOAuthState` from the Stripe UI Extension SDK to generate a state and code challenge. We will use these to request a code and verifier from Dropbox. Dropbox will then respond to a [specific endpoint for our Stripe App](https://stripe.com/docs/stripe-apps/oauth#create-authorization-link) with the `code` and `verifier`, which we'll have access to in the `oauthContext`. With these, we can finally get our access token. If you wish to follow along, you'll need to both create a Stripe App and a [Dropbox App](https://www.dropbox.com/lp/developers).

We'll start by creating state to save our `oauthState` and `challenge`, and then get a `code` and `verifier` if we don't have one already. If we do have a `code` and `verifier`, we'll try to get the token, and put it in `tokenData` state.

```ts
// src/views/App.tsx
import { useEffect, useState } from 'react';
import { Box, Button, ContextView, Link } from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import { createOAuthState } from '@stripe/ui-extension-sdk/oauth';
import { getDropboxAuthURL, getDropboxToken } from '../util/getDropboxToken.ts';
import { TokenData } from '../util/types';
const App = ({ oauthContext }: ExtensionContextValue) => {
  const [oauthState, setOAuthState] = useState('');
  const [challenge, setChallenge] = useState('');
  const [tokenData, setTokenData] = useState<null | TokenData>(null);
  const code = oauthContext?.code;
  const verifier = oauthContext?.verifier;
  const showAuthLink = !code && !tokenData;
  useEffect(() => {
    // FIFTH, the app loads again after being redirected from
    // Dropbox. This time, code and verifier are available from
    // the oauthContext. We still don't have a token, so now
    // we will use the code and verifier to request one from
    // Dropbox, then set it to state.
    if (code && verifier && !tokenData) {
      getDropboxToken({ code, verifier }).then(token => {
        if (token) {
          setTokenData(token);
        }
      });
    }
    // FIRST time the app renders, there will be no oauth
    // state nor token data. So we'll run createOAuthState
    // and set those values to local state. These will be
    // used in the link the user clicks to login.
    else (!oauthState && !tokenData) {
      createOAuthState().then(({ state, challenge }) => {
        setOAuthState(state);
        setChallenge(challenge);
      });
    }
  }, [oauthState, code, verifier]);
  // SECOND, the user will see a login link if there is
  // no response code from Dropbox in oauthContext and
  // no tokenData present. Clicking this link will send
  // the oauthState and challenge to Dropbox, and they
  // will send back a code and verifier.
  return (
    <ContextView title="Dropbox OAuth PKCE Example">
      <Box>
        <Box>
          {showAuthLink && (
            <Link href={getDropboxAuthURL(oauthState, challenge)}>
              Begin authorization flow
            </Link>
          )}
          {tokenData && (
            <Box>
              Dropbox account is connected.
            </Box>
          )}
        </Box>
      </Box>
    </ContextView>
  );
}
```

```ts
// src/util/getDropboxToken.ts
import { addSeconds } from 'date-fns';
import { TokenData } from './types';
const client_id = 'your_dropbox_client_id_goes_here';
const APP_NAME = 'com.example.dropbox-oauth-pkce';
const redirectURI = `https://dashboard.stripe.com/test/apps-oauth/${APP_NAME}`;
// FOURTH, the link to get the code and verifier also specifies
// the id of the Dropbox app we've created, and the redirect
// URI for Stripe. The redirect depends on the Stripe App's
// unique ID, which is seen in stripe-app.json.
export const getDropboxAuthURL = (state: string, challenge: string) =>
	`https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${state}&code_challenge=${challenge}&code_challenge_method=S256`;
export const getDropboxToken = async ({
	code,
	verifier,
}: {
	code: string;
	verifier: string;
}): Promise<TokenData | void> => {
	try {
		const response = await fetch(
			`https://api.dropboxapi.com/oauth2/token?code=${code}&grant_type=authorization_code&code_verifier=${verifier}&client_id=${client_id}&redirect_uri=${redirectURI}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			},
		);
		if (response.ok) {
			let token = await response.json();
			token = {
				...token,
				expires_in: addSeconds(Date.now(), token.expires_in),
			};
			return token;
		}
		throw new Error(await response.text());
	} catch (e) {
		console.error('Unable to retrieve access token:', (e as Error).message);
	}
};
```

```ts
// src/util/types.ts
export interface TokenData {
	access_token: string;
	account_id: string;
	expires_in: number;
	scope: string;
	token_type: string;
	uid: string;
}
```

## Fetch Dropbox User Data

To prove to ourselves that the token works, let's fetch Dropbox user data using the token. We'll create a new function to fetch this user data, and call it from within our Stripe App's view. We'll store this user data in state.

```ts
// src/util/getDropBoxAccount.ts
import { TokenData, AccountData } from './types';
export const getDropboxAccount = async (
	tokenData: TokenData,
): Promise<AccountData | void> => {
	try {
		const response = await fetch(
			'https://api.dropboxapi.com/2/users/get_account',
			{
				method: 'POST',
				body: JSON.stringify({ account_id: tokenData.account_id }),
				headers: {
					Authorization: `Bearer ${tokenData.access_token}`,
					'Content-Type': 'application/json',
				},
			},
		);
		if (response.ok) {
			return await response.json();
		}
		throw new Error(await response.text());
	} catch (e) {
		console.error('Unable to get account data:', (e as Error).message);
	}
};
```

```tsx
// src/views/App.tsx
// ...
import { useCallback, useEffect, useState } from 'react';
import { getDropboxAccount } from '../util/getDropboxAccount';
import { TokenData, AccountData } from '../util/types';
const App = ({ userContext, oauthContext }: ExtensionContextValue) => {
	// ...
	const [accountData, setAccountData] = useState<null | AccountData>(null);
	// ...
	const handleGetAccount = useCallback(() => {
		if (tokenData) {
			getDropboxAccount(tokenData).then(data => {
				if (data) {
					setAccountData(data);
				}
			});
		}
	}, [tokenData]);
	return (
		<ContextView title="Dropbox OAuth PKCE Example">
			<Box>
				<Box>
					{/* ... */}
					{tokenData && (
						<>
							<Box>Dropbox account is connected.</Box>
							{!accountData && (
								<Box>
									<Button onPress={handleGetAccount}>Load Account Data</Button>
								</Box>
							)}
						</>
					)}
					{accountData && (
						<Box>Your Dropbox identity: {accountData.name.display_name}</Box>
					)}
				</Box>
			</Box>
		</ContextView>
	);
};
```

```ts
// src/util/types
// ...
export interface AccountData {
	email: string;
	name: {
		display_name: string;
	};
}
```

## Storing Tokens with the Secret Store

Currently, we're only persisting the retrieved token data in memory. As soon as we close the Stripe App, it will be forgotten and the user would have to fetch it all over again. For security reasons, we can't save it as a cookie or to local storage. But Stripe has a solution: the [secret store](https://stripe.com/docs/stripe-apps/store-auth-data-custom-objects).

The secret store allows us to persist key-value data with Stripe itself. We can use this to save our token data and load it whenever a user opens our Stripe App.

To make it easier to work with the secret store, we'll create a custom hook: `useSecretStore`.

```ts
// src/hooks/useSecretStore.ts
import Stripe from 'stripe';
import {
	STRIPE_API_KEY,
	createHttpClient,
} from '@stripe/ui-extension-sdk/http_client';
import { useState, useEffect, useCallback } from 'react';
const stripe = new Stripe(STRIPE_API_KEY, {
	httpClient: createHttpClient(),
	apiVersion: '2020-08-27',
});
export function useSecretStore<T>(userId: string, secretName: string) {
	const [secret, setSecret] = useState<T | null>(null);
	const postSecret = useCallback(
		(newSecret: any) => {
			const postTokenPath = `apps/secrets?scope[type]=user&scope[user]=${userId}&name=${secretName}`;
			const createSecretResource = Stripe.StripeResource.extend({
				request: Stripe.StripeResource.method({
					method: 'POST',
					path: postTokenPath,
				}),
			});
			new createSecretResource(stripe).request(
				{ payload: JSON.stringify(newSecret) },
				function (err: any) {
					if (err) {
						console.error(err);
					} else {
						setSecret(newSecret);
					}
				},
			);
		},
		[userId, secretName],
	);
	const getSecret = useCallback(() => {
		const getTokenPath = `apps/secrets/find?scope[type]=user&scope[user]=${userId}&name=${secretName}&expand[]=payload`;
		const getSecretResource = Stripe.StripeResource.extend({
			request: Stripe.StripeResource.method({
				method: 'GET',
				path: getTokenPath,
			}),
		});

		new getSecretResource(stripe).request(
			{},
			function (err: any, retrievedSecret: any) {
				if (!err) {
					const theSecret = JSON.parse(retrievedSecret.payload);
					setSecret(theSecret);
				}
			},
		);
	}, [userId, secretName]);
	useEffect(() => {
		getSecret();
	}, [getSecret]);
	return { secret, postSecret };
}
```

Once we've got our custom hook ready, we can integrate it into our `App.tsx` view. We will rewrite the `useEffect` to check for a saved token in the secret store, and use that if it's valid. Only if there is no token available do we create a new one, which will then be persisted to the secret store. We also add a Log Out button, which will reset the `tokenData` and secret store values to `null`.

The Log Out button creates an issue. If we have `oauthContext` from logging in, and then we log out, the Stripe App still has the same `oauthContext`. If we tried logging in again without closing the app, we would get an error because we're re-using old credentials. To fix this, we also add a React ref to keep track of whether or not we've used our current `oauthContext` values.

```tsx
// src/views/App.tsx
import { useCallback, useEffect, useState, useRef } from 'react';
import { Box, Button, ContextView, Link } from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import { createOAuthState } from '@stripe/ui-extension-sdk/oauth';
import { TokenData, AccountData } from '../util/types';
import { useSecretStore } from '../hooks/useSecretStore';
import { getDropboxToken, getDropboxAuthURL } from '../util/getDropboxToken';
import { getDropboxAccount } from '../util/getDropboxAccount';
const App = ({ userContext, oauthContext }: ExtensionContextValue) => {
  const [oauthState, setOAuthState] = useState('');
  const [challenge, setChallenge] = useState('');
  const credentialsUsed = useRef(false);
  const [tokenData, setTokenData] = useState<null | TokenData>(null);
  const [accountData, setAccountData] = useState<null | AccountData>(null);
  const { secret, postSecret } = useSecretStore<TokenData>(
    userContext!.id,
    'dropbox_token',
  );
  const code = oauthContext?.code;
  const verifier = oauthContext?.verifier;
  const error = oauthContext?.error;
  const showAuthLink = (!code || credentialsUsed.current) && !tokenData;
  useEffect(() => {
    // First we check if the token is already in the secret store.
    // If it is, we set the tokenData state equal to it.
    if (secret) {
      setTokenData(secret as TokenData);
    }
    // Otherwise, let's see if we've got a code and verifier, but
    // not tokenData. If so, we are ready to fetch a token from
    // Dropbox. Then, we post the secret to the store.
    // We use the ref credentialsUsed to keep track of whether we
    // already used the code and verifier derived from props to
    // get a token. We should only fetch a token if we have not
    // used this code and verifier yet, or else we'll get an error.
    else if (code && verifier && !tokenData && !credentialsUsed.current) {
      getDropboxToken({ code, verifier }).then(token => {
        if (token) {
          credentialsUsed.current = true;
          postSecret(token);
        }
      });
    }
    // Finally, we probably don't have any OAuth stuff ready or in process.
    // Create the OAuthState in preparation for logging in and getting a token.
    else if (!oauthState && !tokenData) {
      createOAuthState().then(({ state, challenge }) => {
        setOAuthState(state);
        setChallenge(challenge);
      });
    }
  }, [secret, oauthState, code, verifier]);
  const handleGetAccount = useCallback(() => {
    if (tokenData) {
      getDropboxAccount(tokenData).then(data => {
        if (data) {
          setAccountData(data);
        }
      });
    }
  }, [tokenData]);
  const logOut = () => {
    if (tokenData) {
      postSecret(null);
      setTokenData(null);
    }
  };
  return (
    <ContextView title="Dropbox OAuth PKCE Example">
      <Box>
        <Box>
          {showAuthLink && (
            <Link href={getDropboxAuthURL(oauthState, challenge)}>
              Begin authorization flow
            </Link>
          )}
          {error && (
            <Box>
              OAuth error: {error}
            </Box>
          )}
          {tokenData && (
            <>
              <Box>
                Dropbox account is connected.
              </Box>
              {!accountData && (
                <Box>
                  <Button onPress={handleGetAccount}>Load Account Data</Button>
                </Box>
              )}
              <Box>
                <Button onPress={logOut}>Log Out</Button>
              </Box>
            </>
          )}
          {accountData && (
            <Box>
              Your Dropbox identity: {accountData.name.display_name}
            </Box>
          )}
        </Box>
        <Box>
      </Box>
    </ContextView>
  );
};
export default App;
```

We've done a lot to create our authorization flow using PKCE. To see this entire example all together, [check out this code sample on GitHub](https://github.com/stripe/stripe-apps/tree/main/examples/dropbox-oauth-pkce).
