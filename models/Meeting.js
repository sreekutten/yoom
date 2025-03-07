import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema({
  meetingId: { type: String, required: true, unique: true },
  startTime: { type: Date, default: Date.now },
  participants: [{ type: String }], // Store participant emails
  pdfUrl: { type: String, default: "" },
});

export default mongoose.models.Meeting || mongoose.model("Meeting", MeetingSchema);
