import VideoCall from "../models/videoCallSchema.js";


export const createVideoCall = async (req, res) => {
  const { startedBy, participants, link } = req.body;
  console.log(req.body)

  try {
    const newVideoCall = new VideoCall({
      startedBy,
      participants,
      link,
    });

    await newVideoCall.save();

    res.status(201).json(newVideoCall);
  } catch (error) {
    res.status(500).json({ message: 'Error creating video call', error });
  }
};



export const updateVideoCallStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedVideoCall = await VideoCall.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedVideoCall) {
      return res.status(404).json({ message: 'Video call not found' });
    }

    res.status(200).json(updatedVideoCall);
  } catch (error) {
    res.status(500).json({ message: 'Error updating video call status', error });
  }
};




export const getActiveVideoCallsForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const activeVideoCalls = await VideoCall.find({
      participants: userId,
      status: 'active',
    }).populate('startedBy participants');

    console.log(activeVideoCalls)

    res.status(200).json(activeVideoCalls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching active video calls', error });
  }
};
