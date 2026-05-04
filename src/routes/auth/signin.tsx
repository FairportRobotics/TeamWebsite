import { SocialAuthButtons } from "@/components/social-login-buttons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const Route = createFileRoute("/auth/signin")({
  component: RouteComponent,
});

const signInSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(1),
});

type SignInForm = z.infer<typeof signInSchema>;

function RouteComponent() {
  const navigate = useNavigate();

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleSignIn(data: SignInForm) {
    await authClient.signIn.email(
      { ...data, callbackURL: "/" },
      {
        onError: (error) => {
          console.error("Error signing in:", error);
          toast.error("Invalid email or password. Please try again.");
        },
        onSuccess: () => {
          navigate({ to: "/" });
        },
      },
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in and enjoy our content</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleSignIn)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="" {...field} placeholder="user@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Password</FormLabel>
                    <Link to="/auth/forgot-password" className="text-sm text-blue-700 underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput {...field} autoComplete="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-blue-700 underline">
                Sign Up
              </Link>
            </div>
            <LoadingSwap isLoading={isSubmitting}>
              <Button type="submit" className="w-full " disabled={isSubmitting}>
                Sign In
              </Button>
            </LoadingSwap>
            <div className="relative flex py-5 items-center">
              <div className="grow border-t border-gray-400"></div>
              <span className="shrink mx-4 text-gray-400">Or continue with</span>
              <div className="grow border-t border-gray-400"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <SocialAuthButtons />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
