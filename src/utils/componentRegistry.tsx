import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type typeComponentRegistry = {
  [key: string]: {
    render: (params: any) => JSX.Element;
    properties: {
      name: string;
      type: string;
      field: (props: any) => JSX.Element;
    }[];
  };
};

export const componentRegistry: typeComponentRegistry = {
  button: {
    render: ({ content }: { content: string }) => {
      return <Button>{content}</Button>;
    },
    properties: [
      {
        name: "content",
        type: "string",
        field: ({ props }: any) => {
          return <Input {...props} />;
        },
      },
    ],
  },
  label: {
    render: ({
      content,
      fontSize,
      fontWeight,
    }: {
      content: string;
      fontSize?: string;
      fontWeight?: string;
    }) => {
      return <Label style={{ fontSize, fontWeight }}>{content}</Label>;
    },
    properties: [
      {
        name: "content",
        type: "string",
        field: ({ props }: any) => {
          return <Input {...props} />;
        },
      },
      {
        name: "fontSize",
        type: "string",
        field: ({ props }: any) => {
          return <Input {...props} />;
        },
      },
      {
        name: "fontWeight",
        type: "string",
        field: ({ props }: any) => {
          return <Input {...props} />;
        },
      },
    ],
  },
  input: {
    render: ({ placeholder }: { placeholder: string }) => {
      return <Input placeholder={placeholder} />;
    },
    properties: [
      {
        name: "placeholder",
        type: "string",
        field: ({ props }: any) => {
          return <Input {...props} />;
        },
      },
    ],
  },
  radio: {
    render: ({ items }: { items: string }) => {

      const arrItems = items.split(",").map((item: string) => item.trim());
      return (
        <RadioGroup defaultValue="option-one">
         {
            arrItems.map((item, idx) => {
              return (
                <div className="flex items-center space-x-2">
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={`option-${idx}`}>{item}</Label>
              </div>
              )
            })
         }
         
        </RadioGroup>
      );
    },
    properties: [
      {
        name: "items",
        type: "array",
        field: ({ props }: any) => {
          return <Input {...props} />;
        },
      },
    ],
    
  },
};
