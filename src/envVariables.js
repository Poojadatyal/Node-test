const envVariables = {
  // DB configurations
  DB_USER: process.env.DB_USER || "vkbgkeylxbklho",
  DB_PASSWORD:process.env.DB_PASSWORD || "8d1ddab1b1d8777b5fa2408b672430b6807de6654c65d7efb067cd274d24cd09",
  DB_HOST: process.env.DB_HOST || "ec2-23-21-94-99.compute-1.amazonaws.com",
  DB_NAME: process.env.DB_NAME || "df67sva2l3ml02",
  DB_SSL: process.env.DB_SSL || true,
  DB_PORT: process.env.DB_PORT || 5432,
  DB_MAX_POOL_SIZE: process.env.DB_MAX_POOL_SIZE || "5",
  //server configurations
  SERVER_PORT: process.env.SERVER_PORT || "8080",
  PORT: 8080,
	BODY_LIMIT: "100kb",
	CROS_HEADERS: ["Link"]
};
export default envVariables;
