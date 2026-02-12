import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const emitMessageUpdate = (message) => {
  const receiverSocketId = getReceiverSocketId(message.receiverId?.toString());
  const senderSocketId = getReceiverSocketId(message.senderId?.toString());
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("messageUpdated", message);
  }
  if (senderSocketId) {
    io.to(senderSocketId).emit("messageUpdated", message);
  }
};

const populateMessage = (messageId) => {
  return Message.findById(messageId).populate({
    path: "replyTo",
    select: "message senderId isDeleted",
  });
};

export const sendMessage = async (req, res) => {
  try {
    const { message, replyTo } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      replyTo: replyTo || null,
      readBy: [senderId],
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const populatedMessage = await newMessage.populate({
      path: "replyTo",
      select: "message senderId isDeleted",
    });
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate({
      path: "messages",
      populate: { path: "replyTo", select: "message senderId isDeleted" },
    });

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;
    const unreadMessageIds = messages
      .filter(
        (message) =>
          message.senderId.toString() !== senderId.toString() &&
          !message.readBy?.some((reader) => reader.toString() === senderId)
      )
      .map((message) => message._id);

    if (unreadMessageIds.length) {
      await Message.updateMany(
        { _id: { $in: unreadMessageIds } },
        { $addToSet: { readBy: senderId } }
      );
      const updatedMessages = await Message.find({
        _id: { $in: unreadMessageIds },
      }).populate({ path: "replyTo", select: "message senderId isDeleted" });
      updatedMessages.forEach((message) => emitMessageUpdate(message));
      messages.forEach((message) => {
        if (unreadMessageIds.some((id) => id.equals(message._id))) {
          message.readBy = [...(message.readBy || []), senderId];
        }
      });
    }

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const editMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    const targetMessage = await Message.findById(messageId);
    if (!targetMessage) {
      return res.status(404).json({ error: "Message not found" });
    }
    if (
      targetMessage.senderId.toString() !== userId.toString() &&
      targetMessage.receiverId.toString() !== userId.toString()
    ) {
      return res.status(403).json({ error: "Not authorized to react" });
    }
    if (targetMessage.senderId.toString() !== senderId.toString()) {
      return res.status(403).json({ error: "Not authorized to edit" });
    }
    if (targetMessage.isDeleted) {
      return res.status(400).json({ error: "Message is deleted" });
    }

    targetMessage.message = message;
    targetMessage.editedAt = new Date();
    await targetMessage.save();

    const updatedMessage = await populateMessage(targetMessage._id);
    emitMessageUpdate(updatedMessage);

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.log("Error in editMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const senderId = req.user._id;

    const targetMessage = await Message.findById(messageId);
    if (!targetMessage) {
      return res.status(404).json({ error: "Message not found" });
    }
    if (targetMessage.senderId.toString() !== senderId.toString()) {
      return res.status(403).json({ error: "Not authorized to delete" });
    }

    targetMessage.isDeleted = true;
    targetMessage.deletedAt = new Date();
    await targetMessage.save();

    const updatedMessage = await populateMessage(targetMessage._id);
    emitMessageUpdate(updatedMessage);

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.log("Error in deleteMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const reactToMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const { emoji } = req.body;
    const userId = req.user._id;

    if (!emoji) {
      return res.status(400).json({ error: "Reaction emoji is required" });
    }

    const targetMessage = await Message.findById(messageId);
    if (!targetMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    const existingIndex = targetMessage.reactions.findIndex(
      (reaction) => reaction.userId.toString() === userId.toString()
    );

    if (existingIndex >= 0) {
      if (targetMessage.reactions[existingIndex].emoji === emoji) {
        targetMessage.reactions.splice(existingIndex, 1);
      } else {
        targetMessage.reactions[existingIndex].emoji = emoji;
      }
    } else {
      targetMessage.reactions.push({ userId, emoji });
    }

    await targetMessage.save();

    const updatedMessage = await populateMessage(targetMessage._id);
    emitMessageUpdate(updatedMessage);

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.log("Error in reactToMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const pinMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const userId = req.user._id;
    const targetMessage = await Message.findById(messageId);
    if (!targetMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (
      targetMessage.senderId.toString() !== userId.toString() &&
      targetMessage.receiverId.toString() !== userId.toString()
    ) {
      return res.status(403).json({ error: "Not authorized to pin" });
    }

    targetMessage.pinned = !targetMessage.pinned;
    targetMessage.pinnedAt = targetMessage.pinned ? new Date() : null;
    await targetMessage.save();

    const updatedMessage = await populateMessage(targetMessage._id);
    emitMessageUpdate(updatedMessage);

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.log("Error in pinMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const searchMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const searchQuery = req.query.query || "";

    if (!searchQuery.trim()) {
      return res.status(200).json([]);
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    });

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = await Message.find({
      _id: { $in: conversation.messages },
      message: { $regex: searchQuery, $options: "i" },
    }).populate({ path: "replyTo", select: "message senderId isDeleted" });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in searchMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
