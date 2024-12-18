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
import { useUpdateShopMutation } from "@/redux/features/shop/shopApi";
import { IShop } from "@/types/TShop";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// form validation shema
const formValidationSchema = z.object({
  name: z.string().optional(),
  phoneNumber: z
    .string()
    .min(11, "Phone number must at least 11 digits")
    .optional(),
  shopAddress: z.string().optional(),
  description: z.string().optional(),
});

export function UpdateShopDialogue({ shop }: { shop: IShop }) {
  const [file, setFile] = useState<File | null>(null);
  const [updateShop] = useUpdateShopMutation();

  // define form
  const form = useForm<z.infer<typeof formValidationSchema>>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      name: shop?.name,
      phoneNumber: shop?.phoneNumber,
      shopAddress: shop?.shopAddress,
      description: shop?.description,
    },
  });

  // reset form after shop data fetch
  useEffect(() => {
    if (shop) {
      form.reset({
        name: shop?.name,
        phoneNumber: shop?.phoneNumber,
        shopAddress: shop?.shopAddress,
        description: shop?.description,
      });
    }
  }, [shop, form]);

  //   handle submit
  const hangleSubmit = async (values: z.infer<typeof formValidationSchema>) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    if (file) {
      formData.append("file", file);
    }

    toast.loading("Loading...", { id: "Update_Shop" });

    const res = await updateShop({ id: shop.id, payload: formData }).unwrap();
    if (res.success) {
      toast.success("Successfully submitted", { id: "Update_Shop" });
    } else {
      toast.error("Something went wrong", { id: "Update_Shop" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="border-primary border-2 font-bold text-primary hover:bg-primary hover:text-white"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Shop Info</DialogTitle>
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
                <FormLabel>Shop Logo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        // If there's a file, you can set it to the form state
                        setFile(e.target.files[0]);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
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
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
