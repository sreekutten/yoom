import dbConnect from "@/lib/dbConnect";
import Meeting from "@/models/Meeting";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();

  const { meetingId, participants } = req.body;

  try {
    const meeting = new Meeting({ meetingId, participants });
    await meeting.save();
    res.status(200).json({ message: "Meeting stored", meeting });
  } catch (error) {
    res.status(500).json({ message: "Error storing meeting", error: error.message });
  }
}
