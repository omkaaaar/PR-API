import { aj } from "../configs/arcjet.js";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res.status(429).send({ error: "Rate limit exceed" });

      if (decision.reason.isBot())
        return res.status(403).send({ error: "Bot detected" });

      return res.status(403).send({ error: "Access denied" });
    }
    next();
  } catch (error) {
    res.status(404).send(error.message);
  }
};
