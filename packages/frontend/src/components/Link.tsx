import React from "react";

export interface LinkProps {
  link: { url: string; description: string };
}

const Link = (props: LinkProps) => {
  return (
    <div>
      <div>
        {props.link.description} ({props.link.url})
      </div>
    </div>
  );
};

export default Link;
