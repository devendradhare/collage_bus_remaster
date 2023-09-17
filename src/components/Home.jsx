import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./home.css";
import myJfifImage from './poject_img.jfif';

export default function Home() {
  return (
    <div className="home">
      <Card sx={{ width: 400 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={myJfifImage}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Live Bus
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track Your collage bus live
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" href="/live_map">
            Go to map
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
