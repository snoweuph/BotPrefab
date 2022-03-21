use discordDB;
CREATE TABLE GuildSettings (
  # Primary key to identify the guild
  guildId VARCHAR(32) NOT NULL PRIMARY KEY,
  # settings to enable/disable features
  enableFeatureWelcomeMessage BOOLEAN NOT NULL DEFAULT FALSE,
  enableFeatureGoodbyeMessage BOOLEAN NOT NULL DEFAULT FALSE,
  # configuration for channels
  welcomeMessageChannelId VARCHAR(32),
  goodbyeMessageChannelId VARCHAR(32),
  ########################################
  ##   FEATURE SPECIFIC CONFIGURATION   ##
  ########################################
  # welcome message
  welcomeMessageTitle VARCHAR(128) NOT NULL DEFAULT 'Welcome to {server} {tag}',
  welcomeMessageBody VARCHAR(2048) NOT NULL DEFAULT 'Hello {user}, welcome to {server}!',
  welcomeMessageColor VARCHAR(7) NOT NULL DEFAULT '#0099ff',
  welcomeMessageImageEnabled BOOLEAN NOT NULL DEFAULT TRUE,
  welcomeMessageImageUrl VARCHAR(512) NOT NULL DEFAULT 'default',
  welcomeMessageImageAccentColor VARCHAR(7) NOT NULL DEFAULT 'rainbow',
  # goodbye message
  goodbyeMessageTitle VARCHAR(128) NOT NULL DEFAULT 'Goodbye from {server} {tag}',
  goodbyeMessageBody VARCHAR(2048) NOT NULL DEFAULT 'Goodbye {user}, we hope to see you again!',
  goodbyeMessageColor VARCHAR(7) NOT NULL DEFAULT '#0099ff',
  goodbyeMessageImageEnabled BOOLEAN NOT NULL DEFAULT TRUE,
  goodbyeMessageImageUrl VARCHAR(512) NOT NULL DEFAULT 'default',
  goodbyeMessageImageAccentColor VARCHAR(7) NOT NULL DEFAULT 'rainbow'
);