import Demo from "@/components/common/Demo";
import SignUpForm from "@/components/forms/auth/SignUpForm";
import Logo from "@/components/Logo";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <SignUpForm />
        </div>
      </div>
      <div className="hidden lg:flex lg:w-[60vw]  justify-center items-center px-3">
        <Demo />
      </div>
      <div className="absolute top-4 left-4">
        <Logo />
      </div>
    </div>
  );
}
