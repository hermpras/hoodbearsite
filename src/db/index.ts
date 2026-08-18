import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type ApplicationRecord = {
  id: string;
  xUsername: string;
  walletAddress: string;
  commentUrl: string;
  taskFollowX: boolean;
  taskLikeRepost: boolean;
  taskComment: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

// Development-only fallback when DATABASE_URL is completely unavailable.
// IMPORTANT: PostgreSQL errors are NOT allowed to fall back to memory.
const memoryStore: ApplicationRecord[] = [];

/**
 * Initialize PostgreSQL + Drizzle.
 */
function getDb() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.warn(
      "DATABASE_URL is not configured. Using in-memory store for local development.",
    );
    return null;
  }

  const client = postgres(connectionString, {
    max: 1,
  });

  return drizzle(client, {
    schema,
  });
}

export const db = getDb();

export const dbOperations = {
  /**
   * Find an application by wallet address.
   */
  async findByWallet(walletAddress: string): Promise<ApplicationRecord | null> {
    const normalizedWallet = walletAddress.toLowerCase();

    // PostgreSQL mode
    if (db) {
      const results = await db.select().from(schema.applications);

      const match = results.find(
        (app) => app.walletAddress.toLowerCase() === normalizedWallet,
      );

      return match ? (match as ApplicationRecord) : null;
    }

    // Development fallback ONLY when DATABASE_URL is unavailable
    const found = memoryStore.find(
      (app) => app.walletAddress.toLowerCase() === normalizedWallet,
    );

    return found || null;
  },

  /**
   * Find an application by X username.
   */
  async findByXUsername(xUsername: string): Promise<ApplicationRecord | null> {
    const normalizedUser = xUsername.toLowerCase().replace(/^@/, "");

    // PostgreSQL mode
    if (db) {
      const results = await db.select().from(schema.applications);

      const match = results.find(
        (app) =>
          app.xUsername.toLowerCase().replace(/^@/, "") === normalizedUser,
      );

      return match ? (match as ApplicationRecord) : null;
    }

    // Development fallback ONLY when DATABASE_URL is unavailable
    const found = memoryStore.find(
      (app) => app.xUsername.toLowerCase().replace(/^@/, "") === normalizedUser,
    );

    return found || null;
  },

  /**
   * Create a new whitelist application.
   *
   * IMPORTANT:
   * If PostgreSQL is configured but the INSERT fails,
   * the error is thrown and the API will NOT return success.
   */
  async createApplication(data: {
    xUsername: string;
    walletAddress: string;
    commentUrl: string;
    taskFollowX: boolean;
    taskLikeRepost: boolean;
    taskComment: boolean;
  }): Promise<ApplicationRecord> {
    const newRecord: ApplicationRecord = {
      id: crypto.randomUUID(),
      xUsername: data.xUsername,
      walletAddress: data.walletAddress,
      commentUrl: data.commentUrl,
      taskFollowX: data.taskFollowX,
      taskLikeRepost: data.taskLikeRepost,
      taskComment: data.taskComment,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // PostgreSQL mode
    if (db) {
      try {
        const inserted = await db
          .insert(schema.applications)
          .values({
            id: newRecord.id,
            xUsername: newRecord.xUsername,
            walletAddress: newRecord.walletAddress,
            commentUrl: newRecord.commentUrl,
            taskFollowX: newRecord.taskFollowX,
            taskLikeRepost: newRecord.taskLikeRepost,
            taskComment: newRecord.taskComment,
            status: newRecord.status,
            createdAt: newRecord.createdAt,
            updatedAt: newRecord.updatedAt,
          })
          .returning();

        if (!inserted.length) {
          throw new Error(
            "PostgreSQL INSERT completed without returning a record.",
          );
        }

        return inserted[0] as ApplicationRecord;
      } catch (err) {
        console.error("PostgreSQL insert error:", err);

        // CRITICAL:
        // Do NOT write to memoryStore if PostgreSQL exists
        // but the database operation failed.
        throw err;
      }
    }

    // Development fallback ONLY when DATABASE_URL is unavailable
    memoryStore.push(newRecord);

    return newRecord;
  },

  /**
   * Return total number of applications.
   */
  async count(): Promise<number> {
    // PostgreSQL mode
    if (db) {
      const results = await db.select().from(schema.applications);

      return results.length;
    }

    // Development fallback ONLY when DATABASE_URL is unavailable
    return memoryStore.length;
  },
};
