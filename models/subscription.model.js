import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price should be greater than 0"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["USD", "EUR", "INR", "GBP"],
      default: "INR",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "quaterly"],
    },
    category: {
      type: String,
      enum: ["music", "video", "software"],
      required: [true, "Category is required"],
    },
    paymentMethod: {
      type: String,
      enum: ["creditCard", "paypal"],
      required: [true, "Payment method is required"],
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "inactive"],
      default: "active",
    },
    startDate: {
      type: Date,
      default: Date.now,
      //   required: true,
      validate: {
        validator: (value) => value <= new Date(),
      },
    },
    renewalDate: {
      type: Date,
      default: Date.now,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

subscriptionSchema.pre("save", function (next) {
  if (this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
