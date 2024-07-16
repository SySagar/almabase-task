import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    render: ({ content, fontSize, fontWeight }: { content: string; fontSize?: string; fontWeight?: string }) => {
      return (
        <Label style={{ fontSize, fontWeight }}>
          {content}
        </Label>
      );
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
  input:{
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
  }
};
