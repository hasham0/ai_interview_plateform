"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createInerviewSchema,
  CreateInterviewTS,
} from "@/schemas/CreateInterviewZod";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { InterviewTypes } from "@/services/constant";
import { ArrowRight } from "lucide-react";

type Props = {};

const FormContainer = (props: Props) => {
  const form = useForm<CreateInterviewTS>({
    resolver: zodResolver(createInerviewSchema),
    defaultValues: {
      jobPosition: "",
      jobDescription: "",
      interviewDuration: "",
      interviewType: [],
    },
  });

  const onSubmitHandler: SubmitHandler<CreateInterviewTS> = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-white p-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="jobPosition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Position</FormLabel>
                <FormControl>
                  <Input placeholder="e.g Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Job Description"
                    className="mt-2 h-[200px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interviewDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interview Duration</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="5 Min">5 Min</SelectItem>
                    <SelectItem value="15 Min">15 Min</SelectItem>
                    <SelectItem value="30 Min">30 Min</SelectItem>
                    <SelectItem value="45 Min">45 Min</SelectItem>
                    <SelectItem value="60 Min">60 Min</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="interviewType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interview Type</FormLabel>
                <FormControl>
                  <div className="mt-2 flex flex-wrap gap-3" {...field}>
                    {InterviewTypes.map((type, index: number) => {
                      const isSelected = field.value.includes(type.value);

                      return (
                        <div
                          key={index}
                          onClick={() => {
                            const alreadySelected = field.value.includes(
                              type.value
                            );
                            const updated = alreadySelected
                              ? field.value.filter((val) => val !== type.value)
                              : [...field.value, type.value];
                            field.onChange(updated);
                          }}
                          className={`flex items-center gap-3 rounded-2xl border p-1 px-3 transition hover:cursor-pointer ${isSelected ? "border-blue-500 text-blue-500" : "border-gray-300 bg-blue-50 text-black"} hover:bg-blue-400 hover:text-white`}
                        >
                          <type.icon className="size-4" />
                          <span>{type.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" className="">
              Generate Question
              <ArrowRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormContainer;
