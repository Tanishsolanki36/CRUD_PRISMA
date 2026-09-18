// ─────────────────────────────────────────────────────────────
// routes/threads.js
//
// These four handlers STILL use an in-memory array — restart the server and
// every thread is gone. Prisma is already connected (see server.js and
// prisma/client.js). YOUR TASK: replace each handler with a real Prisma query.
//
// Rules for every route:
//   • make the handler  async  and  await  the Prisma call
//   • wrap the body in  try/catch  and call  next(error)  on failure
//   • in write routes, convert the id:  parseInt(req.params.id)
//   • for create/update, pass an explicit  data  object — never  data: req.body
//
// When you are done, NO handler should reference the `threads` array below.
// ─────────────────────────────────────────────────────────────
import { Router } from "express";
import prisma from "../prisma/client.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const threads = await prisma.thread.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(threads);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, body = "" } = req.body || {};
    const thread = await prisma.thread.create({
      data: { title, body },
    });
    res.status(201).json(thread);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, body } = req.body || {};
    const data = {};

    if (title !== undefined) data.title = title;
    if (body !== undefined) data.body = body;

    const thread = await prisma.thread.update({
      where: { id },
      data,
    });

    res.status(200).json(thread);
  } catch (error) {
    if (error?.code === "P2025") {
      return res.status(404).json({ error: "Thread not found." });
    }
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedThread = await prisma.thread.delete({
      where: { id },
    });

    res.status(200).json(deletedThread);
  } catch (error) {
    if (error?.code === "P2025") {
      return res.status(404).json({ error: "Thread not found." });
    }
    next(error);
  }
});

export default router;
