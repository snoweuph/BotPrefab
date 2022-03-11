use discordDB;
CREATE TABLE GuildSettings (
  # Primary key to identify the guild
  guildId UNSIGNED BIGINT NOT NULL PRIMARY KEY,
  # settings to enable/disable specific commands
  enableCommandHelp BOOLEAN NOT NULL DEFAULT TRUE,
  enableCommandPing BOOLEAN NOT NULL DEFAULT TRUE,
  # settings to enable/disable features
  enableFeatureWelcomeMessage BOOLEAN NOT NULL DEFAULT FALSE,
  enableFeatureGoodbyeMessage BOOLEAN NOT NULL DEFAULT FALSE,
  # configuration for channels
  welcomeMessageChannelId UNSIGNED BIGINT,
  goodbyeMessageChannelId UNSIGNED BIGINT,
  ########################################
  ##   FEATURE SPECIFIC CONFIGURATION   ##
  ########################################
  # welcome message
  welcomeMessageTitle VARCHAR(128) NOT NULL DEFAULT 'Welcome to {server} {username}',
  welcomeMessageBody VARCHAR(2048) NOT NULL DEFAULT 'Hello {user}, welcome to {server}!',
  welcomeMessageColor VARCHAR(7) NOT NULL DEFAULT '#0099ff',
  welcomeMessageImageEnabled BOOLEAN NOT NULL DEFAULT TRUE,
  welcomeMessageImageUrl VARCHAR(512),
  welcomeMessageImageAccentColor VARCHAR(7) NOT NULL DEFAULT 'rainbow',
  # goodbye message
  goodbyeMessageTitle VARCHAR(128) NOT NULL DEFAULT 'Goodbye from {server} {username}',
  goodbyeMessageBody VARCHAR(2048) NOT NULL DEFAULT 'Goodbye {user}, we hope to see you again!',
  goodbyeMessageColor VARCHAR(7) NOT NULL DEFAULT '#0099ff',
  goodbyeMessageImageEnabled BOOLEAN NOT NULL DEFAULT TRUE,
  goodbyeMessageImageUrl VARCHAR(512),
  goodbyeMessageImageAccentColor VARCHAR(7) NOT NULL DEFAULT 'rainbow',
)