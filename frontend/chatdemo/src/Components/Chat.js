import { Typography, Box, TextField } from "@mui/material";

import React from "react";

function Chat(props) {
  return (
    <div>
      Hello from {props.userProp}
      <Box>
        <TextField
          class=" border-4 rounded-lg w-96"
          placeholder="type a message"
          margin="normal"
          required
          fullWidth
          id="message"
          name="message"
          autoFocus
        />
      </Box>
    </div>
  );
}

export default Chat;
