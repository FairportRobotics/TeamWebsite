"use client";

import { MoreHorizontal, Trash2Icon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Field, FieldGroup } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// TODO: This is less than idea. We do not need Alert and Dialog per row. Break them out into
// components and wire them up at the table level In other words, we only need one on the page.
export function RowActions({ id, isBanned }: { id: string; isBanned: boolean }) {
  const [openDialog, setOpenDialog] = useState<null | "delete" | "ban" | "unban">(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => console.log("Impersonate")}>
            Impersonate User
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log("Revoke Sessions")}>
            Revoke Sessions
          </DropdownMenuItem>
          {isBanned ? (
            <DropdownMenuItem onSelect={() => setOpenDialog("unban")}>Unban User</DropdownMenuItem>
          ) : (
            <DropdownMenuItem onSelect={() => setOpenDialog("ban")}>Ban User</DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Destructive Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={() => setOpenDialog("delete")}
            className="text-(--color-destructive)"
          >
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete dialog */}
      <AlertDialog
        open={openDialog === "delete"}
        onOpenChange={(open) => !open && setOpenDialog(null)}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete User?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this User and all their settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Ban dialog */}
      <Dialog open={openDialog === "ban"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <form>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Ban User</DialogTitle>
              <DialogDescription>
                Ban a User and prevent them from Signing In. Click "Continue Ban" when you&apos;re
                done entering the reason.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="banReason">Reason</Label>
                <Input id="banReason" name="banReason" placeholder="Enter reason here" />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Continue Ban</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
