import * as React from "react";
import Typography from "@material-ui/core/Typography";

export const Title: React.FC<{ title?: string }> = ({ title, children }) => {
  return (
    <Typography variant="h5" component="h2" gutterBottom>
      {title}
      {children}
    </Typography>
  );
};
