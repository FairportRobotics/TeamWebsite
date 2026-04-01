import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
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
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await authClient.signIn.email(
      { ...data, callbackURL: "/" },
      {
        onError: (error) => {
          if (error.error.code === "EMAIL_NOT_VERIFIED") {
            // openEmailVerificationTab(data.email);
          }
          // toast.error(error.error.message || "Failed to sign in");
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
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSignIn)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete=""
                      {...field}
                      placeholder="user@example.com"
                    />
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
                    <Button
                      onClick={() => console.log("Forgot password")}
                      type="button"
                      variant="link"
                      size="sm"
                      className="text-sm font-normal underline"
                    >
                      Forgot Password?
                    </Button>
                  </div>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      autoComplete=""
                      placeholder="********"
                    />
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
