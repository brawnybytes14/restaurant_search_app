CREATE TABLE `restaurant` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT,
	`cuisines`	TEXT,
	`avgCostForTwo`	INTEGER,
	`currency`	TEXT,
	`hasTableBooking`	TEXT,
	`hasOnlineDelivery`	TEXT,
	`avgRating`	TEXT,
	`ratingColor`	TEXT,
	`ratingText`	TEXT,
	`votes`	INTEGER
);