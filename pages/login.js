import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const githubLoginHandler = async () => {
    try {
      const result = await signIn('github', { redirect: false });
      console.log('Github Login:' + result);
    } catch (error) {
      toast.error(getError(error));
    }
  };
  const googleLoginHandler = async () => {
    try {
      const result = await signIn('google', { redirect: false });
      console.log('Google Login:' + result);
    } catch (error) {
      toast.error(getError(error));
    }
  };
  const kakaoLoginHandler = async () => {
    try {
      const result = await signIn('kakao', { redirect: false });
      console.log('Kakao Login: ' + result);
    } catch (error) {
      toast.error(getError(error));
    }
  };
  const naverLoginHandler = async () => {
    try {
      const result = await signIn('naver', { redirect: false });
      console.log('naver Login: ' + result);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="text-xl mb-4">Login </h1>
        <div className="mb-4  p-4 rounded-lg">
          <label htmlFor="email">Email</label>

          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: '유효한 이메일 주소를 입력하세요',
              },
            })}
            className="w-full mb-4"
            id="email"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}

          <label htmlFor="password">Password</label>

          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 3,
                message: '패스워드는 3글자 이상으로 입력하세요',
              },
            })}
            className="w-full mb-4"
            id="password"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}

          <button className="primary-button" type="submit">
            Login
          </button>
          <div className="mb-4">
            계정이 없으면 등록하세요 &nbsp;&nbsp;{''}
            <Link href="register">Register</Link>
          </div>
        </div>

        <div className="mb-4 bg-gray-100 p-4 rounded-lg">
          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="buttom"
              onClick={githubLoginHandler}
            >
              Github Login
            </button>
          </div>
          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="buttom"
              onClick={googleLoginHandler}
            >
              Google Login
            </button>
          </div>
          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="buttom"
              onClick={kakaoLoginHandler}
            >
              Kakao Login
            </button>
          </div>
          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="buttom"
              onClick={naverLoginHandler}
            >
              Naver Login
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
