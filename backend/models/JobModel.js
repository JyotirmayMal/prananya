import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
    {
        title : {
            type: String,
            required: true,
        },
        company : {
            type: String,
            required: true,
        },
        location : {
            type: String,
            required: true,
        }
    },
    {
        timestamps : true
    }
);
export const Job = mongoose.model("Jobs", jobSchema)