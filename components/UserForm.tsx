"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/lib/types";

const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  website: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .or(z.literal("")),
  company: z.object({
    name: z
      .string()
      .min(3, { message: "Company name must be at least 3 characters long" })
      .optional(),
  }),
  address: z.object({
    street: z.string().min(1, { message: "Street is required" }),
    city: z.string().min(1, { message: "City is required" }),
  }),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: User;
  onSuccess: () => void;
}

export function UserForm({ user, onSuccess }: UserFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user || {
      name: "",
      email: "",
      phone: "",
      username: "",
      website: "",
      company: { name: "" },
      address: { street: "", city: "" },
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: UserFormData) => {
      if (user) {
        return await fetch(
          `https://jsonplaceholder.typicode.com/users/${user.id}`,
          {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        return await fetch("https://jsonplaceholder.typicode.com/users", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: user ? "User updated successfully" : "User created successfully",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: UserFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input {...register("name")} placeholder="Name" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <Input {...register("email")} placeholder="Email" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Input {...register("phone")} placeholder="Phone" />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>
      <div>
        <Input
          {...register("username")}
          placeholder="Username"
          disabled={!!user}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </div>
      <div>
        <Input {...register("website")} placeholder="Website" />
        {errors.website && (
          <p className="text-red-500">{errors.website.message}</p>
        )}
      </div>
      <div>
        <Input {...register("company.name")} placeholder="Company Name" />
        {errors.company?.name && (
          <p className="text-red-500">{errors.company.name.message}</p>
        )}
      </div>
      <div>
        <Input {...register("address.street")} placeholder="Street" />
        {errors.address?.street && (
          <p className="text-red-500">{errors.address.street.message}</p>
        )}
      </div>
      <div>
        <Input {...register("address.city")} placeholder="City" />
        {errors.address?.city && (
          <p className="text-red-500">{errors.address.city.message}</p>
        )}
      </div>
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending
          ? "Saving..."
          : user
          ? "Update User"
          : "Create User"}
      </Button>
    </form>
  );
}
