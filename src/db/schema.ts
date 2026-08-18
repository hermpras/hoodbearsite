import { pgTable, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const applications = pgTable('applications', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  xUsername: text('x_username').notNull().unique(),
  walletAddress: text('wallet_address').notNull().unique(),
  commentUrl: text('comment_url').notNull(),
  taskFollowX: boolean('task_follow_x').default(true).notNull(),
  taskLikeRepost: boolean('task_like_repost').default(true).notNull(),
  taskComment: boolean('task_comment').default(true).notNull(),
  status: text('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
