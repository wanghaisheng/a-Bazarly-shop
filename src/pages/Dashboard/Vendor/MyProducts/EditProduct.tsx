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
import { useUpdateProductMutation } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/TProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// form validation shema
const formValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .optional(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .optional(),
  price: z.number({ required_error: "Price is required" }).optional(),
  stock: z.number({ required_error: "Stock is required" }).optional(),
  discount: z.number({ required_error: "Discount is required" }).optional(),
  image: z.string({ required_error: "Image is required" }).optional(),
  categoryId: z
    .string()
    .min(36, { message: "Category ID must be at least 36 characters" })
    .optional(),
});

export function EditProductDialogue({ product }: { product: IProduct }) {
  const [file, setFile] = useState<File | null>(null);
  const [updateProduct] = useUpdateProductMutation();

  // define form
  const form = useForm<z.infer<typeof formValidationSchema>>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      discount: product?.discount,
      stock: product?.stock,
      categoryId: product?.categoryId,
    },
  });

  // reset form after product data fetch
  useEffect(() => {
    if (product) {
      form.reset({
        name: product?.name,
        description: product?.description,
        price: product?.price,
        discount: product?.discount,
        stock: product?.stock,
        categoryId: product?.categoryId,
      });
    }
  }, [product, form]);

  //   handle submit
  const hangleSubmit = async (values: z.infer<typeof formValidationSchema>) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    if (file) {
      formData.append("file", file);
    }

    toast.loading("Loading...", { id: "Update_Product" });

    const res = await updateProduct({
      id: product.id,
      payload: formData,
    }).unwrap();
    if (res.success) {
      toast.success("Successfully updated", { id: "Update_Product" });
    } else {
      toast.error("Something went wrong", { id: "Update_Product" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>Edit</Button>
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Discription" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Price" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Discount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Stock" {...field} />
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
