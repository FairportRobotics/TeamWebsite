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

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.email().min(1),
  password: z.string().min(1),
});

type SignUpForm = z.infer<typeof signUpSchema>;

function RouteComponent() {
  const navigate = useNavigate();

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleSignUp(data: SignUpForm) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const res = await authClient.signUp.email(
      { ...data, callbackURL: "/" },
      {
        onError: (error) => {},
      },
    );

    if (res.error == null && !res.data.user.emailVerified) {
    }

    navigate({ to: "/" });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign in and enjoy our content</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSignUp)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="name"
                      autoComplete=""
                      {...field}
                      placeholder="First Last"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              Already have an account?{" "}
              <Link to="/auth/signin" className="text-blue-700 underline">
                Sign In
              </Link>
            </div>

            <LoadingSwap isLoading={isSubmitting}>
              <Button type="submit" className="w-full " disabled={isSubmitting}>
                Sign Up
              </Button>
            </LoadingSwap>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
