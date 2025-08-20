import { apiSlice } from '../../api/api';
import {
  Confirm2FARequest,
  ForgotPasswordRequest,
  Generate2FASetupResponse,
  GetProfileResponse,
  GetSessionsResponse,
  ResetPasswordRequest,
  SignupResponse,
  SinginRequest,
  SinginResponse,
  SingupRequest,
  SuccessResponse,
  Verify2FAOnSignRequest,
  VerifyEmailRequest,
} from '../../types/auth';
import { signup } from './authSlice';

export const userAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SingupRequest>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(signup({ token: data.data.token }));
        } catch (error) {
          console.log('Signup error:', error);
        }
      },
    }),

    verifyEmail: builder.mutation<SuccessResponse, VerifyEmailRequest>({
      query: ({ token, otp }) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: { token, otp },
      }),
    }),

    signin: builder.mutation<SinginResponse, SinginRequest>({
      query: ({ email, password, remember }) => ({
        url: '/auth/signin',
        method: 'POST',
        body: { email, password, remember },
      }),
      invalidatesTags: ['User'],
    }),

    signout: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/signout',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Sessions'],
    }),

    signoutSession: builder.mutation<SuccessResponse, string>({
      query: (token) => ({
        url: `/auth/sessions/${token}/revoke`,
        method: 'POST',
      }),
      invalidatesTags: ['Sessions'],
    }),

    signoutAllSession: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/sessions/revoke-all',
        method: 'POST',
      }),
      invalidatesTags: ['Sessions'],
    }),

    refreshToken: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      }),
    }),

    getProfile: builder.query<GetProfileResponse, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
      keepUnusedDataFor: 300,
    }),

    forgotPassword: builder.mutation<SinginResponse, ForgotPasswordRequest>({
      query: ({ email }) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),

    resetPassword: builder.mutation<SinginResponse, ResetPasswordRequest>({
      query: ({ token, newPassword, confirmNewPassword }) => ({
        url: `/auth/reset-password/${token}`,
        method: 'PUT',
        body: { newPassword, confirmNewPassword },
      }),
    }),

    getSessions: builder.query<GetSessionsResponse, void>({
      query: () => '/auth/sessions',
      providesTags: ['Sessions'],
    }),

    generate2FASetup: builder.query<Generate2FASetupResponse, void>({
      query: () => '/auth/setup-2fa',
    }),

    verify2FAOnSign: builder.mutation<SuccessResponse, Verify2FAOnSignRequest>({
      query: ({ token }) => ({
        url: `/auth/verify-2fa/${token}`,
        method: 'POST',
      }),
    }),

    confirm2FASetup: builder.mutation<SinginResponse, Confirm2FARequest>({
      query: ({ token, secret }) => ({
        url: '/auth/enable-2fa',
        method: 'PUT',
        body: { token, secret },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyEmailMutation,
  useSigninMutation,
  useSignoutMutation,
  useSignoutSessionMutation,
  useSignoutAllSessionMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetSessionsQuery,
  useGenerate2FASetupQuery,
  useVerify2FAOnSignMutation,
  useConfirm2FASetupMutation,
} = userAuthApi;
