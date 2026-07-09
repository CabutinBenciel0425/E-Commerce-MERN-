import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Tjl7HHPxrrIMD69okQ04FcWDqbf1o54FO5wkHt2wBjou7uHAkGBVTZqznwfvIKxbxpw3IExKeE78UfsE5VVB8NC00D5viGMY2",
);

export default stripePromise;
