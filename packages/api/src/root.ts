import { os } from "@orpc/server";

import { pointsRouter as points } from "./routers/points";

export const router = os.router(points);
