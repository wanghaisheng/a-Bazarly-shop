/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useCreateShopMutation } from "@/redux/features/shop/shopApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// form validation shema
const formValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(11, "Phone number must at least 11 digits"),
  shopAddress: z.string().min(1, "Address is required"),
  description: z.string().min(1, "Description is required"),
});

export function AddShopDialogue() {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [createShop] = useCreateShopMutation();

  // define form
  const form = useForm<z.infer<typeof formValidationSchema>>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      shopAddress: "",
      description: "",
    },
  });

  //   handle submit
  const hangleSubmit = async (values: z.infer<typeof formValidationSchema>) => {
    const formData = new FormData();
    if (!file) {
      setFileError("Logo is required");
      return;
    }
    formData.append("data", JSON.stringify(values));
    if (file) {
      formData.append("file", file);
    }

    toast.loading("Loading...", { id: "Update_Shop" });

    try {
      const res = await createShop(formData).unwrap();
      if (res.success) {
        toast.success("Successfully submitted", { id: "Update_Shop" });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: "Update_Shop",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Create Your Shop</DialogTitle>
        </DialogHeader>
        <ScrollArea className="w-full h-72">
          <Form {...form}>
            <form className="space-y-4 px-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Shop name" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone number"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shopAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Shop address"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className={`${fileError && " text-red-500"}`}>
                  Shop Logo
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    className={`${fileError && "border-red-500 text-red-500"}`}
                    onChange={(e) => {
                      if (e.target.files) {
                        // If there's a file, you can set it to the form state
                        setFile(e.target.files[0]);
                        setFileError("");
                      }
                    }}
                  />
                </FormControl>
                <p className="text-sm text-red-500">{fileError && fileError}</p>
              </FormItem>

              {/* <Input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    // If there's a file, you can set it to the form state
                    setFile(e.target.files[0]);
                  }
                }}
              /> */}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={form.handleSubmit(hangleSubmit)} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
