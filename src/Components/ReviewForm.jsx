import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

function ReviewForm({ onSubmit , isSubmitting }) {
  const [rating, setRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      toast.warn("Please provide your name.");
      return;
    }
    if (!rating || rating < 1) {
      toast.warn("Please select a rating between 1 and 5.");
      return;
    }
    if (!reviewDescription.trim()) {
      toast.warn("Please provide a review description.");
      return;
    }

    const reviewData = {
      userName,
      rating,
      description: reviewDescription,
    };

    await onSubmit(reviewData);
    setUserName("");
    setRating(0);
    setReviewDescription("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mx: "auto", width: "90%" }}>
      <TextField
        label="Your Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        inputProps={{
          maxLength: 16
        }}
      />
      <TextField
        label="Review Description"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={reviewDescription}
        onChange={(e) => setReviewDescription(e.target.value)}
      />
      <div className="flex flex-col py-2">
        <h3 className="font-outfit font-light">Rating:</h3>
        <Rating
          name="user-rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
        />
      </div>
      <Button 
      type="submit" 
      variant="contained"
       color="primary"
        fullWidth
        disabled={isSubmitting}
        >
        {isSubmitting ? <CircularProgress size={25} sx={{color:"white"}} />: "Submit Review"}
      </Button>
    </Box>
  );
}

export default ReviewForm;
