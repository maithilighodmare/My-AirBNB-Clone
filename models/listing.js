const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
    },
        description: String,
        image: {
            filename: { type: String, default: "default.jpg" },
            url: {
                type: String,
                default: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
                set: (v) =>
                    !v
                        ? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500"
                        : v,
            },
        },
        
        price: Number,
        location: String,
        country: String,
    }
);

const Listing= mongoose.model("Listing", listingSchema);
module.exports = Listing;
    

