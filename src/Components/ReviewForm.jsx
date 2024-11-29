import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0); 
  const [reviewDescription, setReviewDescription] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!rating || rating < 1) {
      toast.warn("Please select a rating between 1 and 5.");
      return;
    }
  
    if (!reviewDescription.trim()) {
      toast.warn("Please provide a review description.");
      return;
    }
    const reviewData = {
      rating,
      description: reviewDescription,
    };
    await onSubmit(reviewData); 
    setRating(0)
    setReviewDescription('')
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mx: "auto" , width:"90%" }} >
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit Review
      </Button>
    </Box>
  );
}

export default ReviewForm;
