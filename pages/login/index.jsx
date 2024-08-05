import { useRouter } from "next/router";

import { signIn } from "next-auth/react";
import { useRef } from "react";

export default function Login() {
  const router = useRouter();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      name: enteredName,
      password: enteredPassword,
    });

    if (result.ok) {
      router.push("/");
    } else {
      console.log(result);
    }
  }

  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <div className=" bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
        <h1 className="text-5xl font-semibold text-center">Login</h1>

        <form onSubmit={submitHandler} className="mt-8">
          <div>
            <label className="text-lg font-medium" htmlFor="name">
              请输入用户名
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-3 bg-transparent"
              type="name"
              id="name"
              placeholder="admin/user"
              required
              ref={nameInputRef}
            />
          </div>
          <div className="mt-5">
            <label className="text-lg font-medium" htmlFor="password">
              请输入密码
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-3 bg-transparent"
              type="password"
              id="password"
              placeholder="123456"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className="mt-8 flex flex-col">
            <button
              className="py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
              type="submit"
            >
              登录
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
