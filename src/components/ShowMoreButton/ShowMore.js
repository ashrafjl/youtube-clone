import { Button } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    hidden: {
      display: "-webkit-box",
      WebkitLineClamp: 2,
      overflow: "hidden",
      WebkitBoxOrient: "vertical"
    }
  }));

function ShowMore({ children }) {
  const classes = useStyles();
  const [isHidden, setIsHidden] = useState(true);
  return (
    <>
      <div className={isHidden ? classes.hidden : null}>{children}</div>
      <p size="small" onClick={() => setIsHidden(!isHidden)} style={{marginTop: '10px',cursor: 'pointer',fontWeight: 'bold',color: 'darkgray'}}>
        {isHidden ? "SHOW MORE" : "SHOW LESS"}
      </p>
    </>
  );
}

export default ShowMore;